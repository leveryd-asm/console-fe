<template>
  <cute_table :create_flag=false :export_xls_flag=false :batch_delete_flag=true :module_name="module_name" :columns="columns"></cute_table>
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
        module_name: 'info/subdomainbrutehistory',
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
            'name': 'domain',
            'label': '域名',
            'search': true
          },
          {
            'name': 'uploaddate',
            'label': '上传时间',
          }
        ],
      };
    },
  }
</script>
