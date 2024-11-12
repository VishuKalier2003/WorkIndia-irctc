import { database } from "../databaseConnection.js";

// Function to get all tables from the database
const tableAll = () => {
    return new Promise((resolve, reject) => {
        const query = "SHOW TABLES";
        database.query(query, (err, results) => {
            if (err) {
                reject(err); // Reject the promise if there is an error
            } else {
                resolve(results); // Resolve with query results
            }
        });
    });
};

// Function to get all records from a specific table
const tableShow = (table) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${table}`;
        database.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Function to add data to the "trains" table
const addDataTrain = (trainName, trainNumber) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT IGNORE INTO trains(name, number) VALUES(?, ?)`;
        database.query(query, [trainName, trainNumber], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Function to add cities
const addDataCities = (city) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT IGNORE INTO cities(name) VALUES(?)`;
        database.query(query, [city], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// add train data
const addDataTimings = (id, trainName, trainNumber, station1, station2, time1, time2, seats) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT IGNORE INTO timings(id, name, number, station1, station2, time1, time2, seats) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
        database.query(query, [id, trainName, trainNumber, station1, station2, time1, time2, seats], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// update train seats
const addTrainSeats = (seats, id) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE timings SET seats = ? WHERE id = ?`;
        database.query(query, [seats, id], (err, results) => {
            if(err) {reject(err);}
            else {resolve(results);}
        })
    })
}

// get train data
const getTrain = (number, station1, station2) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM timings WHERE name = ? AND station1 = ? AND station2 = ?`;
        database.query(query, [number, station1, station2], (err, results) => {
            if(err) {reject(err);}
            else {
                console.log("Updating data !!");
                resolve(results);}
        })
    })
}

// update booking status
const updateTrainBooking = (seats, number, station1, station2) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE timings SET seats = ? WHERE number = ? AND station1 = ? AND station2 = ?`;
        database.query(query, [seats, number, station1, station2], (err, results) => {
            if(err) {reject(err);}
            else {resolve(results);}
        })
    })
}


export default { tableShow, tableAll, addDataTrain, addDataTimings, addDataCities,
    getTrain, updateTrainBooking, addTrainSeats};
