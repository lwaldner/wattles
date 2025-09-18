<template>
  <div class="cart-indicator" v-show="numCartItems">
    Cart ({{ numCartItems }})
  </div>
</template>

<script lang="ts" setup>
const cartStore = useCartStore();

const numCartItems = computed(() => cartStore.cart?.lines?.nodes.length ?? 0);
</script>

<style lang="scss" scoped>
.cart-indicator {
  position: fixed;
  top: 0;
  right: 0;
  color: var(--accent-color);
  font-weight: bold;
}
</style>
