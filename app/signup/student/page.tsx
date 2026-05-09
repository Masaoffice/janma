import Link from 'next/link';

export default function StudentSignupPage() {
  return (
    <div className="container-narrow py-12 max-w-2xl">
      <div className="mb-8">
        <p className="text-sm text-brand-600 font-semibold mb-2">学生向け登録</p>
        <h1 className="text-3xl font-bold">アカウントを作成</h1>
        <p className="text-ink-700 mt-2 text-sm">
          学生のご利用は無料です。下記項目をご入力ください。
          ※デモサイトのため実際には送信されません。
        </p>
      </div>

      <form className="space-y-6 bg-white border border-ink-300 rounded-lg p-6">
        <Field label="ニックネーム" required>
          <input type="text" className={inputCls} placeholder="例: たぬき" />
        </Field>
        <Field label="メールアドレス" required>
          <input type="email" className={inputCls} placeholder="example@example.com" />
        </Field>
        <Field label="パスワード" required hint="8文字以上、英数字混在">
          <input type="password" className={inputCls} placeholder="••••••••" />
        </Field>
        <Field label="生年月日" required hint="18歳未満の方はご利用いただけません">
          <input type="date" className={inputCls} />
        </Field>
        <Field label="大学名" hint="任意（プロフィールに表示するかは選択可）">
          <input type="text" className={inputCls} placeholder="例: ○○大学" />
        </Field>

        <div className="border-t border-ink-300 pt-6">
          <h2 className="font-bold mb-3">本人確認書類</h2>
          <p className="text-xs text-ink-700 mb-4">
            アップロードされた書類はAIによる真贋判定後、暗号化して保管されます。第三者には提供されません。
          </p>
          <Field label="学生証" required>
            <FileInput />
          </Field>
          <Field label="顔写真（自撮り）" required>
            <FileInput />
          </Field>
          <Field label="生年月日確認書類" required hint="運転免許証 / マイナンバーカード等">
            <FileInput />
          </Field>
        </div>

        <div className="border-t border-ink-300 pt-6">
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1" />
            <span>
              <Link href="/terms" className="text-brand-600 underline">利用規約</Link>
              および
              <Link href="/privacy" className="text-brand-600 underline">プライバシーポリシー</Link>
              に同意します。
            </span>
          </label>
        </div>

        <button type="button" className="btn-primary w-full">
          登録を申請する
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-ink-700">
        既にアカウントをお持ちですか？{' '}
        <Link href="/login" className="text-brand-600 font-semibold">ログイン</Link>
      </p>
    </div>
  );
}

const inputCls =
  'w-full border border-ink-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent';

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-ink-500 mt-1">{hint}</p>}
    </div>
  );
}

function FileInput() {
  return (
    <div className="border-2 border-dashed border-ink-300 rounded-md p-6 text-center text-sm text-ink-500 hover:border-brand-500 transition cursor-pointer">
      クリックまたはドラッグ&ドロップでアップロード
    </div>
  );
}
