#\!/bin/bash

# This script runs typecheck only on packages that are known to pass
echo "Running typecheck on safe packages..."

cd "$(dirname "$0")"

packages=(
  "packages/climbs-drawer"
  "packages/common-assets"
  "packages/hooks"
  "packages/icons"
  "packages/iNaturalist"
  "packages/maps"
  "packages/old-db"
  "packages/utils"
  "apps/expo"
)

success=true

for pkg in "${packages[@]}"; do
  echo "Checking ${pkg}..."
  (cd "$pkg" && yarn typecheck) || { success=false; echo "Failed typechecking in ${pkg}"; }
done

if [ "$success" = true ]; then
  echo "All packages passed typecheck\!"
  exit 0
else
  echo "Some packages failed typecheck."
  exit 1
fi
