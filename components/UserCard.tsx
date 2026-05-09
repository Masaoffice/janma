import Link from 'next/link';
import Image from 'next/image';
import { User } from '@/data/users';
import { withBasePath } from '@/lib/imagePath';
import Badge from './Badge';

/**
 * グリッドレイアウト用のユーザーカード。
 * 写真を上部に大きく表示、その下に名前・年齢・バッジ・基本情報を配置。
 */
export default function UserCard({ user }: { user: User }) {
  const initial = user.nickname.slice(0, 1);
  return (
    <Link
      href={`/profile/${user.id}`}
      className="block bg-white border border-ink-300 rounded-lg overflow-hidden hover:border-brand-500 hover:shadow-md transition group"
    >
      {/* Photo (square) */}
      <div className="relative aspect-square bg-ink-100">
        {user.photo ? (
          <Image
            src={withBasePath(user.photo)!}
            alt={user.nickname}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-ink-300">
            {initial}
          </div>
        )}
        {/* Badges overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {user.vip && <Badge variant="vip" />}
          {user.highclass && <Badge variant="highclass" />}
        </div>
        {user.verified && user.type !== 'student' && (
          <div className="absolute top-2 right-2">
            <Badge variant="verified" />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-bold text-sm truncate">{user.nickname}</span>
          <span className="text-xs text-ink-500">{user.age}歳</span>
          {user.type === 'student' && <Badge variant="student" />}
        </div>
        <div className="mt-1.5 text-xs text-ink-700 space-y-0.5">
          <div className="truncate">🀄 {user.experience}</div>
          {user.university && <div className="truncate">🎓 {user.university}</div>}
          {user.occupation && <div className="truncate">💼 {user.occupation}</div>}
        </div>
      </div>
    </Link>
  );
}
