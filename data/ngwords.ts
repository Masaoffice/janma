/**
 * NGワード辞書（簡易デモ版）。
 * 本番ではAI判定 + 文脈考慮 + 学習型フィルタで検知することを推奨。
 */

export const ngWords: { word: string; reason: string }[] = [
  // 出会い系・パパ活系
  { word: 'パパ活', reason: '禁止ワード（出会い系を示唆）' },
  { word: 'ママ活', reason: '禁止ワード（出会い系を示唆）' },
  { word: '援助', reason: '禁止ワード（金銭的関係を示唆）' },
  { word: '援交', reason: '禁止ワード' },
  { word: '円光', reason: '禁止ワード' },
  { word: 'お小遣い', reason: '禁止ワード（私的金銭授受を示唆）' },
  { word: 'お手当', reason: '禁止ワード' },
  { word: 'PJ', reason: '禁止ワード' },
  { word: 'p活', reason: '禁止ワード' },
  // 性的表現
  { word: 'ホテル', reason: '禁止ワード' },
  { word: 'ラブホ', reason: '禁止ワード' },
  { word: 'お持ち帰り', reason: '禁止ワード' },
  { word: 'エッチ', reason: '禁止ワード' },
  { word: '体の関係', reason: '禁止ワード' },
  { word: '大人の関係', reason: '禁止ワード' },
  // 連絡先交換（マッチ成立前のみNG）
  { word: 'LINE交換', reason: 'マッチ成立前の連絡先交換は禁止' },
  { word: 'カカオ', reason: 'マッチ成立前の連絡先交換は禁止' },
  { word: 'Telegram', reason: 'マッチ成立前の連絡先交換は禁止' },
  { word: 'ID交換', reason: 'マッチ成立前の連絡先交換は禁止' },
  // 金銭授受
  { word: '振込', reason: '私的金銭授受の示唆は禁止' },
  { word: '口座', reason: '私的金銭授受の示唆は禁止' },
];

export type NgHit = { word: string; reason: string };

/** テキストからNGワードヒットを返す（複数ヒット可） */
export function detectNgWords(text: string): NgHit[] {
  if (!text) return [];
  const hits: NgHit[] = [];
  for (const ng of ngWords) {
    if (text.includes(ng.word)) {
      hits.push({ word: ng.word, reason: ng.reason });
    }
  }
  return hits;
}
