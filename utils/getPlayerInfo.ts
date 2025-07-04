import type { Options, ApiError } from "../types/Common";
import type { PlayerInfoResponse } from "../types/Player";
import { getHeaders, isUsernameValid } from "./common";

export default async function getPlayerInfo(
  username: string,
  options?: Options
): Promise<PlayerInfoResponse | ApiError | undefined> {
  if (!isUsernameValid(username)) return undefined;

  try {
    const data = await fetch(
      `https://www.coralmc.it/api/v1/stats/player/${username}`,
      {
        ...getHeaders(options),
      }
    );

    const json = await data.json();

    if ("message" in json) {
      return json as ApiError;
    }

    return json as PlayerInfoResponse;
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
