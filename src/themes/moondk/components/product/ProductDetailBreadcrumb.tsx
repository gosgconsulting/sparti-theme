import { ThemeLink } from "@/components/ThemeLink";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProductDetailBreadcrumbProps {
  productName: string;
  className?: string;
}

export function ProductDetailBreadcrumb({ productName, className }: ProductDetailBreadcrumbProps) {
  return (
    <div className={className}>
      <Breadcrumb>
        <BreadcrumbList className="gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-body font-normal text-foreground/35">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <ThemeLink
                to="/"
                className="font-body font-normal text-foreground/40 transition-colors hover:text-foreground/65"
              >
                Home
              </ThemeLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-foreground/20 [&>svg]:size-3" />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <ThemeLink
                to="/category/shop"
                className="font-body font-normal text-foreground/40 transition-colors hover:text-foreground/65"
              >
                Shop
              </ThemeLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-foreground/20 [&>svg]:size-3" />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-body font-normal text-foreground/45 line-clamp-2 text-left max-w-full">
              {productName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
