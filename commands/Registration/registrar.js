const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
moment.locale('pt-br')

module.exports = class Registrar extends Command {
    constructor(name, client) {
        super(name, client)

        this.aliases = ['register', 'r']
        this.category = 'Registration'
        this.subcommandsOnly = false
    }

    async run(message, args) {
        let guildDocument = await this.client.database.Guilds.findById(message.guild.id)
            .then(guildTable => {
                let member = message.mentions.members.first();
                if (!member) {
                    return message.reply("Mencione o usuário que deseja registrar!").catch(() => { });
                }
                let hit = guildTable.registradores.some(registrador => {
                    return registrador.membrosRegistrados.some(membro => membro._id === member.id);
                });
                if (hit) {
                    return message.reply("Usuário já registrado").catch(() => { });
                }
                let masculino = message.guild.roles.cache.get(guildTable.masculino);
                let feminino = message.guild.roles.cache.get(guildTable.feminino);
                let nbinario = message.guild.roles.cache.get(guildTable.nbinario);
                if (!masculino || !feminino) {
                    return message.reply(`O comando não foi configurado, para ter mais informações digite ${guildTable.prefix}registro `).catch(() => { });
                }
                let masculinoCheck = member.roles.cache.has(guildTable.masculino);
                let femininoCheck = member.roles.cache.has(guildTable.feminino);
                let nBinarioCheck = member.roles.cache.has(guildTable.nbinario);
                if ((masculinoCheck && femininoCheck) || (masculinoCheck && nBinarioCheck) || (femininoCheck && nBinarioCheck)) {
                    return message.reply("O usuário possui mais de um cargo do registro (masculino, feminino e não binário), deixe um e tente novamente ").catch(() => { });
                } else if (!masculinoCheck && !femininoCheck && !nBinarioCheck) {
                    return message.reply(`**Registro incompleto!** Verifique se o mesmo possui a tag \`masculino\` ou \`feminino\` ou \`não binário\` em seu registro. `).catch(() => { });
                }
                let gender;
                if (masculinoCheck) gender = "M";
                if (femininoCheck) gender = "F";
                if (nBinarioCheck) gender = "N";
                if (guildTable.registradores.length < 1) {
                    guildTable.registradores[0] = {
                        _id: message.author.id,
                        membrosRegistrados: [{
                            _id: member.id,
                            genero: gender,
                            timestamp: message.createdTimestamp
                        }]
                    };
                } else {
                    let index = guildTable.registradores.findIndex(r => r._id === message.author.id);
                    if (index >= 0) {
                        let membersNum = guildTable.registradores[index].membrosRegistrados.length;
                        guildTable.registradores[index].membrosRegistrados[membersNum] = {
                            _id: member.id,
                            genero: gender,
                            timestamp: message.createdTimestamp
                        };
                    } else {
                        guildTable.registradores[guildTable.registradores.length] = {
                            _id: message.author.id,
                            membrosRegistrados: [{
                                _id: member.id,
                                genero: gender,
                                timestamp: message.createdTimestamp
                            }]
                        };
                    }
                }
                if (guildTable.registradores.length) {
                    var registradorID = "";
                    var timestamp = 0;
                    var registradores = guildTable.registradores;
                    for (let u = 0; u < registradores.length; ++u) {
                        let memberArr = registradores[u].membrosRegistrados;
                        for (let i = 0; i < memberArr.length; ++i) {
                            if (memberArr[i]._id === member.id) {
                                registradorID = registradores[u]._id;
                                timestamp = memberArr[i].timestamp;
                                u = registradores.length;
                                break;
                            }
                        }
                    }
                }
                guildTable.save()
                    .then(() => {
                        let novatoRole = message.guild.roles.cache.get(guildTable.novato);
                        if (novatoRole) {
                            member.roles.remove(novatoRole.id, "registro").catch(() => { });
                        }
                        let registradoRole = message.guild.roles.cache.get(guildTable.registrado);
                        if (registradoRole) {
                            member.roles.add(registradoRole.id, "registro").catch(() => { });
                        }//member.roles.map(role => role.name()).join(", ")
                        //message.guild.member(message.author).roles.map(r => r.name).join(', ');
                        var cargos = message.guild.member(member.id).roles.cache.map(r => r.name).join(', ');
                        //var cargos = message.guild.members.get(member.id).roles.map(role => role.name).join(', ');
                        const { MessageEmbed } = require("discord.js");
                        let canal = message.guild.channels.cache.get(guildTable.channelRegister)
                        if (!canal) canal = message.channel;
                        let embedSv = new MessageEmbed()
                            .setAuthor(`Registrador(a): ${message.author.username}`, message.author.displayAvatarURL)
                            .setDescription(`${message.author} você registrou o usuário(a) ${member} com sucesso.`)
                            .setFooter('Depois desse registro cairia bem um bolo né? 🍰')
                            .setColor(colors.default);
                        canal.send(embedSv).catch(() => { });
                        message.reply('<:concludo:739830713792331817> **|** Usuário registrado com sucesso.').then(msg => { msg.delete({ timeout: 5000 }) })
                        let embedDM1 = new MessageEmbed()
                            .setTitle(`${message.guild.name} | Notificação Registro`)
                            .setDescription(`<:registroeyey:739837234097684582> **Você foi registrado(a) por ${message.author}, no Servidor: __${member.guild.name}__.\n` + `Caso não tenha se registrado por essa pessoa, entre em contato com <@${message.guild.owner.id}>.**`)
                            .addField(`Cargos Recebidos`, `\`\`\`\n${cargos.replace('@everyone, ', '' && '@here, ', '')}\`\`\``, false)
                            .addField("Data do registro:", `\`\`\`\n${moment(timestamp).format("LL")}\`\`\``, false)
                            .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
                            .setFooter('Depois desse registro cairia bem um bolo né? 🍰')
                            .setColor(colors.default)
                        let embedDM2 = new MessageEmbed()
                            .setDescription(`<a:j_geminha:739837960924430408> **Olá! Gostou da Jeth? quer saber de novidades diárias , sempre está atualizado sobre novos comandos! entre no [suporte](https://discord.gg/h9JHf73)**`)
                            .setColor(colors.default)
                        member.send(embedDM1).catch(() => { });
                        member.send(embedDM2).catch(() => { });

                    })
                    .catch(console.error);
            })
            .catch(console.error);
    }
}