import Link from 'next/link';
import { posts } from '@/data/posts';
import { findUser } from '@/data/users';
import Avatar from '@/components/Avatar';
import Badge from '@/components/Badge';

export default function PostsPage() {
  return (
    <div className="container-narrow py-6 max-w-2xl">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">つぶやき</h1>
        <p className="text-sm text-ink-700 mt-1">
          麻雀に関する短い投稿のタイムライン。
        </p>
      </header>

      {/* Compose */}
      <form className="bg-white border border-ink-300 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <Avatar initial="あ" size={40} alt="自分" />
          <div className="flex-1">
            <textarea
              rows={2}
              placeholder="麻雀のことをつぶやく…"
              className="w-full border-0 focus:outline-none focus:ring-0 resize-none text-sm placeholder:text-ink-500"
            />
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-ink-300">
              <span className="text-xs text-ink-500">最大140文字</span>
              <button type="button" className="btn-primary !py-1.5 !px-4 text-sm">
                投稿
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Timeline */}
      <div className="bg-white border border-ink-300 rounded-lg divide-y divide-ink-300">
        {posts.map((p) => {
          const author = findUser(p.authorId);
          const initial = author?.nickname?.slice(0, 1) ?? '?';
          return (
            <article key={p.id} className="p-4 hover:bg-ink-100/50 transition">
              <div className="flex gap-3">
                <Link href={`/profile/${author?.id}`} className="shrink-0">
                  <Avatar src={author?.photo} initial={initial} size={40} alt={author?.nickname} />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap text-sm">
                    <Link
                      href={`/profile/${author?.id}`}
                      className="font-semibold hover:text-brand-600"
                    >
                      {author?.nickname}
                    </Link>
                    {author?.type === 'student' && <Badge variant="student" />}
                    {author?.vip && <Badge variant="vip" />}
                    {author?.highclass && <Badge variant="highclass" />}
                    <span className="text-xs text-ink-500">・{p.postedAt.slice(5)}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-900 whitespace-pre-wrap leading-relaxed">
                    {p.body}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-ink-500">
                    <button type="button" className="flex items-center gap-1 hover:text-brand-600">
                      💬 <span>{p.replies}</span>
                    </button>
                    <button type="button" className="flex items-center gap-1 hover:text-red-500">
                      ♡ <span>{p.likes}</span>
                    </button>
                    <button type="button" className="hover:text-brand-600 ml-auto">
                      ⋮
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="text-center text-xs text-ink-500 mt-6">
        以上が現在のつぶやきです（デモサイト・サンプルデータ）
      </p>
    </div>
  );
}
