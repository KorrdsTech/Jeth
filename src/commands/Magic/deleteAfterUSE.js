const { Command } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class deleteAfterUSE extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'deleteAfterUSE'
    this.aliases = ['takk']
    this.category = 'Magic'
    this.adminOnly = true
  }

  async run(message) {
    const embed = new MessageEmbed()
      .setColor('#00b9ff')
      .setDescription('**REGRAS DO SERVIDOR** \n <:dot:1040807881248882688> *Irritar ou provocar outros membros do servidor é proibido, nós estamos aqui para conversar e se divertir, e não para ficar aturando pessoas babacas.* \n<:dot:1040807881248882688> *Qualquer material nocivo (vírus, imagens / links pornográficos, links para servidores Discord que envolvam o acima mencionado, etc.)* **resulta em um banimento imediato e permanente.** \n <:dot:1040807881248882688> *Tentar causar desordem (tentar atiçar as pessoas para brigarem, contar spoilers, brigar por política, criar contas fakes, evasão de ban, etc) ou toxicidade (usar palavras de baixo calão desnecessariamente, etc) no servidor é proibido.* \n <:dot:1040807881248882688> \n <:dot:1040807881248882688> *Evite o uso de CAIXA ALTA (caps lock) desnecessário, usar para realçar algo em momentos apropriados é permitido, mas ficar escrevendo em caixa alta apenas para chamar a atenção é proibido.* \n <:dot:1040807881248882688> *Não é permitido divulgar conteúdos sem que a equipe permita, isto inclui divulgar via mensagem direta para outras pessoas e no seu nome/nickname. Enviar spam para pessoas aleatórias* **é contra os termos de uso do Discord e a sua conta pode ser suspensa por fazer isto!** \n <:dot:1040807881248882688> *os nomes de usuário / apelidos devem ser caracteres latinos e apenas números (A-Z / 0-9). Eles não devem conter Zalgo, nomes em branco, unicode incomum, opiniões políticas, nomes que buscam atenção, nomes muito extensos, calúnias ou qualquer outro material ofensivo. Os usuários que violarem essa regra terão seus nomes alterados e avisados ​​em um DM.* \n <:dot:1040807881248882688> **Ofender as pessoas baseando-se em uma generalização não é legal, é ser um babaca que se baseia em estereótipos! (Exemplo: Falar `Fortnite é ruim` é permitido, pois é a sua opinião. Mas falar `Quem joga Fortnite é idiota` não, você está generalizando um grupo de pessoas e ofendendo elas só porque elas gostam de um jogo. Lembre-se: Se você está xingando um grupo de pessoas que gosta de algo sendo que esse algo não afeta a sua vida e não está machucando ninguém, quer dizer que você é um babaca!)**')
      .setThumbnail('https://canary.discord.com/channels/@me/932044801187143690/1040804597532467200')

    message.reply({ embeds: [embed] })
  }
}