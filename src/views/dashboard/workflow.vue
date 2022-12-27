<template>
  <div class="dashboard-container">
    <a href="/argo/" target="_blank">点击这里进入工作流管理页面 </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}

window.open('/argo/', '_blank')
</script>


