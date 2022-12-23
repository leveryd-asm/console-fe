<template>
  <cute_table :batch_delete_by_query_options_flag=true :export_xls_flag=false :module_name="module_name" :columns="columns"></cute_table>
</template>
<script>
  /* eslint-disable */
  import cute_table from '@/components/Table/table.vue'

  export default {
    name: 'whitelist',
    components: {
      cute_table
    },
    data: function () {
      return {
        module_name: 'assets/whitelist',
        columns: [
          {
            'name': 'id',
            'label': 'ID',
            'create': false,
            'update': false,
            'width': 100
          },
          {
            'name': 'corpname',
            'label': '公司名',
            'search': true,
            'width': 200
          },
          {
            'name': 'whitelisttype',
            'label': '类型',
            'width': 200,
            'search': true,
            'type': 'select',
            'options': [
              {
                label: '子域名',
                value: '子域名'
              }
            ]
          },
          {
            'name': 'domain',
            'label': '域名',
	    'search': true
          }
        ],
      }
    },
  }
</script>

