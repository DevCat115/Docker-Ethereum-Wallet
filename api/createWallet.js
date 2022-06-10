const express = require('express');
const router = express.Router();

const bip39 = require('bip39');
const wallet = require('ethereumjs-wallet');
const CryptoJS = require('crypto-js');
const request = require('request');

router.post('/createWallet', async (req, res) => {
	let callback = {};

	const mnemonic = await bip39.generateMnemonic();
	callback = {
		...callback,
		seedWords: mnemonic
	};

	const myNewWallet = await wallet.generate();

	const walletAddress = await myNewWallet.getAddressString();
	callback = {
		...callback,
		walletAddress: walletAddress
	};

	const privateKey = await myNewWallet.getPrivateKeyString();

	const publicKey = await myNewWallet.getPublicKeyString();
	callback = {
		...callback,
		walletPublicKey: publicKey
	};

	const encryptedWallet = {
		walletAddress: walletAddress,
		privateKey: privateKey,
		publicKey: publicKey
	};

	console.log(encryptedWallet);

	const walletHash = CryptoJS.AES.encrypt(
		JSON.stringify(encryptedWallet),
		`${mnemonic}`
	);

	callback = {
		...callback,
		walletHash: walletHash
	};

	// UPIS U JSON-SERVER
	console.log(`SeedWords: ${mnemonic}
	            WalletAddress: ${walletAddress}
	            PrivateKey: ${privateKey}
	            PublicKey: ${publicKey}
				WalletHash: ${walletHash}`);

	// request(`http://localhost:3001/users/1`, (err, response, body) => {
	// 	console.log('body:', body);
	// });

	res.send(callback);
});

module.exports = router;
