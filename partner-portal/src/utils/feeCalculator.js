/**
 * Centralized Service Fee Calculator
 * Rule:
 * - Ticket price below Rp 110,000: Flat Rp 7,000 per ticket unit
 * - Ticket price above or equal to Rp 110,000: 3% of ticket price per ticket unit
 *
 * Calculated per ticket unit, not based on total transaction amount.
 */

export const FEE_THRESHOLD = 110000;
export const FLAT_FEE_AMOUNT = 7000;
export const PERCENT_FEE_RATE = 0.03;

/**
 * Calculates service fee for a given ticket price and quantity.
 * @param {number} ticketPrice Price per single ticket in IDR
 * @param {number} quantity Number of tickets purchased (default: 1)
 * @returns {number} Total service fee in IDR
 */
export function calculateServiceFee(ticketPrice, quantity = 1) {
  if (!ticketPrice || ticketPrice <= 0 || quantity <= 0) return 0;

  const feePerUnit =
    ticketPrice < FEE_THRESHOLD
      ? FLAT_FEE_AMOUNT
      : Math.round(ticketPrice * PERCENT_FEE_RATE);

  return feePerUnit * quantity;
}

/**
 * Calculates fee breakdown per unit
 * @param {number} ticketPrice Price per single ticket
 * @returns {{ feePerUnit: number, type: 'flat' | 'percentage', rateDisplay: string }}
 */
export function getFeeUnitInfo(ticketPrice) {
  if (ticketPrice < FEE_THRESHOLD) {
    return {
      feePerUnit: FLAT_FEE_AMOUNT,
      type: 'flat',
      rateDisplay: 'Rp 7.000 / tiket',
    };
  }
  return {
    feePerUnit: Math.round(ticketPrice * PERCENT_FEE_RATE),
    type: 'percentage',
    rateDisplay: '3% per tiket',
  };
}
