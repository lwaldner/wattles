import { register } from "swiper/element/bundle";

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    register();
  }
});
