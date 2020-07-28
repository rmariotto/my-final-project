const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { pg } = require("./secrets.json");
    db = spicedPg(`postgres:${pg.user}:${pg.pass}@localhost:5432/socialnetwork`);
}

exports.addUsers = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [first, last, email, password]
    );
};

exports.getUser = (id) => {
    return db.query(
        `SELECT * FROM users WHERE id = $1`,
        [id]
    );
};

exports.getUserByEmail = (email) => {
    return db.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
};

exports.addResetCode = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes (email, code) VALUES ($1, $2) `,
        [email, code]
    );
};

exports.getCode = (email,code) => {
    return db.query(
        `SELECT * FROM reset_codes WHERE email = $1 AND code = $2 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'`,
        [email,code]
    );
};

exports.newPassword = (email, password) => {
    return db.query(
        `UPDATE users SET password = $2 WHERE email = $1`,
        [email, password]
    );
};


