import Link from 'next/link';
import {
  getThreadsForUser,
  CURRENT_USER_ID,
  otherParticipant,
} from '@/data/messages';
import { findUser } from '@/data/users';
import Avatar from '@/components/Avatar';
import Badge from '@/components/Badge';

export default function MessagesInboxPage() {
  const threads = getThreadsForUser(CURRENT_USER_ID);

  const pending = threads.filter((t) => t.status === 'pending');
  const active = threads.filter((t) => t.status === 'active');

  return (
    <div className="container-narrow py-8 max-w-3xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">メッセージ</h1>
        <p className="text-sm text-ink-700 mt-1">
          スレッド経由・プロフィールからのDMがここに表示されます。
        </p>
      </header>

      {/* Notice banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-6 text-sm text-amber-900">
        ⚠️ <strong>マッチ成立前の連絡先（LINE / カカオ等）の交換は禁止です。</strong>
        違反するとアカウント停止対象になります。
      </div>

      {/* Pending requests */}
      {pending.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold text-ink-700 mb-2 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-500"></span>
            メッセージリクエスト ({pending.length})
          </h2>
          <p className="text-xs text-ink-500 mb-3">
            初めての相手からのメッセージは「リクエスト」として届きます。承認するまで会話は開始されません。
          </p>
          <div className="space-y-2">
            {pending.map((t) => (
              <ThreadRow key={t.id} threadId={t.id} otherUserId={otherParticipant(t, CURRENT_USER_ID)} preview={t.messages[t.messages.length - 1]?.body ?? ''} time={t.lastMessageAt} pending unread={t.unreadFor === CURRENT_USER_ID} />
            ))}
          </div>
        </section>
      )}

      {/* Active conversations */}
      <section>
        <h2 className="text-sm font-bold text-ink-700 mb-2">会話中 ({active.length})</h2>
        {active.length === 0 ? (
          <p className="text-center text-sm text-ink-500 py-12 border border-dashed border-ink-300 rounded-md">
            会話中のメッセージはありません
          </p>
        ) : (
          <div className="space-y-2">
            {active.map((t) => (
              <ThreadRow key={t.id} threadId={t.id} otherUserId={otherParticipant(t, CURRENT_USER_ID)} preview={t.messages[t.messages.length - 1]?.body ?? ''} time={t.lastMessageAt} unread={t.unreadFor === CURRENT_USER_ID} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ThreadRow({
  threadId,
  otherUserId,
  preview,
  time,
  pending,
  unread,
}: {
  threadId: string;
  otherUserId: string;
  preview: string;
  time: string;
  pending?: boolean;
  unread?: boolean;
}) {
  const u = findUser(otherUserId);
  const initial = u?.nickname?.slice(0, 1) ?? '?';
  return (
    <Link
      href={`/messages/${threadId}`}
      className={`flex items-center gap-3 p-3 rounded-lg border transition ${
        unread
          ? 'bg-brand-50 border-brand-200 hover:border-brand-500'
          : 'bg-white border-ink-300 hover:border-brand-500'
      }`}
    >
      <Avatar src={u?.photo} initial={initial} size={48} alt={u?.nickname} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm">{u?.nickname}</span>
          {u?.type === 'student' && <Badge variant="student" />}
          {u?.vip && <Badge variant="vip" />}
          {u?.highclass && <Badge variant="highclass" />}
          {pending && (
            <span className="text-xs text-brand-600 font-semibold">未承認</span>
          )}
        </div>
        <p className="text-sm text-ink-700 line-clamp-1 mt-0.5">{preview}</p>
      </div>
      <div className="text-xs text-ink-500 shrink-0">{time.slice(5)}</div>
      {unread && (
        <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" aria-label="未読" />
      )}
    </Link>
  );
}
