// src/app/posts/[slug]/page.js
import { fetchAPI } from '../../../../lib/api';

export async function generateStaticParams() {
  const { posts } = await fetchAPI(`
    {
      posts {
        nodes { slug }
      }
    }
  `);

  return posts.nodes.map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }) {
  // Next 15 requires awaiting params
  const { slug } = await params;

  const { postBy } = await fetchAPI(
    `
    query PostBySlug($slug: String!) {
      postBy(slug: $slug) {
        title
        content  
      }
    }
    `,
    { slug }
  );

  return (
    <main>
        <article style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>{postBy.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postBy.content }} />
        </article>
    </main>
  );
}
