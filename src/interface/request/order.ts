export interface IUpdateDeliveryStageRequest {
  stage: number;
}

export interface IAddDelayMessageRequest {
  message: string;
  delayTime?: string;
} 