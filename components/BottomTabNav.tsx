'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: '探す', icon: '🔍' },
  { href: '/messages', label: 'メッセージ', icon: '💬', badge: 1 },
  { href: '/threads/new', label: '投稿', icon: '➕', center: true },
  { href: '/posts', label: 'つぶやき', icon: '💭' },
  { href: '/me', label: 'マイページ', icon: '👤' },
];

export default function BottomTabNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-ink-300">
      <ul className="grid grid-cols-5 h-16">
        {tabs.map((t) => {
          const active =
            t.href === '/'
              ? pathname === '/'
              : pathname === t.href || pathname.startsWith(t.href + '/');
          return (
            <li key={t.href} className="flex">
              <Link
                href={t.href}
                className={`flex-1 flex flex-col items-center justify-center text-[10px] gap-0.5 ${
                  active ? 'text-brand-600' : 'text-ink-700'
                } ${t.center ? 'relative' : ''}`}
              >
                {t.center ? (
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center -mt-4 shadow-md ${
                    active ? 'bg-brand-700' : 'bg-brand-600'
                  } text-white text-xl`}>
                    {t.icon}
                  </div>
                ) : (
                  <span className="text-xl relative">
                    {t.icon}
                    {t.badge ? (
                      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center">
                        {t.badge}
                      </span>
                    ) : null}
                  </span>
                )}
                <span className={t.center ? 'mt-0' : ''}>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
