import { Context, SQSEvent, SQSHandler } from "aws-lambda";

export const processOrder = async (
  event: SQSEvent,
  context: Context
): Promise<SQSHandler> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);
  // process order here
  return;
};
