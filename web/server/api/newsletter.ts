import customerCreateMutation from "~/gql/CustomerCreateMutation";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const email = body.email;

  if (!email) {
    return { error: "Email is required" };
  }

  const mutationVariables = {
    input: {
      email,
      emailMarketingConsent: {
        marketingState: "SUBSCRIBED",
        marketingOptInLevel: "CONFIRMED_OPT_IN",
      },
    },
  };

  const response = await $fetch(
    `https://${process.env.SHOPIFY_DOMAIN}/admin/api/2025-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_TOKEN as string,
      },
      body: {
        query: customerCreateMutation,
        variables: mutationVariables,
      },
    }
  );

  return response;
});
