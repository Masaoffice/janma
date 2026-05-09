import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-ink-300 bg-white sticky top-0 z-10">
      <div className="container-narrow flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-brand-600 tracking-wide">
          JANMA
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/threads" className="hover:text-brand-600">スレッド</Link>
          <Link href="/about" className="hover:text-brand-600">サービスについて</Link>
          <Link href="/login" className="hover:text-brand-600">ログイン</Link>
          <Link href="/signup/student" className="btn-primary !py-2 !px-4 text-sm">
            登録する
          </Link>
        </nav>
        <Link href="/signup/student" className="md:hidden btn-primary !py-2 !px-3 text-sm">
          登録
        </Link>
      </div>
    </header>
  );
}
