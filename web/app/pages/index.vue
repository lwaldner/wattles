<template>
  <section class="page-home">
    <SanityImage
      class="featured-image"
      :asset-id="homeData.featuredImage.asset._id"
    />
  </section>
</template>

<script lang="ts" setup>
import homeQuery from "@/queries/home";

const { data: homeData } = await useSanityQuery(homeQuery);
</script>

<style lang="scss" scoped>
.page-home {
  position: relative;
  .featured-image {
    position: relative;
    width: 100%;
    height: auto;
  }
}
</style>
