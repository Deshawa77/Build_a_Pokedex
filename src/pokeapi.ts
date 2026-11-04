
import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private readonly cache = new Cache(5 * 60 * 1000);

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fullURL = pageURL
      ? pageURL
      : `${PokeAPI.baseURL}/location-area`;

    if (this.cache.get<ShallowLocations>(fullURL) === undefined) {
      const response = await fetch(fullURL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result: ShallowLocations = await response.json();

      this.cache.add(fullURL, result);

      return result;
    } else {
      return this.cache.get<ShallowLocations>(fullURL)!.val;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;

    if (this.cache.get<Location>(fullURL) === undefined) {
      const response = await fetch(fullURL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result: Location = await response.json();

      this.cache.add(fullURL, result);

      return result;
    } else {
      return this.cache.get<Location>(fullURL)!.val;
    }
  }
}

export type PokemonEncounter = {
  pokemon: {
    name: string;
    url: string;
  };
  version_details: unknown[];
};

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: unknown[];
  location: {
    name: string;
    url: string;
  };
  names: unknown[];
  pokemon_encounters: PokemonEncounter[];
};
