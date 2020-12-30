const { externalMetadata } = require('./src/config/index')
const { setBlogsNode, setNewsNode, setProjectsNode, setFollowersNode, setFollowingsNode } = require('./src/collections/index')

module.exports = function (api) {
  api.loadSource(async ({ addCollection, addMetadata }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    for (key in externalMetadata) {
      addMetadata(key, externalMetadata[key])
    }

    const news = addCollection('news')
    await setNewsNode(news)

    const blogs = addCollection('blogs')
    await setBlogsNode(blogs)

    const projects = addCollection('projects')
    await setProjectsNode(projects)

    const followers = addCollection('followers')
    await setFollowersNode(followers)

    const followings = addCollection('followings')
    await setFollowingsNode(followings)
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
