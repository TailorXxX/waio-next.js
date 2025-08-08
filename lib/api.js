// lib/api.js
const GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export async function fetchAPI(query, variables = {}, revalidateSeconds = 86400) {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    cache: 'force-cache',
    next: { revalidate: revalidateSeconds },
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GraphQL error: ${res.status}\n${txt}`);
  }
  const { data, errors } = await res.json();
  if (errors) throw new Error('GraphQL returned errors');
  return data;
}
