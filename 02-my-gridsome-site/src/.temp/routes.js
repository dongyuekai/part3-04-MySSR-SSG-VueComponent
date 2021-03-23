const c1 = () => import(/* webpackChunkName: "page--src--templates--my-page-vue" */ "/Users/dyk/Desktop/demos/LG/part4-04-MySSR-SSG-VueComponent/02-my-gridsome-site/src/templates/MyPage.vue")
const c2 = () => import(/* webpackChunkName: "page--src--pages--about-vue" */ "/Users/dyk/Desktop/demos/LG/part4-04-MySSR-SSG-VueComponent/02-my-gridsome-site/src/pages/About.vue")
const c3 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/dyk/Desktop/demos/LG/part4-04-MySSR-SSG-VueComponent/02-my-gridsome-site/node_modules/gridsome/app/pages/404.vue")
const c4 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/dyk/Desktop/demos/LG/part4-04-MySSR-SSG-VueComponent/02-my-gridsome-site/src/pages/Index.vue")

export default [
  {
    path: "/my-page/",
    component: c1
  },
  {
    path: "/about/",
    component: c2
  },
  {
    name: "404",
    path: "/404/",
    component: c3
  },
  {
    name: "home",
    path: "/",
    component: c4
  },
  {
    name: "*",
    path: "*",
    component: c3
  }
]
