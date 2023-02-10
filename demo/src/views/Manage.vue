<template>
  <div style="height: 100%">
    <el-container style="height: 100%;">
      <el-aside :width="sideWidth + 'px'" style="box-shadow: 2px 0 6px rgba(0 21 41 / 35%)">
        <Aside :isCollapse="isCollapse"/>
      </el-aside>
  
      <el-container>
        <el-header style="border-bottom: 1px solid #ccc;">
          <Header :collapse-btn-class="collapseBtnClass" :collapse="collapse" :pathName="pathName" :user="user"/>
        </el-header>

        <el-main>
          <!--表示当前页面会在子路由中展示-->
          <router-view @refreshUser="getUser"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  components: {
    Aside,
    Header
  },
  props: {
    menus: Array
  },
  data() {
      return {
        isCollapse: false,
        collapseBtnClass: 'el-icon-s-fold',
        sideWidth: 200,
        pathName: "",
        user: {}
      }
    },
  created() {
    // 从后台获取最新的User数据
    this.getUser()
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse
      this.sideWidth = this.isCollapse ? 64 : 200
      this.collapseBtnClass = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    getUser() {
      let username = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : {}
      // 从后台获取User数据
      this.request.get('user/username/' + username).then(res => {
        // 重新赋值后台的最新User数据
        this.user = res.data
      })
    }
  }
}
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
  }

  .el-aside {
    color: #333;
  }
</style>
