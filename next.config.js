const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
  async redirects() {
    return [
      {
        source: '/search',
        destination: '/',
        permanent: true,
      },
      {
        source: '/note',
        destination: '/',
        permanent: true,
      },
    ]
  },
})
