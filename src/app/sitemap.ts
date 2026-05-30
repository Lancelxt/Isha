import { MetadataRoute } from 'next';
import { fetchPosts } from '@/services/wordpress';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ishasigns.com';

  // 1. Declare our static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/images`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // 2. Fetch all dynamic WordPress blog posts for indexing (up to 100 latest posts)
  try {
    const posts = await fetchPosts({ perPage: 100 });
    
    const dynamicRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      // Parse WordPress post date as last modification date
      lastModified: new Date(post.modified || post.date),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error('Sitemap dynamic generation failed, fallback to static routes:', error);
    return staticRoutes;
  }
}
