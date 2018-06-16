let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 5000;

let pool = new pg.Pool({
    port: 5432,
    user: 'chemed',
    password: '1234',
    database: 'postgres',
    host: 'localhost'
});

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api/example', (request, response) => {
    const { value } = request.body;
    if (!(value > 0 && value < 100)) {
        return response.status(400).send('Value should be between 1 and 99');
    }
    pool.query('INSERT into example (ex_value) VALUES($1)', [value], (err, res) => {
        if (err) {
            return response.status(500).send(err);
        }
        return response.status(201).send('Data inserted');
    });
});

app.get('/api/examples', (request, response) => {
    pool.query('SELECT * from example', (err, res) => {
        if (err) {
            return response.status(500).send(err);
        }
        return response.status(200).send(res.rows);
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
