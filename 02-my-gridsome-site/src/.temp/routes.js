const c1 = () => import(/* webpackChunkName: "page--src--pages--post2-vue" */ "/Users/dyk/Desktop/demos/LG/part4-04-MySSR-SSG-VueComponent/02-my-gridsome-site/src/pages/Post2.vue")
const c2 = () => import(/* webpackChunkName: "page--src--pages--posts1-vue" */ "/Users/dyk/Desktop/demos/LG/part4-04-MySSR-SSG-VueComponent/02-my-gridsome-site/src/pages/Posts1.vue")
const c3 = () => import(/* webpackChunkName: "page--src--templates--my-page-vue" */ "/Users/dyk/Desktop/demos/LG/part4-04-MySSR-SSG-VueComponent/02-my-gridsome-site/src/templates/MyPage.vue")
const c4 = () => import(/* webpackChunkName: "page--src--pages--about-vue" */ "/Users/dyk/Desktop/demos/LG/part4-04-MySSR-SSG-VueComponent/02-my-gridsome-site/src/pages/About.vue")
const c5 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/dyk/Desktop/demos/LG/part4-04-MySSR-SSG-VueComponent/02-my-gridsome-site/node_modules/gridsome/app/pages/404.vue")
const c6 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/dyk/Desktop/demos/LG/part4-04-MySSR-SSG-VueComponent/02-my-gridsome-site/src/pages/Index.vue")

export default [
  {
    path: "/post2/",
    component: c1
  },
  {
    path: "/posts1/",
    component: c2
  },
  {
    path: "/my-page/",
    component: c3
  },
  {
    path: "/about/",
    component: c4
  },
  {
    name: "404",
    path: "/404/",
    component: c5
  },
  {
    name: "home",
    path: "/",
    component: c6
  },
  {
    name: "*",
    path: "*",
    component: c5
  }
]
