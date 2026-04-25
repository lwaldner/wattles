<template>
  <div :class="['layout-default', { 'banner-active': siteSettings?.showBanner }]">
    <site-banner
      v-if="siteSettings?.showBanner && siteSettings?.bannerText"
      :text="siteSettings.bannerText"
      :link="siteSettings.bannerLink"
    />
    <site-nav />
    <site-cart />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import siteSettingsQuery from "@/queries/siteSettings";
const { mobileMenuOpen } = storeToRefs(useMainStore());
const cartStore = useCartStore();
const { winWidth, winHeight } = storeToRefs(useMainStore());

const { data: siteSettings } = await useSanityQuery<{
  showBanner: boolean;
  bannerText: string;
  bannerLink?: string;
}>(siteSettingsQuery);

watch(mobileMenuOpen, (newVal) => {
  if (newVal) {
    document.body.classList.add("scroll-locked");
  } else {
    document.body.classList.remove("scroll-locked");
  }
});

const setScreenDimensions = () => {
  winWidth.value = window.innerWidth;
  winHeight.value = window.innerHeight;
};

onMounted(async () => {
  if (import.meta.client) {
    setScreenDimensions();
    window.addEventListener("resize", setScreenDimensions);
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
  &.banner-active {
    padding-top: 81px;
    ::v-deep(.site-header) {
      padding-top: 81px;
    }
  }
  @media only screen and (max-width: 800px) {
    padding: 0px 20px 20px;
    min-height: calc(100dvh - 58px);
    &.banner-active {
      padding-top: 40px;
      ::v-deep(.mobile-menu-toggle) {
        top: 57px;
      }
      ::v-deep(.site-header) {
        padding-top: 50px;
      }
    }
  }
}
</style>
