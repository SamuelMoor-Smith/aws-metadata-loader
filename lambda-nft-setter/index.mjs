import AWS from 'aws-sdk';
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

const sdk = new ThirdwebSDK("fantom-testnet");
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const handler = async(event) => {

    const contract = await sdk.getContract(process.env.CONTRACT_ADDRESS);

    try {
        const nfts = await contract.erc721.getAll();

        // iterate over each NFT
        for (let nft of nfts) {
            // define the item to be added to DynamoDB
            const item = {
                id: nft.metadata.id, // Primary key
                owner: nft.owner,
                name: nft.metadata.name,
                description: nft.metadata.description,
                image: nft.metadata.image,
                type: nft.type,
                supply: nft.supply
            };

            // parameters for DynamoDB
            const params = {
                TableName: 'nft-metadata', // Name of your DynamoDB table
                Item: item
            };

            // put the item in DynamoDB
            await dynamodb.put(params).promise();
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ "status": "nfts loaded" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Error retrieving nfts: ${error}` }),
        };
    }
};
