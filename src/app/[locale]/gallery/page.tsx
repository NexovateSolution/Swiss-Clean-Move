import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Layout from '@/components/Layout';

const images = [
    '/Gallary/1.jpeg',
    '/Gallary/2.jpeg',
    '/Gallary/3.jpeg',
    '/Gallary/4.jpeg',
    '/Gallary/5.jpeg',
    '/Gallary/6.jpeg',
    '/Gallary/7.jpeg',
    '/Gallary/8.jpeg',
    '/Gallary/9.jpeg',
];

export default function GalleryPage() {
    const t = useTranslations('gallery');

    return (
        <Layout>
            <main className="min-h-screen bg-swiss-bg pb-12">
                <div className="bg-gradient-to-br from-blue-400/80 via-blue-500/70 to-blue-600/80 pt-32 pb-16 text-center text-white">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t('title')}</h1>
                    <p className="text-xl max-w-2xl mx-auto opacity-90 px-4">{t('description')}</p>
                </div>

                <div className="container-max py-16 lg:py-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 hover:cursor-pointer">
                        {images.map((src, index) => (
                            <div
                                key={index}
                                className="relative aspect-square overflow-hidden rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300 group"
                            >
                                <Image
                                    src={src}
                                    alt={`${t('imageAlt')} ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </Layout>
    );
}
