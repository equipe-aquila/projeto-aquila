import express from 'express';
import routes from './routes';
import connect from './utils/connect';
import swaggerDocs from './utils/swagger';

const app = express();

app.use(express.json());

app.listen(process.env.PORT || 9090, async () => {
	console.log('running on port 9090');

	await connect();

	routes(app)

	swaggerDocs(app, 9090)
});
