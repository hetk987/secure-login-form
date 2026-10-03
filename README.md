# Secure Login Form

## Files in this project

- `index.html` — login form
- `script.js` — client-side validation:
  - Rejects empty email/password.
  - Requires the email to contain `@`.
  - Requires the password to be at least 8 characters.
  - On success, sends the credentials to the server via `fetch`.
- `server.js` — a tiny Express server that repeats the same validation rules server-side since that was one issue I saw in  The server is the only check that can't be tampered with by the user.

This project only validates input *shape* (not empty, contains `@`, length ≥ 8) — it does not implement real authentication, a database, or password hashing. It's a focused demo for the validation requirement, not a full login system.

## How to run it

1. Install dependencies:
   ```
   npm install
   ```
2. Start the server (port 3001):
   ```
   npm start
   ```
3. Enter an email/password and submit:
   - If the client-side checks fail, you'll see an error without any network request being made.
   - If they pass, the form calls the server, which runs the same validation again and returns a success or error message.

