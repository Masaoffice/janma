import Link from 'next/link';
import { findUser } from '@/data/users';
import { threads } from '@/data/threads';
import { posts } from '@/data/posts';
import { CURRENT_USER_ID, getThreadsForUser } from '@/data/messages';
import Avatar from '@/components/Avatar';
import Badge from '@/components/Badge';
import ThreadCard from '@/components/ThreadCard';

export default function MePage() {
  const me = findUser(CURRENT_USER_ID);
  const myThreads = threads.filter((t) => t.authorId === CURRENT_USER_ID);
  const myPosts = posts.filter((p) => p.authorId === CURRENT_USER_ID);
  const dms = getThreadsForUser(CURRENT_USER_ID);
  const unreadCount = dms.filter((m) => m.unreadFor === CURRENT_USER_ID).length;
  const pendingCount = dms.filter((m) => m.status === 'pending').length;

  return (
    <div className="container-narrow py-6 max-w-3xl">
      {/* Profile summary */}
      <section className="bg-white border border-ink-300 rounded-lg p-5 mb-4">
        <div className="flex items-center gap-4">
          <Avatar src={me?.photo} initial={me?.nickname?.slice(0, 1) ?? '?'} size={72} alt={me?.nickname} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold">{me?.nickname}</h1>
              {me?.type === 'student' && <Badge variant="student" />}
              {me?.vip && <Badge variant="vip" />}
              {me?.highclass && <Badge variant="highclass" />}
              {me?.verified && me?.type !== 'student' && <Badge variant="verified" />}
            </div>
            <p className="text-sm text-ink-500 mt-0.5">{me?.age}歳・{me?.experience}</p>
            <Link href={`/profile/${CURRENT_USER_ID}`} className="text-xs text-brand-600 hover:underline mt-1 inline-block">
              プロフィールを表示 →
            </Link>
          </div>
          <Link href="/me/edit" className="btn-outline !py-2 !px-3 text-xs shrink-0">
            編集
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <StatCard label="未読メッセージ" value={unreadCount} link="/messages" highlight />
        <StatCard label="未承認リクエスト" value={pendingCount} link="/messages" />
        <StatCard label="投稿スレッド" value={myThreads.length} link="/me/threads" />
        <StatCard label="つぶやき" value={myPosts.length} link="/posts" />
      </section>

      {/* Quick actions */}
      <section className="bg-white border border-ink-300 rounded-lg p-4 mb-4">
        <h2 className="font-bold mb-3 text-sm">クイックアクション</h2>
        <div className="grid sm:grid-cols-2 gap-2">
          <ActionLink href="/threads/new" icon="➕" label="新規スレッドを投稿" />
          <ActionLink href="/users" icon="🔍" label="ユーザーを探す" />
          <ActionLink href="/me/matches" icon="🤝" label="マッチ履歴" />
          <ActionLink href="/me/kyc" icon="🛡" label="本人確認ステータス" />
          <ActionLink href="/me/reviews" icon="⭐" label="受け取ったレビュー" />
          <ActionLink href="/me/settings" icon="⚙️" label="アカウント設定" />
        </div>
      </section>

      {/* KYC notice */}
      <section className="bg-green-50 border border-green-200 rounded-md p-4 mb-4 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-green-700 font-bold">✓ 本人確認完了</span>
          <Badge variant="verified" />
        </div>
        <p className="text-ink-700 text-xs">
          身分証・顔写真の確認が完了しています。マッチ機能を制限なくご利用いただけます。
        </p>
      </section>

      {/* Recent activity: my threads */}
      <section className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-sm">最近の投稿スレッド</h2>
          <Link href="/me/threads" className="text-xs text-brand-600 hover:underline">
            すべて見る →
          </Link>
        </div>
        {myThreads.length === 0 ? (
          <p className="text-center text-sm text-ink-500 py-6 border border-dashed border-ink-300 rounded-md">
            まだ投稿していません
          </p>
        ) : (
          <div className="space-y-2">
            {myThreads.slice(0, 2).map((t) => (
              <ThreadCard key={t.id} thread={t} />
            ))}
          </div>
        )}
      </section>

      {/* Logout */}
      <section className="text-center mt-8">
        <Link href="/login" className="text-sm text-ink-500 hover:text-brand-600">
          ログアウト
        </Link>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  link,
  highlight,
}: {
  label: string;
  value: number;
  link: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={link}
      className={`block rounded-lg p-3 border transition ${
        highlight && value > 0
          ? 'border-brand-500 bg-brand-50 hover:bg-brand-100'
          : 'border-ink-300 bg-white hover:border-brand-500'
      }`}
    >
      <div className="text-xs text-ink-700">{label}</div>
      <div className={`text-2xl font-bold mt-0.5 ${highlight && value > 0 ? 'text-brand-600' : 'text-ink-900'}`}>
        {value}
      </div>
    </Link>
  );
}

function ActionLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-md border border-ink-300 bg-white hover:border-brand-500 transition text-sm"
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
      <span className="ml-auto text-ink-500">→</span>
    </Link>
  );
}
