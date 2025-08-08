// src/app/about/page.js
import { fetchAPI } from '../../../../lib/api'
import AboutHero     from '../../components/sections/AboutHero'

export default async function AboutPage() {
  // Fetch only the About page by its URI:
  const { pageBy } = await fetchAPI(`
    query {
      pageBy(uri: "about") {
        title
        content
        aboutSettings {
          title
        }
      }
    }
  `)

  const heroTitle = pageBy.aboutSettings.title

  return (
    <main>

      <AboutHero title={heroTitle} content={pageBy.content} />

    </main>
  )
}
