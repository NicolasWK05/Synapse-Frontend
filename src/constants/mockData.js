export const me = {
  id: 'me',
  name: 'You',
  handle: 'you',
  color: '#5865f2',
  status: 'online',
};

export const users = {
  u1: { id: 'u1', name: 'Mira', color: '#eb459e', status: 'online' },
  u2: { id: 'u2', name: 'Jonas', color: '#f0b132', status: 'idle' },
  u3: { id: 'u3', name: 'Sofie', color: '#23a55a', status: 'online' },
  u4: { id: 'u4', name: 'Anders', color: '#3ba5d9', status: 'offline' },
  u5: { id: 'u5', name: 'Lukas', color: '#9b59b6', status: 'dnd' },
};

// A DM is either one user, or a group (several user ids + a name).
export const dms = [
  { id: 'd1', members: ['u1'], last: "Nice, post a screenshot when it's ready!", time: '10:13', unread: 2 },
  { id: 'd2', members: ['u2', 'u3', 'u5'], name: 'Weekend plans', last: 'Sofie: Saturday works for me', time: '09:52', unread: 5 },
  { id: 'd3', members: ['u2'], last: 'Let me know if you need a hand', time: '09:40' },
  { id: 'd4', members: ['u3'], last: 'Haha exactly 😂', time: 'Yesterday' },
  { id: 'd5', members: ['u5'], last: 'Can you send me the link?', time: 'Mon' },
  { id: 'd6', members: ['u4'], last: 'Thanks!', time: 'Sun' },
];
