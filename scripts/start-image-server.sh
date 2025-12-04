#!/bin/bash
pushd ../node/image-server
bun install
bun run image-serv.ts  /mnt/c/tmp/images | lolcat
cmatrixbash