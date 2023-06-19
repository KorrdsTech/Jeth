module.exports = {
  getMember: function (message, toFind = '') {
    toFind = toFind.toLowerCase();

    let target = message.guild.members.cache.get(toFind);

    if (!target && message.mentions.members)
      target = message.mentions.members.first();

    if (!target && toFind) {
      target = message.guild.members.cache.find(member => {
        return (
          member.displayName.toLowerCase().includes(toFind) ||
          member.user.tag.toLowerCase().includes(toFind)
        );
      });
    }

    if (!target) target = message.member;

    return target;
  },

  formatDate: function (date) {
    return new Intl.DateTimeFormat('en-US').format(date);
  },

  promptMessage: async function (message, author, time, validReactions) {
    // We put in the time as seconds, with this it's being transferred to MS
    time *= 1000;

    // For every emoji in the function parameters, react in the correct order.
    for (const reaction of validReactions) await message.react(reaction);

    // Only allow reactions from the author,
    // and the emoji must be in the array we provided.
    const filter = (reaction, user) =>
      validReactions.includes(reaction.emoji.name) && user.id === author.id;

    // And of course, await the reactions
    try {
      const collected = await message.awaitReactions(filter, {
        max: 1,
        time: time,
        errors: ['time'],
      });
      return collected.first().emoji.name;
    } catch (error) {
      return null;
    }
  },
};
