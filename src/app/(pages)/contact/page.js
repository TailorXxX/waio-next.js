// src/app/contact/page.js
import util from 'util'
import { notFound } from "next/navigation";
import ContactHero     from '../../components/sections/ContactHero'
import ContactForm     from '../../components/sections/ContactForm'
import { Suspense } from 'react'
import Loading from '../../components/Loading'
import { getContactPage } from '../../../../lib/contactSettings'
import '../../page.module.css'

export default async function ContactPage() {

  const { pageBy } = await getContactPage();

  if (!pageBy?.contactSettings) {
    notFound();
  }

   console.log(
            '🔍 pageBy =',
            util.inspect(pageBy, { showHidden: false, depth: null, colors: false })
          )

  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL.replace('/graphql','');

  return (
    <main className='contact-page'>
      <Suspense fallback={<Loading />}>
        <ContactHero data={pageBy.contactSettings} /> 
        <ContactForm formId={35} endpoint={wpUrl}/>
      </Suspense>
    </main>
  )
}
