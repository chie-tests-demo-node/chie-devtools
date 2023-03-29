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
    const rst: any = params.requestType === 'get' ?
      await axios.get(params.data ? `${params.url}${params.data}` : `${params.url}`) :
      await axios.post(params.url, params.data)
        .catch(function (error) {
          console.log(error)
        })
    return Promise.resolve(rst.data)
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
 * 删除人员
 */
export async function deleteGirl(id: any): Promise<any> {
  return await apiPostRequest({ url: `/girl/delete/${id}`, requestType: 'get' })
}

/**
 * 编辑人员
 */
export async function updateGirl(data: any): Promise<any> {
  return await apiPostRequest({ url: '/girl/update', data })
}