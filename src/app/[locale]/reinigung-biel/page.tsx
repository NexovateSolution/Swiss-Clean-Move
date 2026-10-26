import { permanentRedirect } from 'next/navigation';

export default function LegacyReinigungBielPage({ params: { locale } }: { params: { locale: string } }) {
  permanentRedirect(`/${locale}/reinigung-biel-bienne`);
}
