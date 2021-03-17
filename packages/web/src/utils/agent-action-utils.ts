// import { AgentAction } from 'agent-client-sdk';

export function actionObject({
  actionType,
  actionStatus,
  amount,
  notes = undefined,
  reason = undefined,
  ...restProps
}: any): any {
  return {
    actionType,
    amount,
    notes,
    reason,
    actionStatus,
    ...restProps
  };
}
// TODO: use this
// export function actionObject({
//   actionType,
//   actionStatus,
//   amount,
//   notes = undefined,
//   reason = undefined,
//   ...restProps
// }: AgentAction): AgentAction {
//   return {
//     actionType,
//     amount,
//     notes,
//     reason,
//     actionStatus,
//     ...restProps
//   };
// }

export function logErr(path: string, message: string): void {
  throw Error(`${path}, ${message}`);
}
