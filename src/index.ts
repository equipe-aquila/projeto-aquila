import express from 'express';
import routes from './routes';
import connect from './utils/connect';

const app = express();

app.use(express.json());

app.listen(8080, async () => {
	console.log('running on port 8080');

	await connect();

	routes(app)
});
