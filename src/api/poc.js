import request from '@/utils/poc_request'

export function get_all_poc_tag() {
  return request({
    url: '/poc/query',
    method: 'get',
    data: {
      'enable': '1'
    }
  })
}

export function create_task(task) {
  return request({
    url: '/task/send',
    method: 'post',
    data: {
      'task_name': 'async_create_poc_task',
      'task_data': [task]
    }
  })
}


export function alarm_multinodeal(idlist) {
  return request({
    url: '/alarm/multiupdate',
    method: 'post',
    data: {
      id: idlist,
      status: '无须处理'
    }
  })
}

export function alarm_multideal(idlist) {
  return request({
    url: '/alarm/multiupdate',
    method: 'post',
    data: {
      id: idlist,
      status: '已处理'
    }
  })
}
