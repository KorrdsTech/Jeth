module.exports = class Collection {
  constructor(model) {
    this.model = model
  }

  findByID(_id) {
    return this.findOne({ _id })
  }

  findOne(...args) {
    return this.model.findOne(...args)
  }

  async getOrCreate(_id, defaultValues = {}) {
    const data = await this.findByID(_id)
    if (!data) return this.model({ _id, ...defaultValues }).save()
    return data
  }

  async findAndDelete(_id) {
    const data = await this.findByID(_id)
    if (!data) return undefined
    return this.model.findOneAndDelete({ _id })
  }
}