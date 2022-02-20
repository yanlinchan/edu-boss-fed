/**
 * 课程相关请求模块
 */

import request from '@/utils/request'
import { AxiosPromise } from 'axios'

export const getQueryCourses = (data: any): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export const changeState = (params: any): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}

export const saveOrUpdateCourse = (data: any): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

export const uploadCourseImage = (data: FormData, onUploadProgress?: (progressEvent: ProgressEvent) => void): AxiosPromise => {
  // 该接口要求的请求数据类型是：multipart/form-data
  // 所以需要提交 FormData 数据对象
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    // HTML5 新增的上传响应事件：progress
    onUploadProgress
  })
}

export const getCourseById = (courseId: string | number): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}
