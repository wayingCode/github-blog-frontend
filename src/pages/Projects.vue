<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="margin-bottom: 20px">
        <el-input
          placeholder="请输入关键字"
          clearable
          style="width: 300px"
        ></el-input>
        <el-button
          icon="el-icon-search"
          style="margin-left: 10px"
          circle
          plain
        ></el-button>
        <el-button
          @click="$share()"
          icon="el-icon-share"
          type="warning"
          style="margin-left: 10px"
          plain
          circle
        ></el-button>
      </el-card>

      <div v-if="projects && projects.length > 0">
        <el-card
          shadow="hover"
          v-for="(item, index) in projects"
          :key="'pro' + index"
          style="margin-bottom: 20px"
        >
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <a
                    style="text-decoration:none;cursor:pointer"
                    @click="goDetails(item.node.name)"
                  >
                    <i class="el-icon-service"></i>&nbsp;&nbsp;
                    {{ item.node.name }}
                  </a>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right;">
                  <el-button
                    @click="goGithub(item.node.url)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-back"
                    >前往GitHub</el-button
                  >
                  <el-button
                    @click="$share('/user/project/details/' + item.node.name)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-share"
                  ></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
            最近更新 {{ item.node.updateTime }}
          </div>
          <div
            style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px"
          >
            {{ item.node.description }}
          </div>
          <div
            style="font-size: 1.1rem;color: #303133;padding: 10px 0px 0px 0px"
          >
            <el-row>
              <el-col :span="16" style="padding-top: 5px">
                <el-tooltip
                  effect="dark"
                  :content="'star ' + item.node.stargazersCount"
                  placement="bottom"
                >
                  <i
                    class="el-icon-star-off"
                    style="margin: 0px 5px 0px 0px"
                  ></i>
                </el-tooltip>
                {{ item.node.stargazersCount }}
                <el-tooltip
                  effect="dark"
                  :content="'watch ' + item.node.watchersCount"
                  placement="bottom"
                >
                  <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ item.node.watchersCount }}
                <el-tooltip
                  effect="dark"
                  :content="'fork ' + item.node.forksCount"
                  placement="bottom"
                >
                  <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ item.node.forksCount }}
              </el-col>
              <el-col :span="8" style="text-align: right;">
                <el-tag size="small" type="danger" v-if="item.node.license">{{
                  item.node.license
                }}</el-tag>
                <el-tag size="small" type="success">{{
                  item.node.language
                }}</el-tag>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <div style="text-align: center" class="pager-box">
          <!-- Pager -->
          <Pager :info="$page.projects.pageInfo" />
        </div>
      </div>

      <el-card
        shadow="never"
        style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
        v-if="!projects || projects.length == 0"
      >
        <font style="font-size: 30px;color:#dddddd ">
          <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query($page: Int){
  projects: allProjects(perPage:5,page:$page) @paginate {
    pageInfo{
      totalPages
      currentPage
    }
    edges{
      node{
        id
        name
        url
        description
        stargazersCount
        watchersCount
        forksCount
        language
        license
        createTime
        updateTime
      }
    }
  }
}
</page-query>
<script>
import { Pager } from "gridsome"
export default {
  name: "Projects",
  components: {
    Pager,
  },
  computed: {
    projects() {
      return this.$page.projects.edges
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
