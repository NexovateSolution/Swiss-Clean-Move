import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import MobileCTABar from './MobileCTABar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCTABar />
    </div>
  );
}
