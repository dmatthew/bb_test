module.exports = {
  async rewrites() {
    return [
      {
        source: '/guid/:guid',
        destination: '/api/guid/:guid',
      },
    ]
  },
}