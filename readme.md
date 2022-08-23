
# AWS Lambda Queues

This is an example project shell of an AWS Architecture utilitsing the Serverless Framework with AWS Lambda written in TypeScript.

Architecture:

```mermaid
sequenceDiagram
    participant consumer as API Consumer
    participant APIGW as API Gateway
    participant API as Lambda
    participant SQS
    participant Handler as Handler Lambda
    participant SQSDQL As SQS Dead letter queue
    consumer->>APIGW: POST /order
    APIGW->>API: Route request to API Lambda
    note right of API: Validate request parameters
    break when request validation fails
        API->>consumer: Return HTTP 400 error
    end
    API ->> SQS: Post message to SQS for eventual processing
    API->>consumer: Return HTTP 201 success, order created
    SQS->>Handler: Lambda event source polling for visible messages on SQS Queue
    note right of Handler: Process order, this may be a resource intensive or flakey process which cannot be completed in the initial API request
    break when order handling fails 3 times
        Handler->>SQSDQL: Add order SQS message to dead letter queue
    end
```

## Installation

Install project dependencies using Yarn

```bash
  yarn
```
    
## Environment Variables

To deploy this project to AWS, you will need to add the following environment variables to your environment.

`AWS_ACCESS_KEY_ID` An AWS account access key. It is not recommended to use your AWS Root user.

`AWS_SECRET_ACCESS_KEY` AWS secret access key


## Deploying

To deploy the project to AWS

```bash
  yarn deploy
```

## Development

To run the environment locally

```bash
  yarn dev
```
