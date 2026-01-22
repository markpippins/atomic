#!/bin/bash

# Script to generate a detailed diff between two directories
# Ignores whitespace differences and excludes node_modules folder

# Check if correct number of arguments provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <dir1> <dir2>"
    echo "Example: $0 web/angular/throttler/dev web/angular/throttler/alt"
    exit 1
fi

DIR1="$1"
DIR2="$2"

# Check if directories exist
if [ ! -d "$DIR1" ]; then
    echo "Error: Directory $DIR1 does not exist"
    exit 1
fi

if [ ! -d "$DIR2" ]; then
    echo "Error: Directory $DIR2 does not exist"
    exit 1
fi

echo "Generating diff between $DIR1 and $DIR2..."
echo "Ignoring whitespace differences and excluding node_modules folders"
echo "=================================================================="

# Generate diff ignoring whitespace changes (-w) and excluding node_modules
diff -r -w --exclude='node_modules' --exclude='.git' "$DIR1" "$DIR2"

# Check if there were differences
if [ $? -eq 0 ]; then
    echo "No differences found between the directories (ignoring whitespace)"
else
    echo ""
    echo "=================================================================="
    echo "Summary of differences:"
    echo "Files only in $DIR1: $(find $DIR1 -type f -not -path '*/node_modules/*' -not -path '*/.git/*' | wc -l)"
    echo "Files only in $DIR2: $(find $DIR2 -type f -not -path '*/node_modules/*' -not -path '*/.git/*' | wc -l)"
    
    # Show a summary of differences
    diff -rq -w --exclude='node_modules' --exclude='.git' "$DIR1" "$DIR2" | grep -v "Only in"
fi