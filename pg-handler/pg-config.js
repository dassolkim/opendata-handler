const { Pool, Client } = require("pg")

const pool = new Pool({
    user: "knu",
    host: "114.70.235.40",
    database: "create_destination",
    password: "dke!!214!!",
    port: "25432"
})

exports.pool = pool