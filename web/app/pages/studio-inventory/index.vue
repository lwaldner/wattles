<template>
  <section class="page-studio-inventory">
    <nuxt-link
      v-for="product in collection"
      :key="product.node.id"
      :to="`/studio-inventory/${product.node.handle}`"
      class="product-block"
    >
      <img
        class="product-image"
        :src="product.node.featuredImage.desktop"
        :style="{
          aspectRatio: `${product.node.featuredImage.width} / ${product.node.featuredImage.height}`,
        }"
        alt="product"
      />
      <div class="product-info">
        <span class="title">{{ product.node.title }}</span>
        <span class="price"
          >${{
            parseInt(product.node.priceRange.minVariantPrice.amount)
          }}</span
        >
      </div>
    </nuxt-link>
  </section>
</template>

<script lang="ts" setup>
const { data: collection } = useFetchCollection("studio-inventory");


useSeoMeta({
  title: "Bella Wattles - Studio Inventory",
  description: "Bella Wattles - Studio Inventory",
});

useHead({
  title: "Bella Wattles - Studio Inventory",
});
</script>

<style lang="scss" scoped>
.page-studio-inventory {
  column-count: 4;
  column-gap: 20px;
  @media (max-width: 1200px) {
    column-count: 3;
  }
  @media (max-width: 900px) {
    column-count: 2;
  }
  @media (max-width: 600px) {
    column-count: 1;
    column-gap: 28px;
  }
}

.product-block {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  transition: color 0.2s;
  @media (max-width: 600px) {
    margin-bottom: 28px;
  }
  @media (hover: hover) {
    &:hover {
      color: var(--accent-color);
    }
  }
}

.product-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.product-info {
  text-align: center;
  width: 100%;
  margin-top: 20px;
  @media (max-width: 800px) {
    margin-top: 12px;
  }
}
.product-info span {
  display: block;
  line-height: 22px;
}
</style>
