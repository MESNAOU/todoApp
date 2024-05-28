import AWS from 'aws-sdk'
const dynamo = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    let body;
    let statusCode = 200;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    };
    try {
        body = await dynamo
          .get({
            TableName: "todos",
            Key: {
              todoID: event.pathParameters.id
            }
        })
        .promise();
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
    
    