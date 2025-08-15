export function getAssetPath(path: string): string {
  // baseパスを取得（環境変数または設定から）
  const base = import.meta.env.BASE_URL || '/nomaone-web/';
  
  // パスの先頭のスラッシュを削除
  const cleanPath = path.replace(/^\//, '');
  
  // baseパスとパスを結合
  return `${base}${cleanPath}`;
}
