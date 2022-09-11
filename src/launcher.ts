import Discord, {
  ChatInputCommandInteraction,
  Collection,
  Interaction,
  InteractionType
} from "discord.js";
import { version } from "../package.json";
import MongoDB from "./database/mongodb/MongoDB";
import Command from "./structures/command/Command";

export type ModeradoraClient = {
  database: MongoDB;
  commands: Collection<string, Command>;
} & Discord.Client<true>;

export const client = new Discord.Client<true>({
  intents: [Discord.GatewayIntentBits.Guilds],
}) as ModeradoraClient;

(function () {
  client.commands = new Discord.Collection();
  client.database = new MongoDB();
  client.database.connect();

  client.on("interactionCreate", (interaction: Interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand) {
      console.log(interaction.commandName);
      const command = client.commands.get(interaction.commandName ?? "");

      if (command) command.run(client, interaction as ChatInputCommandInteraction);
    }
  });

  client.on("ready", () => {
    console.log(`A ${client.user.username} está online agora!`);

    const statuse = [
      `🪧 Versão ${version}!`,
      "🏆 Anda perdido? Me mencione!",
      "🔑 Entre em contato para reportar qualquer bug.",
      "🎍 Desfrute de uma moderação a nível superior!",
      "👩‍🚀 Mais Comandos legais para Você!",
    ];
    setInterval(() => {
      const game = statuse[Math.floor(Math.random() * statuse.length)];
      client.user.setPresence({
        activities: [{ name: game }],
      });
    }, 20 * 1000); // Add 20 seconds to avoid over-updating.
  });

  client.login(process.env.token);
})();
