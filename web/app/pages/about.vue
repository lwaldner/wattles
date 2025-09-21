<template>
  <section class="page-about">
    <SanityImage
      class="featured-image"
      :asset-id="aboutData.featuredImage.asset._id"
      :alt="aboutData.featuredImage.alt"
      :w="800"
    />
    <div class="body-content">
      <SanityContent
        :value="aboutData.body"
        :components="portableTextComponents"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import aboutQuery from "@/queries/about";

const { data: aboutData } = await useSanityQuery(aboutQuery);

const portableTextComponents = {
  types: {
    image: ({ value }) => h("img", { src: value.asset.url }),
  },
  marks: {
    link: ({ children, value, text }) => {
      const isButton = value.buttonLink === true;
      return h(
        "a",
        {
          href: value.href,
          target: "_blank",
          rel: "noreferrer noopener",
          class: isButton ? "button-link" : "",
        },
        text
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.page-about {
  position: relative;
  max-width: 800px;
  width: 100%;
}
.featured-image {
  width: 100%;
  height: auto;
}
.body-content {
  text-align: center;
  max-width: 635px;
  margin: 0 auto;
  ::v-deep(h2) {
    color: var(--accent-color);
    font-weight: bold;
    a {
      color: var(--accent-color);
    }
  }
  ::v-deep(h3) {
    color: var(--accent-color);
    font-weight: bold;
    a {
      color: var(--accent-color);
    }
  }
  ::v-deep(p) {
    font-size: 14px;
    line-height: 1.8;
    min-height: 1em;
    a.button-link {
      background-color: #000;
      color: #fff;
      font-size: 15px;
      font-weight: bold;
      padding: 17px 30px;
      text-transform: uppercase;
      letter-spacing: 1px;
      display: block;
      width: fit-content;
      margin: 0 auto;
      border: 4px solid #000;
      transition: background-color 0.2s ease, color 0.2s ease;
      @media (hover: hover) {
        &:hover {
          color: #000;
          background-color: #fff;
        }
      }
    }
    a:not(.button-link) {
      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
