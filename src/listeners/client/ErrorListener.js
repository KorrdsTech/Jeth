module.exports = {
  name: 'error',
  exec: (client, error) => {
    console.error(error.message)
  }
}