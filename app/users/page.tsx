'use client';

import { useState, useMemo } from 'react';
import { users, UserType } from '@/data/users';
import UserCard from '@/components/UserCard';

type Experience = 'all' | '初心者' | '中級' | '上級';
type SortKey = 'recent' | 'verified' | 'newest';

export default function UsersPage() {
  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState<'all' | UserType>('all');
  const [experience, setExperience] = useState<Experience>('all');
  const [vipOnly, setVipOnly] = useState(false);
  const [highclassOnly, setHighclassOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('recent');

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
    <div className="container-narrow py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">ユーザー検索</h1>
        <p className="text-sm text-ink-700 mt-1">
          麻雀の活動エリア・経験・ルール選好などからユーザーを探せます。
        </p>
      </header>

      {/* Filters */}
      <div className="bg-white border border-ink-300 rounded-lg p-4 mb-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-ink-700 mb-1">キーワード</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="ニックネーム / 大学 / 職業 / 自己紹介"
            className="w-full border border-ink-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <FilterSelect
            label="ユーザー種別"
            value={type}
            onChange={(v) => setType(v as 'all' | UserType)}
            options={[
              { value: 'all', label: 'すべて' },
              { value: 'student', label: '学生' },
              { value: 'pro', label: '社会人' },
            ]}
          />
          <FilterSelect
            label="麻雀経験"
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
            label="並び順"
            value={sort}
            onChange={(v) => setSort(v as SortKey)}
            options={[
              { value: 'recent', label: '最近活動した順' },
              { value: 'verified', label: '本人確認済み優先' },
              { value: 'newest', label: '登録新しい順' },
            ]}
          />
        </div>

        <div className="flex flex-wrap gap-4 text-sm pt-1">
          <Toggle checked={verifiedOnly} onChange={setVerifiedOnly} label="本人確認済みのみ" />
          <Toggle checked={vipOnly} onChange={setVipOnly} label="VIPのみ" />
          <Toggle checked={highclassOnly} onChange={setHighclassOnly} label="ハイクラスのみ" />
        </div>
      </div>

      <p className="text-sm text-ink-500 mb-3">{filtered.length}件のユーザー</p>

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
      <label className="block text-xs font-semibold text-ink-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-ink-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
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
    <label className="inline-flex items-center gap-2 cursor-pointer">
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
