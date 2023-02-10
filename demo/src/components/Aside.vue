<template>
  <el-menu :default-openeds="['1', '3']" style="height: 100%; border-right: 0; overflow-x: hidden;"
           :collapse="isCollapse"
           :collapse-transition="false"
           background-color=rgba(47,65,86,1)
           text-color="white"
           active-text-color="rgb(0,0,0)"
           router
           @select="handleSelect">

    <div style="height: 68px; line-height: 60px; text-align: center;">
      <img src="../assets/logo.png" alt="" style="width: 20px;position: relative; top: 5px; margin-right: 5px">
      <b style="color: white" v-if="!isCollapse">后台管理系统</b>
    </div>
    <div v-for="item in menus" :key="item.id">
      <div v-if="item.path">
        <el-menu-item :index="item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </div>
      <div v-else>
        <el-submenu index="item.id + ''">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
        <div v-for="subItem in item.children" :key="subItem.id">
          <el-menu-item :index="subItem.path">
            <i :calss="subItem.icon"></i>
            <span slot="title">{{ subItem.name }}</span>
          </el-menu-item>
        </div>
        </el-submenu>
      </div>
    </div>
<!--    <el-menu-item index="/">-->
<!--      <template slot="title">-->
<!--        <i class="el-icon-house"></i>-->
<!--        <span slot="title">首页</span>-->
<!--      </template>-->
<!--    </el-menu-item>-->
<!--    <el-submenu index="2">-->
<!--      <template slot="title">-->
<!--        <i class="el-icon-menu"></i>-->
<!--        <span slot="title">系统管理</span>-->
<!--      </template>-->
<!--      <el-menu-item index="/user">-->
<!--        <i class="el-icon-s-custom"></i>-->
<!--        <span slot="title">用户管理</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/file">-->
<!--        <i class="el-icon-tickets"></i>-->
<!--        <span slot="title">文件管理</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/role">-->
<!--        <i class="el-icon-lock"></i>-->
<!--        <span slot="title">角色管理</span>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/menu">-->
<!--        <i class="el-icon-s-order"></i>-->
<!--        <span slot="title">菜单管理</span>-->
<!--      </el-menu-item>-->
<!--    </el-submenu>-->
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
  },
  data() {
    return {
      menus: localStorage.getItem("menus") ? JSON.parse(localStorage.getItem("menus")) : []
    }
  },
  methods: {
    handleSelect(index){
      console.log(this.$route)
    }
  }
}
</script>

<style scoped>

</style>