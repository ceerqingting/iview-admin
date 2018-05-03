
# iview-admin

## Build Setup

``` bash
# install dependencies
npm install

```

## 第一步：先创建菜单栏

菜单栏为后台异步获取，数据格式如static/menu.json文件所示

```json
{
  "id": "2024800e-9526-477e-ac1f-a1fdd89ba378",  // 菜单栏栏目id
  "menuName": "模块A",    // 菜单栏栏目名称
  "menuUrl": "/modulea",  // 菜单栏栏目路径
  "parentId": "",
  "icon": "ios-paper",
  "subMenuInfoDTO": [{    // 子菜单栏集合
      "id": "99138bb2-165e-4096-a4a7-f3a09c2a32ef",
      "menuName": "A子模块A",
      "menuUrl": "/moduleachilda",
      "parentId": "2024800e-9526-477e-ac1f-a1fdd89ba378",
      "subMenuInfoDTO": []
    },
    {
      "id": "0d761735-fcc9-456c-8ff2-ab3aaba0b750",
      "menuName": "A子模块B",
      "menuUrl": "/moduleachildb",
      "parentId": "2024800e-9526-477e-ac1f-a1fdd89ba378",
      "subMenuInfoDTO": []
    }
  ]
}
```
第一步先把所有异步菜单的数据格式填充好，然后执行生成菜单文件目录操作（先不要运行npm run dev，否则会报错），该操作依赖于menu.json

```bash
# First create asynchronous menu bar file directory,the file directory depends on /static/menu.json
npm run build:menu

```
生成的菜单栏结构如下所示：

```
src
└───views
|      |
|      └───modulea
|            |
|            |
|            └───moduleachilda.vue
|            |
|            |
|            └───moduleachildb.vue
```

## 第二步： 在生成的目录文件下开发对应的页面逻辑

每个页面都是默认缓存的，如果想单独配置不缓存，可以在路由配置中添加noCache这个属性值
 
```javascript
{
  path: '/index',
  name: index,
  meta: {
    noCache: true
  }
}
```
## 第三步：新增路由页面

```javascript
// constantRouterMap 为不会再菜单栏显示的路由
constantRouterMap = [{
  path: '/page403',
  name: 'page403',
  meta: {
    title: '403',
    noCache: true
  },
  component: () => import('../components/page403')
}]
```
