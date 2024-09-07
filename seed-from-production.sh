#!/usr/bin/env bash

# seed-from-production.sh
#
# This script facilitates the process of setting up a local development database
# and optionally seeding it with data from a production database. It performs the following tasks:
#
# 1. Checks if Docker is installed and running
# 2. Manages a local MySQL Docker container:
#    - Starts an existing container if it exists
#    - Creates a new container if it doesn't exist:
#      - Optionally generates a secure random password
#      - Updates the .env file with the new password
# 3. Optionally dumps the production database
# 4. Imports the dumped data into the local database (commented out by default)
#
# Usage:
#   ./seed-from-production.sh [OPTIONS]
#
# Options:
#   --dump    Dump the production database before importing (optional)
#
# Environment:
#   This script requires a .env file with the following variables:
#   - DATABASE_URL_PRODUCTION: URL for the production database
#   - DATABASE_URL: URL for the local database
#   - DB_PASSWORD: Password for the local database (will be updated if using default)
#   - DB_PORT: Port for the local database
#
# Example:
#   ./seed-from-production.sh --dump

# Use this script to start a docker container for a local development database

DB_CONTAINER_NAME="andescalada-mysql"

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  docker start "$DB_CONTAINER_NAME"
  echo "Existing database container '$DB_CONTAINER_NAME' started"
else
  if [ "$DB_PASSWORD" = "password" ]; then
    echo "You are using the default database password"
    read -p "Should we generate a random password for you? [y/N]: " -r REPLY
    if ! [[ $REPLY =~ ^[Yy]$ ]]; then
      echo "Please change the default password in the .env file and try again"
      exit 1
    fi
    # Generate a random URL-safe password
    DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
    sed -i -e "s#:password@#:$DB_PASSWORD@#" .env
  fi

  docker run -d \
    --name $DB_CONTAINER_NAME \
    -e MYSQL_ROOT_PASSWORD="$DB_PASSWORD" \
    -e MYSQL_DATABASE=andescalada \
    -p "$DB_PORT":3306 \
    mysql:8 && echo "Database container '$DB_CONTAINER_NAME' was successfully created"
fi

# Parse command line arguments
DUMP_FLAG=false
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --dump) DUMP_FLAG=true ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

# Load environment variables from .env file
set -a
source .env

# Extract production database connection details from DATABASE_URL_PRODUCTION
PROD_DB_HOST=$(echo "$DATABASE_URL_PRODUCTION" | awk -F'[@/]' '{print $4}')
PROD_DB_PORT=$(echo "$DATABASE_URL_PRODUCTION" | awk -F'[:/]' '{print $6}')
PROD_DB_USER=$(echo "$DATABASE_URL_PRODUCTION" | awk -F'[/:]' '{print $4}')
PROD_DB_PASSWORD=$(echo "$DATABASE_URL_PRODUCTION" | awk -F'[:@]' '{print $4}')
PROD_DB_NAME=$(echo "$DATABASE_URL_PRODUCTION" | awk -F'/' '{print $NF}')

if [ "$DUMP_FLAG" = true ]; then
    echo "Dumping production database..."
    mysqldump "$PROD_DB_NAME" -u "$PROD_DB_USER" -h "$PROD_DB_HOST" -P "$PROD_DB_PORT" -p"$PROD_DB_PASSWORD" > dump_prod.sql
else
    echo "Skipping database dump. Use --dump flag to perform dump."
fi

# echo "Importing production database into local database..."

# import env variables from .env
set -a
source .env

DB_PASSWORD=$(echo "$DATABASE_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
DB_PORT=$(echo "$DATABASE_URL" | awk -F':' '{print $4}' | awk -F'\/' '{print $1}')

# mysql -h 127.0.0.1 -P "$DB_PORT" -u root -p"$DB_PASSWORD" andescalada < dump_prod.sql

