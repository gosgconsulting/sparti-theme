/** Fields for storefront pricing, categories, and media (Medusa v2 Store API). */
/** Inventory: Medusa requires `+variants.inventory_quantity` (not `*`) when also requesting `*variants.calculated_price`. See storefront inventory guide. */
export const MOONDK_MEDUSA_PRODUCT_LIST_FIELDS =
  "id,title,subtitle,handle,description,thumbnail,metadata,*images,*categories,*variants,*variants.calculated_price,+variants.inventory_quantity,+variants.manage_inventory";

export const MOONDK_MEDUSA_PRODUCT_DETAIL_FIELDS = MOONDK_MEDUSA_PRODUCT_LIST_FIELDS;

/** Cart line variant pricing (*items.variant.calculated_price / .prices) breaks Store API (calculatePrices needs cart pricing context). */
export const MOONDK_MEDUSA_CART_RETRIEVE_FIELDS =
  "id,*items,*items.variant,*items.variant.product,*items.thumbnail,item_total,subtotal,total,shipping_total,tax_total,region_id,email,shipping_address,billing_address,*shipping_methods,*payment_collection,*payment_collection.payment_sessions";
