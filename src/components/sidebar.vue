<template>
  <div id="sidebar" class="clearFix">
      <div class="sidebar-header">
        <el-row>
          <el-col :span="8">
            <div class="user-logo clearFix">
              <img src=".././assets/logo.png">
            </div>
          </el-col>
          <el-col :span="16">
            <div class="system-name clearFix">
              <p>ArcBody</p>
              <p>管理中心</p>
            </div>
          </el-col>
        </el-row>
    </div>
    <el-menu :default-active="indexPath"
             class="el-menu-vertical-demo"
             @select="handleSelect"
             theme="dark">
      <router-link to="/">
        <el-menu-item index="1"><i class="el-icon-message"></i>使用数据</el-menu-item>
      </router-link>
      <router-link to="/coachManage">
        <el-menu-item index="2"><i class="el-icon-menu"></i>教练管理</el-menu-item>
      </router-link>
      <router-link to="/memberData">
        <el-menu-item index="3"><i class="el-icon-search"></i>会员数据</el-menu-item>
      </router-link>
      <router-link to="/setting">
        <el-menu-item index="4"><i class="el-icon-setting"></i>设置</el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        indexPath:'1'
      }
    },
    methods: {
      handleSelect(index) {
//          this.$store.dispatch('sideIndex',index) 往vuex实体里面赋值
//          console.log(this.$store.state.sidebar.transferIndex)
//          this.$store.getters.getTransferIndex (computed) 引用
//          this.$store.state.sidebar.transferIndex 直接引用的写法（data）
        sessionStorage.setItem('path',index)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created() {
      this.indexPath = sessionStorage.getItem("path") || '1'

      // 路由初始化
  /*    switch (this.indexPath) {
        case '1':
          this.$router.push({ path: '/'})
          break;
        case '2':
          this.$router.push({ path: '/coachManage'})
          break;
        case '3':
          this.$router.push({ path: '/memberData'})
          break;
        case '4':
          this.$router.push({ path: '/setting'})
          break;
      }*/


    }
  }
</script>
<style lang="scss">
  #sidebar {
    float: left;
    width: 20%;
    height: 100%;
    .el-menu {
      height: 88%;
    }
    .sidebar-header {
      width: 100%;
      height: 12%;
      min-height: 100px;
      background-color: #02d1b1;
      padding: 30px 13px;
    }
    .user-logo {
      width: 45px;
      height: 45px;
      float: right;
      display: inline-block;
    }
    .system-name {
      height: 60px;
      width: 90px;
      display: inline-block;
      float: left;
      p:nth-child(1) {
        text-align: center;
        color: #ffffff;
        font-weight: bold;
        line-height: 32px;
        overflow: hidden;
        margin-top: -4px;
      }
      p:nth-child(2) {
        text-align: center;
        color: #ffffff;
        font-size: 12px;
        margin-top: -3px;
      }
    }
    .el-menu-item.is-active{
      border-left:4px solid  #02d1b1;
      color: #02d1b1;
    }
  }
</style>
