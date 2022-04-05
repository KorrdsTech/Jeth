module.exports = class Collection {
  constructor(model) {
    this.model = model
  }

  async findOneById(_id) {
    return await this.model.findOne({ _id })
  }

  async getOrCreate(_id, defaultValues) {
    const data = await this.findOneById(_id)
    if (!data) {
      this.model({ _id, ...defaultValues }).save()
    }

    return data
  }

  async getAndDelete(id) {
    const data = await this.findOneById(id)
    if (!data) return undefined

    return this.model.findByIdAndDelete(id)
  }
}