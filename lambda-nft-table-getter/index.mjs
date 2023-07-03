import AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler = async(event) => {
    
    const params = {
        TableName: 'nft-metadata',
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};
