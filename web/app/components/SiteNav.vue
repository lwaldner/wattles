<template>
  <header class="site-header">
    <nuxt-link class="logo" to="/">Bella Wattles</nuxt-link>
    <div
      :class="['mobile-menu-toggle', { 'menu-open': mobileMenuOpen }]"
      @click="mobileMenuOpen = !mobileMenuOpen"
    >
      {{ mobileMenuOpen ? "Close" : "Menu" }}
    </div>
    <div
      :class="[
        'nav-menu',
        { 'menu-open': mobileMenuOpen, 'transitions-ready': transitionsReady },
      ]"
    >
      <div class="primary-nav">
        <nuxt-link class="nav-item" to="/">Home</nuxt-link>
        <div
          :class="[
            'nav-item has-children',
            { 'child-active': route.path.startsWith('/portfolio') },
          ]"
          @click="toggleSubNav"
        >
          <span>Portfolio</span>
          <div class="sub-nav">
            <nuxt-link class="sub-nav-item" to="/portfolio/2025"
              >2025</nuxt-link
            >
            <nuxt-link class="sub-nav-item" to="/portfolio/2024"
              >2024</nuxt-link
            >
            <nuxt-link class="sub-nav-item" to="/portfolio/2023"
              >2023</nuxt-link
            >
            <nuxt-link class="sub-nav-item" to="/portfolio/2022"
              >2022</nuxt-link
            >
          </div>
        </div>
        <div
          :class="[
            'nav-item has-children',
            { 'child-active': route.path.startsWith('/studio-inventory') },
          ]"
          @click="toggleSubNav"
        >
          <span>Available Works</span>
          <div class="sub-nav">
            <a
              target="_blank"
              class="sub-nav-item"
              href="https://artandlightgallery.com/artist/balla-wattles"
              >Gallery Works</a
            >
            <nuxt-link
              :class="[
                'sub-nav-item',
                { active: route.path.startsWith('/studio-inventory') },
              ]"
              to="/studio-inventory"
              >Studio Inventory</nuxt-link
            >
          </div>
        </div>
      </div>
      <div class="secondary-nav">
        <nuxt-link class="nav-item" to="/commissions">Commissions</nuxt-link>
        <nuxt-link class="nav-item" to="/about">About</nuxt-link>
        <nuxt-link class="nav-item" to="/join">Join</nuxt-link>
      </div>
      <a
        target="_blank"
        class="social-link"
        href="https://www.instagram.com/bellawattles/"
      >
        <svg-instagram-logo />
      </a>
    </div>
  </header>
</template>

<script lang="ts" setup>
const { mobileMenuOpen } = storeToRefs(useMainStore());

const route = useRoute();

const transitionsReady = ref(false);

const toggleSubNav = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
  if (el) {
    el.classList.toggle("open");
  }
};

watch(route, () => {
  mobileMenuOpen.value = false;
});

onMounted(() => {
  requestAnimationFrame(() => {
    transitionsReady.value = true;
  });
});
</script>

<style lang="scss" scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  padding: 45px 0 0 45px;
  width: 180px;
  z-index: 100;
  .logo {
    font-size: 27px;
    font-weight: 500;
    margin-bottom: 30px;
    display: block;
    &.router-link-active {
      color: #000;
    }
  }
  .mobile-menu-toggle {
    display: none;
  }
  .nav-item {
    line-height: 30px;
    cursor: pointer;
    &.child-active,
    &.open {
      color: var(--accent-color);
      .sub-nav {
        display: block;
      }
    }
    @media (hover: hover) and (min-width: 801px) {
      &:hover {
        color: var(--accent-color);
      }
    }
  }
  .sub-nav {
    display: none;
    padding: 8px 0 16px;
  }
  .sub-nav-item {
    margin-left: 8px;
    font-size: 16px;
  }
  .secondary-nav {
    margin-top: 20px;
    .nav-item {
      font-size: 13px;
      line-height: 25px;
    }
  }
  .social-link {
    margin-top: 20px;
    svg {
      width: 20px;
      height: auto;
    }
  }
  .active,
  .router-link-active {
    color: var(--accent-color);
  }
  a {
    display: block;
    transition: color 0.2s;
    @media (hover: hover) and (min-width: 801px) {
      &:hover {
        color: var(--accent-color);
      }
    }
  }
  @media only screen and (max-width: 800px) {
    width: 100%;
    padding: 12px 20px;
    background-color: #fff;
    box-sizing: border-box;
    .logo {
      margin-bottom: 0;
    }
    .mobile-menu-toggle {
      display: block;
      position: fixed;
      top: 18px;
      right: 20px;
      color: var(--accent-color);
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      z-index: 200;
      &.menu-open {
        color: #fff;
      }
    }
    .social-link {
      svg {
        width: 16px;
        fill: #fff;
      }
    }
    .nav-menu {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100dvh;
      background-color: var(--accent-color);
      text-align: center;
      color: #fff;
      font-size: 18px;
      padding: 20px 0;
      z-index: 100;
      box-sizing: border-box;
      flex-direction: column;
      justify-content: center;
      transform: translateY(-100%);
      &.transitions-ready {
        display: flex;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      &.menu-open {
        transform: translateY(0);
      }
      a {
        color: #fff;
      }
    }
    .sub-nav {
      display: block;
      position: relative;
      padding: 0;
      &::after {
        content: " ";
        display: block;
        position: absolute;
        top: -2px;
        left: 50%;
        transform: translateX(-50%);
        height: 1px;
        width: 50vw;
        background-color: rgba(255, 255, 255, 0.4);
      }
    }
    .nav-item {
      margin: 0 auto;
      width: fit-content;
      line-height: 45px;
      &.child-active,
      &.open {
        color: #fff;
      }
      &.has-children {
        margin: 20px auto;
      }
    }
    .sub-nav-item {
      font-size: 18px;
      margin: 0;
      line-height: 36px;
    }
    .secondary-nav {
      .nav-item {
        font-size: 18px;
        line-height: 36px;
      }
    }
  }
}
</style>
