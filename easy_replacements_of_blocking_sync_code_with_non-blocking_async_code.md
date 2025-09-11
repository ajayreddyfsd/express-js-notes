# Easy Replacements of Blocking (Sync) Code with Non-Blocking (Async) Code

| Use Case               | Blocking (Synchronous) Code ❌                 | Non-Blocking (Asynchronous) Code ✅                                     |
|-------------------------|-----------------------------------------------|------------------------------------------------------------------------|
| **Delays / Waiting**    | `while(true) {}` or `delay()` loop            | `setTimeout()`, `setInterval()`, `setImmediate()`                      |
| **File System**         | `fs.readFileSync('file.txt')`                 | `fs.readFile('file.txt', callback)` or `await fs.promises.readFile()`  |
| **Database Query**      | `const result = db.querySync(...)` (rare)     | `db.query(...)` with callback / promise / async-await                   |
| **HTTP Requests**       | Sync-request or other blocking libraries      | `fetch()`, `axios.get()`, `http.get()`                                 |
| **CPU-Intensive Work**  | Heavy math, image resize, crypto hashing in main thread | Offload to Worker Threads, child processes, or native libs (e.g., bcrypt) |
| **JSON Parsing (large)**| `JSON.parse(hugeString)` blocks until done    | Stream parsers (like JSONStream), chunk processing                     |
| **Compression/Encryption** | Sync `crypto` or `zlib` functions          | Async versions: `crypto.pbkdf2()`, `zlib.gzip()` with callback/promise |

---

✅ **Rule of Thumb**: If a function ends with `Sync` → it blocks. Avoid in servers. Always look for an async version (callback, Promise, or `async/await`).  
