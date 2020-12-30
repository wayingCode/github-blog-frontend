<template>
  <Layout>
    <el-card
      shadow="never"
      style="min-height: 400px;margin-bottom: 20px;padding: 0px 0px 20px 0px"
    >
      <Tab :followersCount="$page.followers.pageInfo.totalItems" :followingsCount="$page.followings.pageInfo.totalItems" activeTab="followings"/>
      <div>
        <div v-if="followings.length">
          <el-row style="min-height: 200px; ">
            <el-col
              :span="8"
              v-for="(item, index) in followings"
              :key="'following' + index"
              style="padding: 10px"
            >
              <User :user="item.node" />
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="text-align: center;margin-top: 10px" class="pager-box">
        <Pager :info="$page.followings.pageInfo"/>
      </div>
    </el-card>
  </Layout>
</template>
<page-query>
query($page: Int){
  followings:allFollowings(perPage:5,page:$page) @paginate {
    pageInfo{
      perPage
      totalPages
      totalItems
      currentPage
    }
    edges{
      node{
        name
        avatarUrl
        htmlUrl
      }
    }
  }
  followers:allFollowers {
    pageInfo{
      totalItems
    }
  }
}
</page-query>
<script>
import { Pager } from "gridsome"
import Tab from '../../components/Tab'
import User from "../../components/User"
export default {
  name: "Social",
  components: {
    Pager,
    User,
    Tab
  },
  data() {
    return {
      activeTab: "followers",
    }
  },
  computed: {
    followings() {
      return this.$page.followings.edges
    },
  },
}
</script>

<style scoped>
.pager-box nav a {
  display: inline-block;
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 30px;
  border-radius: 2px;
  padding: 0 4px;
  font-size: 13px;
  height: 28px;
  line-height: 28px;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  font-weight: 700;
}

.pager-box nav a:hover {
  color: #409eff;
}
.pager-box nav a.active {
  background-color: #409eff;
  color: #fff;
}
</style>
