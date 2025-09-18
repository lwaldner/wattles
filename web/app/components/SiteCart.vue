<template>
  <div class="cart-indicator" v-show="numCartItems" @click="cartOpen = true">
    <span class="item-count">Cart [{{ numCartItems }}]</span>
  </div>
  <div
    :class="['click-blocker', { open: cartOpen }]"
    @click="cartOpen = false"
  ></div>
  <div :class="['cart', { open: cartOpen }]">
    <div class="close-button" @click="cartOpen = false">Close</div>
    <nuxt-link
      class="cart-item"
      v-for="item in cart?.lines?.nodes"
      :key="item.id"
      :to="`/studio-inventory/${item.merchandise.product.handle}`"
    >
      <img :src="item.merchandise.image?.url" :alt="item.merchandise.title" />
      <div class="item-details">
        <span class="item-title">{{ item.merchandise.product.title }}</span>
        <span class="remove-item" @click="removeFromCart(item.id)">Remove</span>
      </div>
    </nuxt-link>
    <a class="checkout-button" :href="cart?.checkoutUrl ?? ''">Checkout</a>
  </div>
</template>

<script lang="ts" setup>
const cartStore = useCartStore();
const { cart, cartOpen } = storeToRefs(cartStore);

const numCartItems = computed(() => cart.value?.lines?.nodes.length ?? 0);

watch(numCartItems, (newCount) => {
  if (newCount === 0) {
    cartOpen.value = false;
  } else cartOpen.value = true;
});

const removeFromCart = (lineId: string) => {
  cartStore.removeFromCart(lineId);
};
</script>

<style lang="scss" scoped>
.cart-indicator {
  position: fixed;
  top: 45px;
  right: 45px;
  transform: translateX(50%);
  color: var(--accent-color);
  font-weight: bold;
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      text-decoration: underline;
    }
  }
}
.cart {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 200;
  width: 300px;
  height: 100%;
  color: #fff;
  background-color: var(--accent-color);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 45px 20px 10px;
  box-sizing: border-box;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  &.open {
    transform: translateX(0);
  }
}
.close-button {
  position: absolute;
  top: 22.5px;
  right: 20px;
  color: #fff;
  transform: translate(0, -50%);
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      text-decoration: underline;
    }
  }
}
.click-blocker {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  &.open {
    opacity: 1;
    pointer-events: auto;
  }
}
.cart-item {
  width: 100%;
  display: block;
  color: #fff;
  img {
    width: 100%;
    height: auto;
  }
  .item-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item-title {
      font-size: 24px;
      letter-spacing: 0.6px;
    }
    .remove-item {
      font-size: 14px;
      padding-top: 4px;
      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
.checkout-button {
  display: block;
  background-color: #fff;
  color: var(--accent-color);
  font-weight: bold;
  width: calc(100% - 8px);
  border: 4px solid #fff;
  padding: 10px 0;
  margin-top: 6px;
  text-align: center;
  transition: background-color 0.3s, color 0.3s;
  @media (hover: hover) {
    &:hover {
      background-color: var(--accent-color);
      color: #fff;
    }
  }
}

@media only screen and (max-width: 800px) {
  .cart-indicator {
    top: 29px;
    right: 70px;
    transform: translateX(0);
  }
  .cart {
    width: 100%;
  }
}
</style>
