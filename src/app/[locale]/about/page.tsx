import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import {
  Users,
  Award,
  Clock,
  Shield,
  Heart,
  Leaf,
  Target,
  CheckCircle
} from 'lucide-react';

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();

  const values = [
    {
      icon: Shield,
      title: t('about.values.reliability.title'),
      description: t('about.values.reliability.description')
    },
    {
      icon: Heart,
      title: t('about.values.customerFocus.title'),
      description: t('about.values.customerFocus.description')
    },
    {
      icon: Leaf,
      title: t('about.values.sustainability.title'),
      description: t('about.values.sustainability.description')
    },
    {
      icon: Target,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description')
    }
  ];

  const stats = [
    { number: '500+', label: t('about.stats.satisfiedCustomers') },
    { number: '5+', label: t('about.stats.yearsExperience') },
    { number: '100%', label: t('about.stats.depositGuarantee') },
    { number: '24h', label: t('about.stats.responseTime') }
  ];

  const team = [
    {
      name: t('about.team.members.marco.name'),
      position: t('about.team.members.marco.position'),
      description: t('about.team.members.marco.description'),
      image: '/team/placeholder.svg'
    },
    {
      name: t('about.team.members.sarah.name'),
      position: t('about.team.members.sarah.position'),
      description: t('about.team.members.sarah.description'),
      image: '/team/placeholder.svg'
    },
    {
      name: t('about.team.members.thomas.name'),
      position: t('about.team.members.thomas.position'),
      description: t('about.team.members.thomas.description'),
      image: '/team/placeholder.svg'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <SwissHero
        badge={t('about.title')}
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        right={
          <img
            src="/images/story.png"
            alt={t('about.title')}
            className="w-full h-[340px] md:h-[420px] object-cover"
          />
        }
      />

      {/* Company Story */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-swiss-text">
                  {t('about.story.title')}
                </h2>
                <p className="text-lg text-swiss-body">
                  {t('about.description')}
                </p>
                <p className="text-swiss-body">
                  {t('about.story.description')}
                </p>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-swiss-red" />
                  <span className="font-semibold text-swiss-text">{t('about.story.qualityBadge')}</span>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden h-96 relative shadow-soft border border-swiss-border">
                  <img
                    src="/images/story.png"
                    alt={t('about.story.teamImage')}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('about.statsSection.title')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('about.statsSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-swiss-text">
                  {stat.number}
                </div>
                <div className="mx-auto h-0.5 w-10 bg-swiss-red rounded-full"></div>
                <div className="text-swiss-body font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('about.valuesSection.title')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('about.valuesSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="card p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-swiss-gray-50 border border-swiss-border rounded-full flex items-center justify-center mx-auto">
                    <IconComponent className="w-8 h-8 text-swiss-body" />
                  </div>
                  <h3 className="text-xl font-semibold text-swiss-text">
                    {value.title}
                  </h3>
                  <p className="text-swiss-body">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-swiss-section">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('about.team.title')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card overflow-hidden">
                <div className="bg-swiss-gray-200 h-64 flex items-center justify-center relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-swiss-text">
                      {member.name}
                    </h3>
                    <p className="text-swiss-red font-medium">
                      {member.position}
                    </p>
                  </div>
                  <p className="text-swiss-body">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-text">
              {t('about.mission.title')}
            </h2>
            <p className="text-xl text-swiss-body">
              {t('about.mission.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-4">
                <Award className="w-12 h-12 text-swiss-red mx-auto" />
                <h3 className="text-lg font-semibold text-swiss-text">{t('about.mission.values.excellence.title')}</h3>
                <p className="text-swiss-body">{t('about.mission.values.excellence.description')}</p>
              </div>
              <div className="space-y-4">
                <Clock className="w-12 h-12 text-swiss-red mx-auto" />
                <h3 className="text-lg font-semibold text-swiss-text">{t('about.mission.values.efficiency.title')}</h3>
                <p className="text-swiss-body">{t('about.mission.values.efficiency.description')}</p>
              </div>
              <div className="space-y-4">
                <Heart className="w-12 h-12 text-swiss-red mx-auto" />
                <h3 className="text-lg font-semibold text-swiss-text">{t('about.mission.values.trust.title')}</h3>
                <p className="text-swiss-body">{t('about.mission.values.trust.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-swiss-red text-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('about.cta.title')}
            </h2>
            <p className="text-xl text-white/80">
              {t('about.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/free-offer`} className="inline-flex items-center justify-center bg-white text-swiss-red font-semibold py-3.5 px-6 rounded-xl transition-all duration-150 shadow-soft hover:shadow-soft">
                {t('about.cta.freeOffer')}
              </Link>
              <Link href={`/${locale}/contact`} className="flex items-center justify-center space-x-2 bg-transparent hover:bg-white/10 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-150 border border-white/40">
                {t('about.cta.contact')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
