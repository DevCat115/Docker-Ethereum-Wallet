const express = require('express');
const app = express();
const port = 4000;

const createWallet = require('./api/createWallet');
const restoreWallet = require('./api/restoreWallet');

const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/', router);
app.use('/api/createWallet', createWallet);
app.use('/api/restoreWallet', restoreWallet);

app.get('/', (req, res) =>
	res.send(
		`Hello from Express + Docker Restful Web Service for EthereumWallet mobile app`
	)
);

/** Docker ports: 8000, 8080, 8888 */
app.listen(port || 4001, () =>
	console.log(`🚀  Ethereum Wallet Web Service is listening on port ${port}!`)
);
