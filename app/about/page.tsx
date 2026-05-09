export default function AboutPage() {
  return (
    <div className="container-narrow py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-3">サービスについて</h1>
      <p className="text-ink-700 mb-8">
        JANMAは、麻雀を一緒に打つ相手を見つけるためのマッチングサービスです。
        賭け麻雀は明確に禁止し、安心して卓を囲める環境を提供します。
      </p>

      <Section title="サービスの方針">
        <ul className="list-disc pl-5 space-y-1 text-ink-700">
          <li>麻雀を打つこと、それ自体を目的としたマッチングです</li>
          <li>賭け麻雀は禁止です。違反者は即時BANとなります</li>
          <li>マッチ成立前のアプリ外連絡先交換は禁止です</li>
          <li>金銭授受（マッチ料金以外）の発覚は即時BANとなります</li>
        </ul>
      </Section>

      <Section title="安心・安全への取り組み">
        <ul className="list-disc pl-5 space-y-1 text-ink-700">
          <li>全ユーザーへのeKYC（本人確認）を必須化</li>
          <li>18歳未満の方の利用は完全に排除</li>
          <li>AIによるNGワード自動検知 + 人力監査</li>
          <li>通報フォーム / 24時間以内の一次対応</li>
          <li>事件・トラブル発生時は警察等への協力体制を整備</li>
        </ul>
      </Section>

      <Section title="料金">
        <ul className="list-disc pl-5 space-y-1 text-ink-700">
          <li>学生: 完全無料（金銭の受領も一切なし）</li>
          <li>社会人: 1マッチ ¥50,000</li>
          <li>VIP会員: 月額 ¥80,000（マッチ料金は別途）</li>
          <li>キャンセルポリシー: 詳細は利用規約をご確認ください</li>
        </ul>
      </Section>

      <Section title="禁止事項">
        <ul className="list-disc pl-5 space-y-1 text-ink-700">
          <li>賭け麻雀の示唆・実施</li>
          <li>金銭授受の打診（マッチ料金を除く）</li>
          <li>性的な誘い・接触</li>
          <li>ハラスメント・脅迫</li>
          <li>マッチ成立前の連絡先交換</li>
          <li>身分証偽装</li>
        </ul>
      </Section>

      <Section title="運営者情報">
        <p className="text-ink-700">
          ※デモサイトのため運営者情報は省略しています。本番サービスでは、特定商取引法に基づく表記、
          インターネット異性紹介事業届出番号等を記載予定です。
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-3 border-l-4 border-brand-500 pl-3">{title}</h2>
      {children}
    </section>
  );
}
