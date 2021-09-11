module.exports = class ErrorListener {
  constructor() {
    this.name = 'error'
  }

  exec(client, error) {
    console.error(error.message)
  }
}