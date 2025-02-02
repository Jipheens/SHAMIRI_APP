import colors from 'colors';
import dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import journalRoutes from './routes/journalRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json()); 

app.get('/', (req, res) => {
	res.send('API is running');
});

app.use('/api/users', userRoutes);
app.use('/api/journalEntries', journalRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`.bold
			.yellow
	);
});
