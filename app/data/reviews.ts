import type { Review } from '~/types/content'

// Bilingual review snippets (max 3 lines each). Local, realistic PL names.
export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Marek Wiśniewski',
    role: 'Kierowca z Kobierzyc',
    rating: 5,
    text: {
      pl: 'Szybka wymiana opon i uczciwa cena. Wracam tu od lat, zawsze solidna robota.',
      en: 'Fast tyre change and a fair price. I have been coming here for years, always solid work.',
    },
  },
  {
    id: 'r2',
    author: 'Anna Kowalczyk',
    role: 'Wspólnota mieszkaniowa',
    rating: 5,
    text: {
      pl: 'Zamówiliśmy blokady parkingowe pod nasz blok. Montaż sprawny, blokady trzymają się świetnie.',
      en: 'We ordered parking blocks for our building. Mounting was smooth and the blocks hold up great.',
    },
  },
  {
    id: 'r3',
    author: 'Tomasz Zieliński',
    role: 'Firma spod Wrocławia',
    rating: 5,
    text: {
      pl: 'Stojaki rowerowe pod biuro zrobione na czas i porządnie ocynkowane. Polecam.',
      en: 'Bike stands for our office done on time and properly galvanised. Recommended.',
    },
  },
  {
    id: 'r4',
    author: 'Katarzyna Nowak',
    role: 'Mieszkanka Chrzanowa',
    rating: 5,
    text: {
      pl: 'Naprawa zawieszenia bez niespodzianek. Fachowo wytłumaczyli, co i dlaczego.',
      en: 'Suspension repair with no surprises. They explained what and why in plain terms.',
    },
  },
]
