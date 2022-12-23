/**
 * Created by jiachenpan on 16/11/18.
 */
import {get_all_poc_tag} from '@/api/poc'
import {get_all_tag} from '@/api/soc'

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// utcstr:Fri, 26 Jan 2018 15:29:39 GMT
export function convertdate(utcstr) {
  const date = new Date(utcstr)
  const seperator1 = '-'
  const seperator2 = ':'
  const month = fillzero(date.getUTCMonth() + 1)
  const strDate = fillzero(date.getUTCDate())
  const hour = fillzero(date.getUTCHours())
  const second = fillzero(date.getUTCSeconds())
  const minute = fillzero(date.getUTCMinutes())

  const currentdate = date.getUTCFullYear() + seperator1 + month + seperator1 + strDate
    + ' ' + hour + seperator2 + minute
    + seperator2 + second
  return currentdate
}

function fillzero(s) {
  if (s >= 0 && s <= 9) {
    s = '0' + s
  }
  return s
}

// str:2018-02-18 14:00:18.931303
export function getFormatDate(str) {
  let date
  if (str) {
    date = new Date(str)
  } else {
    date = new Date()
  }
  const seperator1 = '-'
  const seperator2 = ':'
  const month = fillzero(date.getMonth() + 1)
  const strDate = fillzero(date.getDate())
  const hour = fillzero(date.getHours())
  const second = fillzero(date.getSeconds())
  const minute = fillzero(date.getMinutes())

  const currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + ' ' + hour + seperator2 + minute
    + seperator2 + second
  return currentdate
}

export function get_poc_tags(columns, column_name) {
  get_all_poc_tag().then(response => {
    const rows = response['rows']
    const tags = []
    for (let index in rows) {
      let row = rows[index]
      let one_row_tag = row['tag']  // one_row_tag: tag_1,tag_2
      let one_row_tag_list = one_row_tag.split(',')  // one_row_tag_list: [tag_1,tag_2]
      for (let index in one_row_tag_list) {
        let tag = one_row_tag_list[index]
        let tag_option = {
          label: tag,
          value: tag
        }
        if (!(tag_option in tags)) {
          tags.push(tag_option)
        }
      }
    }
    for (let index in columns) {
      const column = columns[index]
      if (column.name === column_name) {
        column.options = tags
      }
    }
  }).catch(error => {
    console.log(error)
  })
}

// 获取服务tags
export function get_tags(columns, column_name) {
  get_all_tag().then(response => {
    console.log(response)
    const rows = response['data']
    const tags = []
    for (let index in rows) {
      const tag = rows[index]
      let tag_option = {
        label: tag,
        value: tag
      }
      if (!(tag_option in tags)) {
        tags.push(tag_option)
      }
    }
    for (let index in columns) {
      const column = columns[index]
      if (column.name === column_name) {
        column.options = tags
      }
    }
  }).catch(error => {
    console.log(error)
  })
}

// 填充select类型字段值
// [1,2] 变成 [{'value':1}, {'value':2}]
export function fill_select(columns, column_name, value_list) {
  const tags = []
  for (const index in value_list) {
    const tag = value_list[index]
    const tag_option = {
      label: tag,
      value: tag
    }
    if (!(tag_option in tags)) {
      tags.push(tag_option)
    }
  }
  for (const index in columns) {
    const column = columns[index]
    if (column.name === column_name) {
      column.options = tags
    }
  }
}
