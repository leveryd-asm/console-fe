<template>
  <cute_table :batch_delete_by_query_options_flag=true :isFl=false :create_flag=false :export_xls_flag=false :module_name="module_name" :columns="columns" ref="cute_table">
    <template slot-scope="scope" slot="custom_multi_operation">
      <el-button type="primary" @click="multi_brute_subdomain(scope.selected)" :disabled="scope.selected.length==0">批量获取子域名
      </el-button>
      <el-button type="primary" @click="delete_associated(scope.selected)" :disabled="scope.selected.length==0">关联删除
      </el-button>
      <el-button type="primary" @click="multi_confirm_no_brother_domain(scope.selected)" :disabled="scope.selected.length==0">批量标记非兄弟域名
      </el-button>
      <el-button type="primary" @click="multi_confirm_brother_domain(scope.selected)" :disabled="scope.selected.length==0">批量标记兄弟域名
      </el-button>
    </template>
  </cute_table>
</template>
<script>
  /* eslint-disable */
  import cute_table from '@/components/Table/table.vue'
  import {multi_handle, multi_confirm_brother_domain, multi_confirm_no_brother_domain} from '@/api/soc'

  export default {
    name: 'app',
    components: {
      cute_table
    },
    methods: {
      'multi_brute_subdomain': function (selected) {
        this.$refs.cute_table.multi_handle(selected, 'multi_brute_subdomain')
      },
      'delete_associated': function (selected) {
        this.$refs.cute_table.multi_handle(selected, "delete_associated")
      },
      'multi_confirm_no_brother_domain': function (selected) {
        this.$refs.cute_table.multi_handle(selected, "multi_confirm_no_brother_domain")
      },
      'multi_confirm_brother_domain': function (selected) {
        this.$refs.cute_table.multi_handle(selected, "multi_confirm_brother_domain")
      }
    },
    data: function () {
      return {
        module_name: 'info/brotherdomain',
        columns: [
          {
            'name': 'id',
            'label': 'ID',
            'create': false,
            'update': false
          },
          {
            'name': 'corpname',
            'label': '公司名',
            'search': true
          },
          {
            'name': 'subcorpname',
            'label': '子公司名',
            'search': true
          },
          {
            'name': 'rootdomain',
            'label': '根域名',
            'search': true
          },
          {
            'name': 'taskstartdate',
            'label': '任务启动时间',
          },
          {
            'name': 'uploaddate',
            'label': '任务上传时间',
          },
          {
            'name': 'owner',
            'label': '扫描发起人',
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
            'name': 'accurate',
            'label': '准确',
            'search': true,
            'type': 'select',
            'options': [
              {
                "label": "是",
                "value": "是"
              },
              {
                "label": "否",
                "value": "否"
              },
              {
                "label": "非兄弟域名",
                "value": "非兄弟域名"
              }
            ],
          }
        ],
      };
    },
  }
</script>
