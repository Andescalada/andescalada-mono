
echo "Cleaninig Icons"
npx svgo -f svg

echo "Done cleaning :broom:"

echo "Transforming icons"
rm -r components-web
mkdir components-web
npx @svgr/cli --icon --no-prettier --filename-case kebab --replace-attr-values "#000={props.fill}" --out-dir components-web -- svg 

echo "Done transforming icons for web"

rm map-web.ts

printf "\e[1m\e[92mCreating the map...\e[0m\n"
echo >> map-web.ts
echo "export const Icons = {" >> map-web.ts
for file in components-web/*.js
do
  if [ "$file" != "components-web/index.js" ]
  then
      base_name=$(basename ${file%.js})
      echo $base_name
      echo "  \"$base_name\": require( \"./components-web/$base_name\").default," >> map-web.ts
  else 
    echo "Skipping index.js"
  fi
done

echo "};" >> map-web.ts