
export type HistoryMessageType = "add-history" | "open-result" | "rerun-query" | "remove-history";

export interface IHistoryMessage {
    
    type: HistoryMessageType;

    query?: string;
    target?: string;
    fileName?: string;
    result?: IExecutionResult;

}

export interface IExecutionResult {
    when: string;
    query: string;
    target: string;

    items: any[];

    activityId: string;

    statusCode: string;
    requestCharge: string;
    totalRequestCharge: string;
    serverTimeMilliseconds: string;
    totalServerTimeMilliseconds: string;
}
