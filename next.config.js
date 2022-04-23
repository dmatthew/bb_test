module.exports = {
  async rewrites() {
    return [
      {
        source: '/guid/:guid',
        destination: '/api/guid/:guid',
      },
      {
        source: '/guids',
        destination: '/api/guids',
      },
    ]
  },
}