#!/usr/bin/env node
const generate = require('../index.js');

const args = process.argv.slice(2);
const flags = {};

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '-l':
    case '--length':
      flags.length = parseInt(args[++i], 10);
      break;
    case '-s':
    case '--symbols':
      flags.symbols = true;
      break;
    case '-e':
    case '--exclude-similar':
      flags.excludeSimilar = true;
      break;
    case '-n':
    case '--count':
      flags.count = parseInt(args[++i], 10);
      break;
    case '--no-lower':
      flags.lower = false;
      break;
    case '--no-upper':
      flags.upper = false;
      break;
    case '--no-digits':
      flags.digits = false;
      break;
    case '-h':
    case '--help':
      console.log(`
  Usage: lol [options]

  Options:
    -l, --length <n>         Password length (default: 16)
    -s, --symbols            Include symbols !@#$%^&*()_+-=[]{}|;:,.<>?
    -e, --exclude-similar    Exclude similar chars (il1Lo0O)
    -n, --count <n>          Generate multiple passwords (default: 1)
    --no-lower               Exclude lowercase letters
    --no-upper               Exclude uppercase letters
    --no-digits              Exclude digits
    -h, --help               Show this help

  Examples:
    lol
    lol --length 32 --symbols
    lol -l 20 -s -e -n 5
`);
      process.exit(0);
    default:
      console.error(`Unknown option: ${args[i]}`);
      process.exit(1);
  }
}

const passwords = generate(flags);
if (Array.isArray(passwords)) {
  passwords.forEach(p => console.log(p));
} else {
  console.log(passwords);
}
