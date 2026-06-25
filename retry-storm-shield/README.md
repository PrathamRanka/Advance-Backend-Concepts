# Retry Storm Shield (TypeScript)

A production-style distributed systems simulation demonstrating:

- Retry storms under failure conditions
- Circuit breaker protection
- Retry budget enforcement
- Adaptive concurrency control
- Jittered exponential backoff

---

## 🧠 Problem

At scale, retries don’t fix failures — they amplify them.

This project simulates how:
- small failure rates
- + retries
= system-wide cascading collapse

---

## ⚙️ Architecture

Traffic Generator
      ↓
Resilience Layer
  ├── Retry Budget
  ├── Circuit Breaker
  ├── Adaptive Limiter
  └── Jittered Retry Engine
      ↓
Downstream Service (failure injected)

---

## 🚀 Run

```bash
npm install
npm run dev