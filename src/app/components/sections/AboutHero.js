// src/components/sections/AboutHero.js
export default function AboutHero({ title, content }) {
  return (
    <section className="about-hero">
      {title && <h2>{title}</h2>}
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </section>
  )
}
