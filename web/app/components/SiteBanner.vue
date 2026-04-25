<template>
  <nuxt-link v-if="link" :href="link" class="site-banner" :target="linkTarget">
    {{ text }}
  </nuxt-link>
  <div v-else class="site-banner">
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
const { link } = defineProps<{
  text: string;
  link?: string;
}>();

const linkTarget = computed(() =>
  link && /^https?:\/\//.test(link) ? "_blank" : undefined
);
</script>

<style lang="scss" scoped>
.site-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  padding: 8px 20px;
  background-color: var(--accent-color, #000);
  color: #fff;
  text-align: center;
  font-size: 16px;
  text-decoration: none;
  display: block;
}
a.site-banner {
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
