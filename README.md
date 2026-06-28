# prime-sieve

Animated Sieve of Eratosthenes. Watch composite numbers get eliminated one prime at a time.

## How the sieve works

Start with all integers from 2 to N. Take the first unmarked number (a prime). Cross out all its multiples. Repeat until you reach √N. Everything still unmarked is prime.

It is an ancient algorithm (~240 BCE) and still one of the most efficient ways to find all primes up to a given limit.

## Run

```bash
npm install
npm run dev
```