// Cookie utility functions
export const setCookie = (name: string, value: string, hours: number) => {
  // Validate cookie name and value
  if (!/^[^;=\s]+$/.test(name)) {
    throw new Error("Invalid cookie name.");
  }

  if (!/^[^;]+$/.test(value)) {
    throw new Error("Invalid cookie value.");
  }

  if (typeof hours !== "number" || !isFinite(hours) || hours <= 0) {
    throw new Error("Invalid expiry hours.");
  }

  const expires = new Date();
  expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )};expires=${expires.toUTCString()};path=/;Secure;SameSite=Strict`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = encodeURIComponent(name) + "=";
  const cookies = document.cookie.split(";");

  for (let index = 0; index < cookies.length; index++) {
    let cookie = cookies[index];
    cookie = cookie.trimStart();

    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }

  return null;
};
