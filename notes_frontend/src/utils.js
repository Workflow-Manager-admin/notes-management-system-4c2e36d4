//
// PUBLIC_INTERFACE
// Simple form helpers for the notes app
//

// PUBLIC_INTERFACE
export function validateUsername(username) {
  return username && typeof username === "string" && username.length >= 3;
}

// PUBLIC_INTERFACE
export function validatePassword(password) {
  return password && typeof password === "string" && password.length >= 6;
}
