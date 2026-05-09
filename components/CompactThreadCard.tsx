import Link from 'next/link';
import { Thread } from '@/data/threads';
import { findUser } from '@/data/users';
import Avatar from './Avatar';
import Badge from './Badge';

/**
 * 横スクロール用のコンパクトなスレッドカード。
 */
export default function CompactThreadCard({ thread }: { thread: Thread }) {
  const author = findUser(thread.authorId);
  const initial = author?.nickname?.slice(0, 1) ?? '?';
  return (
    <Link
      href={`/threads/${thread.id}`}
      className="shrink-0 w-72 bg-white border border-ink-300 rounded-lg p-3 hover:border-brand-500 transition"
    >
      <div className="flex items-center gap-2 mb-2">
        <Avatar src={author?.photo} initial={initial} size={32} alt={author?.nickname} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-semibold text-xs truncate">{author?.nickname}</span>
            {author?.vip && <Badge variant="vip" />}
            {author?.highclass && <Badge variant="highclass" />}
          </div>
        </div>
      </div>
      <h3 className="font-bold text-sm line-clamp-1">{thread.title}</h3>
      <p className="text-xs text-ink-700 line-clamp-2 mt-1">{thread.body}</p>
      <div className="mt-2 flex flex-wrap gap-1 text-[10px]">
        <span className="px-1.5 py-0.5 bg-ink-100 rounded">📍 {thread.area}</span>
        <span className="px-1.5 py-0.5 bg-ink-100 rounded">🗓 {thread.date.slice(5, 16)}</span>
        <span className="px-1.5 py-0.5 bg-ink-100 rounded">👥 {thread.capacity}名</span>
      </div>
    </Link>
  );
}
