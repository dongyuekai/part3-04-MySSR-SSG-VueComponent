<template>
  <Layout>
    <!-- Page Header -->
    <header
      class="masthead"
      :style="{
        backgroundImage: `url(${
          GRIDSOME_API_URL + $page.gernals.edges[0].node.conver.url
        })`,
      }"
    >
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1>{{ $page.gernals.edges[0].node.title }}</h1>
              <span class="subheading">{{
                $page.gernals.edges[0].node.subtitle
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div
            class="post-preview"
            v-for="edge in $page.posts.edges"
            :key="edge.node.id"
          >
            <g-link :to="'/post/' + edge.node.id">
              <h2 class="post-title">
                {{ edge.node.title }}
              </h2>
            </g-link>
            <p class="post-meta">
              Posted by
              <a href="#">Start Bootstrap</a>
              on {{ edge.node.created_at }}
            </p>
            <p>
              <span v-for="tag in edge.node.tags" :key="tag.id">
                <g-link :to="'/tag/' + tag.id">{{ tag.title }}</g-link
                ><br />
              </span>
            </p>

            <hr />
          </div>
          <!-- Pager 分页 -->
          <Pager :info="$page.posts.pageInfo" />
        </div>
      </div>
    </div>
  </Layout>
</template>
<page-query>
query($page: Int) {
  posts:allStrapiPost(perPage:2,page:$page) @paginate{
    pageInfo {
      totalPages
      currentPage
    }
    edges{
      node{
        id
        title
        tags{
          id
          title
        }
      }
    }
  }
  gernals:allStrapiGernal{
    edges{
      node{
        id
        title
        subtitle
        conver{
          url
        }
      }
    }
  }
}
</page-query>
<script>
import { Pager } from "gridsome";
export default {
  name: "HomePage",
  metaInfo: {
    title: "Hello, world!",
  },
  components: {
    Pager,
  },
};
</script>

<style>
</style>
