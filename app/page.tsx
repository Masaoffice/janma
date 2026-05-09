'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { users, UserType } from '@/data/users';
import UserCard from '@/components/UserCard';

type Experience = 'all' | '初心者' | '中級' | '上級';
type SortKey = 'recent' | 'verified' | 'newest';

export default function HomePage() {
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState<'all' | UserType>('all');
  const [experience, setExperience] = useState<Experience>('all');
  const [vipOnly, setVipOnly] = useState(false);
  const [highclassOnly, setHighclassOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('recent');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = users.filter((u) => {
      if (type !== 'all' && u.type !== type) return false;
      if (experience !== 'all' && !u.experience.includes(experience)) return false;
      if (vipOnly && !u.vip) return false;
      if (highclassOnly && !u.highclass) return false;
      if (verifiedOnly && !u.verified) return false;
      if (keyword) {
        const k = keyword.toLowerCase();
        const hay = [u.nickname, u.bio, u.university, u.occupation, u.experience]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!hay.includes(k)) return false;
      }
      return true;
    });
    if (sort === 'verified') {
      list = [...list].sort((a, b) => Number(b.verified ?? 0) - Number(a.verified ?? 0));
    } else if (sort === 'newest') {
      list = [...list].sort((a, b) => b.id.localeCompare(a.id));
    }
    return list;
  }, [keyword, type, experience, vipOnly, highclassOnly, verifiedOnly, sort]);

  return (
    <div className="bg-ink-100/40 min-h-screen">
      {/* Search bar (sticky) */}
      <div className="bg-white border-b border-ink-300 sticky top-16 z-[5]">
        <div className="container-narrow py-3 flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="エリア・経験・キーワードで検索"
              className="w-full bg-ink-100 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">🔍</span>
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`shrink-0 px-3 py-2 rounded-full text-xs font-semibold border transition ${
              showFilters
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white text-ink-700 border-ink-300 hover:border-brand-500'
            }`}
          >
            ⚙ 絞込
          </button>
        </div>

        {/* Filters panel (collapsible) */}
        {showFilters && (
          <div className="container-narrow pb-3 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <FilterSelect
                label="種別"
                value={type}
                onChange={(v) => setType(v as 'all' | UserType)}
                options={[
                  { value: 'all', label: 'すべて' },
                  { value: 'student', label: '学生' },
                  { value: 'pro', label: '社会人' },
                ]}
              />
              <FilterSelect
                label="経験"
                value={experience}
                onChange={(v) => setExperience(v as Experience)}
                options={[
                  { value: 'all', label: 'すべて' },
                  { value: '初心者', label: '初心者' },
                  { value: '中級', label: '中級' },
                  { value: '上級', label: '上級' },
                ]}
              />
              <FilterSelect
                label="並び"
                value={sort}
                onChange={(v) => setSort(v as SortKey)}
                options={[
                  { value: 'recent', label: '活動順' },
                  { value: 'verified', label: '認証順' },
                  { value: 'newest', label: '新着順' },
                ]}
              />
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              <Toggle checked={verifiedOnly} onChange={setVerifiedOnly} label="本人確認済" />
              <Toggle checked={vipOnly} onChange={setVipOnly} label="VIP" />
              <Toggle checked={highclassOnly} onChange={setHighclassOnly} label="ハイクラス" />
            </div>
          </div>
        )}
      </div>

      <div className="container-narrow py-4">
        {/* Quick links bar */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          <QuickLink href="/threads" icon="🀄" label="募集スレッド" />
          <QuickLink href="/threads/new" icon="➕" label="卓を立てる" highlight />
          <QuickLink href="/posts" icon="💭" label="つぶやき" />
          <QuickLink href="/messages" icon="💬" label="メッセージ" />
        </div>

        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-ink-700 font-semibold">{filtered.length}人のユーザー</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((u) => (
            <UserCard key={u.id} user={u} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-ink-500 py-12 border border-dashed border-ink-300 rounded-md">
            条件に一致するユーザーが見つかりませんでした
          </p>
        )}

        {/* Footer notice */}
        <div className="mt-10 text-center text-xs text-ink-500 space-y-1">
          <p>JANMA - 麻雀マッチングサービス（デモサイト）</p>
          <p>
            <Link href="/about" className="hover:text-brand-600">サービスについて</Link>
            {' / '}
            <Link href="/signup/student" className="hover:text-brand-600">登録</Link>
            {' / '}
            <Link href="/login" className="hover:text-brand-600">ログイン</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-ink-500 mb-0.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-ink-300 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="inline-flex items-center gap-1.5 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-ink-300"
      />
      <span>{label}</span>
    </label>
  );
}

function QuickLink({
  href,
  icon,
  label,
  highlight,
}: {
  href: string;
  icon: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition ${
        highlight
          ? 'bg-brand-600 text-white border-brand-600 hover:bg-brand-700'
          : 'bg-white text-ink-700 border-ink-300 hover:border-brand-500'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
