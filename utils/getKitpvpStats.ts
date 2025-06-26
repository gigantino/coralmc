import type { Options, ApiError } from "../types/Common";
import type { KitpvpStats } from "../types/Kitpvp";
import { getHeaders, isUsernameValid } from "./common";

export default async function getKitpvpStats(
  username: string,
  options?: Options
): Promise<KitpvpStats | ApiError> {
  if (!isUsernameValid(username)) {
    return {
      message: "Invalid username format",
    };
  }

  try {
    const data = await fetch(
      `https://www.coralmc.it/api/v1/stats/kitpvp/${username}`,
      {
        ...getHeaders(options),
      }
    );

    const json = await data.json();

    if ("message" in json) {
      return json as ApiError;
    }

    return json as KitpvpStats;
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
