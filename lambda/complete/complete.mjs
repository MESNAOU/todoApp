import AWS from 'aws-sdk'
const dynamo = new AWS.DynamoDB.DocumentClient();

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };
  try {
    let requestJSON = JSON.parse(event.body);
    const { id } = event.pathParameters;
    await dynamo
      .update({
        TableName: "todos",
        Key: {
          todoID : id
        },
        UpdateExpression: "set completed = :state",
        ExpressionAttributeValues: {
          ":state": requestJSON.completed
        },
        ReturnValues: "UPDATED_NEW"
      })
      .promise();
    body = `Updated item ${id}`;
  } catch (err) {
    statusCode = 404;
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
