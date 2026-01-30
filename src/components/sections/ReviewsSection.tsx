import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ReviewsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Review {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

interface PlaceDetails {
  rating: number;
  user_ratings_total: number;
  reviews: Review[];
}

const PLACE_ID = "ChIJ7czqXf4XFgcRpDoB4MzLJqo";

// Extend Window interface for Google Maps
declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          PlacesService: new (attrContainer: HTMLDivElement) => {
            getDetails: (
              request: { placeId: string; fields: string[] },
              callback: (
                place: {
                  rating?: number;
                  user_ratings_total?: number;
                  reviews?: Array<{
                    author_name?: string;
                    profile_photo_url?: string;
                    rating?: number;
                    text?: string;
                    relative_time_description?: string;
                  }>;
                } | null,
                status: string,
              ) => void,
            ) => void;
          };
          PlacesServiceStatus: {
            OK: string;
          };
        };
      };
    };
  }
}

export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = () => {
      console.log("🔄 Iniciando busca de avaliações...");

      // Wait for Google Maps API to load
      let attempts = 0;
      const maxAttempts = 100; // 10 seconds max

      const checkGoogleMaps = setInterval(() => {
        attempts++;

        if (attempts % 10 === 0) {
          console.log(
            `⏳ Tentativa ${attempts}/${maxAttempts} - Aguardando Google Maps API...`,
          );
          console.log("window.google:", window.google);
        }

        if (window.google && window.google.maps && window.google.maps.places) {
          clearInterval(checkGoogleMaps);
          console.log("✅ Google Maps API carregada!");
          console.log("Google Maps object:", window.google.maps);

          try {
            if (!mapRef.current) {
              console.error("❌ mapRef.current é null!");
              setError("Erro interno: elemento de referência não encontrado.");
              setLoading(false);
              return;
            }

            // Create a hidden div for the PlacesService (required)
            const service = new window.google.maps.places.PlacesService(
              mapRef.current!,
            );
            console.log("✅ PlacesService criado:", service);

            const request = {
              placeId: PLACE_ID,
              fields: ["rating", "user_ratings_total", "reviews"],
            };
            console.log("📤 Enviando requisição:", request);

            service.getDetails(request, (place, status) => {
              console.log("📥 Resposta recebida!");
              console.log("Status:", status);
              console.log("Place:", place);

              if (
                status === window.google!.maps.places.PlacesServiceStatus.OK &&
                place
              ) {
                console.log("✅ Avaliações carregadas com sucesso!");
                const transformedData: PlaceDetails = {
                  rating: place.rating || 0,
                  user_ratings_total: place.user_ratings_total || 0,
                  reviews: (place.reviews || []).map((review) => ({
                    author_name: review.author_name || "Usuário",
                    profile_photo_url: review.profile_photo_url || "",
                    rating: review.rating || 5,
                    text: review.text || "",
                    relative_time_description:
                      review.relative_time_description || "",
                  })),
                };
                console.log("📊 Dados transformados:", transformedData);
                setPlaceDetails(transformedData);
                setError(null);
              } else {
                console.error("❌ Erro da Places API:", status);

                let errorMessage = `Erro: ${status}`;
                if (status === "REQUEST_DENIED") {
                  errorMessage =
                    "Acesso negado. Verifique se a Maps JavaScript API está ativada no Google Cloud Console.";
                } else if (status === "INVALID_REQUEST") {
                  errorMessage = "Place ID inválido ou não encontrado.";
                } else if (status === "OVER_QUERY_LIMIT") {
                  errorMessage = "Limite de requisições excedido.";
                }

                setError(errorMessage);
              }
              setLoading(false);
            });
          } catch (err) {
            console.error("❌ Exceção ao buscar avaliações:", err);
            setError(
              err instanceof Error
                ? err.message
                : "Erro ao carregar avaliações",
            );
            setLoading(false);
          }
        }

        if (attempts >= maxAttempts) {
          clearInterval(checkGoogleMaps);
          console.error(
            "❌ Timeout: Google Maps API não carregou após 10 segundos",
          );
          console.log("window.google final:", window.google);
          setError(
            "Não foi possível carregar a API do Google Maps. Verifique se a Maps JavaScript API está ativada.",
          );
          setLoading(false);
        }
      }, 100);
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (!contentRef.current || loading) return;

    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, [loading]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`${styles.star} ${i < rating ? styles.starFilled : styles.starEmpty}`}
        viewBox="0 0 24 24"
        fill={i < rating ? "#FBBF24" : "none"}
        stroke={i < rating ? "#FBBF24" : "#6B7280"}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ));
  };

  return (
    <section id="reviews" ref={sectionRef} className={styles.reviews}>
      {/* Hidden div for Google Maps PlacesService */}
      <div ref={mapRef} style={{ display: "none" }}></div>

      <div className={styles.container} ref={contentRef}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <span>Avaliações</span>
          </div>

          <h2 className={styles.title}>
            O que nossos{" "}
            <span className={styles.highlight}>clientes dizem</span>
          </h2>

          <p className={styles.subtitle}>
            Veja as avaliações reais de clientes que transformaram suas ideias
            em realidade com nossos serviços.
          </p>
        </div>

        {/* Google Rating Overview */}
        {placeDetails && (
          <div className={styles.ratingOverview}>
            <div className={styles.googleBadge}>
              <svg
                className={styles.googleIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Google Reviews</span>
            </div>

            <div className={styles.overallRating}>
              <span className={styles.ratingNumber}>
                {placeDetails.rating.toFixed(1)}
              </span>
              <div className={styles.ratingDetails}>
                <div className={styles.starsContainer}>
                  {renderStars(Math.round(placeDetails.rating))}
                </div>
                <span className={styles.totalReviews}>
                  {placeDetails.user_ratings_total} avaliações
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Carregando avaliações...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={styles.errorContainer}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p>Não foi possível carregar as avaliações.</p>
            <span className={styles.errorDetail}>{error}</span>
          </div>
        )}

        {/* Reviews Grid */}
        {!loading && !error && placeDetails && (
          <div className={styles.reviewsGrid}>
            {placeDetails.reviews.slice(0, 6).map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.authorInfo}>
                    {review.profile_photo_url ? (
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className={styles.authorPhoto}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className={styles.authorInitial}>
                        {review.author_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className={styles.authorName}>
                        {review.author_name}
                      </h4>
                      <span className={styles.reviewTime}>
                        {review.relative_time_description}
                      </span>
                    </div>
                  </div>
                  <div className={styles.reviewStars}>
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className={styles.reviewText}>
                  {review.text || "Excelente experiência!"}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CTA to Google Maps */}
        <div className={styles.ctaContainer}>
          <a
            href={`https://search.google.com/local/reviews?placeid=${PLACE_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Ver todas as avaliações no Google
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
