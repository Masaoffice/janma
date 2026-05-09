import Link from 'next/link';

export default function ProSignupPage() {
  return (
    <div className="container-narrow py-12 max-w-2xl">
      <div className="mb-8">
        <p className="text-sm text-brand-600 font-semibold mb-2">社会人向け登録</p>
        <h1 className="text-3xl font-bold">アカウントを作成</h1>
        <p className="text-ink-700 mt-2 text-sm">
          社会人のご利用は紹介制です。招待コードをお持ちの方のみ登録可能です。
          ※デモサイトのため実際には送信されません。
        </p>
      </div>

      <form className="space-y-6 bg-white border border-ink-300 rounded-lg p-6">
        <Field label="招待コード" required hint="運営または既存会員から発行されたコード">
          <input type="text" className={inputCls} placeholder="例: JANMA-XXXXX" />
        </Field>
        <Field label="ニックネーム" required>
          <input type="text" className={inputCls} placeholder="例: 山田" />
        </Field>
        <Field label="メールアドレス" required>
          <input type="email" className={inputCls} placeholder="example@example.com" />
        </Field>
        <Field label="パスワード" required hint="8文字以上、英数字混在">
          <input type="password" className={inputCls} placeholder="••••••••" />
        </Field>
        <Field label="生年月日" required>
          <input type="date" className={inputCls} />
        </Field>
        <Field label="職業ジャンル" hint="プロフィールへの表示は任意">
          <select className={inputCls}>
            <option value="">選択してください</option>
            <option>IT・経営</option>
            <option>金融</option>
            <option>コンサル</option>
            <option>医療</option>
            <option>士業</option>
            <option>不動産</option>
            <option>製造業</option>
            <option>その他</option>
          </select>
        </Field>

        <div className="border-t border-ink-300 pt-6">
          <h2 className="font-bold mb-3">本人確認書類（必須）</h2>
          <p className="text-xs text-ink-700 mb-4">
            アップロードされた書類はAIによる真贋判定後、暗号化して保管されます。
          </p>
          <Field label="公的身分証明書" required hint="運転免許証 / マイナンバーカード / パスポート等">
            <FileInput />
          </Field>
          <Field label="顔写真（自撮り）" required>
            <FileInput />
          </Field>
        </div>

        <div className="border-t border-ink-300 pt-6">
          <h2 className="font-bold mb-3">年収証明書類（任意）</h2>
          <p className="text-xs text-ink-700 mb-4">
            年収1000万円以上を証明された場合、プロフィールに「ハイクラスバッジ」が付与されます。
          </p>
          <Field label="年収証明書" hint="源泉徴収票 / 確定申告書等（任意）">
            <FileInput />
          </Field>
        </div>

        <div className="border-t border-ink-300 pt-6">
          <div className="bg-brand-50 border border-brand-200 rounded-md p-4 text-sm mb-4">
            <strong>料金について:</strong>
            <ul className="mt-2 space-y-1 text-ink-700">
              <li>・1マッチ成立ごとに ¥50,000（マッチ確定時に課金）</li>
              <li>・VIP会員: ¥80,000 / 月（プロフィールに「VIP」表示。マッチ料金は別途）</li>
              <li>・キャンセル料は規約に準じます</li>
            </ul>
          </div>

          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1" />
            <span>
              <Link href="/terms" className="text-brand-600 underline">利用規約</Link>
              、
              <Link href="/privacy" className="text-brand-600 underline">プライバシーポリシー</Link>
              、
              および賭け麻雀禁止・私的金銭授受禁止のルールに同意します。
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
