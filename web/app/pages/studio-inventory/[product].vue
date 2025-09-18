<template>
  <section class="page-product-detail">
    <div class="slideshow-wrapper">
      <swiper-container class="slideshow" ref="slideshowEl">
        <swiper-slide v-for="image in product.images.nodes" :key="image.id">
          <img :src="image.medium" alt="product" />
        </swiper-slide>
      </swiper-container>
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
      <h2 class="product-title">{{ product.title }}</h2>
      <div class="price">
        ${{ parseFloat(product.variants.nodes[0].priceV2.amount).toFixed(2) }}
      </div>
      <div class="description" v-html="product.descriptionHtml" />
      <div class="atc-button" @click="addToCart">Add To Cart</div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { register } from "swiper/element/bundle";
register();
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
</script>

<style lang="scss" scoped>
.page-product-detail {
  display: flex;
  gap: 24px;
  align-items: center;
}

.slideshow-wrapper {
  width: 650px;
  aspect-ratio: 1;
}

.slideshow {
  margin: 0;
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
</style>
