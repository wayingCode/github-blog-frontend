const dayjs = require('dayjs')
const markdownIt = require('markdown-it')
const GistApi = require('../api/gist')
const ProjectApi = require('../api/project')
const UserApi = require('../api/user')

// 设置最新动态数据
const setNewsNode = async (collection) => {
  let { data } = await GistApi.list({ page: 1, pageSize: 1 })
  if (!data || data.length == 0) {
    collection.addNode({
      title: '',
      content: '',
      description: '',
      createTime: '',
      updateTime: ''
    })
    return
  }
  let id
  for (let key in data[0].files) {
    id = data[0]['id']
    break
  }
  let result = await GistApi.single(id)
  data = result.data
  const mt = new markdownIt()
  for (let key in data.files) {
    collection.addNode({
      title: key,
      content: mt.render(data.files[key]['content']),
      description: data['description'],
      createTime: dayjs(data['created_at']).format('YYYY-MM-DD HH:mm:ss'),
      updateTime: dayjs(data['updated_at']).format('YYYY-MM-DD HH:mm:ss')
    })
    break
  }
}

// 设置博客列表数据
const setBlogsNode = async (collection) => {
  let { data } = await GistApi.list({ page: 1, pageSize: 100 })
  for (let i = 0; i < data.length; i++) {
    for (let key in data[i].files) {
      collection.addNode({
        title: key,
        description: data[i]['description'],
        id: data[i]['id'],
        createTime: dayjs(data[i]['created_at']).format('YYYY-MM-DD HH:mm:ss'),
        updateTime: dayjs(data[i]['updated_at']).format('YYYY-MM-DD HH:mm:ss'),
        hide: false
      })
      break
    }
  }
}

// 设置开源项目数据
const setProjectsNode = async (collection) => {
  const { data } = await ProjectApi.list({ page: 1, pageSize: 1000 })
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    collection.addNode({
      id: item.id,
      name: item.name,
      url: item['html_url'],
      description: item['description'],
      stargazersCount: item['stargazers_count'],
      watchersCount: item['watchers_count'],
      forksCount: item['forks_count'],
      language: item['language'],
      license: item['license'] ? item['license']['spdx_id'] : null,
      createTime: dayjs(item['created_at']).format('YYYY-MM-DD HH:mm:ss'),
      updateTime: dayjs(item['updated_at']).format('YYYY-MM-DD HH:mm:ss')
    })
  }
}

// 设置粉丝数据
const setFollowersNode = async (collection) => {
  const { data } = await UserApi.followers({ page: 1, pageSize: 1000 })
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    collection.addNode({
      name:item['login'],
      avatarUrl:item['avatar_url'],
      htmlUrl:item['html_url']
    })
  }
}

// 设置关注数据
const setFollowingsNode = async (collection) => {
  const { data } = await UserApi.following({ page: 1, pageSize: 1000 })
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    collection.addNode({
      name:item['login'],
      avatarUrl:item['avatar_url'],
      htmlUrl:item['html_url']
    })
  }
}

module.exports = {
  setNewsNode,
  setBlogsNode,
  setProjectsNode,
  setFollowersNode,
  setFollowingsNode
}