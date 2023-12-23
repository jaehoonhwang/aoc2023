#!/bin/sh

set -e

day=4
dayName="Four"

mkdir -p src/days/$day
cp -r src/template/. src/days/$day/
sed -i -e "s/_N_/$day/g" src/days/$day/index.ts
sed -i -e "s/_NAME_/$dayName/g" src/days/$day/index.ts
