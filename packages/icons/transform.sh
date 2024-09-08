#!/bin/bash

# Create src directory if it doesn't exist
mkdir -p src

echo "Cleaning Icons"
npx svgo -f svg

echo "Done cleaning :broom:"

echo "Transforming icons"
rm -rf src/components-native
mkdir -p src/components-native
npx @svgr/cli --native --icon --no-prettier --filename-case kebab --replace-attr-values "#000={props.fill}" --out-dir src/components-native -- svg 

echo "Done transforming icons"

rm -f src/map.ts

printf "\e[1m\e[92mCreating the map...\e[0m\n"
cat << EOF > src/map.ts
/* eslint-disable @typescript-eslint/no-var-requires */
// This file is auto-generated. DO NOT EDIT MANUALLY.

const base = "./components-native/";

export const Icons = {
EOF

for file in src/components-native/*.js
do
  if [ "$file" != "src/components-native/index.js" ]
  then
      base_name=$(basename ${file%.js})
      echo $base_name
      echo "  \"$base_name\": require(base + \"$base_name\").default," >> src/map.ts
  else 
    echo "Skipping index.js"
  fi
done

echo "};" >> src/map.ts

echo "Running Prettier on map.ts"
npx prettier --write src/map.ts

echo "Transformation complete. Results stored in the src directory."