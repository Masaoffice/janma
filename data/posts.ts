/**
 * デモ用「つぶやき」（短文投稿）データ。
 * 麻雀活動に関する短文タイムラインです。
 *
 * 投稿文の差し替えはご自身で行ってください。
 */

export type Post = {
  id: string;
  authorId: string;
  body: string;
  postedAt: string;
  likes: number;
  replies: number;
};

export const posts: Post[] = [
  {
    id: 'p_001',
    authorId: 'p_001',
    body: '今日は半荘2回で原点+15。リーチ判断がまだ甘い。',
    postedAt: '2026-05-09 17:02',
    likes: 4,
    replies: 1,
  },
  {
    id: 'p_002',
    authorId: 'u_002',
    body: '初心者向けの本買った。何切る300選から始めようと思います。',
    postedAt: '2026-05-09 16:15',
    likes: 8,
    replies: 3,
  },
  {
    id: 'p_003',
    authorId: 'p_002',
    body: '渋谷の某雀荘、平日夜は意外と空いてた。穴場かも。',
    postedAt: '2026-05-09 14:30',
    likes: 12,
    replies: 5,
  },
  {
    id: 'p_004',
    authorId: 'u_001',
    body: '人生初の役満（四暗刻）出ました…！手が震えました。',
    postedAt: '2026-05-09 12:45',
    likes: 27,
    replies: 8,
  },
  {
    id: 'p_005',
    authorId: 'p_003',
    body: '三麻、北抜きありなしで戦略が全然変わるの面白い。',
    postedAt: '2026-05-09 10:20',
    likes: 6,
    replies: 2,
  },
  {
    id: 'p_006',
    authorId: 'u_003',
    body: 'Mリーグ観てから麻雀始めた人ですが、プロの読み凄すぎて毎回感心します。',
    postedAt: '2026-05-08 22:30',
    likes: 15,
    replies: 4,
  },
  {
    id: 'p_007',
    authorId: 'p_001',
    body: '土曜の卓、まだ1名空きあります。半荘2回想定。詳細は投稿欄から。',
    postedAt: '2026-05-08 20:00',
    likes: 3,
    replies: 0,
  },
  {
    id: 'p_008',
    authorId: 'u_002',
    body: '配牌悪い時こそ降り判断練習って思ってるんですが、つい突っ込んじゃう…',
    postedAt: '2026-05-08 18:15',
    likes: 9,
    replies: 2,
  },
];
