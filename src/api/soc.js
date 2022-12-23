/* eslint-disable */
import request from '@/utils/soc_request'

export function bbscan_multinodeal(idlist) {
  return request({
    url: '/alarm/bbscan/multiupdate',
    method: 'post',
    data: {
      id: idlist,
      status: '无须处理'
    }
  })
}

export function bbscan_multideal(idlist) {
  return request({
    url: '/alarm/bbscan/multiupdate',
    method: 'post',
    data: {
      id: idlist,
      status: '已处理'
    }
  })
}

function subdomain_multi_collect_service_info(rows) {
  const taskdata = []
  for (const index in rows) {
    const row = rows[index]
    taskdata.push(
      {
        'corpname': row.corpname || '',
        'subcorpname': row.subcorpname || '',
        'target': row.subdomain || ''
      }
    )
  }
  return request({
    url: '/task/send',
    method: 'post',
    data: {
      taskname: 'collect_service_info',
      taskdata: taskdata
    }
  })
}

function multi_brute_subdomain(rows) {
  const taskdata = []
  for (const index in rows) {
    const row = rows[index]
    taskdata.push(
      {
        'corpname': row.corpname || '',
        'subcorpname': row.subcorpname || '',
        'rootdomain': row.rootdomain || ''
      }
    )
  }
  return request({
    url: '/task/send',
    method: 'post',
    data: {
      taskname: 'brute_subdomain',
      taskdata: taskdata
    }
  })
}

function multi_collect_brother_domain(rows) {
  const taskdata = []
  for (const index in rows) {
    const row = rows[index]
    taskdata.push(
      {
        'corpname': row.corpname || '',
        'subcorpname': row.subcorpname || '',
        'domain': row.rootdomain || ''
      }
    )
  }
  return request({
    url: '/task/send',
    method: 'post',
    data: {
      taskname: 'collect_brother_domain',
      taskdata: taskdata
    }
  })
}

export function multi_handle(selected, method_name) {
  // subdomain_multi_collect_service_info(selected)
  eval(method_name + '(selected)')
}

export function delete_associated(rows) {
  console.log(rows)

  for (const index in rows) {

    let selected = rows[index]

    let rootdomain = selected.rootdomain

    // 厂商信息加白
    request({
      url: '/assets/whitelist/add',
      method: 'post',
      data: {
        whitelisttype: '子域名',
        domain: rootdomain
      }
    })

    // 删除子域名
    request({
      url: '/info/subdomain/multidelete',
      method: 'post',
      data: {
        "deleteall": 1,
        "subdomain": "." + rootdomain
      }
    })

    //删除兄弟域名
    request({
      url: '/info/brotherdomain/delete',
      method: 'post',
      data: {
        id:selected.id || '99999'
      }
    })

  }
}

export function multi_confirm_no_brother_domain(rows) {
  let idlist = []
  for (const index in rows) {
    const row = rows[index]
    idlist.push(
      row.id
    )
  }
  return request({
    url: '/info/brotherdomain/multiupdate',
    method: 'post',
    data: {
      id: idlist,
      accurate: '非兄弟域名'
    }
  })
}

export function multi_confirm_brother_domain(rows) {
  let idlist = []
  for (const index in rows) {
    const row = rows[index]
    idlist.push(
      row.id
    )
  }
  return request({
    url: '/info/brotherdomain/multiupdate',
    method: 'post',
    data: {
      id: idlist,
      accurate: '是'
    }
  })
}
