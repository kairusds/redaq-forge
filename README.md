## RedAQ Forge
A Linux electron-based(pain) launcher for RedAQ.

### Compiling and running this should work for Node.js v20 and above, unless something breaks.

## Compiling
```sh
# NPM
npm i
npm run make64 # or make32, if you have a 32-bit system

# YARN:
yarn
yarn make64 # or make32
```

## Running
```sh

# If you wanna start the launcher without compiling, run:
npm run start
# -- or --
yarn start

# If you installed the ".deb" file, run this instead of opening the app from the app menu:
redaq-forge --no-sandbox
```
