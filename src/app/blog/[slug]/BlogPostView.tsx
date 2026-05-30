'use client';

import { 
  WPPost, 
  getFeaturedImageUrl, 
  getPostCategories, 
  getPostAuthor, 
  getReadingTime 
} from '@/services/wordpress';
import Link from 'next/link';
import { Clock, ArrowLeft } from 'lucide-react';

interface BlogPostViewProps {
  post: WPPost;
  recommendedPosts: WPPost[];
}

export default function BlogPostView({ post, recommendedPosts }: BlogPostViewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const categoriesList = getPostCategories(post);
  const featuredImg = getFeaturedImageUrl(post);
  const readingTime = getReadingTime(post.content.rendered);

  return (
    <div className="container">
      
      {/* Breadcrumbs Navigation */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: 'var(--text-muted)',
        marginBottom: '2.5rem',
      }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-orange)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
          Home
        </Link>
        <span>/</span>
        <Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-orange)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
          Blog
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      </nav>

      {/* Article Main Grid */}
      <article style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header Content Block */}
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          {categoriesList.length > 0 && (
            <span className="section-badge" style={{ marginBottom: '1.25rem' }}>
              {categoriesList[0].name.toUpperCase()}
            </span>
          )}
          
          <h1 
            style={{ 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              lineHeight: 1.15, 
              marginBottom: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* Author & Meta Row */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            borderTop: '1px solid var(--border-light)',
            borderBottom: '1px solid var(--border-light)',
            padding: '1rem 2rem',
            marginTop: '0.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'var(--primary-orange)',
                fontSize: '0.85rem',
              }}>
                {getPostAuthor(post).slice(0, 2).toUpperCase()}
              </div>
              <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                {getPostAuthor(post)}
              </span>
            </div>
            
            <span style={{ color: 'var(--border-medium)', height: '15px', width: '1px', background: 'var(--border-medium)' }} />
            
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {formatDate(post.date)}
            </div>

            <span style={{ color: 'var(--border-medium)', height: '15px', width: '1px', background: 'var(--border-medium)' }} />

            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={14} /> {readingTime} min read
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div style={{
          borderRadius: '24px',
          overflow: 'hidden',
          aspectRatio: '16/9',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '4rem',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={featuredImg} 
            alt={post.title.rendered}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Rich Text Body Content */}
        <div 
          className="wp-blog-content"
          style={{
            maxWidth: '750px',
            margin: '0 auto 5rem auto',
            padding: '0 1rem',
          }}
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Back to Blog Navigation Footer */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '2.5rem',
          marginBottom: '6rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link 
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-primary)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '1rem',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'var(--primary-orange)';
              const icon = e.currentTarget.querySelector('span');
              if (icon) icon.style.transform = 'translateX(-4px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              const icon = e.currentTarget.querySelector('span');
              if (icon) icon.style.transform = 'translateX(0)';
            }}
          >
            <span style={{ transition: 'transform 0.2s ease', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <ArrowLeft size={16} /> Back to insights
            </span>
          </Link>

          {/* Tag labels */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {categoriesList.map(c => (
              <span 
                key={c.id}
                style={{
                  background: 'var(--bg-light)',
                  color: 'var(--text-secondary)',
                  padding: '0.4rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                }}
              >
                #{c.name}
              </span>
            ))}
          </div>
        </div>

      </article>

      {/* Recommended Posts Block */}
      {recommendedPosts.length > 0 && (
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '5rem',
          marginTop: '4rem',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-badge">INSIGHTS MATRIX</span>
            <h2 style={{ color: 'var(--text-primary)' }}>Keep Reading</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2.5rem',
          }}>
            {recommendedPosts.map((rPost) => (
              <article 
                key={rPost.id}
                className="glass-card"
                style={{
                  borderRadius: '20px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  aspectRatio: '16/10',
                  marginBottom: '1rem',
                }}>
                  <Link href={`/blog/${rPost.slug}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={getFeaturedImageUrl(rPost)} 
                      alt={rPost.title.rendered}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </Link>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0 0.25rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    {formatDate(rPost.date)}
                  </span>
                  
                  <Link href={`/blog/${rPost.slug}`} style={{ textDecoration: 'none', flex: 1 }}>
                    <h4 
                      style={{
                        fontSize: '1.15rem',
                        lineHeight: 1.35,
                        fontWeight: 600,
                        marginBottom: '1rem',
                        cursor: 'pointer',
                        transition: 'color 0.2s',
                        color: 'var(--text-primary)',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary-orange)'}
                      onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                      dangerouslySetInnerHTML={{ __html: rPost.title.rendered }}
                    />
                  </Link>

                  <Link 
                    href={`/blog/${rPost.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--primary-orange)',
                      textDecoration: 'none',
                      marginTop: 'auto',
                    }}
                  >
                    Read →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
