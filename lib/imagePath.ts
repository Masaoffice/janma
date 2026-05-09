/**
 * basePath を画像URLに前置するヘルパー。
 * next.config.js の basePath と一致させる必要がある。
 *
 * 用途: <Image src={withBasePath('/images/foo.png')} ... />
 */

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(path: string | undefined): string | undefined {
  if (!path) return path;
  // 既にフルURLや http/https なら何もしない
  if (/^https?:\/\//.test(path)) return path;
  // 既に basePath が含まれていたら何もしない
  if (BASE_PATH && path.startsWith(BASE_PATH + '/')) return path;
  // ルートからの相対パス
  if (path.startsWith('/')) return BASE_PATH + path;
  return path;
}
