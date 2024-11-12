import basic from "../api/basic.js";
import express from 'express';

const basicRouter = express.Router();

basicRouter.get(`/tables/all`, async (req, res) => {
    try {
        const result = await basic.tableAll();
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred while fetching table data." });
    }
});

basicRouter.get(`/table/:name`, async (req, res) => {
    const { name } = req.params;
    try {
        const result = await basic.tableShow(name);
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred while fetching data from the table." });
    }
});

basicRouter.post(`/train/add`, async (req, res) => {
    const { name, number } = req.body;
    try {
            await basic.addDataTrain(name, number);
        return res.status(200).send("Train data added successfully!");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred while adding train data." });
    }
});

export default basicRouter;
