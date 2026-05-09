import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-ink-300 bg-ink-100 mt-12">
      <div className="container-narrow py-10 grid gap-6 md:grid-cols-3 text-sm text-ink-700">
        <div>
          <div className="text-lg font-bold text-brand-600 mb-2">JANMA</div>
          <p>麻雀を通じた新しいマッチングサービス（デモサイト）</p>
        </div>
        <div>
          <div className="font-semibold mb-2 text-ink-900">サービス</div>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:text-brand-600">サービスについて</Link></li>
            <li><Link href="/threads" className="hover:text-brand-600">スレッド一覧</Link></li>
            <li><Link href="/users" className="hover:text-brand-600">ユーザー検索</Link></li>
            <li><Link href="/messages" className="hover:text-brand-600">メッセージ</Link></li>
            <li><Link href="/signup/student" className="hover:text-brand-600">学生登録</Link></li>
            <li><Link href="/signup/pro" className="hover:text-brand-600">社会人登録（招待制）</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2 text-ink-900">規約・お問い合わせ</div>
          <ul className="space-y-1">
            <li><Link href="/terms" className="hover:text-brand-600">利用規約</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-600">プライバシーポリシー</Link></li>
            <li><Link href="/contact" className="hover:text-brand-600">お問い合わせ</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-300 py-4 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} JANMA. All rights reserved.（デモサイト）
      </div>
    </footer>
  );
}
