import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

import routes from './routes';

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
    res.send('DaVeenci Backend is running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
