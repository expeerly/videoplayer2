/** @type {import('next-sitemap').IConfig} */

const isProduction = process.env.VERCEL_ENV == 'production';

module.exports = {
  siteUrl: process.env.SITEBASEURL || 'https://www.expeerly.com',
  changefreq: 'always',
  sitemapBaseFileName: 'sitemap_index',
  generateRobotsTxt: true,
  exclude: ['/sitemap-video.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.SITEBASEURL}/sitemap-video.xml`,
      `${process.env.SITEBASEURL}/sitemap.xml`,
    ],
    policies: [
      {
        userAgent: '*',
        allow: isProduction ? '/' : '',
        disallow: isProduction ? '' : '/',
      },
    ],
  },
};
