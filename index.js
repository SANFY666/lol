const crypto = require('crypto');

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const SIMILAR = /[il1Lo0O]/g;

function generate(options = {}) {
  const length = options.length ?? 16;
  const useSymbols = options.symbols ?? false;
  const excludeSimilar = options.excludeSimilar ?? false;
  const useLower = options.lower ?? true;
  const useUpper = options.upper ?? true;
  const useDigits = options.digits ?? true;
  const count = options.count ?? 1;

  if (length < 1) return '';
  if (count < 1) return [];

  let lower = useLower ? LOWER : '';
  let upper = useUpper ? UPPER : '';
  const digits = useDigits ? DIGITS : '';
  const symbols = useSymbols ? SYMBOLS : '';

  if (excludeSimilar) {
    lower = lower.replace(SIMILAR, '');
    upper = upper.replace(SIMILAR, '');
  }

  const pool = lower + upper + (excludeSimilar ? digits.replace(/[01]/g, '') : digits) + symbols;
  if (!pool) return count === 1 ? '' : [];

  const results = [];
  for (let n = 0; n < count; n++) {
    const bytes = crypto.randomBytes(length);
    let password = '';
    for (let i = 0; i < length; i++) {
      password += pool[bytes[i] % pool.length];
    }
    results.push(password);
  }

  return count === 1 ? results[0] : results;
}

module.exports = generate;
