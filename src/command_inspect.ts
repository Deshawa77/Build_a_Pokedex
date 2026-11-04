import type { State } from "./state.js";

export type Inspect = {
  name: string;
  height: number;
  weight: number;
  stats: {
    name: string;
    value: number;
  }[];
  types: string[];
};

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
  if (args.length === 0) {
    console.log("Please provide a pokemon name.");
    return;
  } else {
    const name = args[0]
    const result = state.pokedex[name];

    if (result === undefined) {
      console.log(`You have not caught that pokemon`);
      return;
    }

    console.log(`Name: ${result.name}`);
    console.log(`Height: ${result.height}`);
    console.log(`Weight: ${result.weight}`);

    console.log("Stats:");
    for (const stat of result.stats) {
      console.log(`  - ${stat.stat.name}: ${stat.base_stat}`);
    }

    console.log("Types:");
    for (const type of result.types) {
      console.log(`  - ${type.type.name}`);
    }
  }

}
