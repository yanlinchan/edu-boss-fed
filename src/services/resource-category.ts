/**
 * 资源分类相关请求模块
 */

import request from '@/utils/request'
import { AxiosPromise } from 'axios'

export const getResourceCategories = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

export const createOrEditResourceCategory =
(data: { id?: number, name?: string, sort?: number }): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}

export const deleteResourceCategory = (id: number): AxiosPromise => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/category/${id}`
  })
}
