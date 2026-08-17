import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You | SwissCleanMove',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();
  
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('thankYouPage.title')}
        </h1>
        
        <h2 className="text-xl text-gray-700 mb-6">
          {t('thankYouPage.subtitle')}
        </h2>
        
        <p className="text-gray-600 mb-8">
          {t('thankYouPage.description')}
        </p>
        
        <Link 
          href={`/${locale}`}
          className="inline-block bg-[#003366] text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          {t('thankYouPage.backHome')}
        </Link>
      </div>
    </div>
  );
}
