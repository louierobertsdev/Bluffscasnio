module.exports = Object.freeze({
    AUTH_USER: "09f009efe7b9ae",
    AUTH_PASS: "cd1233a2d8d6a7",
    AUTH_FROM: "oanapopescu93@gmail.com",

    SECRET_KEY: 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3',
    SECRET_KEY_JWT: "hello friend",

    PAYPAL_MODE: 'sandbox', //sandbox or live
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,

    DATABASE: [
        {
            host: 'db4free.net', 
            user: 'oana_popescu_93', 
            password: 'Qazwsxedc123rfv123!',
            database: 'bunnybetdatabase',
            sql: "SELECT * FROM casino_users",
            // multipleStatements: true 
        },
    ],
})