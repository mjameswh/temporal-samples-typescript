import { Client } from '@temporalio/client';
import { asyncActivityWorkflow, httpWorkflow, websocketWorkflow } from './workflows';
import { randomUUID } from 'crypto';

async function run(): Promise<void> {
  const client = new Client();

  let result = await client.workflow.execute(httpWorkflow, {
    taskQueue: 'activities-examples',
    workflowId: `activities-examples-${randomUUID()}`,
  });
  console.log(result); // 'HTTP: The answer is 42'

  result = await client.workflow.execute(websocketWorkflow, {
    taskQueue: 'activities-examples',
    workflowId: `activities-examples-${randomUUID()}`,
  });
  console.log(result); // 'Websocket: Request served by xxxxxxx'

  result = await client.workflow.execute(asyncActivityWorkflow, {
    taskQueue: 'activities-examples',
    workflowId: `activities-examples-${randomUUID()}`,
  });
  console.log(result);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
