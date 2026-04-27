<template>
  <section class="page-product-detail">
    <div class="slideshow-wrapper">
      <client-only>
        <swiper-container
          class="slideshow"
          :class="{ 'is-single-slide': !hasMultipleSlides }"
          ref="slideshowEl"
          :navigation="hasMultipleSlides"
          :loop="hasMultipleSlides"
        >
          <swiper-slide
            v-for="(image, index) in product.images.nodes"
            :key="image.id"
            @click="openFullscreen(index)"
          >
            <img
              :src="image.medium"
              :style="{ aspectRatio: `${image.width} / ${image.height}` }"
              alt="product"
            />
          </swiper-slide>
        </swiper-container>
      </client-only>
      <div class="thumbnails" v-if="hasMultipleSlides">
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
          <span v-if="hasDiscount" class="compare-at-price"
            >${{
              parseFloat(
                product.variants.nodes[0].compareAtPriceV2.amount
              )
            }}</span
          >
          <span
            >${{
              parseFloat(product.variants.nodes[0].priceV2.amount)
            }}</span
          >
        </div>
      </div>
      <div v-if="!itemInCart" class="atc-button" @click="addToCart">
        Add To Cart
      </div>
      <div v-else class="atc-button" @click="removeFromCart">
        Remove From Cart
      </div>
      <div class="description" v-html="product.descriptionHtml" />
    </div>
    <client-only>
      <Teleport to="body">
        <div
          v-if="fullscreenActive"
          class="fullscreen-slideshow"
          @click.self="closeFullscreen"
        >
          <swiper-container
            class="fullscreen-swiper"
            ref="fullscreenEl"
            :navigation="hasMultipleSlides"
            :loop="hasMultipleSlides"
            :keyboard="true"
            :initial-slide="fullscreenIndex"
          >
            <swiper-slide
              v-for="image in product.images.nodes"
              :key="image.id"
            >
              <img :src="image.large" alt="product" />
            </swiper-slide>
          </swiper-container>
          <button
            class="fullscreen-close"
            type="button"
            aria-label="Close"
            @click="closeFullscreen"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </Teleport>
    </client-only>
  </section>
</template>

<script lang="ts" setup>
const cartStore = useCartStore();
const route = useRoute();
const { data: product } = await useFetchProduct(route.params.product);
const slideshowEl = ref<any>(null);
const fullscreenEl = ref<any>(null);
const fullscreenActive = ref(false);
const fullscreenIndex = ref(0);

const goToSlide = (index: number) => {
  slideshowEl.value!.swiper.slideTo(index);
};

const openFullscreen = (index: number) => {
  fullscreenIndex.value = index;
  fullscreenActive.value = true;
  if (import.meta.client) {
    document.body.classList.add("scroll-locked");
  }
};

const closeFullscreen = () => {
  const currentIndex = fullscreenEl.value?.swiper?.realIndex;
  fullscreenActive.value = false;
  if (import.meta.client) {
    document.body.classList.remove("scroll-locked");
  }
  const mainSwiper = slideshowEl.value?.swiper;
  if (typeof currentIndex === "number" && mainSwiper) {
    if (hasMultipleSlides.value) {
      mainSwiper.slideToLoop(currentIndex, 0);
    } else {
      mainSwiper.slideTo(currentIndex, 0);
    }
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && fullscreenActive.value) {
    closeFullscreen();
  }
};

onMounted(() => {
  if (import.meta.client) {
    globalThis.addEventListener("keydown", handleKeydown);
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    globalThis.removeEventListener("keydown", handleKeydown);
    document.body.classList.remove("scroll-locked");
  }
});

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

const hasMultipleSlides = computed(
  () => (product.value?.images?.nodes?.length ?? 0) > 1
);

const hasDiscount = computed(() => {
  const variant = product.value?.variants?.nodes?.[0];
  const compareAt = parseFloat(variant?.compareAtPriceV2?.amount ?? "0");
  const price = parseFloat(variant?.priceV2?.amount ?? "0");
  return compareAt > 0 && compareAt > price;
});

useSeoMeta({
  title: `Bella Wattles - ${product.value.title}`,
  description: product.value.descriptionHtml,
});

useHead({
  title: `Bella Wattles - ${product.value.title}`,
});
</script>

<style lang="scss" scoped>
.page-product-detail {
  display: flex;
  flex-direction: row;
  gap: 20px;
  max-height: calc(100dvh - 45px);
  align-items: center;
}

.slideshow-wrapper {
  flex: 0 1 650px;
  max-width: 650px;
  min-width: 0;
}

.slideshow {
  margin: 0;
  width: 100%;
  height: auto;
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
  :deep(swiper-slide) {
    width: 100% !important;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
    aspect-ratio: 1;
    cursor: zoom-in;
  }
}
.thumbnails {
  margin-top: 8px;
  display: flex;
  justify-content: center;
  gap: 8px;
  img {
    width: 65px;
    height: auto;
    cursor: pointer;
    aspect-ratio: 1;
    object-fit: contain;
    transition: opacity 0.2s;
    @media (hover: hover) {
      &:hover {
        opacity: 0.6;
      }
    }
  }
}

.product-info {
  flex: 1 1 280px;
  margin-top: 12px;
  margin-bottom: 78px;
  min-width: 280px;
  .product-title {
    color: var(--accent-color);
    font-size: 32px;
    margin: 0 0 4px 0;
  }
  .price {
    font-size: 18px;
    display: flex;
    gap: 8px;
    align-items: baseline;
    .compare-at-price {
      text-decoration: line-through;
      opacity: 0.6;
    }
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
    margin: 8px 0 0 0;
    transition: background-color 0.2s, color 0.2s;
    @media (hover: hover) {
      &:hover {
        background-color: #fff;
        color: var(--accent-color);
      }
    }
  }
}

.fullscreen-slideshow {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;
}

.fullscreen-swiper {
  width: 100%;
  height: 100%;
  --swiper-navigation-color: #fff;
  --swiper-navigation-size: 32px;
  :deep(swiper-slide) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    cursor: zoom-out;
  }
}

.fullscreen-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 36px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: opacity 0.2s;
  @media (hover: hover) {
    &:hover {
      opacity: 0.6;
    }
  }
}

@media (max-width: 800px) {
  .page-product-detail {
    display: block;
  }
  .slideshow:not(.is-single-slide) {
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
  .fullscreen-slideshow {
    padding: 20px 0;
  }
  .fullscreen-close {
    top: 8px;
    right: 8px;
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
      margin: 8px 0 20px 0;
    }
  }
}
</style>
