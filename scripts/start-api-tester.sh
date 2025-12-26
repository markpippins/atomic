#!/bin/bash
pushd ../web/angular-throttler
bun install
bun --hot run start --open | lolcat
cmatrix