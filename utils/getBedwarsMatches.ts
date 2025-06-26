import type { Options, ApiError } from "../types/Common";
import type { BedwarsMatch } from "../types/Bedwars";
import { getHeaders, isUsernameValid } from "./common";

export default async function getBedwarsMatches(
  username: string,
  options?: Options
): Promise<BedwarsMatch[] | ApiError> {
  if (!isUsernameValid(username)) {
    return {
      message: "Invalid username format",
    };
  }

  try {
    const data = await fetch(
      `https://www.coralmc.it/api/v1/stats/bedwars/${username}/matches`,
      {
        ...getHeaders(options),
      }
    );

    const json = await data.json();

    if ("message" in json) {
      return json as ApiError;
    }

    return json as BedwarsMatch[];
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
