'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MessageThread, CURRENT_USER_ID, otherParticipant } from '@/data/messages';
import { findUser } from '@/data/users';
import { detectNgWords } from '@/data/ngwords';
import Avatar from '@/components/Avatar';
import Badge from '@/components/Badge';

export default function DMThreadView({ thread }: { thread: MessageThread }) {
  const otherUserId = otherParticipant(thread, CURRENT_USER_ID);
  const other = findUser(otherUserId);
  const me = findUser(CURRENT_USER_ID);

  const [draft, setDraft] = useState('');
  const ngHits = useMemo(() => detectNgWords(draft), [draft]);

  return (
    <div className="container-narrow py-6 max-w-3xl">
      <Link href="/messages" className="text-sm text-brand-600 hover:underline">
        ← メッセージ一覧へ
      </Link>

      {/* Thread header */}
      <header className="mt-3 bg-white border border-ink-300 rounded-lg p-4 flex items-center gap-3">
        <Avatar
          src={other?.photo}
          initial={other?.nickname?.slice(0, 1) ?? '?'}
          size={48}
          alt={other?.nickname}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/profile/${other?.id}`} className="font-bold hover:text-brand-600">
              {other?.nickname}
            </Link>
            {other?.type === 'student' && <Badge variant="student" />}
            {other?.vip && <Badge variant="vip" />}
            {other?.highclass && <Badge variant="highclass" />}
            {other?.verified && <Badge variant="verified" />}
          </div>
          {thread.startedFromThreadId && (
            <Link
              href={`/threads/${thread.startedFromThreadId}`}
              className="text-xs text-ink-500 hover:text-brand-600"
            >
              元スレッド: {thread.startedFromThreadId} →
            </Link>
          )}
        </div>
        <button type="button" className="text-xs text-ink-500 hover:text-brand-600 shrink-0" title="通報">
          ⋮ 通報
        </button>
      </header>

      {/* Pending notice */}
      {thread.status === 'pending' && (
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-md p-4 text-sm">
          <div className="font-semibold text-amber-900 mb-1">⚠️ メッセージリクエスト</div>
          <p className="text-amber-900 mb-3">
            初めての相手からのメッセージです。承認すると会話が開始されます。
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-primary !py-2 !px-4 text-sm">
              承認
            </button>
            <button type="button" className="btn-outline !py-2 !px-4 text-sm">
              拒否
            </button>
            <button
              type="button"
              className="!py-2 !px-4 text-sm border border-red-300 text-red-700 rounded-md hover:bg-red-50"
            >
              通報してブロック
            </button>
          </div>
        </div>
      )}

      {/* Safety notice */}
      <div className="mt-3 bg-ink-100 border border-ink-300 rounded-md p-3 text-xs text-ink-700">
        🛡 <strong>マッチ成立前の連絡先（LINE / カカオ等）の交換は禁止です。</strong>
        違反するとアカウント停止対象になります。チャット内容はNGワード自動検知の対象です。
      </div>

      {/* Messages */}
      <div className="mt-3 bg-white border border-ink-300 rounded-lg p-4 space-y-4 min-h-[300px]">
        {thread.messages.map((m) => {
          const isMe = m.senderId === CURRENT_USER_ID;
          const sender = isMe ? me : other;
          const senderHits = detectNgWords(m.body);
          return (
            <div key={m.id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
              <Avatar
                src={sender?.photo}
                initial={sender?.nickname?.slice(0, 1) ?? '?'}
                size={32}
                alt={sender?.nickname}
              />
              <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                <div
                  className={`rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                    isMe ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-900'
                  }`}
                >
                  {m.body}
                </div>
                {senderHits.length > 0 && (
                  <div className="mt-1 text-[11px] text-red-600">
                    ⚠️ NGワード検知: {senderHits.map((h) => h.word).join(', ')}
                  </div>
                )}
                <div className="text-[10px] text-ink-500 mt-0.5">{m.sentAt.slice(5)}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Match button */}
      {thread.status === 'active' && (
        <div className="mt-3 bg-brand-50 border border-brand-200 rounded-md p-4 text-sm">
          <div className="font-semibold mb-1">マッチング成立ボタン</div>
          <p className="text-ink-700 mb-3">
            日時・場所が確定したら、双方で「マッチ成立」をタップしてください。タップ後、社会人側に
            <strong> ¥50,000 </strong>
            の課金が発生します。キャンセルポリシーは
            <Link href="/about" className="text-brand-600 underline mx-1">
              こちら
            </Link>
            。
          </p>
          <button type="button" className="btn-primary !py-2 !px-4 text-sm">
            🤝 マッチング成立を確認
          </button>
        </div>
      )}

      {/* Composer */}
      <form className="mt-3 bg-white border border-ink-300 rounded-lg p-3">
        {ngHits.length > 0 && (
          <div className="mb-2 bg-red-50 border border-red-200 rounded-md p-2 text-xs text-red-700">
            ⚠️ NGワードが含まれています:
            <ul className="mt-1 ml-4 list-disc">
              {ngHits.map((h, i) => (
                <li key={i}>
                  <strong>{h.word}</strong> - {h.reason}
                </li>
              ))}
            </ul>
          </div>
        )}
        <textarea
          rows={3}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="メッセージを入力（NGワードが含まれる場合は警告が表示されます）"
          className="w-full border border-ink-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
        />
        <div className="mt-2 flex justify-between items-center">
          <div className="text-xs text-ink-500">{draft.length} 文字</div>
          <button
            type="button"
            disabled={ngHits.length > 0 || !draft.trim()}
            className="btn-primary !py-1.5 !px-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
}
