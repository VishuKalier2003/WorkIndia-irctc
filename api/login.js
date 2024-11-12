import { database } from "../databaseConnection.js";

// Function to add data to the "trains" table
const addUser = (username, name, password) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT IGNORE INTO users(username, name, password) VALUES(?, ?, ?)`;
        database.query(query, [username, name, password], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// login user
const loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT IGNORE INTO logged(username, password, login) VALUES(?, ?, NOW())`;
        database.query(query, [username, password, Date.now()], (err, results) => {
            if(err) {reject(err);}
            else {resolve(results);}
        })
    })
}

// Checks every minute, to delete the inactive users
setInterval(() => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM logged WHERE TIMESTAMPDIFF(MINUTE, login, NOW()) >= 5`;
        database.query(query, [], (err, results) => {
            if(err) {reject(err);}
            else {
                if (results.affectedRows > 0) {
                    console.log(`User(s) deleted at ${new Date().toISOString()}`);
                    console.log(`Deleted ${results.affectedRows} user(s) due to timeout.`);
                }
            resolve(results);
            }
        })
    })
}, 60000);

// search query between two stations
const searchQuery = (station1, station2) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM timings WHERE LOWER(station1) = LOWER(?) AND LOWER(station2) = LOWER(?)`;
        database.query(query, [station1, station2], (err, results) => {
            if(err) {reject(err);}
            else {resolve(results);}
        })
    })
};

export default {addUser, searchQuery, loginUser};
