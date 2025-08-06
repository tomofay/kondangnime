const BASE_URL = process.env.NEXT_PUBLIC_ANIWATCH_API;

// Homepage, spotlight, trending, top10, dsb
export async function getHomePage() {
  try {
    const res = await fetch(`${BASE_URL}/api/v2/hianime/home`);
    if (!res.ok) {
      console.error("❌ Failed to fetch home page:", res.status, res.statusText);
      throw new Error("Failed to fetch home page");
    }
    const json = await res.json();
    console.log("✅ Fetch home page success! Data:", json);
    return json;
  } catch (err) {
    console.error("❌ Error while fetching home page:", err);
    throw err;
  }
}

// Search anime (basic & advanced)
export async function searchAnime({
  q,
  page = 1,
  genres,
  type,
  sort,
  season,
  language,
  status,
  rated,
  start_date,
  end_date,
  score
}: {
  q: string;
  page?: number;
  genres?: string;
  type?: string;
  sort?: string;
  season?: string;
  language?: string;
  status?: string;
  rated?: string;
  start_date?: string;
  end_date?: string;
  score?: string;
}) {
  const url = new URL(`${BASE_URL}/api/v2/hianime/search`);
  url.searchParams.append("q", q);
  if (page) url.searchParams.append("page", String(page));
  if (genres) url.searchParams.append("genres", genres);
  if (type) url.searchParams.append("type", type);
  if (sort) url.searchParams.append("sort", sort);
  if (season) url.searchParams.append("season", season);
  if (language) url.searchParams.append("language", language);
  if (status) url.searchParams.append("status", status);
  if (rated) url.searchParams.append("rated", rated);
  if (start_date) url.searchParams.append("start_date", start_date);
  if (end_date) url.searchParams.append("end_date", end_date);
  if (score) url.searchParams.append("score", score);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to search anime");
  return res.json();
}

// Search suggestions untuk autocomplete
export async function searchSuggestions(q: string) {
  const res = await fetch(`${BASE_URL}/api/v2/hianime/search/suggestion?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error("Failed to fetch suggestions");
  return res.json();
}

// Detail info tentang anime (profile, sinopsis, recommended dsb)
export async function getAnimeDetails(animeId: string) {
  const res = await fetch(`${BASE_URL}/api/v2/hianime/anime/${animeId}`);
  if (!res.ok) throw new Error("Failed to fetch anime details");
  return res.json();
}

// Ringkasan/tip singkat anime (hover info)
export async function getAnimeQtip(animeId: string) {
  const res = await fetch(`${BASE_URL}/api/v2/hianime/qtip/${animeId}`);
  if (!res.ok) throw new Error("Failed to fetch anime qtip info");
  return res.json();
}

// Daftar episode untuk suatu anime
export async function getAnimeEpisodes(animeId: string) {
  const res = await fetch(`${BASE_URL}/api/v2/hianime/anime/${animeId}/episodes`);
  if (!res.ok) throw new Error("Failed to fetch episodes");
  return res.json();
}

// Jadwal rilis episode berikutnya
export async function getNextEpisodeSchedule(animeId: string) {
  const res = await fetch(`${BASE_URL}/api/v2/hianime/anime/${animeId}/next-episode-schedule`);
  if (!res.ok) throw new Error("Failed to fetch next episode schedule");
  return res.json();
}

// Server list dan link streaming untuk 1 episode
export async function getEpisodeServers(animeEpisodeId: string) {
  const res = await fetch(`${BASE_URL}/api/v2/hianime/episode/servers?animeEpisodeId=${encodeURIComponent(animeEpisodeId)}`);
  if (!res.ok) throw new Error("Failed to fetch episode servers");
  return res.json();
}

// Streaming sources (m3u8, subtitle, kualitas) untuk player
export async function getStreamingSources({ animeEpisodeId, server = "hd-1", category = "sub" }: {
  animeEpisodeId: string;
  server?: string;
  category?: "sub" | "dub" | "raw";
}) {
  const url = `${BASE_URL}/api/v2/hianime/episode/sources?animeEpisodeId=${encodeURIComponent(animeEpisodeId)}&server=${server}&category=${category}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch streaming sources");
  return res.json();
}

// Anime list A-Z
export async function getAZList(sortOption: string, page = 1) {
  const res = await fetch(`${BASE_URL}/api/v2/hianime/azlist/${sortOption}?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch A-Z list");
  return res.json();
}

// Berdasarkan genre
export async function getGenreAnime(genre: string, page = 1) {
  const res = await fetch(`${BASE_URL}/api/v2/hianime/genre/${genre}?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch genre anime");
  return res.json();
}

// Berdasarkan kategori (populer, top airing, dsb)
export async function getCategoryAnime(category: string, page = 1) {
  const res = await fetch(`${BASE_URL}/api/v2/hianime/category/${category}?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch category anime");
  return res.json();
}

// Berdasarkan studio/producer
export async function getProducerAnime(name: string, page = 1) {
  const res = await fetch(`${BASE_URL}/api/v2/hianime/producer/${name}?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch producer anime");
  return res.json();
}

// Jadwal anime harian (by tanggal)
export async function getEstimatedSchedule(date: string) {
  const res = await fetch(`${BASE_URL}/api/v2/hianime/schedule?date=${date}`);
  if (!res.ok) throw new Error("Failed to fetch schedule");
  return res.json();
}
