
import type { State } from "./state.js";

export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
};

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    console.log("Please provide a Pokemon name.");
    return;

  } else {
    const name = args[0];

    console.log(`Throwing a Pokeball at ${name}...`);

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      console.log(`Could not find Pokemon: ${name}`);
      return;
    }

    const pokemon: Pokemon = await response.json();

    const baseExperience = pokemon.base_experience ?? 0;

    // Higher base experience means a lower catch chance.
    const catchChance = Math.max(0, 1 - baseExperience / 300);

    const randomNumber = Math.random();

    if (randomNumber < catchChance) {
      console.log(`${name} was caught!`);
      state.pokedex[name] = pokemon;
    } else {
      console.log(`${name} escaped!`);
    }
  }
}
