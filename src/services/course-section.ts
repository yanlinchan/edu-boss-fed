/**
 * 课程章节相关请求模块
 */

import request from '@/utils/request'
import { AxiosPromise } from 'axios'

export const getSectionAndLesson = (courseId: string | number): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId
    }
  })
}

export const saveOrUpdateSection = (data: any): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/course/section/saveOrUpdateSection',
    data
  })
}

export const getSectionById = (sectionId: string | number): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getBySectionId',
    params: {
      sectionId
    }
  })
}
