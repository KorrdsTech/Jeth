const { Command, colors } = require('../../utils')
const Discord = require("discord.js");
var Jimp = require('jimp');

module.exports = class ship extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['ship', 'shipar']
        this.category = 'Entertainment'
    }
    async run(message, args, buffer) {
        let guildDocument = await this.client.database.Guilds.findById(message.guild.id)
        if (!guildDocument) {
            this.client.database.Guilds({
                _id: message.guild.id
            }).save()
        }
        message.reply(`Gerando o ship!`).then(msg => { msg.delete({ timeout: 7000 }) })
        try {

            var mention_1 = args[0];
            var mention_2 = args[1];

            if (!mention_1 || !mention_2) {
                message.channel.send(`${message.author}, Informe os parâmetros corretamente \`${guildDocument.prefix}ship @mention + @mention\``);
                return;
            }

            var mention_tratado = mention_1.replace('<', '').replace('>', '').replace('@', '').replace('!', '');
            var mention_tratado_2 = mention_2.replace('<', '').replace('>', '').replace('@', '').replace('!', '');
            var username_ship_1 = message.guild.member(mention_tratado || message.guild.members.get(args[0]));
            var username_ship_2 = message.guild.member(mention_tratado_2 || message.guild.members.get(args[1]));

            if (username_ship_1 === null || username_ship_2 === null) {
                message.channel.send(`${message.author}, Informe os parâmetros corretamente \`${guildDocument.prefix}ship @mention + @mention\``);
                return;
            }

            var random_ship = Math.floor((Math.random() * 100) + 1);

            var imagens_ships = [
                'https://i.imgur.com/y7qZQS3.png',
                'https://images.emojiterra.com/twitter/v11/512px/2764.png',
                'https://images.emojiterra.com/google/android-pie/512px/1f494.png'
            ];

            var valor_img = 0;

            var username_shippado_1 = username_ship_1.cache.substring(4, 0);

            var username_shippado_2 = username_ship_2.cache.substring(4, 8);

            var shipps = username_shippado_1 + username_shippado_2;

            if (1 < random_ship && random_ship <= 20) valor_img = 2;
            else if (20 < random_ship && random_ship <= 50) valor_img = 1;
            else if (50 < random_ship && random_ship <= 100) valor_img = 0;

            let mensagem = `Vamos consultar o Cupido!\n`;

            if (random_ship > 1 && random_ship <= 15) {
                mensagem += `***${random_ship}%*** \`[█..........]\`\n` +
                    `\`${username_ship_1.message.author} + ${username_ship_2.message.author} = ${shipps}\`\n` +
                    `Relaxa, existem outros peixes no cosmo! Não, pera.`;
            }
            if (random_ship > 15 && random_ship <= 20) {
                mensagem += `***${random_ship}%*** \`[██.........]\`\n` +
                    `\`${username_ship_1.message.author} + ${username_ship_2.message.author} = ${shipps}\`\n` +
                    `É, pelo visto vocês não seriam um bom casal. :/`;
            }
            if (random_ship > 20 && random_ship <= 30) {
                mensagem += `***${random_ship}%*** \`[███........]\`\n` +
                    `\`${username_ship_1.message.author} + ${username_ship_2.message.author} = ${shipps}\`\n` +
                    `Famosa friend zone`;
            }
            if (random_ship > 30 && random_ship <= 40) {
                mensagem += `***${random_ship}%*** \`[████.......]\`\n` +
                    `\`${username_ship_1.message.author} + ${username_ship_2.message.author} = ${shipps}\`\n` +
                    `Olha olha colega, vou até mandar uma cantada ` +
                    `"Garota, é mais fácil o Vasco não ser rebaixado do que eu te abandonar.":heart:`;
            }
            if (random_ship > 40 && random_ship <= 50) {
                mensagem += `***${random_ship}%*** \`[█████......]\`\n` +
                    `\`${username_ship_1.message.author} + ${username_ship_2.message.author} = ${shipps}\`\n` +
                    `Bom, pode correr atrás que um dia vocês estarão juntos... :heart: :smile:`;
            }
            if (random_ship > 50 && random_ship <= 60) {
                mensagem += `***${random_ship}%*** \`[██████.....]\`\n` +
                    `\`${username_ship_1.message.author} + ${username_ship_2.message.author} = ${shipps}\`\n` +
                    `50/50 em.... :smiling_imp:`;
            }
            if (random_ship > 60 && random_ship <= 70) {
                mensagem += `***${random_ship}%*** \`[███████....]\`\n` +
                    `\`${username_ship_1.message.author} + ${username_ship_2.message.author} = ${shipps}\`\n` +
                    `Vocês podem ter uma bela relação juntos em uma amizade saudável`;
            }
            if (random_ship > 70 && random_ship <= 80) {
                mensagem += `***${random_ship}%*** \`[████████...]\`\n` +
                    `\`${username_ship_1.message.author} + ${username_ship_2.message.author} = ${shipps}\`\n` +
                    `Santa Atena! Vocês dois já deveriam estar juntos há tempo! :smile:`;
            }
            if (random_ship > 80 && random_ship <= 90) {
                mensagem += `***${random_ship}%*** \`[█████████..]\`\n` +
                    `\`${username_ship_1.message.author} + ${username_ship_2.message.author} = ${shipps}\`\n` +
                    `Só vai, nem precisa mais usar o comando. Só vai.`;
            }
            if (random_ship > 90 && random_ship <= 100) {
                mensagem += `***${random_ship}%*** \`[███████████]\`\n` +
                    `\`${username_ship_1.message.author} + ${username_ship_2.message.author} = ${shipps}\`\n` +
                    `Vocês foram unidos pelo cosmos! `;
            }

            Promise.all([
                Jimp.read('https://cdn.discordapp.com/attachments/533429245930766338/537795069021913108/b751abae3f1c59af.png'),
                Jimp.read(imagens_ships[valor_img]),
                Jimp.read(username_ship_1.user.displayAvatarURL({ format: "png" })),
                Jimp.read(username_ship_2.user.displayAvatarURL({ format: "png" }))
            ])
                .then(([image, imageTwo, imageThree, imageFour]) => {
                    imageTwo.resize(129, 129);
                    imageThree.resize(129, 129);
                    imageFour.resize(129, 129);
                    image.blit(imageTwo, 129, Jimp.HORIZONTAL_ALIGN_CENTER)
                        .blit(imageThree, Jimp.HORIZONTAL_ALIGN_LEFT, Jimp.HORIZONTAL_ALIGN_CENTER)
                        .blit(imageFour, 260, Jimp.HORIZONTAL_ALIGN_CENTER)
                        .quality(100).write('./ship.png');

                    message.reply(mensagem, { files: ['./ship.png'] });
                });

        } catch (error) {
            message.channel.send(`${message.author}, houve um erro ao executar este comando :frowning:, desculpe pela incoveniência estou reportando para o suporte!`);
            console.log(error);
        }
    }
}