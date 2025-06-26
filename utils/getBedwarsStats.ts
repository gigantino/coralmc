import type { Options, ApiError } from "../types/Common";
import type { BedwarsStats } from "../types/Bedwars";
import { getHeaders, isUsernameValid } from "./common";

export default async function getBedwarsStats(
  username: string,
  options?: Options
): Promise<BedwarsStats | ApiError> {
  if (!isUsernameValid(username)) {
    return {
      message: "Invalid username format",
    };
  }

  try {
    const data = await fetch(
      `https://www.coralmc.it/api/v1/stats/bedwars/${username}`,
      {
        ...getHeaders(options),
      }
    );

    const json = await data.json();

    if ("message" in json) {
      return json as ApiError;
    }

    return json as BedwarsStats;
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
