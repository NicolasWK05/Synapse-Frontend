export const me = { id: 'me', name: 'You', handle: 'you', color: '#5865f2', status: 'online' };

export const users = {
  me,
  u1: { id: 'u1', name: 'Mira', color: '#eb459e', status: 'online' },
  u2: { id: 'u2', name: 'Jonas', color: '#f0b132', status: 'idle' },
  u3: { id: 'u3', name: 'Marcus', color: '#23a55a', status: 'online' },
  u4: { id: 'u4', name: 'Anders', color: '#3ba5d9', status: 'offline' },
  u5: { id: 'u5', name: 'Lukas', color: '#9b59b6', status: 'dnd' },
  u6: { id: 'u6', name: 'Ida', color: '#e67e22', status: 'online' },
  u7: { id: 'u7', name: 'Nils', color: '#1abc9c', status: 'offline' },
  u8: { id: 'u8', name: 'Freja', color: '#e74c3c', status: 'online' },
};

// ---------- Servers ----------
export const servers = [
  {
    id: 's1',
    name: 'Dev Hangout',
    initials: 'DH',
    color: '#5865f2',
    members: [
      { id: 'u1', role: 'admin' }, { id: 'u2', role: 'mod' }, { id: 'me' },
      { id: 'u3' }, { id: 'u4' }, { id: 'u5' }, { id: 'u6' },
    ],
    categories: [
      {
        name: 'Information',
        channels: [
          { id: 'c1', name: 'welcome', type: 'text' },
          { id: 'c2', name: 'announcements', type: 'text', unread: true },
        ],
      },
      {
        name: 'Text channels',
        channels: [
          { id: 'c3', name: 'general', type: 'text', mentions: 2 },
          { id: 'c4', name: 'react-native', type: 'text', unread: true },
          { id: 'c5', name: 'show-your-work', type: 'text' },
        ],
      },
      {
        name: 'Voice channels',
        channels: [
          { id: 'c6', name: 'Lounge', type: 'voice', participants: ['u1', 'u3'] },
          { id: 'c7', name: 'Pair programming', type: 'voice', participants: [] },
        ],
      },
    ],
  },
  {
    id: 's2',
    name: 'Game Night',
    initials: 'GN',
    color: '#23a55a',
    members: [
      { id: 'u2', role: 'admin' }, { id: 'me' }, { id: 'u5' },
      { id: 'u7' }, { id: 'u8' }, { id: 'u3' },
    ],
    categories: [
      {
        name: 'Chat',
        channels: [
          { id: 'c8', name: 'general', type: 'text' },
          { id: 'c9', name: 'looking-for-group', type: 'text', unread: true },
        ],
      },
      {
        name: 'Voice',
        channels: [{ id: 'c10', name: 'Party', type: 'voice', participants: ['u5'] }],
      },
    ],
  },
  {
    id: 's3',
    name: 'Book Club',
    initials: 'BC',
    color: '#eb459e',
    members: [
      { id: 'u3', role: 'admin' }, { id: 'me' }, { id: 'u1' }, { id: 'u6' }, { id: 'u4' },
    ],
    categories: [
      {
        name: 'Discussion',
        channels: [
          { id: 'c11', name: 'this-month', type: 'text' },
          { id: 'c12', name: 'recommendations', type: 'text' },
        ],
      },
    ],
  },
];

export function findChannel(channelId) {
  for (const server of servers)
    for (const cat of server.categories)
      for (const channel of cat.channels)
        if (channel.id === channelId) return { server, channel };
  return null;
}

// ---------- Direct messages ----------
export const dms = [
  { id: 'd1', members: ['u1'], last: "Nice, post a screenshot when it's ready!", time: '10:13', unread: 2 },
  { id: 'd2', members: ['u2', 'u3', 'u5'], name: 'Dungeons & Dragons', last: 'Marcus: Saturday works for me', time: '09:52', unread: 5 },
  { id: 'd3', members: ['u2'], last: 'Let me know if you need a hand', time: '09:40' },
  { id: 'd4', members: ['u3'], last: 'Haha exactly 😂', time: 'Yesterday' },
  { id: 'd5', members: ['u5'], last: 'Can you send me the link?', time: 'Mon' },
  { id: 'd6', members: ['u4'], last: 'Thanks!', time: 'Sun' },
];

