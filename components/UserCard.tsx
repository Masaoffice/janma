import Link from 'next/link';
import { User } from '@/data/users';
import Avatar from './Avatar';
import Badge from './Badge';

export default function UserCard({ user }: { user: User }) {
  const initial = user.nickname.slice(0, 1);
  return (
    <Link
      href={`/profile/${user.id}`}
      className="block bg-white border border-ink-300 rounded-lg p-4 hover:border-brand-500 hover:shadow-sm transition"
    >
      <div className="flex items-start gap-3">
        <Avatar src={user.photo} initial={initial} size={56} alt={user.nickname} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold">{user.nickname}</span>
            <span className="text-xs text-ink-500">{user.age}歳</span>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {user.type === 'student' && <Badge variant="student" />}
            {user.vip && <Badge variant="vip" />}
            {user.highclass && <Badge variant="highclass" />}
            {user.verified && <Badge variant="verified" />}
          </div>
          <div className="mt-2 text-xs text-ink-700 space-y-0.5">
            {user.university && <div>🎓 {user.university}</div>}
            {user.occupation && <div>💼 {user.occupation}</div>}
            <div>🀄 経験: {user.experience}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
