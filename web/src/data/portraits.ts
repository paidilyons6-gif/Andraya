export type PortraitStyle = 'photo' | 'line' | 'shaded' | 'color'

export type Portrait = {
  id: string
  label: string
  location: string
  /** Client reference photo — front facade */
  photo: string
}

/** Real home facades used across previews (Unsplash, free to hotlink) */
export const PORTRAITS: Record<string, Portrait> = {
  craftsmanPortland: {
    id: 'craftsman-portland',
    label: 'Craftsman bungalow',
    location: 'Portland, OR',
    photo:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36993?auto=format&fit=crop&w=900&q=80',
  },
  victorianPortland: {
    id: 'victorian-portland',
    label: 'Victorian revival',
    location: 'Portland, OR',
    photo:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80',
  },
  cottageAsheville: {
    id: 'cottage-asheville',
    label: 'Country cottage',
    location: 'Asheville, NC',
    photo:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80',
  },
  modernPalmSprings: {
    id: 'modern-palm-springs',
    label: 'Mid-century modern',
    location: 'Palm Springs, CA',
    photo:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
  },
  craftsmanSeattle: {
    id: 'craftsman-seattle',
    label: 'Craftsman bungalow',
    location: 'Seattle, WA',
    photo:
      'https://images.unsplash.com/photo-1598228723793-89fd745e1731?auto=format&fit=crop&w=900&q=80',
  },
  colonialCharleston: {
    id: 'colonial-charleston',
    label: 'Colonial estate',
    location: 'Charleston, SC',
    photo:
      'https://images.unsplash.com/photo-1605276374101-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=80',
  },
  brownstoneBrooklyn: {
    id: 'brownstone-brooklyn',
    label: 'Urban brownstone',
    location: 'Brooklyn, NY',
    photo:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80',
  },
}

/** Default hero + pricing preview home */
export const HERO_PORTRAIT = PORTRAITS.craftsmanPortland

export const GALLERY_PORTRAITS = [
  {
    title: 'Victorian Revival',
    style: 'Classic Line',
    styleVariant: 'line' as PortraitStyle,
    portrait: PORTRAITS.victorianPortland,
  },
  {
    title: 'Country Cottage',
    style: 'Line + Shading',
    styleVariant: 'shaded' as PortraitStyle,
    portrait: PORTRAITS.cottageAsheville,
  },
  {
    title: 'Mid-Century Modern',
    style: 'Classic Line',
    styleVariant: 'line' as PortraitStyle,
    portrait: PORTRAITS.modernPalmSprings,
  },
  {
    title: 'Craftsman Bungalow',
    style: 'Line + Shading',
    styleVariant: 'shaded' as PortraitStyle,
    portrait: PORTRAITS.craftsmanSeattle,
  },
  {
    title: 'Colonial Estate',
    style: 'Full Color',
    styleVariant: 'color' as PortraitStyle,
    portrait: PORTRAITS.colonialCharleston,
  },
  {
    title: 'Urban Brownstone',
    style: 'Classic Line',
    styleVariant: 'line' as PortraitStyle,
    portrait: PORTRAITS.brownstoneBrooklyn,
  },
]
