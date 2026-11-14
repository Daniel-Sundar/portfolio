#!/usr/bin/env bash
# Build the site and publish dist/ to the gh-pages branch (GitHub Pages).
set -euo pipefail
cd "$(dirname "$0")/.."

remote=$(git remote get-url origin)
repo=$(basename -s .git "$remote")

VITE_BASE="/$repo/" npm run build
touch dist/.nojekyll

cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="$(git -C .. config user.name)" -c user.email="$(git -C .. config user.email)" \
  commit -q -m "Deploy $(git -C .. rev-parse --short HEAD)"
# Reuse the GitHub CLI login for this throwaway repository.
git -c credential.helper= -c credential.helper='!gh auth git-credential' push -f -q "$remote" gh-pages
rm -rf .git
echo "Published to the gh-pages branch of $remote"
