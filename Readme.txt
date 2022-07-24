Process to install - 

For Frontend - 
	1. Go to the directory using cd command
	2. Run 'npm i'
	3. Run 'npm start'

For Backend - 
	1. Go to the directory using cd command
	2. Run 'npm i'
	3. Run 'npm run test' - it use nodemon.

For Solidity -
        1. npx hardhat 
        2. npm i
        3. npx hardhat compile
        4. npx hardhat run scripts/deploy.js --network testnet
        5. npx hardhat verify "CONTRACT ADDRESS" --network testnet --contract contracts/${contractfilename}:contractname
