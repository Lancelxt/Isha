'use client';

import { 
  WPPost, 
  WPCategory, 
  getFeaturedImageUrl, 
  getPostCategories, 
  getPostAuthor, 
  getReadingTime 
} from '@/services/wordpress';
import BlogSearch from './BlogSearch';
import Link from 'next/link';
import { Sparkles, FileText } from 'lucide-react';

interface BlogViewProps {
  posts: WPPost[];
  categories: WPCategory[];
  activeCategoryId?: number;
  searchQuery?: string;
}

export default function BlogView({ posts, categories, activeCategoryId, searchQuery }: BlogViewProps) {
  // Featured post logic: Pick the latest post if no filters are active
  const featuredPost = !activeCategoryId && !searchQuery && posts.length > 0 ? posts[0] : null;
  const regularPosts = featuredPost ? posts.slice(1) : posts;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container">
      
      {/* Blog Hero Heading */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span className="section-badge">DESIGN JOURNAL</span>
        <h1 style={{ marginBottom: '1.25rem' }}>
          ISHA <span className="glow-text">Insights</span>
        </h1>
        <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-secondary)' }}>
          Exploring the intersections of architectural 3D signage, custom lighting, modern typography, and spatial identity.
        </p>
      </div>

      {/* Search & Category Navigation Pill bar */}
      <BlogSearch 
        categories={categories} 
        activeCategoryId={activeCategoryId}
        initialSearch={searchQuery}
      />

      {/* Featured Spotlight Card */}
      {featuredPost && (
        <div style={{ marginBottom: '4.5rem' }}>
          <div 
            className="glass-card" 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              padding: '2.5rem',
              borderRadius: '32px',
              overflow: 'hidden',
              alignItems: 'center',
            }}
          >
            {/* Image Section */}
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              aspectRatio: '16/10',
              boxShadow: 'var(--shadow-sm)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={getFeaturedImageUrl(featuredPost)} 
                alt={featuredPost.title.rendered}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                background: 'var(--primary-orange)',
                color: '#FFFFFF',
                padding: '0.4rem 1rem',
                borderRadius: '50px',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}>
                <Sparkles size={13} /> FEATURED ARTICLE
              </div>
            </div>

            {/* Info Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <span>{formatDate(featuredPost.date)}</span>
                <span>•</span>
                <span>{getReadingTime(featuredPost.content.rendered)} min read</span>
              </div>
              
              <Link 
                href={`/blog/${featuredPost.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <h2 
                  style={{ 
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', 
                    lineHeight: 1.2,
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    color: 'var(--text-primary)',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-orange)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                  dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }}
                />
              </Link>

              <p 
                style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}
                dangerouslySetInnerHTML={{ 
                  __html: featuredPost.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 160) + '...' 
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: 'var(--primary-orange)',
                  fontSize: '0.9rem',
                }}>
                  {getPostAuthor(featuredPost).slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    {getPostAuthor(featuredPost)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Creative Lead
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <Link href={`/blog/${featuredPost.slug}`} className="btn-primary">
                  Read Spotlight Article
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular Posts Grid */}
      {posts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2.5rem',
          marginBottom: '6rem',
        }}>
          {regularPosts.map((post) => {
            const categoriesList = getPostCategories(post);
            const featuredImg = getFeaturedImageUrl(post);
            return (
              <article 
                key={post.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  padding: '1.25rem',
                  height: '100%',
                }}
              >
                {/* Image card wrapper */}
                <div style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  aspectRatio: '16/10',
                  marginBottom: '1.25rem',
                  position: 'relative',
                }}>
                  <Link href={`/blog/${post.slug}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={featuredImg} 
                      alt={post.title.rendered}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </Link>
                  
                  {categoriesList.length > 0 && (
                    <div style={{
                      position: 'absolute',
                      bottom: '0.75rem',
                      left: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(5px)',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--primary-orange)',
                      boxShadow: 'var(--shadow-sm)',
                    }}>
                      {categoriesList[0].name.toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Metadata & Title */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0 0.5rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    fontSize: '0.85rem', 
                    color: 'var(--text-muted)',
                    marginBottom: '0.75rem',
                  }}>
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{getReadingTime(post.content.rendered)} min read</span>
                  </div>

                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', flex: '0 0 auto' }}>
                    <h3 
                      style={{ 
                        fontSize: '1.35rem', 
                        lineHeight: 1.3, 
                        fontWeight: 600,
                        marginBottom: '0.75rem',
                        cursor: 'pointer',
                        transition: 'color 0.2s ease',
                        color: 'var(--text-primary)',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-orange)'}
                      onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                  </Link>

                  <p 
                    style={{ 
                      fontSize: '0.95rem', 
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '1.5rem',
                      flex: 1,
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 110) + '...' 
                    }}
                  />

                  {/* Footer Info within the card */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '1rem',
                    marginTop: 'auto',
                  }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      By {getPostAuthor(post)}
                    </span>
                    
                    <Link 
                      href={`/blog/${post.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--primary-orange)',
                        textDecoration: 'none',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(3px)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                    >
                      Read Article →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Fallback empty view */
        <div 
          className="glass-card" 
          style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            maxWidth: '600px',
            margin: '2rem auto 8rem auto',
            borderRadius: '24px',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            color: 'var(--primary-orange)',
            marginBottom: '1.5rem',
          }}>
            <FileText size={48} />
          </div>
          <h3 style={{ marginBottom: '1rem' }}>No Articles Found</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            We couldn&apos;t find any posts matching your criteria. Try adjusting your search query or selecting a different category tab.
          </p>
          <Link href="/blog" className="btn-primary">
            View All Articles
          </Link>
        </div>
      )}

    </div>
  );
}
