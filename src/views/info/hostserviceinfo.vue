<template>
  <cute_table :isFl=false :create_flag=false :export_xls_flag=false :batch_delete_flag=true :batch_delete_by_query_options_flag=true :module_name="module_name" :columns="columns"></cute_table>
</template>
<script>
  /* eslint-disable */
  import cute_table from '@/components/Table/table.vue'

  export default {
    name: 'app',
    components: {
      cute_table
    },
    data: function () {
      return {
        module_name: 'info/hostserviceinfo',
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
            'name': 'target',
            'label': '域名',
            'search': true
          },
          {
            'name': 'address',
            'label': 'IP',
          },
          {
            'name': 'port',
            'label': '端口',
            'search': true
          },
          {
            'name': 'service',
            'label': '服务',
            'search': true
          },
          {
            'name': 'state',
            'label': '状态',
          },
          {
            'name': 'product',
            'label': '产品',
            'search': true
          },
          {
            'name': 'product_version',
            'label': '版本',
            'search': true
          },
          {
            'name': 'origin',
            'label': '来源',
            'inline-template': true
          },
          {
            'name': 'uploaddate',
            'label': '上传时间',
          },
        ],
      };
    },
  }
</script>
