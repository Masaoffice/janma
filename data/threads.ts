/**
 * デモ用スレッドデータ。
 * 投稿文は「麻雀の活動内容」に焦点を当てた中立的な内容になっています。
 * 必要に応じて文面はご自身で書き換えてください。
 */

export type Thread = {
  id: string;
  authorId: string;
  title: string;
  body: string;
  area: string;
  date: string; // 希望日時（YYYY-MM-DD HH:mm 形式の文字列）
  capacity: number; // 募集人数（社会人側が指定）
  rule: string; // ルール（東風 / 半荘 / 三麻 等）
  postedAt: string; // 投稿日時
  replies: Reply[];
};

export type Reply = {
  id: string;
  authorId: string;
  body: string;
  postedAt: string;
};

export const threads: Thread[] = [
  {
    id: 't_001',
    authorId: 'p_001',
    title: '土曜19時から渋谷で卓を立てます',
    body: '今週土曜の19時〜23時、渋谷の雀荘で半荘1〜2回打てる方を募集します。経験不問。場代はこちらで持ちます。',
    area: '渋谷',
    date: '2026-05-16 19:00',
    capacity: 3,
    rule: '半荘・赤あり',
    postedAt: '2026-05-09 14:32',
    replies: [
      {
        id: 'r_001',
        authorId: 'u_001',
        body: '参加希望です。半荘1回くらいなら大丈夫そうです。',
        postedAt: '2026-05-09 15:10',
      },
      {
        id: 'r_002',
        authorId: 'u_002',
        body: '初心者ですが大丈夫でしょうか？',
        postedAt: '2026-05-09 15:42',
      },
    ],
  },
  {
    id: 't_002',
    authorId: 'p_002',
    title: '日曜午後、新宿で東風4回',
    body: '日曜の14時〜17時、新宿エリアで東風を4回くらい打ちたいです。中級以上歓迎。',
    area: '新宿',
    date: '2026-05-17 14:00',
    capacity: 3,
    rule: '東風・赤あり・喰いタンあり',
    postedAt: '2026-05-09 11:05',
    replies: [
      {
        id: 'r_003',
        authorId: 'u_002',
        body: 'お時間合いそうです、参加させてください。',
        postedAt: '2026-05-09 12:00',
      },
    ],
  },
  {
    id: 't_003',
    authorId: 'u_001',
    title: '【学生発】平日夜の練習卓を探しています',
    body: '平日の19時以降で、池袋or高田馬場近辺で打てる卓を探しています。麻雀始めて半年くらいです。',
    area: '池袋・高田馬場',
    date: '2026-05-13 19:30',
    capacity: 3,
    rule: '半荘・初心者OK',
    postedAt: '2026-05-08 22:14',
    replies: [],
  },
  {
    id: 't_004',
    authorId: 'p_003',
    title: '三麻もありで卓を立てたい（六本木）',
    body: '六本木の雀荘で、人数次第で四人麻雀／三人麻雀どちらもいけます。土曜の昼〜夕方を予定。',
    area: '六本木',
    date: '2026-05-16 13:00',
    capacity: 2,
    rule: '半荘 or 三麻',
    postedAt: '2026-05-08 18:50',
    replies: [
      {
        id: 'r_004',
        authorId: 'u_003',
        body: '三麻興味あります。詳細教えてください。',
        postedAt: '2026-05-08 20:30',
      },
    ],
  },
  {
    id: 't_005',
    authorId: 'p_001',
    title: '【マナー重視】落ち着いて打ちたい方募集',
    body: '勝ち負けより楽しく打ちたい方向け。場代はこちら持ち、時間は3〜4時間。マナー違反は退室いただきます。',
    area: '銀座',
    date: '2026-05-23 18:00',
    capacity: 3,
    rule: '半荘・赤あり',
    postedAt: '2026-05-08 10:15',
    replies: [],
  },
];

export const findThread = (id: string) => threads.find((t) => t.id === id);
