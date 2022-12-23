<template>
  <cute_table :export_xls_flag=false :module_name="module_name" :columns="columns" ref="cute_table">
    <template slot-scope="scope" slot="custom_multi_operation">
      <el-button type="primary" @click="multi_collect_brother_domain(scope.selected)" :disabled="scope.selected.length==0">批量获取兄弟域名
      </el-button>
    </template>
  </cute_table>
</template>
<script>
  /* eslint-disable */
  import cute_table from '@/components/Table/table.vue'

  export default {
    name: 'app',
    components: {
      cute_table
    },
    methods: {
      'multi_collect_brother_domain': function (selected) {
        this.$refs.cute_table.multi_handle(selected, 'multi_collect_brother_domain')
      }
    },
    data: function () {
      return {
        module_name: 'assets/corp',
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
            'name': 'corelevel',
            'label': '核心程度',
            'type': 'select',
            'options': [
              {
                "label": "1级",
                "value": "1级"
              },
              {
                "label": "2级",
                "value": "2级"
              },
              {
                "label": "3级",
                "value": "3级"
              }
            ]
          }
        ],
      };
    },
  }
</script>
