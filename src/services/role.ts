/* eslint-disable */
/**
 * 角色相关请求模块
 */

import request from '@/utils/request'
import { AxiosPromise } from 'axios'

export const getRoles = (data: any): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export const deleteRole = (id: string | number): AxiosPromise => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

export const createOrUpdate =
(
  data: { id?: number, code: string, name: string, description?: string }
): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export const getRoleById = (id: string | number): AxiosPromise => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}

export const getAllRoles = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

export const allocateUserRoles = (data: any): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}

export const getUserRoles = (userId: string | number): AxiosPromise => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}
