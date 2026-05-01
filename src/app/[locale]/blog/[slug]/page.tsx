import { blogArticles } from '@/lib/blogData';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string, slug: string } }) {
  const article = blogArticles.find(a => a.slug === slug);
  if (!article) return {};
  
  return {
    title: `${(article.title as any)[locale] || article.title.de} | SwissCleanMove Blog`,
    description: (article.excerpt as any)[locale] || article.excerpt.de,
    robots: { index: true, follow: true }
  };
}

export default function BlogPostPage({ params: { locale, slug } }: { params: { locale: string, slug: string } }) {
  const article = blogArticles.find(a => a.slug === slug);
  
  if (!article) {
    notFound();
  }

  const title = (article.title as any)[locale] || article.title.de;
  const content = (article.content as any)[locale] || article.content.de;

  return (
    <Layout>
      <article className="pt-32 pb-20 bg-white">
        <div className="container-max max-w-3xl mx-auto">
          <Link 
            href={`/${locale}/blog`}
            className="inline-flex items-center text-swiss-body hover:text-swiss-red transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>{locale === 'en' ? 'Back to Blog' : locale === 'fr' ? 'Retour au Blog' : 'Zurück zum Blog'}</span>
          </Link>
          
          <div className="flex items-center space-x-2 text-swiss-body mb-4">
            <Calendar className="w-4 h-4" />
            <time>{article.date}</time>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-swiss-text mb-8 leading-tight">
            {title}
          </h1>
          
          <div 
            className="prose prose-lg max-w-none text-swiss-body prose-headings:text-swiss-text prose-a:text-swiss-red prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </article>
    </Layout>
  );
}
