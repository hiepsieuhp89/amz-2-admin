// types/config.ts
export interface PaymentConfig {
  usdtRate: number;
  qipayConfig: QiPayConfig;
  v8payConfig: V8PayConfig;
}
  
interface QiPayConfig {
  enabled: boolean;
  apiKey: string;
  passwordLevel2: string;
  signKey: string;
  usdtNetwork: string;
}
  
  interface V8PayConfig {
    enabled: boolean;
    apiKey: string;
    merchantId: string;
    checksumSecretKey: string;
    depositAESKey: string;
    withdrawalAESKey: string;
    depositToken: string;
    withdrawalToken: string;
    orgToken: string;
  }
  
  