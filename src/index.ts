import express from 'express';
import routes from './routes';
import connect from './utils/connect';
import swaggerDocs from './utils/swagger';

const app = express();

app.use(express.json());

app.listen(9090, async () => {
	console.log('running on port 8080');

	await connect();

	routes(app)

	swaggerDocs(app, 9090)
});
