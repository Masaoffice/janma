import Image from 'next/image';

type Props = {
  src?: string;
  alt?: string;
  size?: number;
  initial?: string;
};

/**
 * アバター表示コンポーネント。
 * src が指定されていればその画像を表示、なければイニシャル付きのプレースホルダーを表示。
 *
 * 写真を入れる場合: public/images/ に画像を配置し、データ側で src: '/images/xxx.jpg' を指定。
 */
export default function Avatar({ src, alt = '', size = 56, initial = '?' }: Props) {
  if (src) {
    return (
      <div
        className="relative rounded-full overflow-hidden bg-ink-100 shrink-0"
        style={{ width: size, height: size }}
      >
        <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className="rounded-full bg-ink-300 flex items-center justify-center text-ink-700 font-semibold shrink-0"
      style={{ width: size, height: size, fontSize: size / 2.6 }}
      aria-label={alt || 'avatar placeholder'}
    >
      {initial}
    </div>
  );
}
