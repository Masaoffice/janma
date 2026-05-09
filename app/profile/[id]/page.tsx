import Link from 'next/link';
import { notFound } from 'next/navigation';
import { users, findUser } from '@/data/users';
import { threads } from '@/data/threads';
import { messageThreads, CURRENT_USER_ID } from '@/data/messages';
import Avatar from '@/components/Avatar';
import Badge from '@/components/Badge';
import ThreadCard from '@/components/ThreadCard';

export function generateStaticParams() {
  return users.map((u) => ({ id: u.id }));
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const user = findUser(params.id);
  if (!user) return notFound();
  const initial = user.nickname.slice(0, 1);
  const userThreads = threads.filter((t) => t.authorId === user.id);

  return (
    <div className="container-narrow py-8 max-w-3xl">
      <Link href="/threads" className="text-sm text-brand-600 hover:underline">
        ← スレッド一覧へ
      </Link>

      {/* Profile card */}
      <div className="mt-4 bg-white border border-ink-300 rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Avatar src={user.photo} initial={initial} size={120} alt={user.nickname} />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.nickname}</h1>
            <p className="text-sm text-ink-500 mt-0.5">{user.age}歳</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {user.type === 'student' && <Badge variant="student" />}
              {user.vip && <Badge variant="vip" />}
              {user.highclass && <Badge variant="highclass" />}
              {user.verified && <Badge variant="verified" />}
            </div>

            <dl className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
              {user.university && (
                <div>
                  <dt className="text-xs text-ink-500">大学</dt>
                  <dd className="font-semibold">{user.university}</dd>
                </div>
              )}
              {user.occupation && (
                <div>
                  <dt className="text-xs text-ink-500">職業ジャンル</dt>
                  <dd className="font-semibold">{user.occupation}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs text-ink-500">麻雀経験</dt>
                <dd className="font-semibold">{user.experience}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-ink-300">
          <h2 className="font-bold mb-2 text-sm">自己紹介</h2>
          <p className="text-ink-700 whitespace-pre-wrap text-sm">{user.bio}</p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {(() => {
            const existing = messageThreads.find(
              (m) =>
                m.participantIds.includes(user.id) &&
                m.participantIds.includes(CURRENT_USER_ID)
            );
            return existing ? (
              <Link href={`/messages/${existing.id}`} className="btn-primary flex-1 text-center">
                メッセージを開く
              </Link>
            ) : (
              <Link href="/messages" className="btn-primary flex-1 text-center">
                メッセージを送る
              </Link>
            );
          })()}
          <button type="button" className="btn-outline">
            ⋮ 通報
          </button>
        </div>
        <p className="text-xs text-ink-500 mt-2">
          初めての相手へのメッセージは「リクエスト」として送られ、相手の承認後に会話が開始されます。
        </p>
      </div>

      {/* Posted threads */}
      <section className="mt-10">
        <h2 className="font-bold mb-4">投稿したスレッド ({userThreads.length})</h2>
        {userThreads.length === 0 ? (
          <p className="text-sm text-ink-500 text-center py-8 border border-dashed border-ink-300 rounded-md">
            このユーザーが投稿したスレッドはありません
          </p>
        ) : (
          <div className="space-y-3">
            {userThreads.map((t) => (
              <ThreadCard key={t.id} thread={t} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
