const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

require('dotenv').config()

const pinataApiKey = process.env.PINATA_API_KEY || "YOUR_PINATA_API_KEY";
const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY || "YOUR_PINATA_SECRET_API_KEY";

// Path of the file to upload
const filePath = "./blockchain/scripts/images/image.png";

// Check if file exists
if (!fs.existsSync(filePath)) {
    console.error('File does not exist:', filePath);
    process.exit(1);
}

const uploadToIPFS = async (filePath) => {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataSecretApiKey
            }
        });

        console.log(`ipfs://${res.data.IpfsHash}`);
    } catch (error) {
        console.error('Error uploading file to IPFS:', error);
    }
};

uploadToIPFS(filePath);
