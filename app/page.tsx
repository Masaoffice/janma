import Link from 'next/link';
import { users } from '@/data/users';
import { threads } from '@/data/threads';
import { posts } from '@/data/posts';
import { findUser } from '@/data/users';
import { CURRENT_USER_ID, getThreadsForUser } from '@/data/messages';
import CompactUserCard from '@/components/CompactUserCard';
import CompactThreadCard from '@/components/CompactThreadCard';
import SectionHeader from '@/components/SectionHeader';
import Avatar from '@/components/Avatar';
import Badge from '@/components/Badge';

export default function HomePage() {
  const me = findUser(CURRENT_USER_ID);
  const dms = getThreadsForUser(CURRENT_USER_ID);
  const unread = dms.filter((m) => m.unreadFor === CURRENT_USER_ID).length;
  const featuredThreads = threads.slice(0, 5);
  const recentUsers = users.slice(0, 6);
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="bg-ink-100/60 min-h-screen">
      {/* Search bar */}
      <div className="bg-white border-b border-ink-300 px-4 py-3 sticky top-16 z-[5]">
        <div className="container-narrow !px-0">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 エリア・経験・キーワードで検索"
              className="w-full bg-ink-100 rounded-full px-4 py-2 text-sm pl-10 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">🔍</span>
          </div>
        </div>
      </div>

      <div className="container-narrow py-4 space-y-6">
        {/* Greeting + quick stats */}
        <section className="bg-white rounded-lg border border-ink-300 p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar src={me?.photo} initial={me?.nickname?.slice(0, 1) ?? '?'} size={48} alt={me?.nickname} />
            <div className="flex-1">
              <p className="text-xs text-ink-500">ようこそ</p>
              <p className="font-bold">{me?.nickname} さん</p>
            </div>
            {unread > 0 && (
              <Link
                href="/messages"
                className="bg-brand-50 border border-brand-200 rounded-md px-3 py-1.5 text-xs text-brand-700 font-semibold hover:bg-brand-100"
              >
                💬 未読 {unread}
              </Link>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <Link href="/threads" className="bg-ink-100 rounded-md py-2 hover:bg-brand-50 hover:text-brand-700 transition">
              <div className="text-xl">🀄</div>
              <div className="text-[10px] mt-0.5">募集を見る</div>
            </Link>
            <Link href="/threads/new" className="bg-brand-50 text-brand-700 rounded-md py-2 hover:bg-brand-100 transition">
              <div className="text-xl">➕</div>
              <div className="text-[10px] mt-0.5 font-semibold">卓を立てる</div>
            </Link>
            <Link href="/users" className="bg-ink-100 rounded-md py-2 hover:bg-brand-50 hover:text-brand-700 transition">
              <div className="text-xl">👥</div>
              <div className="text-[10px] mt-0.5">仲間を探す</div>
            </Link>
          </div>
        </section>

        {/* Promo banner */}
        <section>
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 text-white p-5">
            <div className="relative z-10">
              <p className="text-xs font-semibold opacity-90">JANMA</p>
              <h2 className="text-xl font-bold mt-1 leading-tight">
                本人確認済みの仲間と<br />一卓を囲もう
              </h2>
              <p className="text-xs mt-2 opacity-90">
                賭けなし・マナー重視・eKYC必須
              </p>
              <Link
                href="/about"
                className="inline-block mt-3 bg-white text-brand-700 text-xs font-bold px-4 py-1.5 rounded-full hover:bg-brand-50"
              >
                もっと見る
              </Link>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl opacity-20">🀄</div>
          </div>
        </section>

        {/* Featured threads */}
        <section>
          <SectionHeader title="今日の募集" href="/threads" hint="麻雀仲間を募集中の卓" />
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
            {featuredThreads.map((t) => (
              <div key={t.id} className="snap-start">
                <CompactThreadCard thread={t} />
              </div>
            ))}
          </div>
        </section>

        {/* Recent users */}
        <section>
          <SectionHeader title="最近活動したユーザー" href="/users" hint="最近スレッド・投稿があった人" />
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
            {recentUsers.map((u) => (
              <div key={u.id} className="snap-start">
                <CompactUserCard user={u} />
              </div>
            ))}
          </div>
        </section>

        {/* Recent tsubuyaki */}
        <section>
          <SectionHeader title="つぶやき" href="/posts" hint="麻雀仲間のひとこと" />
          <div className="bg-white rounded-lg border border-ink-300 divide-y divide-ink-300">
            {recentPosts.map((p) => {
              const a = findUser(p.authorId);
              return (
                <Link
                  key={p.id}
                  href="/posts"
                  className="block p-3 hover:bg-ink-100/50 transition"
                >
                  <div className="flex items-start gap-2">
                    <Avatar src={a?.photo} initial={a?.nickname?.slice(0, 1) ?? '?'} size={32} alt={a?.nickname} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="font-semibold text-xs">{a?.nickname}</span>
                        {a?.vip && <Badge variant="vip" />}
                        <span className="text-[10px] text-ink-500">・{p.postedAt.slice(5)}</span>
                      </div>
                      <p className="text-xs text-ink-900 mt-0.5 line-clamp-2">{p.body}</p>
                      <div className="flex gap-3 mt-1 text-[10px] text-ink-500">
                        <span>💬 {p.replies}</span>
                        <span>♡ {p.likes}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Safety info */}
        <section className="bg-white rounded-lg border border-ink-300 p-4">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
            🛡 安心して使えるサービス
          </h3>
          <ul className="space-y-1 text-xs text-ink-700">
            <li>✓ 全ユーザーeKYC本人確認済み</li>
            <li>✓ 18歳未満は完全に排除</li>
            <li>✓ 賭け麻雀 / 金銭授受は厳格に禁止</li>
            <li>✓ NGワード自動検知 + 24時間以内の通報対応</li>
          </ul>
          <Link href="/about" className="block mt-3 text-xs text-brand-600 hover:underline">
            サービスの詳細を見る →
          </Link>
        </section>

        {/* Footer CTA (for logged-out experience) */}
        <section className="bg-white rounded-lg border border-ink-300 p-4 text-center">
          <p className="text-xs text-ink-700 mb-3">まだ登録していない方へ</p>
          <div className="flex flex-col gap-2">
            <Link href="/signup/student" className="btn-primary text-sm">
              学生として無料登録
            </Link>
            <Link href="/signup/pro" className="btn-outline text-sm">
              社会人として登録（招待制）
            </Link>
          </div>
          <p className="text-[10px] text-ink-500 mt-2">
            ※ 18歳未満の方はご利用いただけません
          </p>
        </section>
      </div>
    </div>
  );
}
