import express from 'express';
import dotenv from 'dotenv';
import { apiKeyMiddleware } from './middleware/apiKeyMiddleware';
import { lookupCity } from './maxmind/lookupCity';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(apiKeyMiddleware);

app.get('/:ip', async (req, res) => {
    const ip = req.params.ip;
    try {
        const city = await lookupCity(ip);
        res.send(city);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while looking up the city.');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
