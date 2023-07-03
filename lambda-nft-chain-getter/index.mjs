import AWS from 'aws-sdk';
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

const sdk = new ThirdwebSDK("fantom-testnet");

export const handler = async(event) => {

    const contract = await sdk.getContract(process.env.CONTRACT_ADDRESS);

    try {
        const nfts = await contract.erc721.getAll();

        return {
            statusCode: 200,
            body: JSON.stringify({ tokens: Array.from(nfts) }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Error retrieving nfts: ${error}` }),
        };
    }
};
