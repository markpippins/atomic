#!/bin/bash

git pull

pushd desktop
git pull
popd

pushd moleculer 
git pull 
popd

pushd node 
git pull 
popd

pushd python 
git pull 
popd

pushd quarkus 
git pull 
popd

pushd spring
git pull
pushd vaadin-client && git pull && popd
popd

pushd web 
git pull
pushd angular-throttler && git pull && popd
popd


