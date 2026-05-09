import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-narrow py-20 md:py-28 text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest mb-4">
            麻雀マッチングサービス
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            一卓を、<br className="md:hidden" />
            一期一会に。
          </h1>
          <p className="mt-6 text-lg text-ink-700 max-w-2xl mx-auto">
            JANMAは、麻雀を一緒に打つ相手を見つけるためのマッチングサービスです。
            学生も社会人も、本人確認を済ませた安心の環境で、卓を囲む仲間と出会えます。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup/student" className="btn-primary">
              学生として無料登録
            </Link>
            <Link href="/signup/pro" className="btn-outline">
              社会人として登録（招待制）
            </Link>
          </div>
          <p className="mt-4 text-xs text-ink-500">
            ※ 18歳未満の方はご利用いただけません ・ 賭け麻雀禁止
          </p>
        </div>
      </section>

      {/* Concept */}
      <section className="py-20">
        <div className="container-narrow grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '🀄',
              title: '麻雀ファースト',
              text: '麻雀を打つこと、それ自体を目的としたサービスです。賭け麻雀は明確に禁止しています。',
            },
            {
              icon: '🛡',
              title: '本人確認必須',
              text: '全ユーザーに公的身分証によるeKYC（本人確認）を実施。18歳未満は完全排除。',
            },
            {
              icon: '🤝',
              title: '紹介制（社会人）',
              text: '社会人側は紹介制で参加。質の高いコミュニティを維持します。',
            },
          ].map((c) => (
            <div key={c.title} className="text-center">
              <div className="text-4xl mb-3">{c.icon}</div>
              <h3 className="font-bold text-lg mb-2">{c.title}</h3>
              <p className="text-sm text-ink-700">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-ink-100">
        <div className="container-narrow">
          <h2 className="text-3xl font-bold text-center mb-12">ご利用の流れ</h2>
          <ol className="space-y-6 max-w-2xl mx-auto">
            {[
              { n: 1, t: 'アカウント登録', d: '学生は無料、社会人は紹介制。本人確認書類をアップロードします。' },
              { n: 2, t: 'スレッド投稿 / 閲覧', d: '希望日時・エリア・人数を投稿、または既存スレッドに反応。' },
              { n: 3, t: '個別チャットで調整', d: '日時・場所・卓のセッティングをチャットで詰めます。' },
              { n: 4, t: 'マッチング成立', d: '双方合意でマッチ確定。社会人側に1マッチ¥50,000の課金が発生。' },
              { n: 5, t: '麻雀を打つ', d: '当日、現地で対面。レビューを相互に投稿してください。' },
            ].map((s) => (
              <li key={s.n} className="flex gap-4 items-start bg-white rounded-lg p-5 border border-ink-300">
                <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center shrink-0">
                  {s.n}
                </div>
                <div>
                  <h4 className="font-bold">{s.t}</h4>
                  <p className="text-sm text-ink-700 mt-1">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container-narrow">
          <h2 className="text-3xl font-bold text-center mb-12">料金</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="border-2 border-ink-300 rounded-lg p-6">
              <div className="text-sm font-semibold text-ink-500 mb-2">学生</div>
              <div className="text-4xl font-bold mb-2">¥0</div>
              <p className="text-sm text-ink-700">完全無料。金銭の受領も一切ありません。</p>
              <ul className="mt-4 space-y-1 text-sm text-ink-700">
                <li>✓ 登録・利用すべて無料</li>
                <li>✓ スレッド投稿無制限</li>
                <li>✓ 本人確認込み</li>
              </ul>
            </div>
            <div className="border-2 border-brand-500 rounded-lg p-6 bg-brand-50">
              <div className="text-sm font-semibold text-brand-600 mb-2">社会人</div>
              <div className="text-4xl font-bold mb-2">
                ¥50,000<span className="text-base font-normal text-ink-700"> / 1マッチ</span>
              </div>
              <p className="text-sm text-ink-700">マッチ成立時のみ課金。VIP会員は月額¥80,000。</p>
              <ul className="mt-4 space-y-1 text-sm text-ink-700">
                <li>✓ 1マッチ¥50,000</li>
                <li>✓ 紹介制で参加</li>
                <li>✓ 年収証明でハイクラスバッジ</li>
                <li>✓ VIP会員（¥80,000/月）でプロフィールに表示</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold mb-4">まずは登録から</h2>
          <p className="mb-8 opacity-90">本人確認を済ませて、卓を囲む仲間を見つけましょう。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup/student"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-brand-600 font-semibold rounded-md hover:bg-brand-50 transition"
            >
              学生として無料登録
            </Link>
            <Link
              href="/signup/pro"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-brand-700 transition"
            >
              社会人として登録（招待制）
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
