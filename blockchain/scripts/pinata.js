require('dotenv').config();
const key = process.env.PINATA_API_KEY;
const secret = process.env.PINATA_SECRET_API_KEY;
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK(key, secret);
const fs = require('fs');

// Path of the file to upload
const filePath = "./blockchain/scripts/images/image.png";

const readableStreamForFile = fs.createReadStream(filePath);

// Check if file exists
if (!fs.existsSync(filePath)) {
    console.error('File does not exist:', filePath);
    process.exit(1);
}

const options = {
    pinataMetadata: {
        name: "FFB-NFT",
    },
    pinataOptions: {
        cidVersion: 0
    }
};


pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
            const body = {
                description: "Unique NFT by member",
                image: result.IpfsHash,
                name: "FFB-Member",
            };

            pinata.pinJSONToIPFS(body, options).then((json) => {
                console.log(json);
            }).catch((err) => {
                console.log(err);
            });

        }).catch((err) => {
    console.log(err);
});
