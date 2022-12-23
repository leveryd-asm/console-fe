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
        module_name: 'info/generalsubdomain',
        columns: [
          {
            'name': 'id',
            'label': 'ID',
            'create': false,
            'update': false
          },
          {
            'name': 'rootdomain',
            'label': '域名',
            'search': true
          },
          {
            'name': 'ip_list',
            'label': 'IP',
            'inline-template': true
          },
          {
            'name': 'title',
            'label': '标题',
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
