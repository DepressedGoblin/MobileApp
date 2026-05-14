export const GENRES = [
  'Action',
  'Adventure',
  'RPG',
  'Puzzle',
  'Shooter',
  'Strategy',
  'Simulation',
  'Horror',
  'Platformer',
  'Other',
];

export const PLATFORMS = [
  { id: 'windows', label: 'Windows' },
  { id: 'mac', label: 'macOS' },
  { id: 'linux', label: 'Linux' },
  { id: 'web', label: 'Web' },
  { id: 'steamdeck', label: 'Steam Deck' },
  { id: 'console', label: 'Console' },
  { id: 'mobile', label: 'Mobile' },
];

export const STAGES = [
  'Concept / paper',
  'Playable prototype',
  'Vertical slice',
  'Alpha',
  'Beta (pre-release)',
];

export function initialPlatformMap(): Record<string, boolean> {
  return Object.fromEntries(PLATFORMS.map((p) => [p.id, false]));
}

export function initialGenreMap(): Record<string, boolean> {
  return Object.fromEntries(GENRES.map((g) => [g, false]));
}

export function initialStageMap(): Record<string, boolean> {
  return Object.fromEntries(STAGES.map((s) => [s, false]));
}
