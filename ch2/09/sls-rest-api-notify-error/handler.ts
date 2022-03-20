import Lambda, { CloudWatchLogsEvent } from "aws-lambda";
import {
  DynamoDBClient,
  DynamoDBClientConfig,
  PutItemCommand,
  PutItemCommandInput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { uuid } from "uuidv4";
import dayjs from "dayjs";
import zlib from "zlib";

const configuration: DynamoDBClientConfig =
  process.env.STAGE === "local"
    ? {
        region: "localhost",
        endpoint: "http://localhost:8000",
      }
    : {
        region: "ap-northeast-1",
      };
const client = new DynamoDBClient(configuration);

export async function getTodos(
  event: Lambda.APIGatewayEvent
): Promise<Lambda.APIGatewayProxyResult> {
  const params: ScanCommandInput = {
    TableName: process.env.DYNAMODB_TODO_TABLE,
  };

  const command = new ScanCommand(params);
  const response: ScanCommandOutput = await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({
      todos: response.Items,
    }),
  };
}

export async function createTodo(
  event: Lambda.APIGatewayEvent
): Promise<Lambda.APIGatewayProxyResult> {
  const data = JSON.parse(event.body);
  const params: PutItemCommandInput = {
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
  await client.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: event,
    }),
  };
}

export async function logsProcessor(event: CloudWatchLogsEvent): Promise<void> {
  const payload = Buffer.from(event.awslogs.data, "base64");

  const unzipeddata = zlib.unzipSync(payload);
  const logdata = JSON.parse(unzipeddata.toString("utf8"));

  console.log("WARN: ", JSON.stringify(logdata, null, 2));
}