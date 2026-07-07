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
  {
    id: 'timing',
    q: {
      pl: 'Ile trwa wymiana rozrządu?',
      en: 'How long does a timing belt change take?',
    },
    a: {
      pl: 'Zwykle od kilku godzin do jednego dnia roboczego, zależnie od modelu auta i zakresu (sam pasek czy z rolkami i pompą). Termin i czas potwierdzamy przy przyjęciu samochodu.',
      en: 'Usually from a few hours to one working day, depending on the car model and scope (belt only or with rollers and water pump). We confirm the exact time when you drop the car off.',
    },
  },
  {
    id: 'original',
    q: {
      pl: 'Montujecie oryginalne części czy zamienniki?',
      en: 'Do you fit original parts or replacements?',
    },
    a: {
      pl: 'Montujemy zarówno części oryginalne, jak i sprawdzone zamienniki renomowanych producentów. Doradzamy, co się opłaca przy Twoim aucie, a wybór zawsze należy do Ciebie.',
      en: 'We fit both original parts and trusted replacements from reputable brands. We advise what makes sense for your car, and the choice is always yours.',
    },
  },
  {
    id: 'supplied',
    q: {
      pl: 'Czy zamontujecie części kupione przeze mnie?',
      en: 'Will you fit parts I bought myself?',
    },
    a: {
      pl: 'Tak, montujemy części powierzone przez klienta. Robociznę wyceniamy z góry, więc oszczędzasz na częściach bez niespodzianek przy odbiorze.',
      en: 'Yes, we fit customer-supplied parts. We quote the labour upfront, so you save on parts with no surprises at pickup.',
    },
  },
  {
    id: 'diagnosis',
    q: {
      pl: 'Czy diagnostyka usterki jest płatna?',
      en: 'Do you charge for fault diagnostics?',
    },
    a: {
      pl: 'Diagnozę konkretnych podzespołów wykonujemy w ramach naprawy - najpierw ustalamy przyczynę, a zakres i koszt potwierdzamy przed rozpoczęciem prac.',
      en: 'We diagnose the specific components as part of the repair - we find the cause first, then confirm the scope and cost before starting work.',
    },
  },
  {
    id: 'appointment',
    q: {
      pl: 'Czy trzeba umawiać się wcześniej?',
      en: 'Do I need to book in advance?',
    },
    a: {
      pl: 'Najlepiej zadzwonić i umówić termin - dzięki temu przygotujemy części i skrócimy czas naprawy. Drobne sprawy jak wulkanizacja często załatwiamy od ręki.',
      en: 'It is best to call and book a slot - that way we prepare the parts and shorten the repair time. Small jobs like tyre repair are often done on the spot.',
    },
  },
]
