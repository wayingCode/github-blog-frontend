<template>
  <div>
    <el-card shadow="never">
      <ul class="menu-list">
        <li class="menu-item">
          <g-link to="/" exact>
            <i class="el-icon-star-off"></i>
            <span slot="title">最新动态</span>
          </g-link>
        </li>
        <li class="menu-item">
          <g-link to="/social">
            <i class="el-icon-mobile-phone"></i>
            <span slot="title">社交圈</span>
          </g-link>
        </li>
        <li class="menu-item">
          <g-link to="/blogs">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">博客列表</span>
          </g-link>
        </li>
        <li class="menu-item">
          <g-link to="/projects">
            <i class="el-icon-service"></i>
            <span slot="title">开源项目</span>
          </g-link>
        </li>
      </ul>
    </el-card>
  </div>
</template>
<script></script>
<style scoped>
.menu-list {
  border-right: solid 1px #e6e6e6;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #fff;
}
.menu-list .menu-item {
  font-size: 14px;
  color: #303133;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  height: 56px;
  line-height: 56px;
  position: relative;
  white-space: nowrap;
  list-style: none;
}
.menu-list .menu-item [class^=el-icon-] {
  margin-right: 5px;
  font-size: 18px;
  width: 24px;
}
.menu-list .menu-item a{
  padding: 0 20px;
  display: block;
  color: #303133;
  text-decoration: none;
  transition: background 0.33s;
}
.menu-list .menu-item a.active,
.menu-list .menu-item a:hover{
  background-color: rgb(236, 244, 252);
  color: #409EFF;
}
</style>
