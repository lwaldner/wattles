<template>
  <section class="page-portfolio-year">
    <div
      v-show="!slideshowActive"
      class="image-grid"
      :style="`grid-template-columns: repeat(${numCols}, 1fr)`"
    >
      <div class="column" v-for="(col, i) in imagesColumns" :key="i">
        <SanityImage
          v-for="image in col"
          :asset-id="image.asset._id"
          :alt="image.asset._id"
          :w="800"
          @click="openSlideshow(image.asset._id)"
        />
      </div>
    </div>
    <portfolio-slideshow
      v-if="slideshowActive"
      :images="portfolioData.images"
      :initial-index="slideshowIndex"
      @closeSlideshow="slideshowActive = false"
    />
  </section>
</template>

<script lang="ts" setup>
import portfolioQuery from "@/queries/portfolio";
const { winWidth } = storeToRefs(useMainStore());
const route = useRoute();
const router = useRouter();

const { data: portfolioData } = await useSanityQuery(portfolioQuery, {
  title: route.params.year,
});

const slideshowActive = ref(!!route.query?.slide);
const slideshowIndex = ref(parseInt((route.query?.slide as string) ?? "1") - 1);
const numCols = ref(4);

watch(winWidth, (width) => {
  if (width < 800) {
    numCols.value = 1;
  } else if (width < 1000) {
    numCols.value = 2;
  } else if (width < 1500) {
    numCols.value = 3;
  } else {
    numCols.value = 4;
  }
});

const imagesColumns = computed(() => {
  const columns = Array.from({ length: numCols.value }, () => []);
  portfolioData.value.images.forEach((image, index) => {
    columns[index % numCols.value].push(image);
  });
  return columns;
});

const openSlideshow = (imageId) => {
  slideshowIndex.value = portfolioData.value.images.findIndex(
    (img) => img.asset._id === imageId
  );
  if (slideshowIndex.value !== -1) {
    slideshowActive.value = true;
  }
};
</script>

<style lang="scss" scoped>
.page-portfolio-year {
  .image-grid {
    display: grid;
    gap: 10px;
    .column {
      display: flex;
      flex-direction: column;
      gap: 10px;
      img {
        width: 100%;
        height: auto;
        cursor: pointer;
        transition: opacity 0.3s ease;
        @media (hover: hover) {
          &:hover {
            opacity: 0.6;
          }
        }
      }
    }
  }
}
</style>
