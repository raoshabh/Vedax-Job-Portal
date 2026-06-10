#!/bin/zsh
cd "$(dirname "$0")"
export PATH="$HOME/.local/toolchains/node-v22.16.0-darwin-arm64/bin:$PATH"
exec node node_modules/next/dist/bin/next start
