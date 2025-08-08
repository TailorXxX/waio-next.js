// src/app/about/page.js
import ContactHero     from '../../components/sections/ContactHero'
import ContactForm     from '../../components/sections/ContactForm'
import { Suspense } from 'react'
import Loading from '../../components/Loading'
import '../../page.module.css'

export default async function ContactPage() {

  

  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL.replace('/graphql','');

  return (
    <main className='contact-page'>
      <Suspense fallback={<Loading />}>
        <ContactHero /> 
        <ContactForm formId={35} endpoint={wpUrl}/>
      </Suspense>
    </main>
  )
}
