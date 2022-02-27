module.exports = class Collection {
  constructor(model) {
    this.model = model
  }

  async findOneById(id) {
    return await this.model.findOne({ id })
  }

  async getOrCreate(id, defaultValues) {
    const data = await this.findOneById(id)
    if (!data) {
      this.model({ id, defaultValues }).save()
    }

    return data
  }

  async getAndDelete(id) {
    const data = await this.findOneById(id)
    if (!data) return undefined

    return this.model.findByIdAndDelete(id)
  }
}