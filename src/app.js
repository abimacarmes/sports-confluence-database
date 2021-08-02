require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config')
const databaseService = require('./databaseService')
const knex = require('knex')
const bodyParser = require('body-parser')


const app = express()
app.use(express.json())

app.use(
    cors({
        origin: 'https://sports-confluence.vercel.app/'
    })
);

app.get('/api/', (req,res) => {
    res.send("Sports Confluence App - Database Endpoint Homepage")
})

app.get('/api/games', (req,res, next) => {
    const knexInstance = req.app.get('db')
    databaseService.getAllGames(knexInstance)
        .then(games => res.json(games))
        .catch(next)
})

app.get('/api/players', (req, res, next) => {
    const knexInstance = req.app.get('db')
    databaseService.getAllPlayers(knexInstance)
        .then(players => res.json(players))
        .catch(next)
})

app.post('/api/games', (req, res, next) => {
    const knexInstance = req.app.get('db')
    const {name, sport, location_name, address, players, date, image_link} = req.body
    const newGame = {name, sport, location_name, address, players, date, image_link}

    databaseService.addGame(knexInstance, newGame)
        .then(res.status(201).send(newGame))
        .catch(next)
})

app.post('/api/players', (req, res, next) => {
    const knexInstance = req.app.get('db')
    const {name, level, comment, game_id} = req.body
    const newPlayer = {name, level, comment, game_id}

    databaseService.addPlayer(knexInstance, newPlayer)
        .then(res.status(201).send(newPlayer))
        .catch(next)
})

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(function errorHandler(error, req, res, next){
    let response
    if(NODE_ENV ==='production'){
        response = {error: {message: error.message}}
    }
    else{
        console.error(error)
        response = {message: error.message,error}
    }
    res.status(500).json(response)
})

app.use(morgan(morganOption))
app.use(helmet())


module.exports = app
