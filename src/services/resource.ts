/* eslint-disable */
/**
 * 资源相关请求模块
 */

import request from '@/utils/request'
import { AxiosPromise } from 'axios'

interface ResourcePage {
  id?: number
  name?: string
  startCreateTime?: string
  url?: string
  categoryId?: number | null
  endCreateTime?: string
  current?: number
  size?: number
}

export type Resource = {
  id?: number
  name: string
  categoryId: number | null
  url: string
  description?: string
}

/**
 * 按条件分页查询数据
 */
export const getResourcePages = (data: ResourcePage): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const getAllResources = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}
/**
 * 给角色分配资源
 */
export const allocateRoleResources = (data: { roleId: number | string, resourceIdList: number[] }): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}

export const getRoleResources = (roleId: string | number): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}

export const createOrUpdateResource = (data: Resource): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

export const deleteResource = (id: number): AxiosPromise => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}
