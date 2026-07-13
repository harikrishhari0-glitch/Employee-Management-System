const db = require('./config/db');

async function fixPasswords() {
    try {
        await db.query(
            "UPDATE users SET password = ? WHERE email = ?",
            ['$2a$10$8W8pBKxYBDk/GRBn6VJbSOHo/wQo9h9/V5RqgMO2vjEivvZqOZTTG', 'admin@company.com']
        );
        await db.query(
            "UPDATE users SET password = ? WHERE email = ?",
            ['$2a$10$vsfGcq9gdmPl8WrlPdvA1.ROA6W625/PuCGpiQ.P8Vv7iH0mCeS0C', 'john@company.com']
        );
        console.log('Passwords updated successfully.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
fixPasswords();
