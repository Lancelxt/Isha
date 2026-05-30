import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';
import { 
  fetchPostBySlug, 
  fetchPosts, 
  getFeaturedImageUrl 
} from '@/services/wordpress';
import { notFound } from 'next/navigation';
import BlogPostView from './BlogPostView';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: BlogPostPageProps) {
  const { slug } = await props.params;
  const post = await fetchPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Article Not Found | ISHA Signage',
      description: 'The requested article could not be found.'
    };
  }

  // Strip HTML tags from excerpt for meta description
  const cleanExcerpt = post.excerpt.rendered
    .replace(/<\/?[^>]+(>|$)/g, '')
    .trim()
    .slice(0, 155) + '...';

  return {
    title: `${post.title.rendered} | ISHA Signage Journal`,
    description: cleanExcerpt,
    openGraph: {
      title: post.title.rendered,
      description: cleanExcerpt,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: getFeaturedImageUrl(post),
          width: 1200,
          height: 630,
          alt: post.title.rendered,
        }
      ],
    },
  };
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const { slug } = await props.params;
  
  // Parallel fetch: current post + latest posts for recommendation
  const post = await fetchPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const latestPosts = await fetchPosts({ perPage: 4 });
  // Filter out current post from recommendations
  const recommendedPosts = latestPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="section-light gradient-mesh" style={{ minHeight: '100vh', paddingTop: '8.5rem', paddingBottom: '6rem' }}>
        <BlogPostView post={post} recommendedPosts={recommendedPosts} />
      </main>
      <Footer />
    </>
  );
}
