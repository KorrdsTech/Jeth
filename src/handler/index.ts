import { ApplicationCommandType } from "discord.js";
import fs from "fs";
import path, { resolve } from "path";
import { client } from "../";
import Command from "../structures/command/Command";

function getFiles(dir: string): string[] {
  const result: string[] = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullpath = path.resolve(dir, file);
    if (fs.lstatSync(fullpath).isDirectory()) {
      result.push(...getFiles(fullpath));
      return;
    }
    result.push(fullpath);
  });

  return result;
}

function registerCommands(path: string) {
  getFiles(resolve(path)).forEach(async (file) => {
    const command = (await import(file)).default as Command;
    const { data } = command;

    client.commands.set(data.name, command);

    client.once("ready", () => {
      client.application.commands.create({
        name: data.name,
        description: data.description,
        options: data.options ?? [],
        type: ApplicationCommandType.ChatInput,
        defaultMemberPermissions: data.permissions ?? [],
      });
    });
  });
}

(function () {
  registerCommands("src/commands");
})();
