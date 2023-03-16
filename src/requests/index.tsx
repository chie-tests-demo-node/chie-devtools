// import { api } from "@teamworktoolbox/inside-sdk";
import axios from "axios";
import { MessagePlugin } from "tdesign-react";

interface IHttpReq {
  url: string;
  data?: any;
  requestType?: 'post' | 'get';
  errorCb?: (error: string) => void;
  finalCb?: () => void;
}

export async function apiPostRequest(params: IHttpReq): Promise<any> {
  if (!params) {
    return Promise.reject('请求参数不能为空！')
  }
  try {
    // { jsonData: params.data }    
    const rst: any = params.requestType === 'get' ?
      await axios.get(`${params.url}${params.data}`) :
      await axios.post(params.url, params.data)
    return Promise.resolve(rst)
  } catch (e: any) {
    MessagePlugin.error(e.message)
    throw e
  } finally {
    params.finalCb?.()
  }
}

/**
 * 新增人员
 */
export async function addGirl(data?: any): Promise<any> {
  return await apiPostRequest({ url: '/girl/add', data })
}

/**
 * 查询人员
 */
export async function queryAllGirl(): Promise<any> {
  return await apiPostRequest({ url: '/girl/all', requestType: 'get' })
}

/**
 * 
 */
export async function deleteGirl(): Promise<any> {

}