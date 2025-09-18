<template>
  <div :class="['layout-default']">
    <site-nav />
    <site-cart />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
const { mobileMenuOpen } = storeToRefs(useMainStore());
const cartStore = useCartStore();

watch(mobileMenuOpen, (newVal) => {
  if (newVal) {
    document.body.classList.add("scroll-locked");
  } else {
    document.body.classList.remove("scroll-locked");
  }
});

onMounted(async () => {
  if (import.meta.client) {
    await cartStore.loadCart();
  }
});
</script>

<style lang="scss" scoped>
.layout-default {
  position: relative;
  padding: 45px 90px 45px 245px;
  box-sizing: border-box;
  background-color: #fff;
  min-height: 100dvh;
  @media only screen and (max-width: 800px) {
    padding: 20px 20px 20px;
  }
}
</style>
