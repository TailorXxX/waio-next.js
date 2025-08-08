// src/components/Header.js  ← Server Component
import Link from 'next/link';
import { fetchAPI } from '../../../lib/api';
import ThemeToggle from './Theme/ThemeToggle';

export default async function Header() {
  const { pages } = await fetchAPI(`{ pages { nodes { title slug } } }`);

  return (
    <header>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/">Home</Link>
        {pages.nodes.map((p) => (
          <Link key={p.slug} href={`/${p.slug}`}>{p.title}</Link>
        ))}
        <div style={{ marginLeft: 'auto' }}>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
