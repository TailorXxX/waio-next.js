
import Image from 'next/image'
import util from 'util'
import { getContactPage } from '../../../../lib/contactSettings'

export default async function ContactHero() {


  const pageBy = await getContactPage() ;

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
  {list.map(({ item }, i) => (
          
          console.log(
            '🔍 repeaterList =',
            util.inspect(i, { showHidden: false, depth: null, colors: false })
          )
        ))}

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
