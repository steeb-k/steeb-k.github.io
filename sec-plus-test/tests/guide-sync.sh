#!/usr/bin/env bash
# Fails when guide/data/guide.js was built from different markdown than the guide repo now has.
# Usage: [GUIDE_SRC=/path/to/security+-study] bash tests/guide-sync.sh
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${GUIDE_SRC:-$ROOT/../../security+-study}"
DATA="$ROOT/guide/data/guide.js"
[ -f "$DATA" ] || { echo "FAIL: $DATA missing (run python3 meta/build-site.py in the guide repo)"; exit 1; }
if [ ! -d "$SRC" ]; then echo "SKIP: guide source dir not found ($SRC); set GUIDE_SRC to check"; exit 0; fi
shopt -s nullglob
files=("$SRC"/[0-9][0-9]-*.md)
[ ${#files[@]} -ge 9 ] || { echo "FAIL: expected 9 chapter files in $SRC, found ${#files[@]}"; exit 1; }
want="$(LC_ALL=C cat "${files[@]}" | sha256sum | cut -d' ' -f1)"
have="$(grep -oE 'sourceHash: "[0-9a-f]{64}"' "$DATA" | grep -oE '[0-9a-f]{64}')"
if [ "$want" = "$have" ]; then echo "guide-sync OK: ${have:0:12} (${#files[@]} files)"; exit 0; fi
echo "FAIL: guide/data/guide.js is stale (built ${have:0:12}, sources ${want:0:12}). Run: python3 meta/build-site.py"
exit 1
