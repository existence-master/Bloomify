export const sessionOptions = {
    // You need to create a secret key at least 32 characters long.
    password: process.env.SESSION_SECRET_KEY,
    cookieName: "signup-session",
    cookieOptions: {
      httpOnly: true,
      // Secure only works in `https` environments. So if the environment is `https`, it'll return true.
      secure: process.env.NODE_ENV === "production",
    },
  };