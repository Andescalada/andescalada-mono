#!/bin/bash

# Create src directory if it doesn't exist
mkdir -p src

echo "Cleaning Icons"
npx svgo -f svg

echo "Done cleaning :broom:"

echo "Transforming icons"
rm -rf src/components-web
mkdir -p src/components-web
npx @svgr/cli --icon --no-prettier --filename-case kebab --replace-attr-values "#000={props.fill}" --out-dir src/components-web -- svg 

echo "Done transforming icons for web"

rm -f src/map-web.ts

printf "\e[1m\e[92mCreating the map...\e[0m\n"
cat << EOF > src/map-web.ts
/* eslint-disable @typescript-eslint/no-var-requires */
// This file is auto-generated. DO NOT EDIT MANUALLY.

export const Icons = {
EOF

for file in src/components-web/*.js
do
  if [ "$file" != "src/components-web/index.js" ]
  then
      base_name=$(basename ${file%.js})
      echo $base_name
      echo "  \"$base_name\": require(\"./components-web/$base_name\").default," >> src/map-web.ts
  else 
    echo "Skipping index.js"
  fi
done

echo "};" >> src/map-web.ts

echo "Running Prettier on map-web.ts"
npx prettier --write src/map-web.ts

echo "Transformation complete. Results stored in the src directory."