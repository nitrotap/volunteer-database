export const ironOptions = {
    cookieName: "volunteer-database",
    password: process.env.SECRET,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false,
    },
}