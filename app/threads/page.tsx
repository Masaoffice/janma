import Link from 'next/link';
import { threads } from '@/data/threads';
import ThreadCard from '@/components/ThreadCard';

export default function ThreadsPage() {
  return (
    <div className="container-narrow py-10">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">スレッド一覧</h1>
          <p className="text-sm text-ink-700 mt-1">
            麻雀を一緒に打ちたい人を探したり、自分から募集投稿をしたりできます。
          </p>
        </div>
        <Link href="/threads/new" className="btn-primary !py-2 !px-4 text-sm">
          + 新規投稿
        </Link>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['すべて', '渋谷', '新宿', '六本木', '池袋・高田馬場', '銀座', 'その他'].map((area) => (
          <button
            key={area}
            className="shrink-0 px-3 py-1.5 text-sm border border-ink-300 rounded-full hover:border-brand-500 hover:text-brand-600"
          >
            {area}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {threads.map((t) => (
          <ThreadCard key={t.id} thread={t} />
        ))}
      </div>

      <p className="text-center text-xs text-ink-500 mt-10">
        以上が現在の募集スレッドです（デモサイト・サンプルデータ）
      </p>
    </div>
  );
}
