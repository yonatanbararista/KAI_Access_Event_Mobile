/**
 * Indonesian Rupiah Formatting Utilities
 */

/**
 * Formats a number to Indonesian Rupiah (e.g. Rp 1.500.000)
 * @param {number} amount
 * @param {boolean} withPrefix whether to include 'Rp ' prefix
 * @returns {string}
 */
export function formatIDR(amount, withPrefix = true) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return withPrefix ? 'Rp 0' : '0';
  }
  const formatted = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return withPrefix ? `Rp ${formatted}` : formatted;
}

/**
 * Compact Rupiah format for metrics and cards (e.g. Rp 2.84 M, Rp 120 Jt, Rp 500 Rb)
 * In Indonesian:
 * Miliar (B) -> M (e.g. Rp 2.84 M or Rp 1.82 B)
 * Juta (M) -> Jt (or M as prompt uses Rp 2.84 M for Million / Miliar)
 * In the prompt examples:
 * Gross Revenue: "Rp 2.84 M" (Million / Miliar), "Rp 1.82 B" (Billion)
 */
export function formatCompactIDR(amount) {
  if (!amount || isNaN(amount)) return 'Rp 0';

  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (abs >= 1_000_000_000) {
    const val = (abs / 1_000_000_000).toFixed(2).replace(/\.00$/, '');
    return `${sign}Rp ${val} B`;
  }
  if (abs >= 1_000_000) {
    const val = (abs / 1_000_000).toFixed(2).replace(/\.00$/, '');
    return `${sign}Rp ${val} M`;
  }
  if (abs >= 1_000) {
    const val = (abs / 1_000).toFixed(1).replace(/\.0$/, '');
    return `${sign}Rp ${val} Rb`;
  }
  return `${sign}Rp ${abs}`;
}

/**
 * Formats number with thousand separators (e.g. 8,420 or 8.420)
 * @param {number} count
 * @returns {string}
 */
export function formatNumber(count) {
  if (!count && count !== 0) return '0';
  return count.toLocaleString('id-ID');
}
