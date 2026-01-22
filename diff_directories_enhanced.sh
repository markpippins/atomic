#!/bin/bash

# Script to generate a detailed diff between two directories
# Ignores whitespace differences and excludes node_modules folder

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if correct number of arguments provided
if [ "$#" -ne 2 ]; then
    echo -e "${RED}Usage: $0 <dir1> <dir2>${NC}"
    echo -e "Example: $0 web/angular/throttler/dev web/angular/throttler/alt"
    exit 1
fi

DIR1="$1"
DIR2="$2"

# Check if directories exist
if [ ! -d "$DIR1" ]; then
    echo -e "${RED}Error: Directory $DIR1 does not exist${NC}"
    exit 1
fi

if [ ! -d "$DIR2" ]; then
    echo -e "${RED}Error: Directory $DIR2 does not exist${NC}"
    exit 1
fi

echo -e "${YELLOW}Generating diff between $DIR1 and $DIR2...${NC}"
echo -e "${YELLOW}Ignoring whitespace differences and excluding node_modules folders${NC}"
echo "=================================================================="

# Count files in each directory (excluding node_modules and .git)
COUNT_DIR1=$(find "$DIR1" -type f -not -path '*/node_modules/*' -not -path '*/.git/*' | wc -l)
COUNT_DIR2=$(find "$DIR2" -type f -not -path '*/node_modules/*' -not -path '*/.git/*' | wc -l)

echo -e "${GREEN}Files in $DIR1: $COUNT_DIR1${NC}"
echo -e "${GREEN}Files in $DIR2: $COUNT_DIR2${NC}"

echo ""
echo -e "${YELLOW}Detailed diff:${NC}"

# Generate diff ignoring whitespace changes (-w) and excluding node_modules
DIFF_OUTPUT=$(diff -r -w --exclude='node_modules' --exclude='.git' --side-by-side --width=160 "$DIR1" "$DIR2" 2>&1)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}No differences found between the directories (ignoring whitespace)${NC}"
else
    echo "$DIFF_OUTPUT"
    
    echo ""
    echo "=================================================================="
    echo -e "${YELLOW}Summary of differences:${NC}"
    
    # Show files only in DIR1
    FILES_ONLY_IN_DIR1=$(diff -rq -w --exclude='node_modules' --exclude='.git' "$DIR1" "$DIR2" 2>/dev/null | grep "Only in $DIR1" || true)
    if [ -n "$FILES_ONLY_IN_DIR1" ]; then
        echo -e "${RED}Files only in $DIR1:${NC}"
        echo "$FILES_ONLY_IN_DIR1"
        echo ""
    fi
    
    # Show files only in DIR2
    FILES_ONLY_IN_DIR2=$(diff -rq -w --exclude='node_modules' --exclude='.git' "$DIR1" "$DIR2" 2>/dev/null | grep "Only in $DIR2" || true)
    if [ -n "$FILES_ONLY_IN_DIR2" ]; then
        echo -e "${RED}Files only in $DIR2:${NC}"
        echo "$FILES_ONLY_IN_DIR2"
        echo ""
    fi
    
    # Show differing files
    DIFFERENT_FILES=$(diff -rq -w --exclude='node_modules' --exclude='.git' "$DIR1" "$DIR2" 2>/dev/null | grep "differ" || true)
    if [ -n "$DIFFERENT_FILES" ]; then
        echo -e "${YELLOW}Files that differ:${NC}"
        echo "$DIFFERENT_FILES"
    fi
fi