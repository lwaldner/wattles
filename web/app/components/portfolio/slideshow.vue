<template>
  <swiper-container
    :class="['detail-slideshow', { visible: slideshowInitialized }]"
    ref="slideshowEl"
    navigation="true"
    loop="true"
    :initial-slide="slideshowIndex"
  >
    <swiper-slide v-for="img in images" :key="img.asset._id">
      <SanityImage :asset-id="img.asset._id" :alt="img.asset._id" :w="1400" />
    </swiper-slide>
  </swiper-container>
  <div class="slideshow-controls">
    <div class="share" @click="shareLink">Share</div>
    <div class="controls">
      <div @click="prevSlide">PREV</div>
      <span> / </span>
      <div @click="nextSlide">NEXT</div>
    </div>
    <div @click="() => emit('closeSlideshow')" class="close-button">
      SHOW THUMBNAILS
    </div>
  </div>
</template>

<script lang="ts" setup>
import sleep from "@/utils/sleep";
const router = useRouter();
const { images, initialIndex } = defineProps<{
  images: Array<{ asset: { _id: string } }>;
  initialIndex: number;
}>();

const emit = defineEmits<{
  closeSlideshow: () => void;
}>();

const slideshowEl = ref<HTMLDivElement | null>(null);
const slideshowIndex = ref(initialIndex);
const slideshowInitialized = ref(false);

watch(
  slideshowIndex,
  (newIndex) => {
    router.replace({
      query: { slide: newIndex + 1 },
    });
  },
  { immediate: true }
);

const prevSlide = () => {
  slideshowEl.value!.swiper.slidePrev();
};

const nextSlide = () => {
  slideshowEl.value!.swiper.slideNext();
};

const shareLink = async () => {
  const ShareData = {
    url: window.location.href,
  };
  try {
    await navigator.share(ShareData);
  } catch (error) {
    console.error("Error sharing:", error);
  }
};

onMounted(async () => {
  if (import.meta.client) {
    slideshowEl.value!.addEventListener("swiperslidechange", (e) => {
      console.log("slide change", e);
      if (slideshowEl.value)
        slideshowIndex.value = slideshowEl.value!.swiper.realIndex;
    });
    await sleep(200);
    slideshowInitialized.value = true;
  }
});

onBeforeUnmount(() => {
  router.replace({
    query: { slide: undefined },
  });
});
</script>

<style lang="scss" scoped>
.detail-slideshow {
  width: 100%;
  height: calc(100dvh - 90px);
  opacity: 0;
  --swiper-navigation-color: transparent;
  transition: opacity 0.3s ease-out;
  &.visible {
    opacity: 1;
  }
  &::part(button-next) {
    top: 0;
    right: 0;
    width: 33.33%;
    height: 100%;
    margin: 0;
    cursor: e-resize;
  }
  &::part(button-prev) {
    top: 0;
    left: 0;
    width: 33.33%;
    height: 100%;
    margin: 0;
    cursor: w-resize;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.slideshow-controls {
  position: fixed;
  bottom: 45px;
  left: 45px;
  font-size: 12px;
  .share {
    cursor: pointer;
    text-transform: uppercase;
    margin-bottom: 15px;
    @media (hover: hover) {
      &:hover {
        color: var(--accent-color);
        text-decoration: underline;
      }
    }
  }
  .controls {
    display: flex;
    gap: 4px;
    padding-bottom: 15px;
    div {
      cursor: pointer;
      transition: color 0.2s;
      @media (hover: hover) {
        &:hover {
          color: var(--accent-color);
          text-decoration: underline;
        }
      }
    }
  }
  .close-button {
    cursor: pointer;
    transition: color 0.2s;
    @media (hover: hover) {
      &:hover {
        color: var(--accent-color);
        text-decoration: underline;
      }
    }
  }
}
@media (max-width: 800px) {
  .detail-slideshow {
    height: calc(100dvh - 272px);
  }
  .slideshow-controls {
    bottom: 20px;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: space-around;
  }
}
</style>
