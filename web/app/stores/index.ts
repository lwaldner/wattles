import { defineStore } from "pinia";
// import CreateCartMutation from "~/gql/CreateCart.js";
// import GetCartByIdQuery from "~/gql/GetCartById.js";
// import AddToCartMutation from "~/gql/AddToCartMutation.js";
// import RemoveFromCartMutation from "~/gql/RemoveFromCartMutation.js";

export const useMainStore = defineStore("main", () => {
  const winWidth = ref(0);
  const winHeight = ref(0);
  // const cart = ref([]);
  // const cartOpen = ref(false);
  const lastRoute = ref("");
  const scrollLocked = ref(false);
  const mobileMenuOpen = ref(false);

  // const addToCart = async (productId: string, quantity: number) => {
  //   const { data } = await useShopifyFetch(AddToCartMutation, {
  //     cartId: cart.value.id,
  //     itemId: productId,
  //     quantity,
  //   });
  //   if (data.cartLinesAdd.userErrors.length) {
  //     console.error(data.cartLinesAdd.userErrors);
  //     return data.cartLinesAdd.userErrors[0].message;
  //   } else {
  //     cart.value = data.cartLinesAdd.cart;
  //   }
  // };
  // const removeFromCart = async (productId: string) => {
  //   const { data, errors } = await useShopifyFetch(RemoveFromCartMutation, {
  //     cartId: cart.value.id,
  //     lineId: productId,
  //   });
  //   if (errors) console.error(errors);
  //   cart.value = data.cartLinesRemove.cart;
  // };
  // const loadCart = async () => {
  //   const cartId = window.localStorage.getItem("cart-id");
  //   if (!cartId) return await createCart();
  //   else {
  //     const { data, errors } = await useShopifyFetch(GetCartByIdQuery, {
  //       id: cartId,
  //     });
  //     if (!data?.cart) {
  //       window.localStorage.removeItem("cart-id");
  //       return await createCart();
  //     } else cart.value = data?.cart;
  //     if (errors) console.error(errors);
  //   }
  // };
  // const createCart = async () => {
  //   const gqlVariables = {
  //     input: {},
  //   };
  //   const { data } = await useShopifyFetch(CreateCartMutation, gqlVariables);
  //   cart.value = data?.cartCreate?.cart;
  //   window.localStorage.setItem("cart-id", cart.value.id);
  // };

  const breakpoint = computed(() => {
    if (winWidth.value > 0 && winWidth.value < 800) {
      return "mobile";
    } else {
      return "desktop";
    }
  });
  return {
    winWidth,
    winHeight,
    breakpoint,
    // cart,
    // cartOpen,
    lastRoute,
    scrollLocked,
    mobileMenuOpen,
    // createCart,
    // loadCart,
    // addToCart,
    // removeFromCart,
  };
});
