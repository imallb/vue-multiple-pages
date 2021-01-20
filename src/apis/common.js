import { request } from '@/utils/request'

export function adppDanner(data) {
  return request({
    method: 'post',
    url: 'index/banner',
    data
  })
}
