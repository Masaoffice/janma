type Props = {
  variant: 'vip' | 'highclass' | 'student' | 'verified';
  className?: string;
};

const styles: Record<Props['variant'], { label: string; className: string }> = {
  vip: { label: 'VIP', className: 'bg-yellow-100 text-yellow-800 border border-yellow-300' },
  highclass: { label: 'ハイクラス', className: 'bg-purple-100 text-purple-800 border border-purple-300' },
  student: { label: '学生', className: 'bg-blue-100 text-blue-800 border border-blue-300' },
  verified: { label: '本人確認済', className: 'bg-green-100 text-green-800 border border-green-300' },
};

export default function Badge({ variant, className = '' }: Props) {
  const s = styles[variant];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${s.className} ${className}`}>
      {s.label}
    </span>
  );
}
