import basic from '../api/basic.js';
import login from '../api/login.js';
import middleware from '../api/middleware.js';
import express from 'express';
import generateAuthToken from '../data/authToken.js';

const publicRouter = express.Router();

publicRouter.post('/adduser', async (req, res) => {
    try {
        const { username, name, password } = req.body;
        await login.addUser(username, name, password);
        return res.status(200).json({ message: 'User added successfully' });
    } catch (error) {
        console.error("Error:", error.message);
        // Avoid sending the entire error object; instead, send specific properties.
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

publicRouter.post('/login/:username/:password', async(req, res) => {
    try {
        const {username : username, password : password} = req.params;
        const userFound = await middleware.checkUserExists(username);
        if(userFound) {
            await login.loginUser(username, password);
            res.status(200).send("A User logged In !! Your login Id is : "+username);
        }
    } catch (error) {
        console.log(error);
    }
});

publicRouter.get('/see/:st1/:st2/:username', async(req, res) => {
    const {st1 : station1, st2 : station2, username : username} = req.params;
    try {
        const userFound = await middleware.checkUserLogged(username);
        if(userFound) {
            console.log("Executing Query : "+station1+", "+station2);
            const trainsAvailable = await login.searchQuery(station1, station2);
            res.status(200).json(trainsAvailable);
        }
        else {
            res.status(400).json({message : `No user with ${username} is login `});
        }
    } catch (error) {
        console.log(error);
    }
})

const userQueue = new Map();

publicRouter.put('/booking/:username/:name/:st1/:st2', async (req, res) => {
    const { username, name, st1: station1, st2: station2 } = req.params;
    try {
        const userFound = await middleware.checkUserLogged(username);
        if (userFound) {
            const trainsAvailable = await basic.getTrain(name, station1, station2);
            const train = trainsAvailable[0];
            const trainSeat = {
                trainNumber: train.number,
                seats: train.seats,
                username: username,
                station1: station1,
                station2: station2
            };
            console.log(train);
            console.log(trainSeat.seats);
            const output = await bookTrain(trainSeat);
            res.status(200).send(output);
        } else {
            res.status(400).json({ message: "Wrong username entered !!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const bookTrain = async (trainSeats) => {
    const { trainNumber, username, seats: Seats, station1, station2 } = trainSeats;
    if (!userQueue.has(trainNumber)) {
        userQueue.set(trainNumber, []);
    }
    const queue = userQueue.get(trainNumber);
    queue.push(trainSeats);
    if (queue[0].username === username) {
        userQueue.set(trainNumber, queue.slice(1));
        return await processBooking(trainSeats);
    } else {
        return `The train ${trainNumber} is being booked by another user. Please wait for a few seconds.`;
    }
};

const processBooking = async (trainSeats) => {
    const { trainNumber, username, seats: Seats } = trainSeats;
    let seats = Seats.split(" ");
    let booked = -1;
    for (let i = 0; i < seats.length; i++) {
        if (seats[i] === "0") {
            seats[i] = "1"; booked = i;
            break;
        }
    }
    if (booked === -1) {
        return `No seats available in ${trainNumber}, so no seat can be booked.`;
    }
    let newSeats = seats.join(" ").trim();
    await basic.updateTrainBooking(newSeats, trainNumber, trainSeats.station1, trainSeats.station2);
    const token = generateAuthToken();
    setTimeout(() => {
        console.log(`The train ${trainNumber} slot is now free and ready to be booked again.`);
    }, 60000);
    return `The username ${username} has booked seat ${booked + 1} in train ${trainNumber} with token ${token}. Updated Seats: ${newSeats}`;
};


export default publicRouter;
