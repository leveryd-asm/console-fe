<template>
  <cute_table :isFl=false :create_flag=false :export_xls_flag=false :batch_delete_by_query_options_flag=true :module_name="module_name" :columns="columns" ref="cute_table" @query="query">
    <template slot-scope="scope" slot="custom_multi_operation">
      <el-button type="primary" @click="multi_collect_service_info(scope.selected)" :disabled="scope.selected.length==0">批量获取服务信息
      </el-button>
      <el-button type="primary" @click="last_one_day()">今天
      </el-button>
    </template>
  </cute_table>
</template>
<script>
  /* eslint-disable */
  import cute_table from '@/components/Table/table.vue'
  import {convertdate} from '@/utils/index'

  export default {
    name: 'app',
    components: {
      cute_table
    },
    methods: {
      last_one_day() {
        const end = new Date(new Date(new Date().toLocaleDateString()).getTime());
        const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
        // start.setTime(start.getTime() - 3600 * 1000 * 24 + 3600 * 1000 * 8);
        start.setTime(start.getTime() + 3600 * 1000 * 8);
        end.setTime(end.getTime() + 3600 * 1000 * 8 + 3600 * 1000 * 24);
        this.$refs.cute_table.query_form.uploaddate = []
        this.$refs.cute_table.filter.uploaddate = []

        this.$refs.cute_table.query_form.uploaddate[0] = convertdate(start)
        this.$refs.cute_table.filter.uploaddate[0] = convertdate(start)
        this.$refs.cute_table.query_form.uploaddate[1] = convertdate(end)
        this.$refs.cute_table.filter.uploaddate[1] = convertdate(end)
        this.$refs.cute_table.query(this.$refs.cute_table.filter)
      },
      query(params) {
        let filter = params.filter
        let query_form = params.query_form
        if (typeof(query_form.uploaddate[0]) !== 'undefined') {
          const start = filter.uploaddate[0]
          const end = filter.uploaddate[1]
          filter.uploaddate_start = start
          filter.uploaddate_end = end
          query_form.uploaddate_start = start
          query_form.uploaddate_end = end
          console.log(query_form)
          console.log(filter)
          delete filter.uploaddate
        } else {
          if (typeof(typeof(filter.uploaddate_start) !== 'undefined')) {
            delete filter.uploaddate_start
          }
          if (typeof(typeof(filter.uploaddate_end) !== 'undefined')) {
            delete filter.uploaddate_end
          }
        }
      },
      'multi_collect_service_info': function(selected) {
        this.$refs.cute_table.multi_handle(selected, 'subdomain_multi_collect_service_info')
      }
    },
    data: function () {
      return {
        module_name: 'info/subdomain',
        columns: [
          {
            'name': 'id',
            'label': 'ID',
            'create': false,
            'update': false,
            'width': 70
          },
          {
            'name': 'corpname',
            'label': '公司名',
            'search': true
          },
          {
            'name': 'subcorpname',
            'label': '子公司',
            'search': true
          },
          {
            'name': 'subdomain',
            'label': '子域名',
            'search': true
          },
          {
            'name': 'a_record',
            'label': 'A记录',
            'inline-template': true,
            'search': true
          },
          {
            'name': 'webservice',
            'label': 'web服务',
            'inline-template': true,
            'search': true
          },
          {
            'name': 'uploaddate',
            'label': '上传时间',
            'search': true,
            'type': 'datetimerange'
          },
          {
            'name': 'taskid',
            'label': '任务id',
            'search': true
          },
          {
            'name': 'origin',
            'label': '结果来源',
            'search': true
          },
          {
            'name': 'cname_record',
            'label': 'CNAME',
          },
          {
            'name': 'mx_record',
            'label': 'MX',
            'inline-template': true
          },
          {
            'name': 'txt_record',
            'label': 'TXT',
            'inline-template': true
          },
          {
            'name': 'parentdomain',
            'label': '父域名',
          },
          {
            'name': 'record_updatedate',
            'label': '更新记录'
          },
          {
            'name': 'subcorpname_not_contains',
            'label': '非子公司',
            'update': false,
            'create': false,
            'search': true
          },
          {
            'name': 'origin_not_contains',
            'label': '非来源',
            'update': false,
            'create': false,
            'search': true
          },
        ],
      };
    },
  }
</script>
