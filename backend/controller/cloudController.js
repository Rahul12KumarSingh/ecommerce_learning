const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const { v4: uuidv4 } = require('uuid');

const dotenv = require('dotenv');
dotenv.config();


const bucket = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})


const getPresignedUrl = async (req, res) => {
    const { fileName, fileType } = req.body;


    const uniqueFileName = `${uuidv4()}-${fileName}`;

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: uniqueFileName,
        ContentType: fileType
    });

    try {
        const url = await getSignedUrl(bucket, command, {
            expiresIn: 3600
        })

        console.log("Presigned URL", url);

        return res.status(200).json({
            success: true,
            url,
            fileName: uniqueFileName,
            fileType
        });

    }catch(error)
     {
        console.error("Error generating presigned URL", error);
        return res.status(500).json({
            success: false,
            message: "Error generating presigned URL",
            error: error.message
        });
     }
}

module.exports = {
    getPresignedUrl
};