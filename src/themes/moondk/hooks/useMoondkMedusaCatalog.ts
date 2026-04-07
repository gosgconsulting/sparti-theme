import { useQuery } from "@tanstack/react-query";
import {
  getMoondkMedusa,
  isMoondkMedusaEnabled,
  mapMedusaProductToView,
  mapMedusaProductsToViews,
  MOONDK_MEDUSA_PRODUCT_DETAIL_FIELDS,
  MOONDK_MEDUSA_PRODUCT_LIST_FIELDS,
  resolveMoondkMedusaRegionId,
} from "../lib/medusa";

export function useMoondkMedusaProductsListQuery(enabled: boolean = isMoondkMedusaEnabled()) {
  return useQuery({
    queryKey: ["moondk", "medusa", "products"],
    enabled,
    queryFn: async () => {
      const api = getMoondkMedusa();
      const { products } = await api.products.list({
        fields: MOONDK_MEDUSA_PRODUCT_LIST_FIELDS,
        limit: 200,
      });
      return mapMedusaProductsToViews(products);
    },
  });
}

export function useMoondkMedusaProductQuery(productId: string | undefined) {
  const enabled = Boolean(isMoondkMedusaEnabled() && productId);
  return useQuery({
    queryKey: ["moondk", "medusa", "product", productId ?? ""],
    enabled,
    queryFn: async () => {
      const api = getMoondkMedusa();
      const { product } = await api.products.retrieve(productId!, {
        fields: MOONDK_MEDUSA_PRODUCT_DETAIL_FIELDS,
      });
      return mapMedusaProductToView(product);
    },
  });
}

export function useMoondkMedusaRegionQuery() {
  return useQuery({
    queryKey: ["moondk", "medusa", "region"],
    enabled: isMoondkMedusaEnabled(),
    queryFn: resolveMoondkMedusaRegionId,
    staleTime: Infinity,
  });
}
