import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    console.log("Please provide a location area name.");
    return;
  }

  const name = args[0];

  console.log(`Exploring ${name}...`);

  const result = await state.pokeapi.fetchLocation(name);

  console.log("Found Pokemon:");

  for (const encounter of result.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}
