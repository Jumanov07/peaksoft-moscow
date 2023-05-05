/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   images: {
      domains: ['peaksoft-web-backend.s3.eu-central-1.amazonaws.com'],
   },

   experimental: {
      outputStandalone: true,
   },
   generateEtags: false,
   // assetPrefix: 'https://peaksoft.house',
}

module.exports = nextConfig
