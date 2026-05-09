import Link from 'next/link';
import { Thread } from '@/data/threads';
import { findUser } from '@/data/users';
import Avatar from './Avatar';
import Badge from './Badge';

export default function ThreadCard({ thread }: { thread: Thread }) {
  const author = findUser(thread.authorId);
  const initial = author?.nickname?.slice(0, 1) ?? '?';

  return (
    <Link
      href={`/threads/${thread.id}`}
      className="block border border-ink-300 rounded-lg p-4 hover:border-brand-500 hover:shadow-sm transition bg-white"
    >
      <div className="flex items-start gap-3">
        <Avatar src={author?.photo} initial={initial} size={44} alt={author?.nickname} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">{author?.nickname ?? '不明'}</span>
            {author?.type === 'student' && <Badge variant="student" />}
            {author?.vip && <Badge variant="vip" />}
            {author?.highclass && <Badge variant="highclass" />}
            <span className="text-xs text-ink-500">・{thread.postedAt}</span>
          </div>
          <h3 className="mt-1 font-bold text-base text-ink-900 line-clamp-1">{thread.title}</h3>
          <p className="text-sm text-ink-700 line-clamp-2 mt-1">{thread.body}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-0.5 bg-ink-100 rounded">📍 {thread.area}</span>
            <span className="px-2 py-0.5 bg-ink-100 rounded">🗓 {thread.date}</span>
            <span className="px-2 py-0.5 bg-ink-100 rounded">👥 募集 {thread.capacity}名</span>
            <span className="px-2 py-0.5 bg-ink-100 rounded">🀄 {thread.rule}</span>
            <span className="px-2 py-0.5 bg-ink-100 rounded">💬 {thread.replies.length}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
