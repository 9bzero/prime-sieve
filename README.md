# Prime Sieve

Animated **Sieve of Eratosthenes** — watch the algorithm eliminate composite numbers and reveal all primes up to N.

## How it works

Starting from 2, the sieve marks every multiple of each prime as composite. Numbers that survive all passes are prime. It finds all primes up to N in O(n log log n) time.

## Features

- Adjustable upper bound (up to 1000)
- Step-by-step animation with configurable speed
- Color-coded cells: prime (green), composite (red), current factor (yellow)
- Primes list output with total count
- Pause / resume / reset controls

## Stack

![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61dafb?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646cff?style=flat&logo=vite&logoColor=white)

## Run locally

```bash
npm install && npm run dev
```

---
Made by [9bzero](https://github.com/9bzero)