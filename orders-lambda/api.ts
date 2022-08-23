import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { validateOrder } from "./validator";

const sqsClient = new SQSClient({ region: "ap-southeast-2" });
const { QUEUE_URL } = process.env;

export const createOrder = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const order = JSON.parse(event.body || "{}");
    const { valid, errors } = validateOrder(order);
    if (!valid) {
      return sendError(400, errors);
    }
    const command = new SendMessageCommand({
      QueueUrl: QUEUE_URL,
      MessageBody: event.body,
    });
    await sqsClient.send(command);
    return {
      statusCode: 201,
      body: JSON.stringify({
        result: "Created",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error(error);
    return sendError(500, [{ message: "Internal server error" }]);
  }
};

const sendError = (statusCode, errors) => {
  return {
    statusCode,
    body: JSON.stringify({
      errors,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
