import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import { Shield, FileText, Eye, Lock } from 'lucide-react';

export default function LegalPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();

  return (
    <Layout>
      {/* Hero Section */}
      <SwissHero
        badge={t('legal.title')}
        title={t('legal.title')}
        subtitle={t('legal.subtitle')}
        right={
          <div className="w-full h-[340px] md:h-[420px] bg-swiss-section flex items-center justify-center">
            <div className="text-center space-y-5 px-6">
              <div className="w-16 h-16 bg-swiss-softRed rounded-2xl flex items-center justify-center mx-auto border border-swiss-border shadow-subtle">
                <Shield className="w-8 h-8 text-swiss-red" />
              </div>
              <div className="bg-white border border-swiss-border rounded-2xl p-5 shadow-subtle max-w-sm mx-auto text-left">
                <p className="text-sm font-semibold text-swiss-text">{t('legal.navigation.impressum')}</p>
                <p className="text-sm text-swiss-body mt-1">{t('legal.navigation.datenschutz')}</p>
                <p className="text-sm text-swiss-body">{t('legal.navigation.agb')}</p>
              </div>
            </div>
          </div>
        }
      />

      {/* Navigation */}
      <section className="py-8 bg-swiss-gray-50 border-b">
        <div className="container-max">
          <nav className="flex flex-wrap gap-6 justify-center">
            <a href="#impressum" className="flex items-center space-x-2 text-swiss-body hover:text-swiss-red font-medium transition-colors">
              <FileText className="w-4 h-4" />
              <span>{t('legal.navigation.impressum')}</span>
            </a>
            <a href="#datenschutz" className="flex items-center space-x-2 text-swiss-body hover:text-swiss-red font-medium transition-colors">
              <Shield className="w-4 h-4" />
              <span>{t('legal.navigation.datenschutz')}</span>
            </a>
            <a href="#agb" className="flex items-center space-x-2 text-swiss-body hover:text-swiss-red font-medium transition-colors">
              <Eye className="w-4 h-4" />
              <span>{t('legal.navigation.agb')}</span>
            </a>
            <a href="#cookies" className="flex items-center space-x-2 text-swiss-body hover:text-swiss-red font-medium transition-colors">
              <Lock className="w-4 h-4" />
              <span>{t('legal.navigation.cookies')}</span>
            </a>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          {/* Impressum */}
          <div id="impressum" className="mb-12">
            <div className="card p-8">
              <h2 className="text-3xl font-bold text-swiss-gray-800 mb-8 flex items-center space-x-3">
                <FileText className="w-8 h-8 text-swiss-blue" />
                <span>{t('legal.sections.impressum')}</span>
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.impressum.companyInfo')}</h3>
                  <div className="space-y-2 text-swiss-gray-700">
                    <p><strong>{t('legal.impressum.companyName')}:</strong> SwissCleanMove GmbH</p>
                    <p><strong>{t('legal.impressum.address')}:</strong> Orpundstrasse 31, 2504 Biel/Bienne, Schweiz</p>
                    <p><strong>{t('legal.impressum.phone')}:</strong> +41 76 488 36 89 • +41 78 215 80 30</p>
                    <p><strong>{t('legal.impressum.email')}:</strong> info@swisscleanmove.ch</p>
                    <p><strong>{t('legal.impressum.website')}:</strong> www.swisscleanmove.ch</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.impressum.legalInfo')}</h3>
                  <div className="space-y-2 text-swiss-gray-700">
                    <p><strong>{t('legal.impressum.commercialRegister')}:</strong> CHE-123.456.789</p>
                    <p><strong>{t('legal.impressum.uid')}:</strong> CHE-123.456.789 MWST</p>
                    <p><strong>{t('legal.impressum.manager')}:</strong> Marco Müller</p>
                    <p><strong>{t('legal.impressum.authority')}:</strong> Handelsregisteramt Bern</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.impressum.liability')}</h3>
                  <div className="space-y-4 text-swiss-gray-700">
                    <p>
                      {t('legal.impressum.liabilityText1')}
                    </p>
                    <p>
                      {t('legal.impressum.liabilityText2')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.impressum.copyright')}</h3>
                  <p className="text-swiss-gray-700">
                    {t('legal.impressum.copyrightText')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Datenschutz */}
          <div id="datenschutz" className="mb-12">
            <div className="card p-8">
              <h2 className="text-3xl font-bold text-swiss-gray-800 mb-8 flex items-center space-x-3">
                <Shield className="w-8 h-8 text-swiss-blue" />
                <span>{t('legal.sections.datenschutz')}</span>
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.privacy.generalInfo')}</h3>
                  <p className="text-swiss-gray-700">
                    {t('legal.privacy.generalText')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.privacy.dataCollection')}</h3>
                  <div className="space-y-4 text-swiss-gray-700">
                    <div>
                      <h4 className="font-semibold mb-2">{t('legal.privacy.whoResponsible')}</h4>
                      <p>
                        {t('legal.privacy.whoResponsibleText')}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">{t('legal.privacy.howCollect')}</h4>
                      <p>
                        {t('legal.privacy.howCollectText')}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">{t('legal.privacy.whyUse')}</h4>
                      <p>
                        {t('legal.privacy.whyUseText')}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.privacy.yourRights')}</h3>
                  <div className="space-y-2 text-swiss-gray-700">
                    <p>{t('legal.privacy.rightsText')}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      {t.raw('legal.privacy.rightsList').map((right: string, index: number) => (
                        <li key={index}>{right}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.privacy.contactForm')}</h3>
                  <p className="text-swiss-gray-700">
                    {t('legal.privacy.contactFormText')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AGB */}
          <div id="agb" className="mb-12">
            <div className="card p-8">
              <h2 className="text-3xl font-bold text-swiss-gray-800 mb-8 flex items-center space-x-3">
                <Eye className="w-8 h-8 text-swiss-blue" />
                <span>{t('legal.sections.agb')}</span>
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.terms.scope')}</h3>
                  <p className="text-swiss-gray-700">
                    {t('legal.terms.scopeText')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.terms.contract')}</h3>
                  <p className="text-swiss-gray-700">
                    {t('legal.terms.contractText')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.terms.services')}</h3>
                  <div className="space-y-2 text-swiss-gray-700">
                    <p>{t('legal.terms.servicesText')}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      {t.raw('legal.terms.servicesList').map((service: string, index: number) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.terms.pricing')}</h3>
                  <div className="space-y-2 text-swiss-gray-700">
                    <p>
                      {t('legal.terms.pricingText1')}
                    </p>
                    <p>
                      {t('legal.terms.pricingText2')}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.terms.warranty')}</h3>
                  <p className="text-swiss-gray-700">
                    {t('legal.terms.warrantyText')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.terms.liability')}</h3>
                  <p className="text-swiss-gray-700">
                    {t('legal.terms.liabilityText')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cookie-Richtlinie */}
          <div id="cookies" className="mb-12">
            <div className="card p-8">
              <h2 className="text-3xl font-bold text-swiss-gray-800 mb-8 flex items-center space-x-3">
                <Lock className="w-8 h-8 text-swiss-blue" />
                <span>{t('legal.sections.cookies')}</span>
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.cookies.whatAre')}</h3>
                  <p className="text-swiss-gray-700">
                    {t('legal.cookies.whatAreText')}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.cookies.whichUse')}</h3>
                  <div className="space-y-4 text-swiss-gray-700">
                    <div>
                      <h4 className="font-semibold mb-2">{t('legal.cookies.necessary')}</h4>
                      <p>
                        {t('legal.cookies.necessaryText')}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">{t('legal.cookies.functional')}</h4>
                      <p>
                        {t('legal.cookies.functionalText')}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-swiss-gray-800 mb-3">{t('legal.cookies.manage')}</h3>
                  <p className="text-swiss-gray-700">
                    {t('legal.cookies.manageText')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
