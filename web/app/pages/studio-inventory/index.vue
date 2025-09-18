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
        alt="product"
      />
      <div class="product-info">
        <span class="title">{{ product.node.title }}</span>
        <span class="price"
          >${{
            parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(
              2
            )
          }}</span
        >
      </div>
    </nuxt-link>
  </section>
</template>

<script lang="ts" setup>
const { data: collection } = useFetchCollection("studio-inventory");
</script>

<style lang="scss" scoped>
.page-studio-inventory {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.product-block {
  display: block;
  width: 100%;
  transition: color 0.2s;
  @media (hover: hover) {
    &:hover {
      color: var(--accent-color);
    }
  }
}

.product-image {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  display: block;
  object-fit: contain;
}

.product-info {
  text-align: center;
  width: 100%;
  margin-top: 20px;
}
.product-info span {
  display: block;
  line-height: 22px;
}
</style>
