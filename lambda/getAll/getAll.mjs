import AWS from 'aws-sdk'
const dynamo = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
  let statusCode = 200;
  let body;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };
  try {
    body = await dynamo.scan({ TableName: "todos" }).promise();
  } catch (err) {
    statusCode = 500;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};