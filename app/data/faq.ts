export interface FaqItem {
  id: string
  q: { pl: string; en: string }
  a: { pl: string; en: string }
}

// Answer-engine (AEO) content: concise, locality-rich Q&A. Rendered on the page
// AND emitted as FAQPage JSON-LD.
export const faq: FaqItem[] = [
  {
    id: 'where',
    q: {
      pl: 'Gdzie znajduje się warsztat?',
      en: 'Where is the workshop located?',
    },
    a: {
      pl: 'Warsztat mieści się przy ul. Lipowa 24A w Chrzanowie, w gminie Kobierzyce (powiat wrocławski), kilkanaście minut od Wrocławia.',
      en: 'The workshop is at Lipowa 24A in Chrzanów, in the Kobierzyce municipality (Wrocław county), a short drive from Wrocław.',
    },
  },
  {
    id: 'services',
    q: {
      pl: 'Jakie usługi samochodowe oferujecie?',
      en: 'What car services do you offer?',
    },
    a: {
      pl: 'Wykonujemy wymianę i naprawę opon (wulkanizacja), naprawę zawieszenia, mechanikę samochodową, wymianę uszczelek pod głowicą, montaż części oraz ogólne naprawy aut.',
      en: 'We do tyre replacement and repair (vulcanisation), suspension repair, car mechanics, head gasket replacement, parts fitting and general car repairs.',
    },
  },
  {
    id: 'hours',
    q: {
      pl: 'W jakich godzinach jesteście otwarci?',
      en: 'What are your opening hours?',
    },
    a: {
      pl: 'Warsztat jest czynny od poniedziałku do piątku w godzinach 9:00-20:00 oraz w sobotę 9:00-17:00. W niedzielę nieczynne.',
      en: 'The workshop is open Monday to Friday 9:00-20:00 and Saturday 9:00-17:00. Closed on Sunday.',
    },
  },
  {
    id: 'blocks',
    q: {
      pl: 'Czy sprzedajecie i montujecie blokady parkingowe?',
      en: 'Do you sell and install parking blocks?',
    },
    a: {
      pl: 'Tak. Oferujemy blokady parkingowe typu U, M i składany Motyl - sprzedaż i montaż na terenie gminy Kobierzyce i we Wrocławiu.',
      en: 'Yes. We offer U, M and folding Butterfly type parking blocks - sales and installation across the Kobierzyce area and in Wrocław.',
    },
  },
  {
    id: 'stands',
    q: {
      pl: 'Czy produkujecie stojaki rowerowe dla firm?',
      en: 'Do you make bike stands for companies?',
    },
    a: {
      pl: 'Tak. Wykonujemy ocynkowane stojaki rowerowe dla firm, wspólnot i instytucji, montowane na stałe do podłoża.',
      en: 'Yes. We make galvanised bike stands for companies, communities and institutions, permanently mounted to the ground.',
    },
  },
]
