import AWS from 'aws-sdk'
const dynamo = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    let body;
    let statusCode = 201;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    };
    try {
        await dynamo
          .delete({
            TableName: "todos",
            Key: {
                todoID: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
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
    
    