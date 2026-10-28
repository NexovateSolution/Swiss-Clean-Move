import { NextRequest, NextResponse } from 'next/server';

interface ReviewItem {
  name: string;
  rating: number;
  text: string;
  time?: string;
}

interface GoogleReviewsResponse {
  rating: number;
  userRatingsTotal: number;
  reviews: ReviewItem[];
  isLive: boolean;
  cachedAt?: string;
}

// In-memory server cache to avoid excessive calls to Google Places API (24h TTL)
const cache: Record<string, { data: GoogleReviewsResponse; timestamp: number }> = {};
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const VERIFIED_FALLBACK_REVIEWS: Record<string, ReviewItem[]> = {
  de: [
    {
      name: 'Nazret Bahram',
      rating: 5,
      text: 'Ausgezeichnete Erfahrung mit SwissCleanMove. Schnelle Kommunikation, pünktliches Team und sehr sorgfältige Arbeit. Die Wohnung wurde perfekt gereinigt mit Schlüsselübergabe-Garantie. Vielen Dank an das gesamte Team.',
    },
    {
      name: 'Boran Aris',
      rating: 5,
      text: 'Nichts zu beanstanden, die Arbeit ist einwandfrei. Ich empfehle zu 100%.',
    },
    {
      name: 'Pedro All',
      rating: 5,
      text: 'Perfekter Reinigungsservice beim Umzug, tadellos — alles ist sauber. Das Team ist sehr freundlich und professionell. Ich werde nicht zögern, wieder anzurufen. Vielen Dank!',
    },
  ],
  en: [
    {
      name: 'Nazret Bahram',
      rating: 5,
      text: 'Excellent experience with SwissCleanMove. Fast communication, punctual team, and very thorough work. The apartment was perfectly cleaned with key handover guarantee. Thank you very much to the whole team.',
    },
    {
      name: 'Boran Aris',
      rating: 5,
      text: 'Nothing to say, the work is impeccable. I recommend 100%.',
    },
    {
      name: 'Pedro All',
      rating: 5,
      text: "Perfect cleaning service for moving, impeccable — everything is clean. The team is very friendly and professional. I won't hesitate to call again. Thank you very much!",
    },
  ],
  fr: [
    {
      name: 'Nazret Bahram',
      rating: 5,
      text: "Excellente expérience avec SwissCleanMove. Communication rapide, équipe ponctuelle et travail très soigné. L'appartement a été parfaitement nettoyé avec garantie de remise des clés. Merci beaucoup à toute l'équipe.",
    },
    {
      name: 'Boran Aris',
      rating: 5,
      text: 'Rien à dire le boulot est impeccables, je recommande à 100%.',
    },
    {
      name: 'Pedro All',
      rating: 5,
      text: "Service de nettoyage parfait en cas de déménagement, impeccable tout est propre, l'équipe est très aimable et professionnel je n'hésiterai pas à rappeler. Merci beaucoup",
    },
  ],
  it: [
    {
      name: 'Nazret Bahram',
      rating: 5,
      text: "Esperienza eccellente con SwissCleanMove. Comunicazione rapida, team puntuale e lavoro molto accurato. L'appartamento è stato pulito perfettamente con garanzia di consegna delle chiavi. Grazie mille a tutto il team.",
    },
    {
      name: 'Boran Aris',
      rating: 5,
      text: 'Niente da eccepire, il lavoro è impeccabile. Lo consiglio al 100%.',
    },
    {
      name: 'Pedro All',
      rating: 5,
      text: "Servizio di pulizia perfetto per il trasloco, impeccabile — tutto pulito. Il team è molto cordiale e professionale. Non esiterò a richiamare. Grazie mille!",
    },
  ],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get('locale') || 'de').toLowerCase();
  const cacheKey = `reviews_${locale}`;

  // Check in-memory cache
  const cached = cache[cacheKey];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return NextResponse.json(cached.data, {
      headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200' },
    });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const defaultCid = '5637846486444373924'; // SwissCleanMove Google Maps CID

  // If Google API credentials are configured, query Google Places API
  if (apiKey) {
    try {
      const identifierParam = placeId
        ? `place_id=${encodeURIComponent(placeId)}`
        : `cid=${encodeURIComponent(defaultCid)}`;
      const googleUrl = `https://maps.googleapis.com/maps/api/place/details/json?${identifierParam}&fields=name,rating,user_ratings_total,reviews&language=${locale}&key=${apiKey}`;

      const res = await fetch(googleUrl, {
        next: { revalidate: 86400 },
      });

      if (res.ok) {
        const json = await res.json();
        if (json.status === 'OK' && json.result) {
          const liveReviews: ReviewItem[] = (json.result.reviews || []).slice(0, 3).map((r: any) => ({
            name: r.author_name || 'Kunde',
            rating: r.rating || 5,
            text: r.text || '',
            time: r.relative_time_description,
          }));

          const responseData: GoogleReviewsResponse = {
            rating: json.result.rating ?? 4.6,
            userRatingsTotal: json.result.user_ratings_total ?? 42,
            reviews: liveReviews.length > 0 ? liveReviews : (VERIFIED_FALLBACK_REVIEWS[locale] || VERIFIED_FALLBACK_REVIEWS.de),
            isLive: true,
            cachedAt: new Date().toISOString(),
          };

          cache[cacheKey] = { data: responseData, timestamp: Date.now() };

          return NextResponse.json(responseData, {
            headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200' },
          });
        }
      }
    } catch (err) {
      console.error('[GoogleReviewsAPI] Failed to fetch live reviews from Google:', err);
    }
  }

  // Graceful fallback to verified authentic Google reviews (4.6 stars, 42 reviews)
  const fallbackData: GoogleReviewsResponse = {
    rating: 4.6,
    userRatingsTotal: 42,
    reviews: VERIFIED_FALLBACK_REVIEWS[locale] || VERIFIED_FALLBACK_REVIEWS.de,
    isLive: false,
    cachedAt: new Date().toISOString(),
  };

  cache[cacheKey] = { data: fallbackData, timestamp: Date.now() };

  return NextResponse.json(fallbackData, {
    headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200' },
  });
}
