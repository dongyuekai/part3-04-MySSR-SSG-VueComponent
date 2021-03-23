<template>
  <div>
    <h1>{{ $page.post.title }}</h1>
    <div>
      {{ $page.post.content }}
    </div>
  </div>
</template>
<page-query>
  query($id:ID!) {
    post(id:$id){
      id
      title
      content
    }
  }
</page-query>
<script>
export default {
  name: "PostPage",
  // metaInfo: {
  //   title: ''
  // }
  metaInfo() {
    return {
      title: this.$page.post.title,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>