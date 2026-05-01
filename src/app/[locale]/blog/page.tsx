import { blogArticles } from '@/lib/blogData';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = locale === 'en' ? 'Blog & Tips | SwissCleanMove' : locale === 'fr' ? 'Blog & Astuces | SwissCleanMove' : 'Blog & Tipps | SwissCleanMove';
  const description = locale === 'en' ? 'Helpful tips for your move and cleaning in Switzerland.' : locale === 'fr' ? 'Conseils utiles pour votre déménagement et nettoyage en Suisse.' : 'Hilfreiche Tipps rund um Umzug und Reinigung in der Schweiz.';
  
  return {
    title,
    description,
    robots: { index: true, follow: true }
  };
}

export default function BlogIndexPage({ params: { locale } }: { params: { locale: string } }) {
  const heroTitle = locale === 'en' ? 'Blog & Tips' : locale === 'fr' ? 'Blog & Astuces' : 'Blog & Tipps';
  const heroSubtitle = locale === 'en' ? 'Expert advice for a stress-free move.' : locale === 'fr' ? 'Conseils d\'experts pour un déménagement sans stress.' : 'Expertenratgeber für einen stressfreien Umzug.';

  return (
    <Layout>
      <SwissHero
        badge="Blog"
        title={<h1 className="text-[28px] md:text-[38px] font-bold text-swiss-text">{heroTitle}</h1>}
        subtitle={heroSubtitle}
      />
      
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article) => (
              <div key={article.slug} className="card bg-white p-6 border border-swiss-border shadow-subtle hover:shadow-soft transition-all flex flex-col">
                <div className="flex items-center space-x-2 text-swiss-body text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  <time>{article.date}</time>
                </div>
                <h2 className="text-xl font-bold text-swiss-text mb-3">
                  {(article.title as any)[locale] || article.title.de}
                </h2>
                <p className="text-swiss-body mb-6 flex-grow">
                  {(article.excerpt as any)[locale] || article.excerpt.de}
                </p>
                <Link 
                  href={`/${locale}/blog/${article.slug}`}
                  className="inline-flex items-center text-swiss-red font-semibold group mt-auto"
                >
                  <span>{locale === 'en' ? 'Read more' : locale === 'fr' ? 'Lire la suite' : 'Weiterlesen'}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
