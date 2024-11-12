import { trainData, timingData } from "../data/test.js";
import basic from "../api/basic.js";
import express from 'express';

const testRouter = express.Router();

testRouter.post('/train/testTrains', async (req, res) => {
    try {
        for(let i = 0; i < trainData.length; i++) {
            await basic.addDataTrain(trainData[i].name, trainData[i].number);
        }
    return res.status(200).send("Testing trains data added successfully!");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred while adding testing train data." });
    }
});

testRouter.post('/timings/testTimings', async (req, res) => {
    try {
        for(let i = 0; i < timingData.length; i++) {
            await basic.addDataCities(timingData[i].station1);
            await basic.addDataCities(timingData[i].station2);
            await basic.addDataTimings(i, timingData[i].name, timingData[i].number,
                timingData[i].station1, timingData[i].station2, timingData[i].time1,
                timingData[i].time2, timingData[i].seats);
        }
    return res.status(200).send("Testing stations and cities data added successfully!");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred while adding timings train data." });
    }
});

export default testRouter;
