#!/bin/bash

# Sample script showing how to run diff between two directories
# Replace the directory paths with your actual paths

echo "To compare web/angular/throttler/dev and web/angular/throttler/alt:"
echo ""
echo "Basic diff command:"
echo "diff -r -w --exclude='node_modules' --exclude='.git' web/angular/throttler/dev web/angular/throttler/alt"
echo ""
echo "Enhanced diff command with side-by-side view:"
echo "diff -r -w --exclude='node_modules' --exclude='.git' --side-by-side --width=160 web/angular/throttler/dev web/angular/throttler/alt"
echo ""
echo "Using the provided scripts:"
echo "./diff_directories.sh web/angular/throttler/dev web/angular/throttler/alt"
echo "./diff_directories_enhanced.sh web/angular/throttler/dev web/angular/throttler/alt"