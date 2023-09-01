/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  sassOptions: {
    includePaths: ['./frontend'],
    prependData: `@import "styles/variables.scss";`,
  },
}

module.exports = nextConfig
