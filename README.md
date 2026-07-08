# @SANFY666/lol 🔐

> Secure password generator with customizable options — published on GitHub Packages.

[![GitHub package.json version](https://img.shields.io/github/package-json/v/SANFY666/lol)](https://github.com/SANFY666/lol/pkgs/npm/lol)
[![License](https://img.shields.io/github/license/SANFY666/lol)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](package.json)

## Install

```bash
# .npmrc
@SANFY666:registry=https://npm.pkg.github.com
```

```bash
npm install @SANFY666/lol
```

Or install globally:

```bash
npm install -g @SANFY666/lol
```

## Usage

### API

```js
const generate = require('@SANFY666/lol');

// Default: 16 chars, letters + digits
generate();
// → "xK9mQ2vF8nR4pL1z"

// Custom length with symbols
generate({ length: 32, symbols: true });
// → "aB3#xY7&pL9@qR2!zM5*vN8$cF1%jK4("

// Exclude similar chars (il1Lo0O)
generate({ length: 20, excludeSimilar: true });
// → "xK9mQ2vF8nR4pL1zM5wN"

// Multiple passwords at once
generate({ count: 5, length: 12, symbols: true });
// → ["aB3#xY7&pL9@", "qR2!zM5*vN8$", ...]

// Only digits
generate({ lower: false, upper: false, digits: true, length: 8 });
// → "48392017"
```

### Options

| Option           | Type    | Default | Description                           |
| ---------------- | ------- | ------- | ------------------------------------- |
| `length`         | number  | `16`    | Password length                       |
| `symbols`        | boolean | `false` | Include special characters            |
| `excludeSimilar` | boolean | `false` | Exclude `il1Lo0O`                     |
| `lower`          | boolean | `true`  | Include lowercase letters             |
| `upper`          | boolean | `true`  | Include uppercase letters             |
| `digits`         | boolean | `true`  | Include digits                        |
| `count`          | number  | `1`     | Number of passwords to generate       |

### CLI

```bash
# Generate a password
lol
# → xK9mQ2vF8nR4pL1z

# 32 chars with symbols
lol --length 32 --symbols

# 5 passwords, 20 chars, symbols, no similar
lol -l 20 -s -e -n 5

# Exclude character types
lol --no-lower --no-upper --symbols
# !@#$%^&*()_+-=[]{}|;:,.<>?0123456789

# Help
lol --help
```

## Development

```bash
git clone https://github.com/SANFY666/lol.git
cd lol
npm install

# Run tests
npm test
```

## License

[MIT](LICENSE) © [SANFY666](https://github.com/SANFY666)
