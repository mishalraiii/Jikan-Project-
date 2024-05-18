const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const port = 3000
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://gzeafpqcujmisocsnzka.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6ZWFmcHFjdWptaXNvY3NuemthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4ODc3NjIsImV4cCI6MjAzMTQ2Mzc2Mn0.vuR3HpU6gamo1ONpoaCXzWHNivS6X_rIxCv2_utjS5M'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/FavTitles', async (req, res) => {
    console.log('Attempting to GET all FavTitles')

    const { data, error } = await supabase
        .from('FavTitle')
        .select()
 
    if(error){
        console.log('Error')
        res.send(error)
    }  else {
        res.send(data)
    }

    console.log('Data:', data)
    console.log('Error:', error)

}) 

app.post('/FavTitle', async (req, res) => {
    console.log('Adding Title');
    var firstName = req.body.first_name;
    var title = req.body.fav_title;

    const { data, error } = await supabase
        .from('FavTitle')
        .insert({ 'first_name': firstName, 'fav_title': title });

    if (error) {
        console.log('Error:', error);
        res.status(500).send(error.message);
    } else {
        res.status(200).send(data);
    }
});

app.listen(port, () => {
    console.log('APP IS LIVE')
})