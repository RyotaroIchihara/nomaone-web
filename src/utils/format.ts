// 電話番号のフォーマット
export function formatPhoneForDisplay(phone: string): string {
  return phone.replace(/[^\d-]/g, '');
}

// TELリンクの生成
export function formatPhoneForTel(phone: string): string {
  return `tel:${phone.replace(/[^\d]/g, '')}`;
}

// 時間帯の表示フォーマット
export function formatTimeRange(time: string): string {
  return time.replace('?', '–').replace(/(\d{1,2}):(\d{2})/g, (_, h, m) => {
    return `${h}:${m}`;
  });
}

// アクセシビリティ用のラベル生成
export function generateAriaLabel(text: string, context?: string): string {
  return context ? `${text}（${context}）` : text;
}

// 郵便番号のフォーマット
export function formatPostalCode(code: string): string {
  return code.replace(/(\d{3})(\d{4})/, '$1-$2');
}

// 住所のフォーマット
export function formatAddress(prefecture: string, city: string, street: string): string {
  return `${prefecture}${city}${street}`;
}

// メールリンクの生成
export function formatMailTo(email: string): string {
  return `mailto:${email}`;
}

// 外部リンクかどうかの判定
export function isExternalUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return !hostname.includes('nomaone.or.jp');
  } catch {
    return false;
  }
}

// スクロールターゲットIDの生成
export function generateScrollTargetId(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}
