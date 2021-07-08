const databaseService = {
    getAllGames(knex){
        'Returns all games in the database'
        return knex 
            .from('games')
            .select('*');
    },
    getAllPlayers(knex){
        'Returns all players in the database'
        return knex
            .from('players')
            .select('*');
    },
    addGame(knex, newGame){
        return knex
            .insert(newGame)
            .into('games')
    },
    addPlayer(knex, newPlayer){
        return knex
            .insert(newPlayer)
            .into('players')
    }
}

module.exports = databaseService