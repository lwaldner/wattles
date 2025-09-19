<template>
  <section class="page-join">
    <div class="heading">Join my email list!</div>
    <div class="body">
      Be the first to know about new additions to my sites, get discount codes
      for sales, and early access to Series drops!
      <br />
      <br />
      <b>Get 10% OFF when you sign up! </b>
    </div>
    <div v-if="!subscribed" class="input-wrapper">
      <input
        type="email"
        placeholder="Enter your email"
        name="email"
        required
        v-model="emailModel"
        ref="emailEl"
      />
      <div class="submit-button" @click="submitEmail">SIGN UP</div>
      <div class="error-message">{{ emailError }}</div>
    </div>
    <div v-else class="confirm">Thanks for signing up!</div>
  </section>
</template>

<script lang="ts" setup>
const emailModel = defineModel();
const emailEl = ref(null);
const subscribed = ref(false);
const emailError = ref("");

const submitEmail = async () => {
  emailError.value = "";
  if (!emailEl.value.checkValidity()) emailEl.value.classList.add("error");
  else {
    const { data: customerData } = await $fetch("/api/newsletter", {
      method: "POST",
      body: { email: emailModel.value },
    });
    if (customerData?.customerCreate?.customer?.id) subscribed.value = true;
    else emailEl.value.classList.add("error");
    if (customerData?.customerCreate?.userErrors?.length) {
      emailError.value = customerData.customerCreate.userErrors[0].message;
    }
  }
};
</script>

<style lang="scss" setup>
.page-join {
  text-align: center;
  height: calc(100dvh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-right: 155px;
  box-sizing: border-box;
  .heading {
    color: var(--accent-color);
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 14px;
  }
  .body {
    margin-top: 12px;
    font-size: 16px;
  }
  .input-wrapper {
    position: relative;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  input {
    border-radius: 0;
    padding: 15px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    font-family: var(--font-family);
    font-size: 18px;
    width: 200px;
    &:focus {
      outline: none;
    }
    &.error {
      border-color: red;
    }
  }
  .submit-button {
    background-color: var(--accent-color);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 11px 36px;
    cursor: pointer;
    white-space: nowrap;
    border: 4px solid var(--accent-color);
    transition: background-color 0.2s ease, color 0.2s ease;
    @media (hover: hover) {
      &:hover {
        background-color: #fff;
        color: var(--accent-color);
      }
    }
  }
  .error-message {
    position: absolute;
    left: 0;
    bottom: -8px;
    font-size: 12px;
    transform: translateY(100%);
    color: red;
  }
  .confirm {
    font-size: 28px;
    color: var(--accent-color);
    margin-top: 26px;
  }
  @media (max-width: 800px) {
    height: calc(100dvh - 272px);
    padding: 0;
  }
}
</style>
