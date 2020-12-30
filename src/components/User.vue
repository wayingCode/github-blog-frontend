<template>
  <el-card
    shadow="hover"
    style="font-size: 13px;color: #606266;line-height: 20px"
  >
    <i class="el-icon-star-off"></i>&emsp;
    <a style=" text-decoration:none;cursor:pointer">{{ user.name }}</a>
    <br />
    <i class="el-icon-message"></i>&emsp;
    <a
      :href="user.htmlUrl"
      target="_blank"
      style=" text-decoration:none;cursor:pointer"
      >TA的主页</a
    >
    <br />
    <img
      :src="user.avatarUrl"
      style="width: 100%;border-radius:5px;margin-top: 5px"
    />
  </el-card>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: {
      type: Object,
      required:true
    }
  }
}
</script>

<style></style>
