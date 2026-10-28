// Change THEME_NAME to 'discord' or 'stoat' to re-skin the whole app.
const THEME_NAME = 'discord';

const themes = {
  discord: {
    accent: '#5865f2',
    bgDeep: '#1e1f22',
    bgSide: '#2b2d31',
    bgMain: '#313338',
    bgHover: '#383a40',
    text: '#f2f3f5',
    textMuted: '#949ba4',
    divider: '#3f4147',
    online: '#23a55a',
    idle: '#f0b132',
    danger: '#f23f43',
  },
  stoat: {
    accent: '#fd6671',
    bgDeep: '#121212',
    bgSide: '#1a1a1a',
    bgMain: '#242424',
    bgHover: '#2e2e2e',
    text: '#f5f5f5',
    textMuted: '#9a9a9a',
    divider: '#333333',
    online: '#3abf7e',
    idle: '#f0b132',
    danger: '#ff4d4d',
  },
};

export const colors = themes[THEME_NAME];
