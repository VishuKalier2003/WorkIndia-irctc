import basic from "../api/basic.js";
import express from 'express';

const adminRouter = express.Router();

adminRouter.put('/admin/:id/:seats/:uid', async (req, res) => {
    const {seats : seats, id : id, uid : uid} = req.params;
    try {
        if(uid !== "VishuK18082003") {
            res.status(500).send("Not admin access !!");
        }
        await basic.addTrainSeats(seats, id);
        res.status(200).send(`Train updated with seats ${seats}`);
    }
    catch(err) {
        console.log(err);
    }
});

adminRouter.post('/admin/createTrain/:uid', async(req, res) => {
    const {uid : uid} = req.params;
    const {id, name, number, station1, station2, time1, time2, seats} = req.body;
    try {
        if(uid !== "VishuK18082003") {
            res.status(500).send("Not admin access !!");
        }
        await basic.addDataTimings(id, name, number, station1, station2, time1, time2, seats);
        res.status(200).send(`Train with ${name} and ${number} from ${station1} to ${station2} created !!`);
    } catch (error) {
        console.log(error);
    }
})

export default adminRouter;
