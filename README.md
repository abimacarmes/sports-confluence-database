Sports Confluence - API
GitHub: https://github.com/abimacarmes/sports-confluence-database
Live Link: https://glacial-atoll-16614.herokuapp.com/api

Summary: Created for my second Bloc capstone, Sports Confluence is a app that allows individuals to find and join pickup sports games.

The application displays a list of all the available pickup games and allows the user to filter for their city or a specific sport. If they want to create a new pickup game, they can add all the details (location, number of players wanted, date, sport) and then individuals browsing the games can RSVP for a spot in any of the available games.

Backend database allows the application to get all the games and players stored in the database, and add new games and RSVPed players as the users interact with the application.

Technologies used: Node, Express, and PostgreSQL

Endpoints:
- /games GET: gets all games in the 'games' table
- /players GET: gets all players in the 'players' table
- /games POST: adds a new game to the 'games' table
	Request Body:
		{
    			"name": String,
			"sport": String,
			"location_name": String,
        		"address": String,
		        "players": Integer,
		        "date": String
		}

- /players POST: adds a new player to the 'players' table
	Request Body:
		{
    			"name": String,
			"level": String,
			"comment": String,
        		"game_id": Foreign Key to 'games' table
		}

Future Goals: Add additional functionalities as the database expands. Options to add a messageboard feature for each game.