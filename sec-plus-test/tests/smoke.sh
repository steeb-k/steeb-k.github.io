#!/usr/bin/env bash
# Headless Chromium smoke test. Usage: bash tests/smoke.sh [path-to-html]  (default: index.html)
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PAGE="${1:-index.html}"
case "$PAGE" in /*) FILE="$PAGE" ;; *) if [ -f "$PWD/$PAGE" ]; then FILE="$PWD/$PAGE"; else FILE="$ROOT/$PAGE"; fi ;; esac
[ -f "$FILE" ] || { echo "FAIL: $FILE not found"; exit 2; }
CHROME="${CHROMIUM:-/usr/bin/chromium}"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
"$CHROME" --headless=new --disable-gpu --no-sandbox --user-data-dir="$TMP/profile" --enable-logging=stderr --v=0 \
  --virtual-time-budget=5000 --dump-dom "file://$FILE" >"$TMP/dom.html" 2>"$TMP/err.log"
fail=0
grep -q 'data-ready="1"' "$TMP/dom.html" || { echo "FAIL: app did not mark itself ready"; fail=1; }
grep -q '<h1[^>]*>Security+ SY0-701 practice' "$TMP/dom.html" || { echo "FAIL: home screen not rendered"; fail=1; }
STATUS="$(grep -o 'id="boot-status"[^>]*>[^<]*' "$TMP/dom.html" | sed 's/.*>//')"
echo "boot-status: ${STATUS:-<missing>}"
case "$STATUS" in *"errors=0"*) ;; *) echo "FAIL: JS errors reported or boot-status missing"; fail=1 ;; esac
case "$STATUS" in *"mcq=0 "*|"") echo "FAIL: question bank empty"; fail=1 ;; esac
if grep -E 'CONSOLE.*(error|Uncaught)|Uncaught|ERR_FILE_NOT_FOUND|Failed to load resource' "$TMP/err.log" >"$TMP/errs.txt"; then
  echo "FAIL: console errors:"; cat "$TMP/errs.txt"; fail=1
fi
# tests/dev.html must load the same app CSS/JS, in the same order, as index.html (only the bank differs)
appassets() { grep -oE '(href|src)="[^"]*(css/style\.css|fonts/ibm-plex/[A-Za-z-]+\.(css|woff2)|js/[a-z]+\.js|data/objectives\.js)"' "$1" | sed -E 's/.*"(\.\.\/)*([^"]*)"/\2/'; }
if ! diff <(appassets "$ROOT/index.html") <(appassets "$ROOT/tests/dev.html") >"$TMP/sync.txt"; then
  echo "FAIL: tests/dev.html is out of sync with index.html:"; cat "$TMP/sync.txt"; fail=1
fi
# no external (http/https/protocol-relative) stylesheet, preload, font or script tags: everything must be self-hosted
if grep -nEi '<(link|script)[^>]*(href|src)=["'"'"']?(https?:)?//' "$FILE" >"$TMP/ext.txt"; then
  echo "FAIL: external link/script/preload tag in $FILE:"; cat "$TMP/ext.txt"; fail=1
fi
# the http(s)-only font preload must point at the self-hosted Plex files (relative path differs per page)
grep -q "fonts/ibm-plex/IBMPlexSans-' + w + '.woff2'" "$FILE" || { echo "FAIL: IBM Plex preload script missing in $FILE"; fail=1; }
[ $fail -eq 0 ] && echo "smoke OK: $FILE" || { echo "smoke FAILED: $FILE"; exit 1; }
