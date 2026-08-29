export type PortraitStyle = 'photo' | 'line' | 'shaded' | 'color'

export type Portrait = {
  id: string
  label: string
  location: string
  /** Path under public/ — resolved with import.meta.env.BASE_URL */
  photo: string
}

/** Bundled real home facades (Unsplash, stored in public/portraits/) */
export const PORTRAITS: Record<string, Portrait> = {
  craftsmanPortland: {
    id: 'craftsman-portland',
    label: 'Craftsman bungalow',
    location: 'Portland, OR',
    photo: 'portraits/craftsman-portland.jpg',
  },
  victorianPortland: {
    id: 'victorian-portland',
    label: 'Victorian revival',
    location: 'Portland, OR',
    photo: 'portraits/victorian-portland.jpg',
  },
  cottageAsheville: {
    id: 'cottage-asheville',
    label: 'Country cottage',
    location: 'Asheville, NC',
    photo: 'portraits/cottage-asheville.jpg',
  },
  modernPalmSprings: {
    id: 'modern-palm-springs',
    label: 'Mid-century modern',
    location: 'Palm Springs, CA',
    photo: 'portraits/modern-palm-springs.jpg',
  },
  craftsmanSeattle: {
    id: 'craftsman-seattle',
    label: 'Craftsman bungalow',
    location: 'Seattle, WA',
    photo: 'portraits/craftsman-seattle.jpg',
  },
  colonialCharleston: {
    id: 'colonial-charleston',
    label: 'Colonial estate',
    location: 'Charleston, SC',
    photo: 'portraits/colonial-charleston.jpg',
  },
  brownstoneBrooklyn: {
    id: 'brownstone-brooklyn',
    label: 'Urban brownstone',
    location: 'Brooklyn, NY',
    photo: 'portraits/brownstone-brooklyn.jpg',
  },
}

export const HERO_PORTRAIT = PORTRAITS.craftsmanPortland

export function portraitSrc(path: string): string {
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
}

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
