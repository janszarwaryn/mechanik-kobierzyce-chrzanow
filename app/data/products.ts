import type { ProductGroup } from '~/types/content'

export const blocks: ProductGroup = {
  id: 'blocks',
  items: [
    {
      id: 'u',
      key: 'blocks.items.u',
      image: '/img/blokada_1_1.jpg',
      imageAlt: 'Blokada parkingowa typu U',
    },
    {
      id: 'm',
      key: 'blocks.items.m',
      image: '/img/blokada_2_1.jpg',
      imageAlt: 'Blokada parkingowa typu M',
    },
    {
      id: 'butterfly',
      key: 'blocks.items.butterfly',
      image: '/img/blokada_3_1.jpg',
      imageAlt: 'Składana blokada parkingowa typu Motyl',
    },
  ],
}

export const stands: ProductGroup = {
  id: 'stands',
  items: [
    {
      id: 'arc',
      key: 'stands.items.arc',
      image: '/img/stojak_1_1.jpg',
      imageAlt: 'Ocynkowany stojak rowerowy w kształcie łuku',
    },
    {
      id: 's2',
      key: 'stands.items.s2',
      image: '/img/stojak_2_1.jpg',
      imageAlt: 'Wielostanowiskowy stojak rowerowy',
    },
    {
      id: 's3',
      key: 'stands.items.s3',
      image: '/img/stojak_3_1.jpg',
      imageAlt: 'Kompaktowy stojak na rower',
    },
    {
      id: 's4',
      key: 'stands.items.s4',
      image: '/img/stojak_4_1.jpg',
      imageAlt: 'Solidny stojak rowerowy montowany do podłoża',
    },
  ],
}

export const productGroups: ProductGroup[] = [blocks, stands]
