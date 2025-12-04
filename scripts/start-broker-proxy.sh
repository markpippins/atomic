#!/bin/bash
pushd ../node/broker-service-proxy
bun install
bun run dev | lolcat
cmatrix