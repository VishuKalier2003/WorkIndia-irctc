import { database } from "../databaseConnection.js";

// Middleware 1...
const checkUserExists = (username) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE LOWER(username) = LOWER(?)';
        database.query(query, [username], (err, results) => {
            if (err) {
                reject(err);
            } else {
                const userFound = results.length > 0;
                resolve(userFound);
            }
        });
    });
};

// Middleware 2...
const checkUserLogged = (username) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM logged WHERE LOWER(username) = LOWER(?)';
        database.query(query, [username], (err, results) => {
            if (err) {
                reject(err);
            } else {
                const userFound = results.length > 0;
                console.log(`${username} currently logged in !!`);
                resolve(userFound);
            }
        });
    });
};

export default {checkUserExists, checkUserLogged};
