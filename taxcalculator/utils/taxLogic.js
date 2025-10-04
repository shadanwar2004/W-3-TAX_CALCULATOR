/**
 * Compute tax based on income slabs
 * Example slabs (you can adjust to a real tax system):
 * - Up to 250000: 0%
 * - 250001 to 500000: 5%
 * - 500001 to 1000000: 20%
 * - Above 1000000: 30%
 */

function computeTax(income) {
  let tax = 0;
  if (income <= 250000) return tax;

  if (income <= 500000) {
    tax += (income - 250000) * 0.05;
  } else if (income <= 1000000) {
    tax += 250000 * 0.05;
    tax += (income - 500000) * 0.20;
  } else {
    tax += 250000 * 0.05;
    tax += 500000 * 0.20;
    tax += (income - 1000000) * 0.30;
  }
  return tax;
}

module.exports = { computeTax };