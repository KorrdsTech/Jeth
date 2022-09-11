import { Command } from "@/structures";

export default new Command({
  name: "ping",
  description: "Veja o ping do bot",

  run(client, interaction) {
    const start = Date.now();
    interaction.reply("Pong!").then(() => {
      const r = start - Date.now();
      interaction.editReply(`Pong! Estou com ${r}ms`);
    });
  },
});
