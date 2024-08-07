export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/admin',
      },
      sitemap: `${process.env.WEBSITE_URL}/sitemap.xml`,
    }
  }