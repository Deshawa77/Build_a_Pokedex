import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js"
import type { CLICommand } from "./registry.js";
import type { State } from "./state.js";
import { commandExplore } from "./command_explore.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the next 20 location areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 location areas",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "explore a certain location",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Throw a ball at a pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Display stats and type(s) of the Pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Display the names of every pokemon that was caught",
      callback: commandPokedex,
    },
  };
}

export async function startREPL(state: State) {
  const { readline, commands } = state;

  readline.prompt();

  readline.on("line", async (input) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      readline.prompt();
      return;
    }

    const command = commands[words[0]];
    const args = words.slice(1);

    try {
      if (command) {
        await command.callback(state, ...args);
      } else {
        console.log("Unknown command");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    if (words[0] !== "exit") {
      readline.prompt();
    }
  });
}
