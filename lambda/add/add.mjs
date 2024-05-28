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
    let requestJSON = JSON.parse(event.body);
    const { todoID, title, desc } = requestJSON;
    const item = {
      todoID: todoID,
      title: title,
      description: desc,
      completed: false
    } 
    await dynamo
      .put({
        TableName: "todos",
        Item: item
      })
      .promise();
    body = item
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

