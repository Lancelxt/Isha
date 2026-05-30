import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';
import { 
  fetchPosts, 
  fetchCategories 
} from '@/services/wordpress';
import BlogView from './BlogView';

export const metadata = {
  title: 'Blog & Insights | ISHA Signage Studio',
  description: 'Explore the latest trends, guides, and updates in architectural 3D signage, neon displays, brand design, and spatial styling.',
};

export default async function BlogPage(props: {
  searchParams: Promise<{
    category?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const resolvedSearchParams = await props.searchParams;
  const activeCategoryId = resolvedSearchParams.category ? Number(resolvedSearchParams.category) : undefined;
  const searchQuery = resolvedSearchParams.search || undefined;
  const currentPage = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1;

  // Fetch in parallel on the server
  const [posts, categories] = await Promise.all([
    fetchPosts({
      category: activeCategoryId,
      search: searchQuery,
      page: currentPage,
      perPage: 12
    }),
    fetchCategories()
  ]);

  return (
    <>
      <Header />
      <main className="section-light gradient-mesh" style={{ minHeight: '100vh', paddingTop: '8.5rem' }}>
        <BlogView 
          posts={posts} 
          categories={categories} 
          activeCategoryId={activeCategoryId}
          searchQuery={searchQuery}
        />
      </main>
      <Footer />
    </>
  );
}
