<template>
  <div class="el-tabs__header is-top">
    <div class="el-tabs__nav-wrap is-top">
      <div class="el-tabs__nav-scroll">
        <div class="el-tabs__nav" style="transform: translateX(0px);">
          <div
            class="el-tabs__item is-top"
            :class="{ is_active: activeTab === 'followers' }"
          >
            <g-link to="/social/" v-if="activeTab !== 'followers'">
              粉丝 {{ followersCount }}
            </g-link>
            <template v-else> 粉丝 {{ followersCount }} </template>
          </div>
          <div
            class="el-tabs__item is-top"
            :class="{ is_active: activeTab === 'followings' }"
          >
            <g-link to="/social/followings/" v-if="activeTab !== 'followings'">
              关注 {{ followingsCount }}
            </g-link>
            <template v-else> 关注 {{ followingsCount }} </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    followersCount: {
      type: Number,
      default: 0,
    },
    followingsCount: {
      type: Number,
      default: 0,
    },
    activeTab: {
      type: String,
      default: "followers",
    },
  },
}
</script>

<style scoped>
.el-tabs__item {
  border: solid 1px #e4e7ed;
  margin-right: -1px;
  /* margin-bottom: -1px; */
  background-color: #fff;
  color: #303133;
  padding: 0;
}
.el-tabs__item a {
  color: #303133;
  text-decoration: none;
  display: block;
  padding: 0 20px;
}
.el-tabs__item.is_active {
  border-bottom: solid 1px #fff;
  color: #409eff;
  padding: 0 20px;
}
.el-tabs__item.is_active a {
  color: #409eff;
}
.el-tabs__nav-wrap::after{
  height: 1px;
}
</style>
