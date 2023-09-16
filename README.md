# CoralMC

## About
A [Node.js](https://nodejs.org/en)/[Bun](https://bun.sh) module that allows you to interact with the [CoralMC](https://coralmc.it/) API.

> **Warning**
CoralMC's API is still in alpha and isn't documented. In the future an access token is going to be required. At the current state, it isn't recommended for production usage as it could stop working at any point.

## Installation
```sh
# Node
npm i coralmc
yarn add coralmc
pnpm add coralmc

# Bun
bun add coralmc
```

## Example usage
Get basic player info:
```JS
const coralmc = require("coralmc");

const playerInfo = await coralmc.getPlayerInfo("Feryzz").catch((err) => {
  console.error(`Error: ${err}`);
});

if (playerInfo) {
  console.log(playerInfo);
} else console.log("Player not found!");
```
Get player stats:
```JS
const coralmc = require("coralmc");

const playerStats = await coralmc.getPlayerStats("Feryzz").catch((err) => {
  console.error(`Error: ${err}`);
});

if (playerStats) {
  console.log(playerStats.bedwars);
  console.log(playerStats.kitpvp);
} else console.log("Player not found!");
```