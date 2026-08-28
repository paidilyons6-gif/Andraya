/** Shared motion + color constants for GSAP and WebGL */
export const MOTION = {
  drawDuration: 1.4,
  chapterVh: 100,
  processPinLength: '400%',
  galleryApproachLength: '200%',
  galleryPinLength: '600%',
  easings: {
    draw: 'power2.inOut',
    reveal: 'power3.out',
    scrub: 'none',
  },
  stagger: {
    draw: 0.06,
    text: 0.08,
    card: 0.1,
  },
} as const

export const COLORS = {
  paper: '#f7f3ed',
  ink: '#2c2825',
  accent: '#9c4a32',
  galleryBg: '#1a1816',
  gallerySpot: '#f5efe6',
  galleryWall: '#242120',
} as const

export const HOUSE_PATH =
  'M15 75 L60 20 L105 75 M35 75 V55 H85 V75'
