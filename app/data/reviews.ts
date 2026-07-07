import type { Review } from '~/types/content'

// On-page testimonials (also emitted as Review / AggregateRating JSON-LD).
// First name + initial only. Mixed 4.5 / 5 ratings and mixed length.
export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Marek K.',
    rating: 5,
    text: {
      pl: 'Szybka wymiana opon i uczciwa cena. Wracam tu od lat, zawsze solidna robota.',
      en: 'Fast tyre change and a fair price. I have been coming here for years, always solid work.',
    },
  },
  {
    id: 'r2',
    author: 'Joanna P.',
    rating: 5,
    text: {
      pl: 'Super serwis, wszystko sprawnie i konkretnie. Polecam!',
      en: 'Great service, everything smooth and to the point. Recommended!',
    },
  },
  {
    id: 'r3',
    author: 'Kasia',
    rating: 4.5,
    text: {
      pl: 'Naprawa zawieszenia bez niespodzianek. Fachowo wytłumaczyli, co i dlaczego.',
      en: 'Suspension repair with no surprises. They explained what and why in plain terms.',
    },
  },
  {
    id: 'r4',
    author: 'Tomasz W.',
    rating: 5,
    text: {
      pl: 'Zamówiliśmy blokady parkingowe pod blok. Montaż sprawny, blokady trzymają się świetnie.',
      en: 'We ordered parking blocks for our building. Mounting was smooth and the blocks hold up great.',
    },
  },
  {
    id: 'r5',
    author: 'Basia',
    rating: 5,
    text: {
      pl: 'Szybko, tanio, konkretnie. Wulkanizacja od ręki.',
      en: 'Fast, cheap, to the point. Tyre repair on the spot.',
    },
  },
  {
    id: 'r6',
    author: 'Piotr M.',
    rating: 4.5,
    text: {
      pl: 'Wymiana rozrządu zrobiona porządnie i w umówionym terminie. Bez naciągania na dodatkowe rzeczy.',
      en: 'Timing belt change done properly and on the agreed date. No upselling on extras.',
    },
  },
  {
    id: 'r7',
    author: 'Ania',
    rating: 5,
    text: {
      pl: 'Bardzo miła obsługa i uczciwe podejście. Zapłaciłam tyle, ile było ustalone.',
      en: 'Very nice staff and an honest approach. I paid exactly what was agreed.',
    },
  },
  {
    id: 'r8',
    author: 'Grzegorz S.',
    rating: 5,
    text: {
      pl: 'Stojaki rowerowe pod biuro zrobione na czas i porządnie ocynkowane.',
      en: 'Bike stands for our office done on time and properly galvanised.',
    },
  },
  {
    id: 'r9',
    author: 'Ewa',
    rating: 4.5,
    text: {
      pl: 'Solidny warsztat. Naprawili dokładnie to, co trzeba, bez wciskania dodatkowych usług.',
      en: 'A solid workshop. They fixed exactly what was needed, without pushing extra services.',
    },
  },
  {
    id: 'r10',
    author: 'Marek',
    rating: 5,
    text: {
      pl: 'Najlepszy mechanik w okolicy. Zawsze pomoże i doradzi.',
      en: 'The best mechanic around. Always helps and advises.',
    },
  },
  {
    id: 'r11',
    author: 'Kuba',
    rating: 5,
    text: {
      pl: 'Wymiana klocków i oleju od ręki. Szybko i sprawnie.',
      en: 'Brake pads and oil change on the spot. Quick and smooth.',
    },
  },
  {
    id: 'r12',
    author: 'Magda',
    rating: 4.5,
    text: {
      pl: 'Polecam, fachowo i uczciwie. Auto naprawione za pierwszym razem.',
      en: 'Recommended, professional and honest. Car fixed on the first try.',
    },
  },
]
