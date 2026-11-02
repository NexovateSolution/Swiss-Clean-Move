import { permanentRedirect } from 'next/navigation';

export default function EndreinigungBielRedirectPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  permanentRedirect(`/${locale}/umzugsreinigung-biel-bienne`);
}
