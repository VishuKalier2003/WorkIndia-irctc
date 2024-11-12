import { database, datapool } from "./databaseConnection.js";
import express from 'express';
import defaultTables from './api/tables.js';
import basicRouter from "./controller/basicController.js";
import testRouter from "./controller/testController.js";
import publicRouter from "./controller/publicController.js";
import adminRouter from "./controller/adminController.js";
import axios from 'axios'; // Import axios for HTTP requests

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(basicRouter);
app.use(testRouter);
app.use(publicRouter);
app.use(adminRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    // Run the setup process after a delay...
    setTimeout(async () => {
        try {
            database.query(defaultTables.createTrainTable, (err) => {
                if (err) console.log("Error in creating table Trains:", err);
                else console.log("Train table successfully created!");
            });

            database.query(defaultTables.createTrainTimings, (err) => {
                if (err) console.log("Error in creating table Timings:", err);
                else console.log("Train timings table successfully created!");
            });

            database.query(defaultTables.createCityTable, (err) => {
                if (err) console.log("Error in creating table Cities:", err);
                else console.log("Cities table successfully created!");
            });

            database.query(defaultTables.UserTable, (err) => {
                if (err) console.log("Error in creating table Users:", err);
                else console.log("users table successfully created!");
            });
            database.query(defaultTables.Logged, (err) => {
                if (err) console.log("Error in creating table logged:", err);
                else console.log("Logged table successfully created!");
            });
            setTimeout(async () => {
                try {
                    const response = await axios.post(`http://localhost:${PORT}/train/testTrains`);
                    console.log(response.data);
                } catch (err) {
                    console.error("Error adding test train data:", err);
                }
            }, 3000);
            setTimeout(async () => {
                try {
                    const response = await axios.post(`http://localhost:${PORT}/timings/testTimings`);
                    console.log(response.data);
                } catch (err) {
                    console.error("Error adding test timings data:", err);
                }
            }, 5000);
        } catch (err) {
            console.error("Error in setup process:", err);
        }
    }, 1000);
});
