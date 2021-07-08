Fur Friendly Spaces - API
GitHub: https://github.com/abimacarmes/fur-friendly-database
Live Link: https://enigmatic-basin-32386.herokuapp.com/api/

Summary: Created for my first Bloc capstone, Fur Friendly Spaces is a app for accumulating dog-friendly places of all different kinds in a given city. The backend database stores and updates based on the user interactions with the app.

Backend database allows the application to get all the spaces stored in the database, update the up and down votes as the users interact with the application.

Technologies used: Node, Express, and PostgreSQL

Endpoints:
- /spaces GET: gets all items in the 'spaces' table
- /spaces POST: adds a new space to the 'spaces' table
	Request Body:
		{
    			"name": String,
        		"address": String,
		        "city": String,
		        "type": String
		}
-/spaces/:id PATCH: updates the upvote or downvote count for the space who's 'id' is provided
	Request Body:
		{
    			"id": Int,
        		"upCount": Int,
		        "downCount": Int
		}

Future Goals: Add additional functionalities as the database expands. Options to add a new "type" of location or give the cities their own table.
