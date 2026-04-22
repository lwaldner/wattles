import metaobjectCreateMutation from "~/gql/MetaobjectCreateMutation";

type CommissionsBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  instagramOrPhone?: string;
  subject?: string;
  dateNeeded?: string;
  notes?: string;
};

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as CommissionsBody;

  if (!body?.firstName || !body?.lastName || !body?.email || !body?.subject) {
    setResponseStatus(event, 400);
    return {
      error:
        "First name, last name, email, and subject are required.",
    };
  }

  const fields = [
    { key: "first_name", value: body.firstName },
    { key: "last_name", value: body.lastName },
    { key: "email", value: body.email },
    { key: "contact", value: body.instagramOrPhone ?? "" },
    { key: "subject_or_idea", value: body.subject },
    { key: "requested_delivery_date", value: body.dateNeeded ?? "" },
    { key: "notes", value: body.notes ?? "" },
  ].filter((field) => field.value !== "");

  const variables = {
    metaobject: {
      type: "commissions",
      fields,
    },
  };

  const response = await $fetch<{
    data?: {
      metaobjectCreate?: {
        metaobject?: { id: string; handle: string; type: string } | null;
        userErrors?: Array<{ field: string[]; message: string; code: string }>;
      };
    };
    errors?: Array<{ message: string }>;
  }>(
    `https://${process.env.SHOPIFY_DOMAIN}/admin/api/2025-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_TOKEN as string,
      },
      body: {
        query: metaobjectCreateMutation,
        variables,
      },
    }
  );

  if (response.errors?.length) {
    setResponseStatus(event, 502);
    return { error: response.errors[0]?.message ?? "Shopify request failed." };
  }

  const userErrors = response.data?.metaobjectCreate?.userErrors ?? [];
  if (userErrors.length) {
    setResponseStatus(event, 400);
    return { error: userErrors[0].message, userErrors };
  }

  return {
    ok: true,
    metaobject: response.data?.metaobjectCreate?.metaobject ?? null,
  };
});
