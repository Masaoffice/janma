/**
 * デモ用ユーザーデータ。
 *
 * 写真の差し替え方:
 *   1. 画像ファイルを public/images/ に配置（例: public/images/user1.jpg）
 *   2. 下記の photo フィールドにパスを記述（例: photo: '/images/user1.jpg'）
 *   3. photo を空文字 '' のままにすると、グレーアバター（イニシャル表示）になります
 *
 * ※ 顔写真を使用する場合は、必ず本人の同意・肖像権の許諾を得てから使用してください。
 *   フリー素材（Pexels / Unsplash 等）を使う場合も、各サイトの利用規約をご確認ください。
 */

export type UserType = 'student' | 'pro';

export type User = {
  id: string;
  type: UserType;
  nickname: string;
  age: number;
  photo: string; // 例: '/images/user1.jpg' / 空なら placeholder
  bio: string;
  experience: string; // 麻雀経験
  university?: string; // 学生のみ（任意）
  occupation?: string; // 社会人のみ（業種ジャンル）
  vip?: boolean;
  highclass?: boolean;
  verified?: boolean;
};

export const users: User[] = [
  {
    id: 'u_001',
    type: 'student',
    nickname: 'ユーザーA',
    age: 21,
    photo: '/images/student-1.png',
    bio: '[ここに自己紹介が入ります]',
    experience: '初心者〜中級',
    university: '都内某私立大学',
    verified: true,
  },
  {
    id: 'u_002',
    type: 'student',
    nickname: 'ユーザーB',
    age: 22,
    photo: '/images/student-2.png',
    bio: '[ここに自己紹介が入ります]',
    experience: '中級',
    university: '関東某国立大学',
    verified: true,
  },
  {
    id: 'u_003',
    type: 'student',
    nickname: 'ユーザーC',
    age: 20,
    photo: '/images/student-3.png',
    bio: '[ここに自己紹介が入ります]',
    experience: '初心者',
    verified: true,
  },
  {
    id: 'p_001',
    type: 'pro',
    nickname: '社会人A',
    age: 38,
    photo: '',
    bio: '[ここに自己紹介が入ります]',
    experience: '上級',
    occupation: 'IT・経営',
    vip: true,
    highclass: true,
    verified: true,
  },
  {
    id: 'p_002',
    type: 'pro',
    nickname: '社会人B',
    age: 42,
    photo: '',
    bio: '[ここに自己紹介が入ります]',
    experience: '上級',
    occupation: '金融',
    highclass: true,
    verified: true,
  },
  {
    id: 'p_003',
    type: 'pro',
    nickname: '社会人C',
    age: 35,
    photo: '',
    bio: '[ここに自己紹介が入ります]',
    experience: '中級',
    occupation: 'コンサル',
    verified: true,
  },
];

export const findUser = (id: string) => users.find((u) => u.id === id);
