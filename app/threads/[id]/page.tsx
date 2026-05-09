import Link from 'next/link';
import { notFound } from 'next/navigation';
import { threads, findThread } from '@/data/threads';
import { findUser } from '@/data/users';
import Avatar from '@/components/Avatar';
import Badge from '@/components/Badge';

export function generateStaticParams() {
  return threads.map((t) => ({ id: t.id }));
}

export default function ThreadDetailPage({ params }: { params: { id: string } }) {
  const thread = findThread(params.id);
  if (!thread) return notFound();
  const author = findUser(thread.authorId);
  const initial = author?.nickname?.slice(0, 1) ?? '?';

  return (
    <div className="container-narrow py-8 max-w-3xl">
      <Link href="/threads" className="text-sm text-brand-600 hover:underline">
        ← スレッド一覧へ
      </Link>

      {/* Thread body */}
      <article className="mt-4 bg-white border border-ink-300 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <Avatar src={author?.photo} initial={initial} size={56} alt={author?.nickname} />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/profile/${author?.id}`}
                className="font-semibold hover:text-brand-600"
              >
                {author?.nickname ?? '不明'}
              </Link>
              {author?.type === 'student' && <Badge variant="student" />}
              {author?.vip && <Badge variant="vip" />}
              {author?.highclass && <Badge variant="highclass" />}
              {author?.verified && author?.type !== 'student' && <Badge variant="verified" />}
            </div>
            <div className="text-xs text-ink-500 mt-0.5">投稿日時: {thread.postedAt}</div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-3">{thread.title}</h1>
        <p className="text-ink-700 whitespace-pre-wrap leading-relaxed">{thread.body}</p>

        <div className="mt-5 grid grid-cols-2 gap-2 text-sm bg-ink-100 rounded-md p-4">
          <Detail label="エリア" value={thread.area} />
          <Detail label="希望日時" value={thread.date} />
          <Detail label="募集人数" value={`${thread.capacity}名`} />
          <Detail label="ルール" value={thread.rule} />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button type="button" className="btn-primary flex-1">
            このスレッドに参加希望を送る
          </button>
          <button type="button" className="btn-outline">
            ⋮ 通報
          </button>
        </div>
        <p className="text-xs text-ink-500 mt-3">
          ※ 個別チャット移行後にマッチング成立ボタンを押すと、社会人側に課金が発生します。
        </p>
      </article>

      {/* Replies */}
      <section className="mt-8">
        <h2 className="font-bold mb-4">返信 ({thread.replies.length})</h2>
        <div className="space-y-3">
          {thread.replies.length === 0 && (
            <p className="text-sm text-ink-500 text-center py-8 border border-dashed border-ink-300 rounded-md">
              まだ返信はありません
            </p>
          )}
          {thread.replies.map((r) => {
            const u = findUser(r.authorId);
            return (
              <div key={r.id} className="bg-white border border-ink-300 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Avatar
                    src={u?.photo}
                    initial={u?.nickname?.slice(0, 1) ?? '?'}
                    size={40}
                    alt={u?.nickname}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap text-sm">
                      <Link
                        href={`/profile/${u?.id}`}
                        className="font-semibold hover:text-brand-600"
                      >
                        {u?.nickname}
                      </Link>
                      {u?.type === 'student' && <Badge variant="student" />}
                      {u?.vip && <Badge variant="vip" />}
                      {u?.highclass && <Badge variant="highclass" />}
                      <span className="text-xs text-ink-500">・{r.postedAt}</span>
                    </div>
                    <p className="mt-1 text-sm text-ink-700 whitespace-pre-wrap">{r.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply form */}
        <form className="mt-6 bg-white border border-ink-300 rounded-lg p-4">
          <label className="block text-sm font-semibold mb-2">返信を投稿</label>
          <textarea
            rows={3}
            className="w-full border border-ink-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="参加意思や質問を書いてください"
          />
          <div className="mt-3 flex justify-end">
            <button type="button" className="btn-primary !py-2 !px-4 text-sm">
              送信
            </button>
          </div>
          <p className="text-xs text-ink-500 mt-2">
            連絡先（LINE等）の交換はマッチ成立後にお願いします。NGワードは自動検知されます。
          </p>
        </form>
      </section>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-ink-500">{label}</div>
      <div className="font-semibold text-ink-900">{value}</div>
    </div>
  );
}
