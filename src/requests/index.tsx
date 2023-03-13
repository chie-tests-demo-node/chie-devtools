// import { api } from "@teamworktoolbox/inside-sdk";
import axios from "axios";
import { MessagePlugin } from "tdesign-react";

interface IHttpReq {
  url: string;
  data?: any;
  errorCb?: (error: string) => void;
  finalCb?: () => void;
}

export async function apiPostRequest(params: IHttpReq): Promise<any> {
  if (!params) {
    return Promise.reject('请求参数不能为空！')
  }
  try {
    // { jsonData: params.data }    
    const rst: any = await axios.get(params.url)
    return Promise.resolve(rst)
  } catch (e: any) {
    MessagePlugin.error(e.message)
    throw e
  } finally {
    params.finalCb?.()
  }
}

/**
 * 开启服务端sdk
 */
export async function AddAppsInfoTosdkFn(data?: any): Promise<any> {
  return await apiPostRequest({ url: '/app/pre/store', data })
}

/**
 * 关闭服务端sdk
 */
export async function DeleteAppIdFn(appId?: any): Promise<any> {
  return await apiPostRequest({ url: `/app/pre/remove/${appId}` })
}