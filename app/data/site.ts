import type { SiteInfo } from '~/types/content'

// Factual NAP (name / address / phone) data. Location is Chrzanów, a village in
// gmina Kobierzyce, powiat wrocławski, województwo dolnośląskie (near Wrocław).
export const site: SiteInfo = {
  legalName: 'Mechanik Kobierzyce',
  domain: 'mechanik-kobierzyce.pl',
  url: 'https://mechanik-kobierzyce.pl',
  phones: ['+48601996692', '+48515720761'],
  email: 'mechanik.chrzanow@gmail.com',
  address: {
    street: 'Lipowa 24A',
    locality: 'Chrzanów',
    municipality: 'Kobierzyce',
    region: 'dolnośląskie',
    postalCode: '55-040',
    country: 'PL',
  },
  geo: { lat: 50.993063, lng: 16.931976 },
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2511.24941736195!2d16.929787315751067!3d50.9930629795539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fc5d3e6845977%3A0x6165cb137d6c08bf!2sLipowa%2024A%2C%2055-040%20Chrzan%C3%B3w!5e0!3m2!1spl!2spl!4v1600029394570!5m2!1spl!2spl',
  mapLink:
    'https://www.google.com/maps/place/Lipowa+24A,+55-040+Chrzan%C3%B3w/@50.993063,16.9297873,17z',
  areaServed: ['Kobierzyce', 'Chrzanów', 'Wrocław', 'dolnośląskie'],
  hours: [
    { dayKey: 'monFri', value: '9:00 - 20:00' },
    { dayKey: 'sat', value: '9:00 - 17:00' },
    { dayKey: 'sun', value: null },
  ],
}