export const findDM = (id) => dms.find((d) => d.id === id) ?? null;

// ---------- Messages ----------
const m = (id, user, day, time, text, extra = {}) => ({ id, user, day, time, text, ...extra });

const channelMessages = {
  c3: [
    m('a1', 'u3', 'Yesterday', '4:41 PM', 'Has anyone tried the new Expo SDK yet?'),
    m('a2', 'u2', 'Yesterday', '4:44 PM', 'Yep. Upgrade was painless apart from one peer dependency warning.'),
    m('a3', 'u2', 'Yesterday', '4:44 PM', 'npm 12 is stricter about those now.'),
    m('a4', 'u4', 'Yesterday', '5:02 PM', 'Good to know, I was about to upgrade this weekend.', { reactions: [{ emoji: '👍', count: 3 }] }),
    m('b1', 'u1', 'Today', '10:02 AM', 'Morning everyone! 👋'),
    m('b2', 'u3', 'Today', '10:04 AM', 'Morning! Coffee first, code second ☕'),
    m('b3', 'u6', 'Today', '10:07 AM', 'Anyone up for a quick pair programming session at 2?', { reactions: [{ emoji: '🙋', count: 2, mine: true }, { emoji: '🔥', count: 1 }] }),
    m('b4', 'me', 'Today', '10:12 AM', "I'm working on a chat UI at the moment, no backend yet."),
    m('b5', 'u1', 'Today', '10:13 AM', "Nice, post a screenshot when it's ready!", { reply: { user: 'me', text: "I'm working on a chat UI at the moment..." } }),
    m('b6', 'u5', 'Today', '10:20 AM', 'Can someone review my PR later today?'),
    m('b7', 'u4', 'Today', '10:31 AM', 'I can take a look after lunch.', { reactions: [{ emoji: '❤️', count: 1 }] }),
    m('b8', 'u2', 'Today', '10:33 AM', '@You are you joining the call at 2?', { reply: { user: 'u6', text: 'Anyone up for a quick pair programming...' } }),
  ],
  c4: [
    m('r1', 'u5', 'Today', '9:15 AM', 'Is anyone using Expo Router for tabs? Mine keeps remounting.'),
    m('r2', 'u3', 'Today', '9:18 AM', 'Make sure the screen components are defined outside the layout file.'),
    m('r3', 'u1', 'Today', '9:20 AM', 'Also check you are not creating inline components in `tabBarIcon`.', { reactions: [{ emoji: '💡', count: 2 }] }),
    m('r4', 'u5', 'Today', '9:26 AM', 'That was it, thanks both!'),
  ],
  c8: [
    m('g1', 'u2', 'Today', '8:00 PM', 'Game night starts at 9, who is in?'),
    m('g2', 'u8', 'Today', '8:03 PM', 'In! Bringing snacks.', { reactions: [{ emoji: '🍿', count: 4 }] }),
    m('g3', 'u7', 'Today', '8:10 PM', 'Same, give me 20 minutes.'),
  ],
};

const dmMessages = {
  d1: [
    m('x1', 'me', 'Today', '10:12 AM', 'Working on a chat UI at the moment, no backend yet.'),
    m('x2', 'u1', 'Today', '10:13 AM', "Nice, post a screenshot when it's ready!"),
    m('x3', 'u1', 'Today', '10:13 AM', 'Also what are you building it with?'),
  ],
  d2: [
    m('y1', 'u2', 'Today', '9:40 AM', 'DND this weekend?'),
    m('y2', 'u5', 'Today', '9:44 AM', 'I can do Saturday, but not Sunday.'),
    m('y3', 'u3', 'Today', '9:52 AM', 'Saturday works for me', { reactions: [{ emoji: '👍', count: 2 }] }),
  ],
};

export function getMessages(kind, id) {
  if (kind === 'channel') {
    return channelMessages[id] ?? [m(`w-${id}`, 'u1', 'Today', '9:00 AM', 'Welcome! This channel is quiet for now.')];
  }
  if (dmMessages[id]) return dmMessages[id];
  const dm = findDM(id);
  return dm ? [m(`l-${id}`, dm.members[0], 'Today', dm.time, dm.last)] : [];
}
