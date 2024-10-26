#!/bin/bash

# Define the source and destination directories
SOURCE_DIR="apps/expo"
DEST_DIR="$SOURCE_DIR/src"

# Create the src directory if it doesn't exist
mkdir -p "$DEST_DIR"

# List of folders to move
folders=(
    "atoms"
    "features"
    "hooks"
    "local-database"
    "navigation"
    "store"
    "templates"
    "utils"
)

# Move each folder
for folder in "${folders[@]}"; do
    if [ -d "$SOURCE_DIR/$folder" ]; then
        git mv "$SOURCE_DIR/$folder" "$DEST_DIR/"
        echo "Moved $folder to src/"
    else
        echo "Warning: $folder not found in $SOURCE_DIR"
    fi
done

# Move App.tsx to src/
if [ -f "$SOURCE_DIR/App.tsx" ]; then
    git mv "$SOURCE_DIR/App.tsx" "$DEST_DIR/"
    echo "Moved App.tsx to src/"
else
    echo "Warning: App.tsx not found in $SOURCE_DIR"
fi

echo "All specified folders and App.tsx have been moved to $DEST_DIR"
echo "Don't forget to commit these changes!"
