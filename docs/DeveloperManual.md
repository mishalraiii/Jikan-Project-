How to install application: 
In order to install the application and run it on your local server you first have to download all the files in the github. After downloading the files you will have to input a few things in the terminal in order to set up the depenencies from Node.js required to run from a local server(assuming node is already downloaded). In order to do this you will have to input into the terminal the following steps.
1. nvm install node
2. npm install express
3. npm install nodemon
4. npm install @supabase/supabase-js
5. npm install body-parser
6. npm start
After this you can look at the server by entering the local route in your browser using the localhost.3000

Api endpoints and how they work:
After entering these into the terminal the server should be up and running on a local server. After completeng this we can now look at the api endpoints for the server. In the index.js file we have authored two api endpoints using GET and POST. Both of these endpoints are called by the last page called favorites. The page uses GET to pull information currently in the database from /FavTitles and display it on the favorites page using the Favorite.js file. The page also uses the POST api in order to get the information that the user enters in the favorites page and insert it into the supabase database using /FavTitle. 

Known Bugs: Originally we had problems with Node.js and nodemon when using npm start in the terminal. This was mainly fixed by updated the version of node that was installed in the terminal to the latest version as well as installing the latest version of nodemon. In our case the version we used for node was v22.2.0 and for nodemon the version was v3.1.0