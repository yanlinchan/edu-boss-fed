/* eslint-disable */
/**
 * 菜单管理请求模块
 */
import request from '@/utils/request'
import { AxiosPromise } from 'axios'

interface Menu {
  id?: number,
  parentId: number
  name: string,
  href: string,
  icon?: string,
  orderNum?: number,
  description?: string,
  shown?: boolean
}

export const createOrUpdateMenu = (data: Menu): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id: number | string = -1): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: { id }
  })
}

export const getAllMenus = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id: number): AxiosPromise => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

export const getMenuNodeList = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

export const allocateRoleMenus = (data: any): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}

export const getRoleMenus = (roleId: string | number): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: { // axios 会把 params 转换为 key=value&key=value 的数据格式放到 url 后面(以?分割)
      roleId
    }
  })
}
