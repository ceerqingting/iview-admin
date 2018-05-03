const fs = require('fs')
const glob = require('glob')
const rm = require('rimraf')

let data = JSON.parse(fs.readFileSync('static/menu.json'))

let menuList = data.body

const getTemplate = function (pathname) {
  return `<template>
  <div>
    <p>${pathname}</p>
    <input type="text"/>
    <p>默认缓存</p>
  </div>
</template>

<script>
export default {
  name: '${pathname}'
}
</script>
`
}

let components = 'export default {'

function createMenu (item, filePath) {
  const dirPath = filePath + item.menuUrl
  fs.mkdir(dirPath, (err) => {
    if (err) {
      // rm(dirPath, err => {
      //   createMenu(item, filePath)
      // })
      console.log(err)
    } else {
      if (item.subMenuInfoDTO.length) {
        item.subMenuInfoDTO.forEach((sub) => {
          fs.writeFileSync(dirPath + sub.menuUrl + '.vue', getTemplate(sub.menuUrl.slice(1)), 'utf8')
          components += `${sub.menuUrl.slice(1)}: () => import('.${item.menuUrl + sub.menuUrl}'), `
        })
      }
    }
  })
}

const filePath = glob.sync('src/views')
menuList.forEach((item) => {
  createMenu(item, filePath)
})
setTimeout(() => {
  components = components.slice(0, -2) + '}\n'
  fs.writeFileSync(filePath + '/modules.js', components, 'utf8')
}, 200)
