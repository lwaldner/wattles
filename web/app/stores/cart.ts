import { defineStore } from "pinia";
import CreateCartMutation from "~/gql/CreateCart.js";
import GetCartByIdQuery from "~/gql/GetCartById.js";
import AddToCartMutation from "~/gql/AddToCartMutation.js";
import RemoveFromCartMutation from "~/gql/RemoveFromCartMutation.js";
import Cookies from "universal-cookie";

export const useCartStore = defineStore("cart", () => {
  const cart = ref([]);
  const cartOpen = ref(false);

  const addToCart = async (productId: string, quantity: number) => {
    const { data } = await useShopifyFetch(AddToCartMutation, {
      cartId: cart.value.id,
      itemId: productId,
      quantity,
    });
    if (data.cartLinesAdd.userErrors.length) {
      console.error(data.cartLinesAdd.userErrors);
      return data.cartLinesAdd.userErrors[0].message;
    } else {
      cart.value = data.cartLinesAdd.cart;
    }
  };
  const removeFromCart = async (productId: string) => {
    const { data, errors } = await useShopifyFetch(RemoveFromCartMutation, {
      cartId: cart.value.id,
      lineId: productId,
    });
    if (errors) console.error(errors);
    cart.value = data.cartLinesRemove.cart;
  };
  const loadCart = async () => {
    // const cartId = window.localStorage.getItem("cart-id");
    const cookies = new Cookies();
    const cartId = cookies.get("cart-id");
    if (!cartId) return await createCart();
    else {
      const { data, errors } = await useShopifyFetch(GetCartByIdQuery, {
        id: cartId,
      });
      if (!data?.cart) {
        cookies.remove("cart-id");
        return await createCart();
      } else cart.value = data?.cart;
      if (errors) console.error(errors);
    }
  };
  const createCart = async () => {
    const cookies = new Cookies();
    const gqlVariables = {
      input: {},
    };
    const { data } = await useShopifyFetch(CreateCartMutation, gqlVariables);
    cart.value = data?.cartCreate?.cart;
    cookies.set("cart-id", cart.value.id, {
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });
  };

  return {
    cart,
    cartOpen,
    createCart,
    loadCart,
    addToCart,
    removeFromCart,
  };
});
