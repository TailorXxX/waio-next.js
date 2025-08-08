// src/app/page.js
import Link from 'next/link';
import { fetchAPI } from '../../lib/api';
import './globals.css';

export default async function Home() {
  const { posts } = await fetchAPI(`
    {
      posts {
        nodes {
          title
          slug
        }
      }
    }
  `);

  return (
    <main>
      <h1>Homepage</h1>
      <ul>
        {posts.nodes.map(p => (
          <li key={p.slug}>
            <Link href={`/posts/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
