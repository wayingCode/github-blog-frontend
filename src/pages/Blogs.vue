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
          style="margin-left: 10px"
          icon="el-icon-share"
          type="warning"
          plain
          circle
        ></el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          round
          plain
          style="float: right;"
          >写博文</el-button
        >
      </el-card>

      <div v-if="blogs && blogs.length > 0">
        <el-card
          shadow="hover"
          v-for="(item, index) in blogs"
          :key="'p' + index"
          style="margin-bottom: 20px"
        >
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <a
                    style="text-decoration:none;cursor:pointer"
                  >
                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                    {{ item.node.title }}
                  </a>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right;">
                  <el-button
                    @click="$share('/blogs/' + item.node.id)"
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
        </el-card>
        <div style="text-align: center" class="pager-box">
          <!-- pager -->
          <Pager :info="$page.blogs.pageInfo" />
        </div>
      </div>

      <el-card
        shadow="never"
        style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
        v-if="!blogs || blogs.length == 0"
      >
        <font style="font-size: 30px;color:#dddddd ">
          <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query($page: Int){
	blogs:allBlogs(perPage:5,page:$page) @paginate {
    pageInfo{
      totalPages
      currentPage
    }
    edges{
      node{
        title
        id
        description
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
  name: "Blogs",
  components: {
    Pager,
  },
  computed: {
    blogs() {
      return this.$page.blogs.edges
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
