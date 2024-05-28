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
        const { title, description, completed } = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "todos",
            Item: {
              todoID: event.pathParameters.id,
              title: title,
              description: description,
              completed: completed
            }
          })
          .promise();
        body = `Update item ${event.pathParameters.id}`;
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
    
    