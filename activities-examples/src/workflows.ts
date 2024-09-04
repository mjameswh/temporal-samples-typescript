import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const {
  makeHTTPRequest,
  makeWebsocketRequest,
  completeSomethingAsync,
  // cancellableFetch  // todo: demo usage
} = proxyActivities<typeof activities>({
  retry: {
    initialInterval: '50 milliseconds',
    maximumAttempts: 2,
  },
  startToCloseTimeout: '30 seconds',
});

export async function httpWorkflow(): Promise<string> {
  const answer = await makeHTTPRequest();
  return `HTTP: The answer is ${answer}`;
}

export async function websocketWorkflow(): Promise<string> {
  const answer = await makeWebsocketRequest();
  return `Websocket: The answer is ${answer}`;
}

export async function asyncActivityWorkflow(): Promise<string> {
  const answer = await completeSomethingAsync();
  return `The Peon says: ${answer}`;
}
