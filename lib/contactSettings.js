// Frontend/lib/contact.js
import { fetchAPI } from './api';

/**
 * Fetches data for the “Contact” page from WPGraphQL,
 * revalidating every `revalidateSeconds` seconds (ISR).
 */
export async function getContactPage(revalidateSeconds = 86400) {
  const { pageBy } = await fetchAPI(
    `
    query ContactPage {
      pageBy(uri: "contact") {
        title
        content
        contactSettings {
          title
          info
          image {
            node {
              mediaItemUrl
              title
              mediaDetails { width height }
            }
          }
          background {
            node {
              mediaItemUrl
              title
              mediaDetails { width height }
            }
          }
          list {
            item
          }
        }
      }
    }
    `,
    /* variables */ {},
    /* ISR window */ revalidateSeconds
  );

  return pageBy;
}
