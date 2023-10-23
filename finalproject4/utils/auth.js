// utils/auth.js

export const isLoggedIn = () => {
  // Check if the "session" cookie exists
  const cookies = document.cookie.split(";");
  const sessionCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("session=")
  );
  console.log(
    "🚀 ~ file: auth.js:9 ~ isLoggedIn ~ sessionCookie:",
    sessionCookie
  );

  // If the session cookie is found, the user is considered logged in
  return !!sessionCookie;
};
