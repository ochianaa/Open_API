import express from 'express';
import mysql from 'mysql2';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';

const swaggerDocument = YAML.parse(fs.readFileSync('./user_api.yml', 'utf8'));

const db = mysql.createConnection({ host: "localhost", user: "root", database: "openapi", password: "" });
const app = express();
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(result);
    });
});

app.listen(4000, () => console.log('Server berjalan di http://localhost:4000'));