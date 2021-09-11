module.exports = class Command {
  constructor(options) {
    options = {
      name: options.name,
      aliases: options.aliases || [],
      category: options.category,
      permissions: options.permissions || [],
      dev: options.dev || false
    }
  }
}