import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import SwissHero from '@/components/SwissHero';
import { 
  User, 
  FileText, 
  CreditCard, 
  Upload, 
  PenTool, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function DashboardPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations();

  // Mock data for demonstration
  const contracts = [
    { id: 1, service: 'Umzugsreinigung', status: 'pending', date: '2024-11-15' },
    { id: 2, service: 'Büroreinigung', status: 'signed', date: '2024-11-20' },
    { id: 3, service: 'Gastronomiereinigung', status: 'completed', date: '2024-10-28' }
  ];

  const invoices = [
    { id: 1, amount: 450, status: 'paid', date: '2024-10-28' },
    { id: 2, amount: 320, status: 'pending', date: '2024-11-01' },
    { id: 3, amount: 680, status: 'overdue', date: '2024-10-15' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid':
      case 'signed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'overdue':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid':
      case 'signed':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'overdue':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <SwissHero
        badge="Dashboard"
        title="Kunden Dashboard"
        subtitle="Verwalten Sie Ihre Verträge, Rechnungen und Dokumente"
        right={
          <div className="w-full h-[340px] md:h-[420px] bg-swiss-section flex items-center justify-center">
            <div className="w-20 h-20 bg-swiss-softRed rounded-3xl flex items-center justify-center mx-auto border border-swiss-border shadow-subtle">
              <FileText className="w-10 h-10 text-swiss-red" />
            </div>
          </div>
        }
      />

      {/* Coming Soon Notice */}
      <section className="section-padding bg-yellow-50 border-b border-yellow-200">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-yellow-800">
              🚧 In Entwicklung
            </h2>
            <p className="text-yellow-700">
              Unser digitales Kunden-Dashboard ist derzeit in Entwicklung. 
              Bald können Sie hier Ihre Verträge verwalten, Rechnungen einsehen und Dokumente hochladen.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="card p-6 space-y-6">
                <h3 className="text-xl font-bold text-swiss-gray-800 flex items-center space-x-2">
                  <User className="w-5 h-5 text-swiss-blue" />
                  <span>Schnellaktionen</span>
                </h3>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 bg-swiss-blue text-white rounded-lg hover:bg-swiss-blue/90 transition-colors">
                    <FileText className="w-5 h-5" />
                    <span>Neuen Auftrag erstellen</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 bg-swiss-green text-white rounded-lg hover:bg-swiss-green/90 transition-colors">
                    <Upload className="w-5 h-5" />
                    <span>Dokument hochladen</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 p-3 bg-swiss-gray-600 text-white rounded-lg hover:bg-swiss-gray-700 transition-colors">
                    <Calendar className="w-5 h-5" />
                    <span>Termin buchen</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contracts */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                <h3 className="text-xl font-bold text-swiss-gray-800 mb-6 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-swiss-blue" />
                  <span>Meine Verträge</span>
                </h3>
                
                <div className="space-y-4">
                  {contracts.map((contract) => {
                    const StatusIcon = getStatusIcon(contract.status);
                    return (
                      <div key={contract.id} className="flex items-center justify-between p-4 bg-swiss-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(contract.status)}`}>
                            <StatusIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-swiss-gray-800">{contract.service}</h4>
                            <p className="text-sm text-swiss-gray-500">Datum: {contract.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                            {contract.status}
                          </span>
                          <button className="flex items-center space-x-1 text-swiss-blue hover:text-swiss-blue/80">
                            <PenTool className="w-4 h-4" />
                            <span className="text-sm">Signieren</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Invoices */}
          <div className="mt-8">
            <div className="card p-6">
              <h3 className="text-xl font-bold text-swiss-gray-800 mb-6 flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-swiss-blue" />
                <span>Rechnungen</span>
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-swiss-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-swiss-gray-800">Rechnung</th>
                      <th className="text-left py-3 px-4 font-semibold text-swiss-gray-800">Betrag</th>
                      <th className="text-left py-3 px-4 font-semibold text-swiss-gray-800">Datum</th>
                      <th className="text-left py-3 px-4 font-semibold text-swiss-gray-800">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-swiss-gray-800">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => {
                      const StatusIcon = getStatusIcon(invoice.status);
                      return (
                        <tr key={invoice.id} className="border-b border-swiss-gray-100">
                          <td className="py-3 px-4">#{invoice.id.toString().padStart(4, '0')}</td>
                          <td className="py-3 px-4 font-semibold">CHF {invoice.amount}</td>
                          <td className="py-3 px-4">{invoice.date}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                              <StatusIcon className="w-3 h-3" />
                              <span>{invoice.status}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="text-swiss-blue hover:text-swiss-blue/80 text-sm font-medium">
                              Download
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Coming Soon */}
      <section className="section-padding bg-swiss-gray-50">
        <div className="container-max">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-swiss-gray-800">
              Kommende Features
            </h2>
            <p className="text-xl text-swiss-gray-600">
              Diese Funktionen werden bald verfügbar sein
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-swiss-blue/10 rounded-lg flex items-center justify-center mx-auto">
                <PenTool className="w-6 h-6 text-swiss-blue" />
              </div>
              <h3 className="text-lg font-semibold text-swiss-gray-800">Digitale Verträge</h3>
              <p className="text-swiss-gray-600">Verträge online signieren und verwalten</p>
            </div>

            <div className="card p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-swiss-green/10 rounded-lg flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6 text-swiss-green" />
              </div>
              <h3 className="text-lg font-semibold text-swiss-gray-800">Dokument Upload</h3>
              <p className="text-swiss-gray-600">Fotos und Dokumente sicher hochladen</p>
            </div>

            <div className="card p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-swiss-red/10 rounded-lg flex items-center justify-center mx-auto">
                <CreditCard className="w-6 h-6 text-swiss-red" />
              </div>
              <h3 className="text-lg font-semibold text-swiss-gray-800">Online Zahlung</h3>
              <p className="text-swiss-gray-600">Rechnungen online bezahlen</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
