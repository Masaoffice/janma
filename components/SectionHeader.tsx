import Link from 'next/link';

export default function SectionHeader({
  title,
  href,
  hint,
}: {
  title: string;
  href?: string;
  hint?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-3 px-1">
      <div>
        <h2 className="font-bold text-base">{title}</h2>
        {hint && <p className="text-xs text-ink-500 mt-0.5">{hint}</p>}
      </div>
      {href && (
        <Link href={href} className="text-xs text-brand-600 hover:underline shrink-0">
          すべて見る →
        </Link>
      )}
    </div>
  );
}
