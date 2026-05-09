import Link from 'next/link';

export default function NewThreadPage() {
  return (
    <div className="container-narrow py-6 max-w-2xl">
      <Link href="/threads" className="text-sm text-brand-600 hover:underline">
        ← スレッド一覧へ
      </Link>

      <header className="mt-3 mb-6">
        <h1 className="text-2xl font-bold">新規投稿</h1>
        <p className="text-sm text-ink-700 mt-1">
          麻雀の卓を立てる募集投稿を作成します。
        </p>
      </header>

      <form className="bg-white border border-ink-300 rounded-lg p-5 space-y-5">
        <Field label="タイトル" required hint="例: 土曜19時から渋谷で半荘2回">
          <input type="text" className={inputCls} placeholder="募集タイトル" />
        </Field>

        <Field label="本文" required hint="集合場所・時間・人数・条件など">
          <textarea
            rows={5}
            className={inputCls}
            placeholder="例: 渋谷ABC雀荘で半荘2回。19:00集合、23:00頃終了予定。場代はこちら持ちで。マナー重視。"
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="エリア" required>
            <select className={inputCls}>
              <option>渋谷</option>
              <option>新宿</option>
              <option>池袋</option>
              <option>銀座</option>
              <option>六本木</option>
              <option>高田馬場</option>
              <option>その他（本文に記載）</option>
            </select>
          </Field>
          <Field label="希望日時" required>
            <input type="datetime-local" className={inputCls} />
          </Field>
          <Field label="募集人数" required hint="自分以外の人数">
            <select className={inputCls}>
              <option>1名</option>
              <option>2名</option>
              <option defaultValue="3">3名</option>
              <option>その他</option>
            </select>
          </Field>
          <Field label="ルール" required>
            <select className={inputCls}>
              <option>半荘・赤あり</option>
              <option>半荘・赤なし</option>
              <option>東風・赤あり</option>
              <option>東風・赤なし</option>
              <option>三麻</option>
              <option>その他（本文に記載）</option>
            </select>
          </Field>
        </div>

        <div className="border-t border-ink-300 pt-5">
          <h2 className="font-bold mb-2 text-sm">追加オプション</h2>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-ink-300" />
              <span>初心者OK</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-ink-300" />
              <span>場代は投稿者持ち</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-ink-300" />
              <span>マナー重視（雑談多めOK）</span>
            </label>
          </div>
        </div>

        <div className="bg-ink-100 rounded-md p-3 text-xs text-ink-700">
          ⚠️ <strong>注意事項:</strong>
          <ul className="mt-1 ml-4 list-disc space-y-0.5">
            <li>賭け麻雀の示唆は禁止です（投稿は即削除されます）</li>
            <li>連絡先（LINE等）の記載は禁止です</li>
            <li>違反投稿はNGワード自動検知で削除対象になります</li>
          </ul>
        </div>

        <div className="flex gap-3 justify-end">
          <Link href="/threads" className="btn-outline">
            キャンセル
          </Link>
          <button type="button" className="btn-primary">
            投稿する
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  'w-full border border-ink-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent';

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
