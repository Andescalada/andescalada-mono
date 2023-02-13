
echo "Cleaninig Icons"
npx svgo -f svg

echo "Done cleaning :broom:"

echo "Transforming icons"
rm -r components-native
mkdir components-native
npx @svgr/cli --native --icon --no-prettier --filename-case kebab --replace-attr-values "#000={props.fill}" --out-dir components-native -- svg 

echo "Done transforming icons"

rm map.ts

printf "\e[1m\e[92mCreating the map...\e[0m\n"
echo "const base = \"./components-native/\";" > map.ts
echo >> map.ts
echo "export const Icons = {" >> map.ts
for file in components-native/*.js
do
  if [ "$file" != "components-native/index.js" ]
  then
      base_name=$(basename ${file%.js})
      echo $base_name
      echo "  \"$base_name\": require(base + \"$base_name\").default," >> map.ts
  else 
    echo "Skipping index.js"
  fi
done

echo "};" >> map.ts