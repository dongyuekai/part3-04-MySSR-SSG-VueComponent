<template>
  <Layout>
    <!-- Page Header -->
    <header
      class="masthead"
    >
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="post-heading">
              <h1># {{ $page.tag.title }}</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div
          class="col-lg-8 col-md-10 mx-auto"
          v-for="post in $page.tag.posts"
          :key="post.id"
        >
          <p>
            {{ post.title }}
          </p>
        </div>
      </div>
    </div>
  </Layout>
</template>
<page-query>
  query($id:ID!){
  tag:strapiTag(id:$id){
    id
    title
    posts{
      id
      title
    }
  }
  }
</page-query>
<script>
export default {
  name: "TagPage",
};
</script>

<style lang="scss" scoped>
</style>