<template>
  <section class="page-product-detail">
    <div class="slideshow-wrapper">
      <client-only>
        <swiper-container
          class="slideshow"
          ref="slideshowEl"
          navigation="true"
          loop="true"
        >
          <swiper-slide v-for="image in product.images.nodes" :key="image.id">
            <img :src="image.medium" alt="product" />
          </swiper-slide>
        </swiper-container>
      </client-only>
      <div class="thumbnails">
        <img
          v-for="(image, index) in product.images.nodes"
          :key="image.id"
          :src="image.small"
          alt="slideshow thumbnail"
          @click="goToSlide(index)"
        />
      </div>
    </div>
    <div class="product-info">
      <div class="info-wrapper">
        <h2 class="product-title">{{ product.title }}</h2>
        <div class="price">
          ${{ parseFloat(product.variants.nodes[0].priceV2.amount).toFixed(2) }}
        </div>
      </div>
      <div class="description" v-html="product.descriptionHtml" />
      <div v-if="!itemInCart" class="atc-button" @click="addToCart">
        Add To Cart
      </div>
      <div v-else class="atc-button" @click="removeFromCart">
        Remove From Cart
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const cartStore = useCartStore();
const route = useRoute();
const { data: product } = await useFetchProduct(route.params.product);
const slideshowEl = ref(null);
const goToSlide = (index: number) => {
  slideshowEl.value!.swiper.slideTo(index);
};

const addToCart = async () => {
  await cartStore.addToCart(product.value.variants.nodes[0].id, 1);
};

const removeFromCart = async () => {
  await cartStore.removeFromCart(itemInCart.value.id);
};

const itemInCart = computed(() => {
  return (
    cartStore.cart?.lines?.nodes?.find(
      (item) => item.merchandise.product.id === product.value.id
    ) ?? false
  );
});
</script>

<style lang="scss" scoped>
.page-product-detail {
  display: flex;
  gap: 24px;
  align-items: center;
}

.slideshow-wrapper {
  max-width: 650px;
  width: calc(100% - 280px);
  aspect-ratio: 1;
}

.slideshow {
  margin: 0;
  --swiper-navigation-color: #fff;
  &::part(button-next) {
    display: none;
    width: 12px;
    mix-blend-mode: difference;
  }
  &::part(button-prev) {
    display: none;
    width: 12px;
    mix-blend-mode: difference;
  }
  img {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    height: auto;
    object-fit: contain;
  }
}
.thumbnails {
  margin-top: 8px;
  img {
    width: 65px;
    height: auto;
    aspect-ratio: 1;
    cursor: pointer;
    transition: opacity 0.2s;
    @media (hover: hover) {
      &:hover {
        opacity: 0.6;
      }
    }
  }
}

.product-info {
  margin-bottom: 78px;
  min-width: 280px;
  .product-title {
    color: var(--accent-color);
    font-size: 32px;
    margin: 0 0 4px 0;
  }
  .price {
    font-size: 18px;
  }
  .atc-button {
    background-color: var(--accent-color);
    color: #fff;
    text-transform: uppercase;
    font-size: 14px;
    padding: 12px 48px;
    width: fit-content;
    font-weight: bold;
    cursor: pointer;
    border: 4px solid var(--accent-color);
    transition: background-color 0.2s, color 0.2s;
    @media (hover: hover) {
      &:hover {
        background-color: #fff;
        color: var(--accent-color);
      }
    }
  }
}

@media (max-width: 800px) {
  .page-product-detail {
    display: block;
  }
  .slideshow {
    &::part(button-next) {
      display: unset;
    }
    &::part(button-prev) {
      display: unset;
    }
  }
  .slideshow-wrapper {
    width: 100%;
    max-width: unset;
  }
  .thumbnails {
    display: none;
  }
  .product-info {
    margin: 0;
    .info-wrapper {
      margin-top: 12px;
      display: flex;
      align-items: center;
      .product-title {
        margin: 0;
        flex: 1 1 auto;
      }
      .price {
        padding-top: 8px;
      }
    }
    .description {
      ::v-deep(p) {
        margin: 8px 0;
      }
    }
    .atc-button {
      width: 100%;
      border: unset;
      box-sizing: border-box;
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
