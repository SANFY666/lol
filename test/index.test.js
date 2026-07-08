const { describe, it } = require('node:test');
const assert = require('node:assert');
const generate = require('../index.js');

describe('@SANFY666/lol', () => {
  it('should generate a password of default length 16', () => {
    const pwd = generate();
    assert.strictEqual(pwd.length, 16);
  });

  it('should generate a password of custom length', () => {
    const pwd = generate({ length: 32 });
    assert.strictEqual(pwd.length, 32);
  });

  it('should include symbols when option is set', () => {
    const pwd = generate({ length: 100, symbols: true });
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(pwd);
    assert.ok(hasSymbol);
  });

  it('should exclude similar characters when option is set', () => {
    const pwd = generate({ length: 1000, excludeSimilar: true });
    assert.ok(!/[il1Lo0O]/.test(pwd));
  });

  it('should return empty string for length 0', () => {
    assert.strictEqual(generate({ length: 0 }), '');
  });

  it('should generate multiple passwords with count option', () => {
    const pwds = generate({ count: 5, length: 8 });
    assert.ok(Array.isArray(pwds));
    assert.strictEqual(pwds.length, 5);
    pwds.forEach(p => assert.strictEqual(p.length, 8));
  });

  it('should not contain duplicates in multiple passwords', () => {
    const pwds = generate({ count: 10, length: 32, symbols: true });
    const unique = new Set(pwds);
    assert.strictEqual(unique.size, pwds.length);
  });

  it('should use only specified character types', () => {
    const pwd = generate({ lower: false, upper: false, digits: true, length: 50 });
    assert.ok(/^\d+$/.test(pwd));
  });

  it('should return empty when no char types selected', () => {
    const pwd = generate({ lower: false, upper: false, digits: false, length: 10 });
    assert.strictEqual(pwd, '');
  });

  it('should return single string when count is 1', () => {
    const pwd = generate({ count: 1 });
    assert.strictEqual(typeof pwd, 'string');
  });

  it('should return array when count > 1', () => {
    const pwds = generate({ count: 2 });
    assert.ok(Array.isArray(pwds));
  });
});
