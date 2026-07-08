const crypto = require('crypto');

function generate(options = {}) {
  const length = options.length ?? 16;
  const useSymbols = options.symbols ?? false;
  const excludeSimilar = options.excludeSimilar ?? false;

  let lower = 'abcdefghijklmnopqrstuvwxyz';
  let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (excludeSimilar) {
    lower = lower.replace(/[il]/g, '');
    upper = upper.replace(/[IO]/g, '');
  }

  let pool = lower + upper + digits;
  if (useSymbols) pool += symbols;

  if (!pool) return '';

  const bytes = crypto.randomBytes(length);
  let password = '';
  for (let i = 0; i < length; i++) {
    password += pool[bytes[i] % pool.length];
  }

  return password;
}

module.exports = generate;
