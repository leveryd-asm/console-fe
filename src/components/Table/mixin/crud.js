/* eslint-disable */
// import  {subdomain_multi_collect_service_info} from "@/api/soc";
import * as soc from "@/api/soc"

export default {
  mounted() {
    this.get()
  },
  data: function () {
    return {
      filter: {
        limit: 10, // 页大小
        offset: 1, // 当前页
        orderby: 'id', //默认按照id排序
        asc: 0 //默认降序
      },
      total_rows: 0,
      keywords: '', //搜索框的关键字内容
      loading: true,
      selected: [], //已选择项
      createLoading: false,
      updateLoading: false,
      rules: {},
      updateRules: {},
      rows_list: [],
      currentId: '',
      // 查询相关
      query_form: {},
      column_info_dict: {}
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (row.enable === false) {
        return 'disable-row';
      } else {
        return 'enable-row';
      }
    },
    tableSelectionChange(val) {
      this.selected = val
    },
    tableSortChange(val) {
      console.log(val)
      if (val.prop !== null) {
        if (val.order === 'descending') {
          this.filter.orderby = val.prop;
          this.filter.asc = 1
        } else {
          this.filter.orderby = val.prop;
          this.filter.asc = 0
        }
      }
      this.get()
    },
    delete_api_endpoint() {
      return this.url + "/" + this.module_name + "/deleteByIds"
    },
    // 删除单条记录
    deleteOneRow(row) {
      this.$confirm('此操作将永久删除ID ' + row.id + ', 是否继续?', '提示', {type: 'warning'})
        .then(() => {
          // 向请求服务端删除
          let resource = this.$resource(this.delete_api_endpoint());
          resource.save({ids: [row.id]})
            .then((response) => {
              this.$message.success('成功删除!');
              this.get();
            })
            .catch((response) => {
              this.$message.error('删除失败!');
            });
        })
        .catch(() => {
          this.$message.info('已取消操作!');
        });
    },
    query(args = {}) {
      let params = Object.assign({}, args);
      for (let k in params) {
        this.filter[k] = params[k];
      }
      this.get();
    },
    reset_query() {
      // 改变查询表单，改变offset
      for (let name in this.query_form) {
        if (name in this.filter) {
          this.filter[name] = '';
        }
      }
      this.filter['offset'] = 1
      this.get();
    },
    reset_offset_query() {
      // 不改变查询表单，只改变offset
      this.filter['offset'] = 1
      this.get()
    },
    get_api_endpoint() {
      return this.url + '/' + this.module_name + '/query'
    },
    // 查询接口
    get() {
      this.$emit("query", {'filter': this.filter, 'query_form': this.query_form})
      this.loading = true;
      let resource = this.$resource(this.get_api_endpoint());
      let query_params = Object.assign({}, this.filter);
      if (query_params.offset === 0) {
        query_params.offset = 1
      }
      query_params.offset = (query_params.offset - 1 ) * query_params.limit
      resource.query(query_params)
        .then((response) => {
          this.rows_list = response.data.rows;
          this.total_rows = response.data.total;
          this.loading = false;
          this.selected.splice(0, this.selected.length);
        })
        .catch((response) => {
          this.$message.error('错了哦，这是一条错误消息');
          this.loading = false;
        });
    },
    update_api_endpoint() {
      return this.url + "/" + this.module_name + "/update"
    },
    add_api_endpoint() {
      return this.url + "/" + this.module_name + "/add"
    },
    batch_delete_api_endpoint() {
      return this.url + "/" + this.module_name + "/deleteByIds"
    },
    batch_delete_by_query_api_endpoint() {
      return this.url + "/" + this.module_name + "/deleteByQuery?fuzzyQuery=true"
    },
    // 批量删除
    batch_delete() {
      this.$confirm('此操作将永久删除 ' + this.selected.length + ' 条记录, 是否继续?', '提示', {type: 'warning'})
        .then(() => {
          let ids = [];
          //提取选中项的id
          $.each(this.selected, (i, row) => {
            let number = new Number(row.id)
            ids.push(number);
          });
          // 向请求服务端删除, 传递ids
          let resource = this.$resource(this.batch_delete_api_endpoint());
          resource.save({"ids":ids})
            .then((response) => {
              this.$message.success('删除了' + response.data.affectedRows + '条记录!');
              this.get();
            })
            .catch((response) => {
              this.$message.error('删除失败!');
            });
        })
        .catch(() => {
          this.$Message('已取消操作!');
        });
    },

    // 根据搜索条件全部删除
    batch_delete_by_query_options() {
      this.$confirm('此操作将永久删除 ' + this.total_rows + ' 条记录, 是否继续?', '提示', {type: 'warning'})
        .then(() => {
          // 向请求服务端删除
          let resource = this.$resource(this.batch_delete_by_query_api_endpoint());
          let post_data = Object.assign({}, this.filter)
          delete post_data.limit
          delete post_data.offset
          delete post_data.orderby
          delete post_data.asc
          resource.save({"condition": post_data})
            .then((response) => {
              this.$message.success('删除了' + response.data.affectedRows + '条记录!');
              this.get();
            })
            .catch((response) => {
              this.$message.error('删除失败!');
            });
        })
        .catch(() => {
          this.$Message('已取消操作!');
        });
    },

    // 其他批量处理操作
    multi_handle(selected, method_name) {
      this.$confirm('此操作将批量操作 ' + selected.length + ' 条记录, 是否继续?', '提示', {type: 'warning'})
        .then(() => {
          console.log(method_name)
          // soc.subdomain_multi_collect_service_info(selected)
          soc.multi_handle(selected, method_name)
          this.$message.success('批量操作成功！');
        })
        .catch(() => {
          this.$message.info('已取消操作!');
        })
    },

    // 导出
    export_xls() {
      let get_params = ''
      for (let index in this.filter) {
        if(index!=='limit' && index!=='offset'){
          get_params = get_params + "&" + index + "=" + this.filter[index]
        }
      }
      window.open(process.env.SOC_API + '/' + this.module_name + '/export?' + get_params)
    }
  },
  computed: {
    create() {
      let ret_json = {};
      for (let column_name in this.columns) {
        let column = this.columns[column_name];
        ret_json[column_name] = column["val"] || ''
      }
      return ret_json;
    }
  },
  created() {
    //合并对象
    function merge(obj1, obj2) {
      let ret_obj = Object.assign({}, obj1);
      for (let key2 in obj2) {
        ret_obj[key2] = obj2[key2]
      }
      return ret_obj
    }

    // 给数据设置默认值
    let default_value = {
      'query_placeholder': '回车搜索...',
      'create_placeholder': '',
      'val': '',
      'type': 'input',
      'search': false,
      'sortable': 'custom',
      'view': true,
    }

    let select_default_value = {
      'create_placeholder': '请选择',
      'query_placeholder': '请选择',
    }

    for (let index in this.columns) {
      let column = this.columns[index]

      //select_default_value = merge(default_value, select_default_value)

      // select组件
      if (column.type === 'select') {
        for (let key in select_default_value) {
          if (typeof(column[key]) === 'undefined') {
            column[key] = select_default_value[key]
          }
          let options = column.options
          // 设置默认label
          for (let index in options) {
            let option = options[index]
            if (typeof(option.label) === 'undefined') {
              option.label = option.value
            }
          }
        }
      }

      //所有组件的默认值
      for (let key in default_value) {
        if (typeof(column[key]) === 'undefined') {
          column[key] = default_value[key]
        }
      }
    }
  }
}
