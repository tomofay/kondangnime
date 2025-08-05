const BASE_URL = process.env.NEXT_PUBLIC_ANIWATCH_API || "http://localhost:4000";

export async function getHomePage() {
  const res = await fetch(`${BASE_URL}/api/v2/hianime/home`);
  if (!res.ok) throw new Error("Failed to fetch home");
  return res.json();
}
