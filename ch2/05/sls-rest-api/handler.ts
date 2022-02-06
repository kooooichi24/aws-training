import Lambda from "aws-lambda";
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { uuid } from "uuidv4";
import dayjs from "dayjs";

export async function createTodo(
  event: Lambda.APIGatewayEvent
): Promise<Lambda.APIGatewayProxyResult> {
  const data = JSON.parse(event.body);
  const client = new DynamoDBClient({ region: "ap-northeast-1" });
  const params: PutItemCommandInput = {
    /** input parameters */
    TableName: process.env.DYNAMODB_TODO_TABLE,
    Item: {
      id: {
        S: uuid(),
      },
      title: {
        S: data.todoTitle,
      },
      checked: {
        BOOL: false,
      },
      createdBy: {
        S: data.createdBy,
      },
      createdAt: {
        S: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      },
      updatedAt: {
        S: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      },
    },
  };
  const command = new PutItemCommand(params);

  try {
    await client.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Go Serverless v1.0! Your function executed successfully!",
          input: event,
        },
        null,
        2
      ),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "error",
      }),
      headers: {
        "content-type": "application/json",
      },
    };
  } finally {
    client.destroy();
  }
}
