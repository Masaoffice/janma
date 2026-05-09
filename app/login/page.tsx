import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="container-narrow py-16 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-2">ログイン</h1>
      <p className="text-center text-sm text-ink-700 mb-8">
        ※デモサイトのため実際にはログインできません
      </p>
      <form className="space-y-4 bg-white border border-ink-300 rounded-lg p-6">
        <div>
          <label className="block text-sm font-semibold mb-1">メールアドレス</label>
          <input
            type="email"
            className="w-full border border-ink-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="example@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">パスワード</label>
          <input
            type="password"
            className="w-full border border-ink-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="••••••••"
          />
        </div>
        <button type="button" className="btn-primary w-full">ログイン</button>
        <div className="text-center text-sm">
          <Link href="/forgot" className="text-brand-600">パスワードをお忘れの方</Link>
        </div>
      </form>
      <p className="text-center mt-6 text-sm text-ink-700">
        アカウントをお持ちでないですか？{' '}
        <Link href="/signup/student" className="text-brand-600 font-semibold">学生登録</Link>
        {' / '}
        <Link href="/signup/pro" className="text-brand-600 font-semibold">社会人登録</Link>
      </p>
    </div>
  );
}
