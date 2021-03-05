import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const { title } = JSON.parse(event.body);
  const timeNow = new Date();

  const auction = {
    id: uuid(),
    title,
    status: "OPEN",
    createAt: timeNow.toISOString(),
  };

  await dynamoDB
    .put({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Item: auction,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = createAuction;
