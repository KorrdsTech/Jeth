import {
  ApplicationCommandOptionData,
  ChatInputCommandInteraction,
  PermissionResolvable,
} from "discord.js";
import { ModeradoraClient } from "@";

type CommandData = {
  name: string;
  description: string;
  options?: ApplicationCommandOptionData[];
  permissions?: PermissionResolvable[];

  run: (client: ModeradoraClient, interaction: ChatInputCommandInteraction) => void;
};

export default class Command {
  constructor(public data: CommandData) {}

  run(client: ModeradoraClient, interaction: ChatInputCommandInteraction) {
    this.data.run(client, interaction);
  }
}
