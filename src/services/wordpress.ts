export interface WPPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
      media_details?: {
        width: number;
        height: number;
        sizes?: Record<string, { source_url: string; width: number; height: number }>;
      };
    }>;
    'wp:term'?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
    author?: Array<{
      id: number;
      name: string;
      url: string;
      description: string;
      avatar_urls?: Record<string, string>;
    }>;
  };
}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
}

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'http://localhost:8080';
const API_URL = `${WORDPRESS_URL}/wp-json/wp/v2`;

/**
 * Extracts the featured image URL from the embedded resources
 */
export function getFeaturedImageUrl(post: WPPost): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (media?.source_url) {
    return media.source_url;
  }
  // Safe fallback to a stunning abstract design/architectural placeholder
  return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
}

/**
 * Extracts categories from the embedded resources
 */
export function getPostCategories(post: WPPost): Array<{ id: number; name: string; slug: string }> {
  const terms = post._embedded?.['wp:term'];
  if (!terms) return [];
  
  // Terms usually contains an array of arrays where categories are the first index
  const categoriesList = terms.flat().filter(term => term.taxonomy === 'category');
  return categoriesList.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug
  }));
}

/**
 * Extracts the author name from the embedded resources
 */
export function getPostAuthor(post: WPPost): string {
  const author = post._embedded?.author?.[0];
  return author?.name || 'ISHA Designer';
}

/**
 * Extracts a reading time estimate based on content word count
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const cleanContent = content.replace(/<\/?[^>]+(>|$)/g, ''); // strip HTML tags
  const words = cleanContent.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export async function fetchPosts(params: {
  category?: number;
  search?: string;
  page?: number;
  perPage?: number;
} = {}): Promise<WPPost[]> {
  const { category, search, page = 1, perPage = 12 } = params;
  
  const url = new URL(`${API_URL}/posts`);
  url.searchParams.append('_embed', 'true');
  url.searchParams.append('page', String(page));
  url.searchParams.append('per_page', String(perPage));
  
  if (category) {
    url.searchParams.append('categories', String(category));
  }
  
  if (search) {
    url.searchParams.append('search', search);
  }

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 } // Cache and revalidate every 60 seconds
    });
    
    if (!res.ok) {
      console.error(`WordPress API Error: ${res.statusText}`);
      return [];
    }
    
    return await res.json() as WPPost[];
  } catch (error) {
    console.error('Failed to fetch posts from headless WordPress:', error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  const url = new URL(`${API_URL}/posts`);
  url.searchParams.append('slug', slug);
  url.searchParams.append('_embed', 'true');

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error(`WordPress API Error: ${res.statusText}`);
      return null;
    }

    const posts = await res.json() as WPPost[];
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(`Failed to fetch post with slug ${slug}:`, error);
    return null;
  }
}

export interface WPMedia {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  source_url: string;
  media_details?: {
    width: number;
    height: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export async function fetchCategories(): Promise<WPCategory[]> {
  try {
    const res = await fetch(`${API_URL}/categories?hide_empty=true&per_page=20`, {
      next: { revalidate: 300 } // Cache categories longer (5 minutes)
    });

    if (!res.ok) {
      return [];
    }

    return await res.json() as WPCategory[];
  } catch (error) {
    console.error('Failed to fetch categories from headless WordPress:', error);
    return [];
  }
}

export async function fetchMedia(params: {
  page?: number;
  perPage?: number;
} = {}): Promise<WPMedia[]> {
  const { page = 1, perPage = 20 } = params;
  
  const url = new URL(`${API_URL}/media`);
  url.searchParams.append('page', String(page));
  url.searchParams.append('per_page', String(perPage));

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 } // Cache media for 1 minute
    });

    if (!res.ok) {
      console.error(`WordPress Media API Error: ${res.statusText}`);
      return [];
    }

    return await res.json() as WPMedia[];
  } catch (error) {
    console.error('Failed to fetch media from headless WordPress:', error);
    return [];
  }
}

