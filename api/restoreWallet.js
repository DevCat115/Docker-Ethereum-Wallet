const express = require('express');
const router = express.Router();

const CryptoJS = require('crypto-js');

router.post('/restoreWallet', async (req, res) => {
	const bytes = CryptoJS.AES.decrypt(
		req.body.walletHash.toString(),
		req.body.seedWords
	);
	const decryptedWallet = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	console.log(decryptedWallet);
});

module.exports = router;
