<template>
  <section class="page-commissions">
    <h1 class="page-title">{{ commissionsData.title }}</h1>

    <div class="body-content">
      <SanityContent
        :value="commissionsData.info"
        :components="portableTextComponents"
      />
    </div>

    <div class="slideshow-wrapper">
      <client-only>
        <swiper-container
          class="slideshow"
          :class="{ 'is-single-slide': !hasMultipleSlides }"
          ref="slideshowEl"
          :navigation="hasMultipleSlides"
          :loop="hasMultipleSlides"
          observer="true"
          observe-parents="true"
          observe-slide-children="true"
        >
          <swiper-slide
            v-for="image in commissionsData.slideshow"
            :key="image.asset._id"
          >
            <img
              :src="`${image.asset.url}?w=1200&auto=format`"
              :alt="image.alt"
              loading="eager"
              :style="{aspectRatio: '16/9'}"
            />
          </swiper-slide>
        </swiper-container>
      </client-only>
      <div class="thumbnails" v-if="hasMultipleSlides">
        <img
          v-for="(image, index) in commissionsData.slideshow"
          :key="image.asset._id"
          :src="`${image.asset.url}?w=200&auto=format`"
          :alt="image.alt"
          @click="goToSlide(index)"
        />
      </div>
    </div>

    <form
      v-if="!submitted"
      class="commissions-form"
      @submit.prevent="submitForm"
    >
      <div class="form-row">
        <label class="form-field">
          <span class="label">First name <span class="required">(required)</span></span>
          <input
            v-model="form.firstName"
            type="text"
            name="firstName"
            required
          />
        </label>
        <label class="form-field">
          <span class="label">Last name <span class="required">(required)</span></span>
          <input
            v-model="form.lastName"
            type="text"
            name="lastName"
            required
          />
        </label>
      </div>

      <label class="form-field">
        <span class="label">Email <span class="required">(required)</span></span>
        <input
          v-model="form.email"
          type="email"
          name="email"
          required
          ref="emailEl"
        />
      </label>

      <label class="form-field">
        <span class="label">Instagram or phone number</span>
        <input
          v-model="form.instagramOrPhone"
          type="text"
          name="instagramOrPhone"
        />
      </label>

      <label class="form-field">
        <span class="label">Subject or idea <span class="required">(required)</span></span>
        <input
          v-model="form.subject"
          type="text"
          name="subject"
          required
        />
      </label>

      <label class="form-field">
        <span class="label">Do you need it by a certain date?</span>
        <input
          v-model="form.dateNeeded"
          type="text"
          name="dateNeeded"
          placeholder="e.g. by June 1, or no rush"
        />
      </label>

      <label class="form-field">
        <span class="label">Notes / other info</span>
        <input
          v-model="form.notes"
          type="text"
          name="notes"
        />
      </label>

      <button type="submit" class="submit-button" :disabled="submitting">
        {{ submitting ? "Sending…" : "Send Inquiry" }}
      </button>
      <div v-if="submitError" class="error-message">{{ submitError }}</div>
    </form>
    <div v-else class="confirm">
      Thanks for reaching out! I'll be in touch soon.
    </div>

  </section>
</template>

<script lang="ts" setup>
import commissionsQuery from "@/queries/commissions";

const { data: commissionsData } = await useSanityQuery(commissionsQuery);

const slideshowEl = ref(null);
const emailEl = ref<HTMLInputElement | null>(null);
const submitted = ref(false);
const submitError = ref("");

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  instagramOrPhone: "",
  subject: "",
  dateNeeded: "",
  notes: "",
});

const goToSlide = (index: number) => {
  slideshowEl.value!.swiper.slideTo(index);
};

onMounted(async () => {
  if (!import.meta.client) return;
  await nextTick();
  const update = () => slideshowEl.value?.swiper?.update();
  update();
  const images = slideshowEl.value?.querySelectorAll("img") ?? [];
  images.forEach((img: HTMLImageElement) => {
    if (img.complete) return;
    img.addEventListener("load", update, { once: true });
    img.addEventListener("error", update, { once: true });
  });
});

const submitting = ref(false);

const submitForm = async () => {
  submitError.value = "";
  if (emailEl.value && !emailEl.value.checkValidity()) {
    emailEl.value.classList.add("error");
    return;
  }
  submitting.value = true;
  try {
    const response = await $fetch<{ ok?: boolean; error?: string }>(
      "/api/commissions",
      {
        method: "POST",
        body: { ...form },
      }
    );
    if (response?.ok) {
      submitted.value = true;
    } else {
      submitError.value =
        response?.error ?? "Something went wrong. Please try again.";
    }
  } catch (err: any) {
    submitError.value =
      err?.data?.error ??
      err?.message ??
      "Something went wrong. Please try again.";
  } finally {
    submitting.value = false;
  }
};

const hasMultipleSlides = computed(
  () => (commissionsData.value?.slideshow?.length ?? 0) > 1
);

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

useSeoMeta({
  title: "Bella Wattles - Commissions",
  description: "Bella Wattles - Commissions",
});

useHead({
  title: "Bella Wattles - Commissions",
});
</script>

<style lang="scss" scoped>
.page-commissions {
  position: relative;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.page-title {
  margin: 0;
}

.slideshow-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 24px auto;
}

.slideshow {
  margin: 18px 0 0 0;
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
    aspect-ratio: 16 / 9;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    aspect-ratio: 16 / 9;
    object-fit: contain;
  }
}

.thumbnails {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
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

.body-content {
  margin: 0 0;
  border-bottom: 1px solid #000;
  ::v-deep(h2),
  ::v-deep(h3) {
    color: var(--accent-color);
    font-weight: bold;
    a {
      color: var(--accent-color);
    }
  }
  ::v-deep(p) {
      max-width: 635px;
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

.commissions-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px auto;
  width: 100%;
  box-sizing: border-box;
}

.required {
  opacity: 0.7;
}

.form-row {
  display: flex;
  gap: 16px;
  .form-field {
    flex: 1 1 0;
  }
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  .label {
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 12px;
  }
  input {
    border-radius: 0;
    padding: 12px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-family: var(--font-family);
    font-size: 16px;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
    &:focus {
      outline: none;
      border-color: var(--accent-color);
    }
    &.error {
      border-color: red;
    }
  }
}

.submit-button {
  background-color: var(--accent-color);
  color: #fff;
  display: block;
  padding: 14px 36px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 14px;
  font-family: var(--font-family);
  border: 4px solid var(--accent-color);
  margin-top: 8px;
  width: fit-content;
  align-self: center;
  transition: background-color 0.2s ease, color 0.2s ease;
  @media (hover: hover) {
    &:hover {
      background-color: #fff;
      color: var(--accent-color);
    }
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.error-message {
  color: red;
  font-size: 13px;
  text-align: center;
}

.confirm {
  font-size: 24px;
  color: var(--accent-color);
  text-align: center;
  margin: 36px auto;
}

@media (max-width: 800px) {
  .slideshow:not(.is-single-slide) {
    &::part(button-next) {
      display: unset;
    }
    &::part(button-prev) {
      display: unset;
    }
  }
  .thumbnails {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    img {
      display: inline-block;
      vertical-align: top;
      margin: 0 4px;
    }
  }
  .form-row {
    flex-direction: column;
  }
}
</style>
