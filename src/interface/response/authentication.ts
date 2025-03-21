import { IUserResponse } from "./user";

export interface IAuthResponse {
  status: boolean;
  message: string;
  statusCode: number;
  data: {
    accessToken: string;
    user: IUserResponse;
  }
}

export interface IQueryParams {
  currentPage: any;
  pageSize: any;
  totalPages?: any;
}

export interface IQueryParamLimit {
  page: any;
  limit: any;
  search?: any;
  status?: any;
  id?: any;
  level?: any;
  startDate?: any;
  endDate?: any


}

export interface IQueryParamAgency {
  page: any;
  limit: any;
  userId?: any;
  agencyId?: any;
  userInfo?: any;
  agencyInfo?: any;
  statusUser?: any;
  statusAgency?: any;
  type?:any;
  search?:any;  

}
export interface IQueryChart {
  timeRange: any;
  startDate?: any;
  endDate?: any
}


export interface IQueryParamLimitStatistics {
  page?: any;
  limit?: any;
  level?: any;
  startDate?: any;
  endDate?: any;
  subordinateId?: any

}

export interface IQueryParamListGameBetThridHistory {
  page?: any;
  limit?: any;
  orderValue?: any;
  startDate?: any;
  orderKey?: any;
  endDate?: any;
  gameCategory?: any
  gameName?: any
  subordinateId?: any

}
export interface IQueryTypeGame {
  gameType?: string,
  sessionId?: string;

}