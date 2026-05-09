/**
 * デモ用ダイレクトメッセージデータ。
 *
 * 設計方針:
 * - 初回DMは「リクエスト」扱いで、相手承認後に会話開始（status: 'pending' / 'active'）
 * - NGワード検知の対象（連絡先交換系・性的表現等）はAIで自動検出
 * - 全メッセージにタイムスタンプ・通報導線あり
 *
 * NGワード検知:
 *   data/ngwords.ts に定義。チャットUI側で表示時にチェック → 警告バナー表示。
 */

export type MessageThreadStatus = 'pending' | 'active' | 'closed';

export type Message = {
  id: string;
  senderId: string;
  body: string;
  sentAt: string;
  flagged?: boolean; // NGワード検知でフラグ付き
};

export type MessageThread = {
  id: string;
  participantIds: [string, string];
  status: MessageThreadStatus;
  startedFromThreadId?: string; // 元のスレッドID（あれば）
  lastMessageAt: string;
  unreadFor?: string; // 未読のあるユーザーID
  messages: Message[];
};

export const messageThreads: MessageThread[] = [
  {
    id: 'm_001',
    participantIds: ['u_001', 'p_001'],
    status: 'active',
    startedFromThreadId: 't_001',
    lastMessageAt: '2026-05-09 16:02',
    unreadFor: 'u_001',
    messages: [
      {
        id: 'msg_001',
        senderId: 'p_001',
        body: 'スレッドへのご返信ありがとうございます。土曜19時、渋谷ABC雀荘で問題なければ卓を立てます。',
        sentAt: '2026-05-09 15:30',
      },
      {
        id: 'msg_002',
        senderId: 'u_001',
        body: 'ありがとうございます！場所と時間、大丈夫です。半荘1回のつもりで参加させてください。',
        sentAt: '2026-05-09 15:48',
      },
      {
        id: 'msg_003',
        senderId: 'p_001',
        body: '了解しました。当日は19時に雀荘1階エントランスで集合でいかがでしょう。あと2名集まり次第、マッチ成立ボタンで確定させていただきます。',
        sentAt: '2026-05-09 16:02',
      },
    ],
  },
  {
    id: 'm_002',
    participantIds: ['u_002', 'p_002'],
    status: 'pending', // 初回DM、未承認
    lastMessageAt: '2026-05-09 12:30',
    unreadFor: 'u_002',
    messages: [
      {
        id: 'msg_004',
        senderId: 'p_002',
        body: 'はじめまして。プロフィール拝見しました。新宿で東風4回の卓で同卓いただけませんか？日曜午後の予定です。',
        sentAt: '2026-05-09 12:30',
      },
    ],
  },
  {
    id: 'm_003',
    participantIds: ['u_001', 'p_003'],
    status: 'active',
    lastMessageAt: '2026-05-08 21:15',
    messages: [
      {
        id: 'msg_005',
        senderId: 'p_003',
        body: 'こんばんは。先日はありがとうございました。次回また機会あればよろしくお願いします。',
        sentAt: '2026-05-08 20:50',
      },
      {
        id: 'msg_006',
        senderId: 'u_001',
        body: 'こちらこそありがとうございました！とても勉強になりました。',
        sentAt: '2026-05-08 21:15',
      },
    ],
  },
  {
    id: 'm_004',
    participantIds: ['u_003', 'p_001'],
    status: 'active',
    startedFromThreadId: 't_001',
    lastMessageAt: '2026-05-09 10:20',
    messages: [
      {
        id: 'msg_007',
        senderId: 'u_003',
        body: '初心者ですが大丈夫でしょうか？まだ役満作ったことありません…',
        sentAt: '2026-05-09 10:00',
      },
      {
        id: 'msg_008',
        senderId: 'p_001',
        body: '大丈夫ですよ。マナーさえ守れば実力は問いません。',
        sentAt: '2026-05-09 10:20',
      },
    ],
  },
];

/** 現在のユーザー（デモではu_001固定） */
export const CURRENT_USER_ID = 'u_001';

export const findThreadById = (id: string) => messageThreads.find((m) => m.id === id);

export const getThreadsForUser = (userId: string) =>
  messageThreads
    .filter((m) => m.participantIds.includes(userId))
    .sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt));

export const otherParticipant = (thread: MessageThread, userId: string) =>
  thread.participantIds.find((id) => id !== userId)!;
