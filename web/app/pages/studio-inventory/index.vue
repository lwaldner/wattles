<template>
  <section class="page-studio-inventory">
    <div
      v-for="(column, columnIndex) in columns"
      :key="columnIndex"
      class="product-column"
    >
      <nuxt-link
        v-for="product in column"
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
    </div>
  </section>
</template>

<script lang="ts" setup>
const { data: collection } = useFetchCollection("studio-inventory");

const columnCount = ref(4);

const updateColumnCount = () => {
  const width = window.innerWidth;
  if (width <= 600) columnCount.value = 1;
  else if (width <= 900) columnCount.value = 2;
  else if (width <= 1200) columnCount.value = 3;
  else columnCount.value = 4;
};

onMounted(() => {
  updateColumnCount();
  window.addEventListener("resize", updateColumnCount);
});

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", updateColumnCount);
  }
});

const columns = computed(() => {
  const items = (collection.value as any[]) || [];
  const count = columnCount.value;
  const cols: any[][] = Array.from({ length: count }, () => []);
  items.forEach((item, index) => {
    const col = cols[index % count];
    if (col) col.push(item);
  });
  return cols;
});

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
  display: flex;
  gap: 20px;
  align-items: flex-start;
  @media (max-width: 600px) {
    gap: 28px;
  }
}

.product-column {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.product-block {
  display: block;
  width: 100%;
  margin-bottom: 20px;
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
