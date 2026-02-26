import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hoveniaDulcisImage from "../../assets/tea/Dulcis_extract.jpg";
import cornExtractImage from "../../assets/tea/corn_tea.jpg";
import blackBeanTeaImage from "../../assets/tea/black_bean_tea_extract.jpg";
import barleyTeaImage1 from "../../assets/tea/BEOK-Barleytea1.jpg";
import barleyTeaImage2 from "../../assets/tea/BEOK-Barleytea2.jpg";
import barleyTeaImage7 from "../../assets/tea/BEOK-Barleytea7.jpg";
import sesameOilImage from "../../assets/oil/BEOK-sesameoil1.jpg";
import sesameOilImage2 from "../../assets/oil/BEOK-sesameoil2.jpg";
import sesameOilImage4 from "../../assets/oil/BEOK-sesameoil4.jpg";
import meatImage from "../../assets/oil/BEOK-meat1.jpg";
import perillaOilImage from "../../assets/oil/BEOK-perillaoil3.jpg";
import perillaOilImage2 from "../../assets/oil/BEOK-perillaoil2.jpg";
import perillaOilImage4 from "../../assets/oil/BEOK-perillaoil4.jpg";
import perillaOilImage5 from "../../assets/oil/BEOK-perillaoil5.jpg";
import saucesImage from "../../assets/oil/BEOK-sauces2.jpg";
import saucesImageAlt from "../../assets/oil/BEOK-sauces.jpg";
import seorijuImage from "../../assets/alcohol/BEOK-seoriju3.jpg";
import seorijuImage1 from "../../assets/alcohol/BEOK-seoriju1.jpg";
import seorijuImage2 from "../../assets/alcohol/BEOK-seoriju2.jpg";
import wheatNoodleImage from "../../assets/IMG_1701.jpg";
import giftSetImage from "../../assets/noodles/IMG_1700.jpg";
import potatoNoodleImage from "../../assets/noodles/BEOK-Potatonoodle3.jpg";
import potatoNoodleImage1 from "../../assets/noodles/BEOK-Potatonoodle1.jpg";
import potatoNoodleImage2 from "../../assets/noodles/BEOK-Potatonoodle2.jpg";
import potatoNoodleImage4 from "../../assets/noodles/BEOK-Potatonoodle4.jpg";

interface ProductImageGalleryProps {
  product?: any;
}

// Map product IDs to their specific images
const productImageMap: Record<string, string> = {
  "1": hoveniaDulcisImage,
  "2": cornExtractImage,
  "3": blackBeanTeaImage,
  "4": barleyTeaImage1,
  "5": sesameOilImage,
  "6": meatImage,
  "7": perillaOilImage,
  "8": saucesImage,
  "9": seorijuImage,
  "10": wheatNoodleImage,
  "11": giftSetImage,
  "12": potatoNoodleImage,
};

const ProductImageGallery = ({ product }: ProductImageGalleryProps) => {
  const productId = product?.id?.toString();

  const getDefaultImage = () => {
    return product?.thumbnail || productImageMap[productId || ""] || hoveniaDulcisImage;
  };

  const [selectedImage, setSelectedImage] = useState(getDefaultImage());

  // For products with multiple images, show all available images
  // For other products 1-12, only show their specific image
  // Otherwise, show all default images
  const specificImage = product?.thumbnail || productImageMap[productId || ""];
  let images: string[] = [];

  if (product && product.images && product.images.length > 0) {
    images = product.images.map((img: any) => img.url);
  } else {
    images = productId === "4"
      ? [barleyTeaImage, barleyTeaImage1, barleyTeaImage2, barleyTeaImage7]
      : productId === "5"
        ? [sesameOilImage, sesameOilImage2, sesameOilImage4]
        : productId === "7"
          ? [perillaOilImage, perillaOilImage2, perillaOilImage5]
          : productId === "8"
            ? [saucesImage, saucesImageAlt]
            : productId === "9"
              ? [seorijuImage, seorijuImage1, seorijuImage2]
              : productId === "12"
                ? [potatoNoodleImage, potatoNoodleImage4, potatoNoodleImage5]
                : specificImage
                  ? [specificImage]
                  : [hoveniaDulcisImage, cornExtractImage, blackBeanTeaImage, barleyTeaImage];
  }


  // Update selected image when productId changes
  useEffect(() => {
    const imageForProduct = productImageMap[productId || ""];
    if (imageForProduct) {
      setSelectedImage(imageForProduct);
    }
  }, [productId]);

  // Navigation functions
  const currentIndex = images.findIndex((img) => img === selectedImage);
  const hasMultipleImages = images.length > 1;

  const goToPrevious = () => {
    if (hasMultipleImages) {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
      setSelectedImage(images[prevIndex]);
    }
  };

  const goToNext = () => {
    if (hasMultipleImages) {
      const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(images[nextIndex]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square overflow-hidden bg-muted/5 relative group">
        <img
          src={selectedImage}
          alt="Product"
          className="w-full h-full object-cover"
        />

        {/* Navigation Arrows - Only show if multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white border border-border/60 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white border border-border/60 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail gallery */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`aspect-square overflow-hidden rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${selectedImage === image
              ? "ring-2 ring-primary ring-offset-2 shadow-md"
              : "hover:opacity-80"
              }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
