const createTrainTable = `
    CREATE TABLE IF NOT EXISTS trains (
    name VARCHAR(100) NOT NULL UNIQUE,
    number VARCHAR(100) PRIMARY KEY
)`;

const createTrainTimings = `
    CREATE TABLE IF NOT EXISTS timings (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    number VARCHAR(100) NOT NULL,
    station1 VARCHAR(100) NOT NULL,
    station2 VARCHAR(100) NOT NULL,
    time1 VARCHAR(100) NOT NULL,
    time2 VARCHAR(100) NOT NULL,
    seats VARCHAR(100) NOT NULL
)`;

const createCityTable = `
    CREATE TABLE IF NOT EXISTS cities (
    name VARCHAR(100) PRIMARY KEY
)`;

const UserTable = `
    CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL)`;

const Logged = `
    CREATE TABLE IF NOT EXISTS logged (
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

export default {createTrainTable, createTrainTimings, createCityTable, UserTable, Logged};
