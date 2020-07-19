<!--  -->
<template>
  <el-container>
    <el-aside width="auto">
      <div class="logo" >
        <img src="@/assets/logo.svg" alt v-show="logoCtrl" />
        <img src="@/assets/slogo.svg" alt v-show="!logoCtrl" />
      </div>
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :router="true"
        :unique-opened="true"
        collapse-transition
      >
        <el-submenu :index="item.id+''" v-for="(item,index) in menusList" :key="index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.authName}}</span>
          </template>
          <el-menu-item
            :index="'/'+subItem.path"
            v-for="(subItem,index) in item.children"
            :key="index"
          >{{subItem.authName}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="clearfix">
        <div class="el-icon-s-fold menuCtrl fl" circle @click="menuCtrl"></div>
        <div class="meBtn fr">
          <el-dropdown trigger="click">
            <span class="el-icon-bell"></span>
            <el-dropdown-menu slot="dropdown" class="msgMenu">
              <el-tabs @tab-click="handleClick">
                <el-tab-pane label="通知(4)" name="first">用户管理</el-tab-pane>
                <el-tab-pane label="消息(4)" name="second">配置管理</el-tab-pane>
              </el-tabs>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="handleCommand">
            <div class="el-dropdown-link">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              <span>element</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
              <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check" command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <transition name="page-transition">
          <router-view />
        </transition>
      </el-main>

      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "BasicLayout",
  data() {
    return {
      isCollapse: false,
      logoCtrl: true,
      menusList: []
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    menuCtrl() {
      this.isCollapse = !this.isCollapse;
      this.logoCtrl = !this.logoCtrl;
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleClick(tab, event) {},
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) {
        return this.$msg.error(res.meta.$msg);
      }
      this.menusList = res.data;
    },

    handleCommand(command) {
      if (command == "logout") {
        window.sessionStorage.clear();
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.logo {
  margin: 30px 0;
  text-align: center;
}
.msgMenu {
  width: 20%;
  padding: 15px 0;
}
.el-aside {
  background-color: #001529;
}
.el-icon-bell {
  font-size: 24px;
  line-height: 60px;
}
.el-avatar {
  vertical-align: middle;
  margin: 0 10px;
  width: 30px;
  height: 30px;
}
.meBtn {
  & > div {
    display: inline-block;
    vertical-align: middle;
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      background: #f6f6f6;
    }
  }
}
.el-main {
  background: #f0f2f5;
}
.el-menu {
  min-height: 100vh;
  background-color: #001529;
  border-right: 0;
}
.el-menu-item {
  color: hsla(0, 0%, 100%, 0.65);
}
.el-menu-item:hover {
  background-color: #1890ff;
  color: #ffffff;
}
.el-menu-item.is-active {
  background-color: #1890ff;
  color: #ffffff;
}
.menuCtrl {
  font-size: 30px;
  line-height: 60px;
  cursor: pointer;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 256px;
  min-height: 100vh;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>