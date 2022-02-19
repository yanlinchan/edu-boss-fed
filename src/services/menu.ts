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
