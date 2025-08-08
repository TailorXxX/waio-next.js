
import Image from 'next/image'


export default async function ContactHero({ data: cs}) {

  const cs          = pageBy.contactSettings
  const title = cs.title
  const content = pageBy.info
  const bgNode   = cs.background.node
  const heroNode = cs.image.node
  const list = cs.list || []

  const images = {
    background: {
      src:    bgNode.mediaItemUrl,
      alt:    bgNode.title,
      width:  bgNode.mediaDetails.width,
      height: bgNode.mediaDetails.height,
    },
    hero: {
      src:    heroNode.mediaItemUrl,
      alt:    heroNode.title,
      width:  heroNode.mediaDetails.width,
      height: heroNode.mediaDetails.height,
    }
  }


  return (
    <>
    
    <section className="contact-hero">

      {images?.background && (
        <Image
          src={images.background.src}
          alt={images.background.alt}
          width={images.background.width}
          height={images.background.height}
          className='img-abs'
          priority
        />
      )}
      
      <div className="container">

      {title && <h2 className="text-3xl font-bold underline">{title}</h2>}

      {content && (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}

      {images?.hero && (
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
          width={images.hero.width}
          height={images.hero.height}
          priority
        />
      )}

      {list.length > 0 && (
      <ul className="repeater-list">
        
        {list.map(({ item }, i) => (
          
          <li key={i}>
            <p>{item}</p>
          </li>
        ))}
      </ul>
      )}

      </div>
    </section>
    
    </>
  )
}
