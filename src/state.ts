import { createInterface, type Interface } from "readline";
import { getCommands } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";
import type { Pokemon } from "./command_catch.js";

const pokeAPI = new PokeAPI();

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  pokedex: Record<string, Pokemon>,
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;

};

export function initState(): State {
  const result: State = {
    readline: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "pokedex >",
    }),
    commands: getCommands(),
    pokeapi: pokeAPI,
    pokedex: {},
    nextLocationsURL: null,
    prevLocationsURL: null,
  };

  return result;
}
