yq -j  e '."versionId" = "123_fuck"' -i ./data/System.json
node ./.git/hooks/pre-commit
git reset