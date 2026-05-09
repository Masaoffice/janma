import Link from 'next/link';
import Image from 'next/image';
import { User } from '@/data/users';
import Badge from './Badge';

/**
 * 横スクロール用の小さめユーザーカード。
 */
export default function CompactUserCard({ user }: { user: User }) {
  const initial = user.nickname.slice(0, 1);
  return (
    <Link
      href={`/profile/${user.id}`}
      className="shrink-0 w-32 bg-white border border-ink-300 rounded-lg overflow-hidden hover:border-brand-500 transition"
    >
      <div className="relative aspect-square bg-ink-100">
        {user.photo ? (
          <Image
            src={user.photo}
            alt={user.nickname}
            fill
            sizes="128px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-ink-300">
            {initial}
          </div>
        )}
        <div className="absolute top-1 left-1 flex flex-col gap-0.5">
          {user.vip && <Badge variant="vip" />}
          {user.highclass && <Badge variant="highclass" />}
        </div>
      </div>
      <div className="p-2">
        <div className="flex items-center gap-1 truncate">
          <span className="font-bold text-xs truncate">{user.nickname}</span>
          <span className="text-[10px] text-ink-500 shrink-0">{user.age}歳</span>
        </div>
        <div className="text-[10px] text-ink-700 mt-0.5 truncate">🀄 {user.experience}</div>
      </div>
    </Link>
  );
}
