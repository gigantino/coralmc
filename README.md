# CoralMC

A [Node.js](https://nodejs.org/en)/[Bun](https://bun.sh) module that allows you to interact with the [CoralMC](https://coralmc.it/) API.

> **Warning**
> CoralMC's API is still in alpha and isn't documented. In the future an access token is going to be required. At the current state, it isn't recommended for production usage as it could stop working at any point.

## Installation

```sh
# npm
npm i coralmc
# yarn
yarn add coralmc
# pnpm
pnpm add coralmc
# Bun
bun add coralmc
```

## Quick Start

```js
const coralmc = require("coralmc");

// Get basic player information
const playerInfo = await coralmc.getPlayerInfo("Feryzz");
console.log(playerInfo);
// {
//   username: "Feryzz",
//   joinDate: 1619287419000,
//   lastSeen: 1750958715000,
//   isOnline: false,
//   isBanned: false,
//   isStaff: false,
//   isVip: true
// }
```

## API Reference

### Player Information

#### `getPlayerInfo(username)`

Get basic player information including join date, last seen, online status, and permissions.

```js
const playerInfo = await coralmc.getPlayerInfo("Feryzz");

if (playerInfo.message) {
  console.log("Error:", playerInfo.message); // "User not found"
} else {
  console.log(
    `${playerInfo.username} joined on ${new Date(playerInfo.joinDate)}`
  );
  console.log(`Last seen: ${new Date(playerInfo.lastSeen)}`);
  console.log(`Online: ${playerInfo.isOnline}`);
  console.log(`VIP: ${playerInfo.isVip}`);
}
```

#### `getPlayerSearchCompletion(searchTerm)`

Search for players by username (minimum 3 characters).

```js
const suggestions = await coralmc.getPlayerSearchCompletion("Fery");

if (suggestions.message) {
  console.log("Error:", suggestions.message);
} else {
  console.log("Suggestions:", suggestions);
  // ["Feryzz", "Feryzzz", "Feryzzzz", ...]
}
```

### Bedwars Statistics

#### `getBedwarsStats(username)`

Get comprehensive Bedwars statistics for a player.

```js
const bedwarsStats = await coralmc.getBedwarsStats("Feryzz");

if (bedwarsStats.message) {
  console.log("Error:", bedwarsStats.message);
} else {
  console.log(`Level: ${bedwarsStats.level}`);
  console.log(`Wins: ${bedwarsStats.wins}`);
  console.log(`Losses: ${bedwarsStats.losses}`);
  console.log(`K/D Ratio: ${bedwarsStats.kills}/${bedwarsStats.deaths}`);
  console.log(`Current Winstreak: ${bedwarsStats.winstreak}`);
  console.log(`Highest Winstreak: ${bedwarsStats.h_winstreak}`);
  console.log(`Beds Broken: ${bedwarsStats.beds_broken}`);
  console.log(`Coins: ${bedwarsStats.coins}`);
  console.log(`Clan: ${bedwarsStats.clan_name || "None"}`);
}
```

#### `getBedwarsMatches(username)`

Get a list of recent Bedwars matches for a player.

```js
const matches = await coralmc.getBedwarsMatches("Feryzz");

if (matches.message) {
  console.log("Error:", matches.message);
} else {
  matches.forEach((match) => {
    console.log(`Match ${match.match_id}:`);
    console.log(`  Arena: ${match.arena_name}`);
    console.log(`  Type: ${match.match_type_name}`);
    console.log(`  Team: ${match.player_team_name}`);
    console.log(`  Result: ${match.match_outcome}`);
    console.log(
      `  Duration: ${Math.floor(match.match_duration_seconds / 60)}m ${
        match.match_duration_seconds % 60
      }s`
    );
    console.log(`  Date: ${new Date(match.match_start)}`);
    console.log("---");
  });
}
```

#### `getBedwarsMatch(matchId)`

Get detailed information about a specific Bedwars match.

```js
const matchDetail = await coralmc.getBedwarsMatch(4663301);

if (matchDetail.message) {
  console.log("Error:", matchDetail.message);
} else {
  console.log(`Match ${matchDetail.match_id} Details:`);
  console.log(`Arena: ${matchDetail.arena_name}`);
  console.log(`Type: ${matchDetail.type_name}`);
  console.log(`Duration: ${matchDetail.duration_seconds}s`);
  console.log(`Winner: ${matchDetail.winning_team_name}`);
  console.log(`Start: ${matchDetail.start_time}`);
  console.log(`End: ${matchDetail.end_time}`);

  console.log("\nPlayer Statistics:");
  matchDetail.per_player_stats.forEach((player) => {
    console.log(`${player.username} (${player.team_name}):`);
    console.log(`  Kills: ${player.kills}, Final Kills: ${player.final_kills}`);
    console.log(`  Deaths: ${player.deaths}`);
    console.log(`  Beds Broken: ${player.beds_broken}`);
    console.log(`  Score: ${player.score}`);
    console.log(`  K/D: ${player.kd}`);
    console.log("---");
  });
}
```

#### `getBedwarsLeaderboard(type)`

Get Bedwars leaderboards. Available types: `"winstreak"`, `"highest-winstreak"`, `"wins"`, `"kills"`, `"beds"`.

```js
// Get current winstreak leaderboard
const winstreakLb = await coralmc.getBedwarsLeaderboard("winstreak");

console.log("Current Winstreak Leaderboard:");
winstreakLb.slice(0, 10).forEach((player, index) => {
  console.log(
    `${index + 1}. ${player.username} - ${player.stats.winstreak} wins`
  );
});

// Get highest winstreak leaderboard
const highestWinstreakLb = await coralmc.getBedwarsLeaderboard(
  "highest-winstreak"
);

console.log("\nHighest Winstreak Leaderboard:");
highestWinstreakLb.slice(0, 10).forEach((player, index) => {
  console.log(
    `${index + 1}. ${player.username} - ${player.stats.highestWinstreak} wins`
  );
});

// Get wins leaderboard
const winsLb = await coralmc.getBedwarsLeaderboard("wins");

console.log("\nWins Leaderboard:");
winsLb.slice(0, 10).forEach((player, index) => {
  console.log(`${index + 1}. ${player.username} - ${player.stats.wins} wins`);
});
```

### KitPvP Statistics

#### `getKitpvpStats(username)`

Get KitPvP statistics for a player.

```js
const kitpvpStats = await coralmc.getKitpvpStats("Feryzz");

if (kitpvpStats.message) {
  console.log("Error:", kitpvpStats.message);
} else {
  console.log(`Balance: ${kitpvpStats.balance}`);
  console.log(`Kills: ${kitpvpStats.overall_kills}`);
  console.log(`Deaths: ${kitpvpStats.overall_deaths}`);
  console.log(`Current Killstreak: ${kitpvpStats.overall_killstreak}`);
  console.log(`Highest Killstreak: ${kitpvpStats.overall_max_killstreak}`);
  console.log(`Current Bounty: ${kitpvpStats.bounty}`);
  console.log(`Highest Bounty: ${kitpvpStats.max_bounty}`);
  console.log(`Gang: ${kitpvpStats.gang_name || "None"}`);
  console.log(`Gang Rank: ${kitpvpStats.gang_rank_name || "None"}`);
}
```

## Error Handling

All functions return either the expected data or an `ApiError` object with a `message` property:

```js
const result = await coralmc.getBedwarsStats("nonexistentuser");

if (result.message) {
  // Handle error
  console.log("Error:", result.message); // "User not found"
} else {
  // Handle success
  console.log("Stats:", result);
}
```

## Advanced Usage Examples

### Track Player Progress

```js
async function trackPlayerProgress(username) {
  const [playerInfo, bedwarsStats, kitpvpStats] = await Promise.all([
    coralmc.getPlayerInfo(username),
    coralmc.getBedwarsStats(username),
    coralmc.getKitpvpStats(username),
  ]);

  if (playerInfo.message || bedwarsStats.message || kitpvpStats.message) {
    console.log("One or more requests failed");
    return;
  }

  console.log(`=== ${username}'s Progress Report ===`);
  console.log(`Last Online: ${new Date(playerInfo.lastSeen)}`);
  console.log(`VIP Status: ${playerInfo.isVip ? "Yes" : "No"}`);

  console.log("\nBedwars Stats:");
  console.log(
    `Level: ${bedwarsStats.level} (Rank: #${bedwarsStats.level_rank})`
  );
  console.log(
    `Win Rate: ${((bedwarsStats.wins / bedwarsStats.played) * 100).toFixed(1)}%`
  );
  console.log(`Current Winstreak: ${bedwarsStats.winstreak}`);

  console.log("\nKitPvP Stats:");
  console.log(
    `K/D Ratio: ${(
      kitpvpStats.overall_kills / Math.max(kitpvpStats.overall_deaths, 1)
    ).toFixed(2)}`
  );
  console.log(`Balance: ${kitpvpStats.balance} coins`);
  console.log(`Current Bounty: ${kitpvpStats.bounty}`);
}
```

### Analyze Recent Matches

```js
async function analyzeRecentMatches(username, matchCount = 10) {
  const matches = await coralmc.getBedwarsMatches(username);

  if (matches.message) {
    console.log("Error:", matches.message);
    return;
  }

  const recentMatches = matches.slice(0, matchCount);
  const wins = recentMatches.filter((m) => m.match_outcome === "Win").length;
  const winRate = (wins / recentMatches.length) * 100;

  console.log(`=== ${username}'s Last ${matchCount} Matches ===`);
  console.log(
    `Win Rate: ${winRate.toFixed(1)}% (${wins}/${recentMatches.length})`
  );

  const arenaStats = {};
  recentMatches.forEach((match) => {
    arenaStats[match.arena_name] = (arenaStats[match.arena_name] || 0) + 1;
  });

  console.log("\nMost Played Arenas:");
  Object.entries(arenaStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .forEach(([arena, count]) => {
      console.log(`${arena}: ${count} matches`);
    });
}
```

### Search and Compare Players

```js
async function comparePlayers(searchTerm) {
  const suggestions = await coralmc.getPlayerSearchCompletion(searchTerm);

  if (suggestions.message || suggestions.length === 0) {
    console.log("No players found");
    return;
  }

  console.log(`Found ${suggestions.length} players matching "${searchTerm}":`);

  for (const username of suggestions.slice(0, 5)) {
    const [playerInfo, bedwarsStats] = await Promise.all([
      coralmc.getPlayerInfo(username),
      coralmc.getBedwarsStats(username),
    ]);

    if (!playerInfo.message && !bedwarsStats.message) {
      console.log(`\n${username}:`);
      console.log(`  Level: ${bedwarsStats.level}`);
      console.log(`  Wins: ${bedwarsStats.wins}`);
      console.log(`  Winstreak: ${bedwarsStats.winstreak}`);
      console.log(`  Online: ${playerInfo.isOnline ? "Yes" : "No"}`);
    }
  }
}
```

## TypeScript Support

This package includes full TypeScript support with proper type definitions:

```ts
import {
  getBedwarsStats,
  getPlayerInfo,
  BedwarsStats,
  PlayerInfoResponse,
  ApiError,
} from "coralmc";

const stats: BedwarsStats | ApiError = await getBedwarsStats("Feryzz");
const info: PlayerInfoResponse | ApiError = await getPlayerInfo("Feryzz");
```
