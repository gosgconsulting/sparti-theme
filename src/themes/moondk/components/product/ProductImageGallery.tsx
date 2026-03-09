import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
// Hovenia Tea images (1-20)
import hoveniaTea1 from "../../assets/tea/Hovenia_Tea_fol/1.jpg";
import hoveniaTea2 from "../../assets/tea/Hovenia_Tea_fol/2.jpg";
import hoveniaTea3 from "../../assets/tea/Hovenia_Tea_fol/3.jpg";
import hoveniaTea4 from "../../assets/tea/Hovenia_Tea_fol/4.jpg";
import hoveniaTea5 from "../../assets/tea/Hovenia_Tea_fol/5.jpg";
import hoveniaTea6 from "../../assets/tea/Hovenia_Tea_fol/6.jpg";
import hoveniaTea7 from "../../assets/tea/Hovenia_Tea_fol/7.jpg";
import hoveniaTea8 from "../../assets/tea/Hovenia_Tea_fol/8.jpg";
import hoveniaTea9 from "../../assets/tea/Hovenia_Tea_fol/9.jpg";
import hoveniaTea10 from "../../assets/tea/Hovenia_Tea_fol/10.jpg";
import hoveniaTea12 from "../../assets/tea/Hovenia_Tea_fol/12.jpg";
import hoveniaTea13 from "../../assets/tea/Hovenia_Tea_fol/13.jpg";
import hoveniaTea14 from "../../assets/tea/Hovenia_Tea_fol/14.jpg";
import hoveniaTea15 from "../../assets/tea/Hovenia_Tea_fol/15.jpg";
import hoveniaTea16 from "../../assets/tea/Hovenia_Tea_fol/16.jpg";
import hoveniaTea17 from "../../assets/tea/Hovenia_Tea_fol/17.jpg";
import hoveniaTea18 from "../../assets/tea/Hovenia_Tea_fol/18.jpg";
import hoveniaTea19 from "../../assets/tea/Hovenia_Tea_fol/19.jpg";
import hoveniaTea20 from "../../assets/tea/Hovenia_Tea_fol/20.jpg";
import hoveniaDulcisImage from "../../assets/tea/Dulcis_extract.jpg";
// Corn Silk Tea images (1-21)
import cornSilkTea1 from "../../assets/tea/Corn_Silk_fol/1.jpg";
import cornSilkTea2 from "../../assets/tea/Corn_Silk_fol/2.jpg";
import cornSilkTea3 from "../../assets/tea/Corn_Silk_fol/3.jpg";
import cornSilkTea4 from "../../assets/tea/Corn_Silk_fol/4.jpg";
import cornSilkTea5 from "../../assets/tea/Corn_Silk_fol/5.jpg";
import cornSilkTea6 from "../../assets/tea/Corn_Silk_fol/6.jpg";
import cornSilkTea7 from "../../assets/tea/Corn_Silk_fol/7.jpg";
import cornSilkTea8 from "../../assets/tea/Corn_Silk_fol/8.jpg";
import cornSilkTea9 from "../../assets/tea/Corn_Silk_fol/9.jpg";
import cornSilkTea10 from "../../assets/tea/Corn_Silk_fol/10.jpg";
import cornSilkTea11 from "../../assets/tea/Corn_Silk_fol/11.jpg";
import cornSilkTea12 from "../../assets/tea/Corn_Silk_fol/12.jpg";
import cornSilkTea13 from "../../assets/tea/Corn_Silk_fol/13.jpg";
import cornSilkTea14 from "../../assets/tea/Corn_Silk_fol/14.jpg";
import cornSilkTea15 from "../../assets/tea/Corn_Silk_fol/15.jpg";
import cornSilkTea16 from "../../assets/tea/Corn_Silk_fol/16.jpg";
import cornSilkTea17 from "../../assets/tea/Corn_Silk_fol/17.jpg";
import cornSilkTea18 from "../../assets/tea/Corn_Silk_fol/18.jpg";
import cornSilkTea19 from "../../assets/tea/Corn_Silk_fol/19.jpg";
import cornSilkTea20 from "../../assets/tea/Corn_Silk_fol/20.jpg";
import cornSilkTea21 from "../../assets/tea/Corn_Silk_fol/21.jpg";
import cornExtractImage from "../../assets/tea/corn_tea.jpg";
// Black Bean Tea images (1-18)
import blackBeanTea1 from "../../assets/tea/Blackbean_Tea_fol/1.jpg";
import blackBeanTea2 from "../../assets/tea/Blackbean_Tea_fol/2.jpg";
import blackBeanTea3 from "../../assets/tea/Blackbean_Tea_fol/3.jpg";
import blackBeanTea4 from "../../assets/tea/Blackbean_Tea_fol/4.jpg";
import blackBeanTea5 from "../../assets/tea/Blackbean_Tea_fol/5.jpg";
import blackBeanTea6 from "../../assets/tea/Blackbean_Tea_fol/6.jpg";
import blackBeanTea7 from "../../assets/tea/Blackbean_Tea_fol/7.jpg";
import blackBeanTea8 from "../../assets/tea/Blackbean_Tea_fol/8.jpg";
import blackBeanTea9 from "../../assets/tea/Blackbean_Tea_fol/9.jpg";
import blackBeanTea10 from "../../assets/tea/Blackbean_Tea_fol/10.jpg";
import blackBeanTea11 from "../../assets/tea/Blackbean_Tea_fol/11.jpg";
import blackBeanTea12 from "../../assets/tea/Blackbean_Tea_fol/12.jpg";
import blackBeanTea13 from "../../assets/tea/Blackbean_Tea_fol/13.jpg";
import blackBeanTea14 from "../../assets/tea/Blackbean_Tea_fol/14.jpg";
import blackBeanTea15 from "../../assets/tea/Blackbean_Tea_fol/15.jpg";
import blackBeanTea16 from "../../assets/tea/Blackbean_Tea_fol/16.jpg";
import blackBeanTea17 from "../../assets/tea/Blackbean_Tea_fol/17.jpg";
import blackBeanTea18 from "../../assets/tea/Blackbean_Tea_fol/18.jpg";
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
import hallabongNoodleImage from "../../assets/noodles/BEOK-Hanrabongnoodle3.jpg";
import hallabongNoodleImage2 from "../../assets/noodles/BEOK-Hanrabongnoodle2.jpg";
import hallabongNoodleImage4 from "../../assets/noodles/BEOK-Hanrabongnoodle4.jpg";
import hallabongNoodleImage5 from "../../assets/noodles/BEOK-Hanrabongnoodle5.jpg";

interface ProductImageGalleryProps {
  productId?: string;
}

// Map product IDs to their specific images
const productImageMap: Record<string, string> = {
  "1": hoveniaTea1,
  "2": cornSilkTea1,
  "3": blackBeanTea1,
  "4": barleyTeaImage1,
  "5": sesameOilImage,
  "6": meatImage,
  "7": perillaOilImage,
  "8": saucesImage,
  "9": seorijuImage,
  "10": wheatNoodleImage,
  "11": giftSetImage,
  "12": potatoNoodleImage,
  "13": hallabongNoodleImage,
};

const ProductImageGallery = ({ productId }: ProductImageGalleryProps) => {
  
  const getDefaultImage = () => {
    return productImageMap[productId || ""] || hoveniaDulcisImage;
  };
  
  const [selectedImage, setSelectedImage] = useState(getDefaultImage());
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLButtonElement>(null);

  // For products with multiple images, show all available images
  // For other products 1-12, only show their specific image
  // Otherwise, show all default images
  const specificImage = productImageMap[productId || ""];
  const images = productId === "1"
    ? [hoveniaTea1, hoveniaTea2, hoveniaTea3, hoveniaTea4, hoveniaTea5, hoveniaTea6, hoveniaTea7, hoveniaTea8, hoveniaTea9, hoveniaTea10, hoveniaTea12, hoveniaTea13, hoveniaTea14, hoveniaTea15, hoveniaTea16, hoveniaTea17, hoveniaTea18, hoveniaTea19, hoveniaTea20]
    : productId === "2"
    ? [cornSilkTea1, cornSilkTea2, cornSilkTea3, cornSilkTea4, cornSilkTea5, cornSilkTea6, cornSilkTea7, cornSilkTea8, cornSilkTea9, cornSilkTea10, cornSilkTea11, cornSilkTea12, cornSilkTea13, cornSilkTea14, cornSilkTea15, cornSilkTea16, cornSilkTea17, cornSilkTea18, cornSilkTea19, cornSilkTea20, cornSilkTea21]
    : productId === "3"
    ? [blackBeanTea1, blackBeanTea2, blackBeanTea3, blackBeanTea4, blackBeanTea5, blackBeanTea6, blackBeanTea7, blackBeanTea8, blackBeanTea9, blackBeanTea10, blackBeanTea11, blackBeanTea12, blackBeanTea13, blackBeanTea14, blackBeanTea15, blackBeanTea16, blackBeanTea17, blackBeanTea18]
    : productId === "4"
    ? [barleyTeaImage1, barleyTeaImage2, barleyTeaImage7]
    : productId === "5"
    ? [sesameOilImage, sesameOilImage2, sesameOilImage4]
    : productId === "7"
    ? [perillaOilImage, perillaOilImage2, perillaOilImage4, perillaOilImage5]
    : productId === "8"
    ? [saucesImage, saucesImageAlt]
    : productId === "9"
    ? [seorijuImage, seorijuImage1, seorijuImage2]
    : productId === "12"
    ? [potatoNoodleImage, potatoNoodleImage1, potatoNoodleImage2, potatoNoodleImage4]
    : productId === "13"
    ? [hallabongNoodleImage, hallabongNoodleImage2, hallabongNoodleImage4, hallabongNoodleImage5]
    : specificImage
    ? [specificImage]
    : [hoveniaDulcisImage, cornExtractImage, blackBeanTeaImage];

  // Update selected image when productId changes
  useEffect(() => {
    const imageForProduct = productImageMap[productId || ""];
    if (imageForProduct) {
      setSelectedImage(imageForProduct);
      setCarouselIndex(0); // Reset carousel when product changes
    }
  }, [productId]);

  // Calculate visible images for carousel (max 4 at a time)
  const maxVisible = 4;
  const maxIndex = Math.max(0, images.length - maxVisible);
  const visibleImages = images.slice(carouselIndex, carouselIndex + maxVisible);

  // Disabled auto-scroll - carousel stays where user scrolls it
  // No auto-scrolling to selected image

  const canScrollLeft = carouselIndex > 0;
  const canScrollRight = carouselIndex < maxIndex;

  const scrollCarouselLeft = () => {
    if (!canScrollLeft) return;
    const newIndex = Math.max(0, carouselIndex - 1);
    setCarouselIndex(newIndex);
  };

  const scrollCarouselRight = () => {
    if (!canScrollRight) return;
    const newIndex = Math.min(maxIndex, carouselIndex + 1);
    setCarouselIndex(newIndex);
  };

  // Calculate transform using ref-based measurement for accuracy
  const [itemWidth, setItemWidth] = useState(0);
  
  // Callback ref to measure item width immediately when element mounts
  const measureItemRef = (element: HTMLButtonElement | null) => {
    if (element) {
      itemRef.current = element;
      const width = element.offsetWidth;
      const gap = 8; // gap-2 = 0.5rem = 8px
      setItemWidth(width + gap);
    }
  };
  
  useEffect(() => {
    const measureItem = () => {
      if (itemRef.current) {
        const item = itemRef.current;
        const width = item.offsetWidth;
        const gap = 8; // gap-2 = 0.5rem = 8px
        setItemWidth(width + gap);
      }
    };

    // Measure after initial render
    const timeoutId = setTimeout(measureItem, 0);
    
    // Recalculate on resize
    window.addEventListener('resize', measureItem);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', measureItem);
    };
  }, [images.length, productId]);

  // Calculate transform - move by measured item width + gap
  const transformValue = carouselIndex * itemWidth;

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

  // Lightbox navigation
  const goToPreviousInLightbox = () => {
    if (hasMultipleImages) {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
      setSelectedImage(images[prevIndex]);
    }
  };

  const goToNextInLightbox = () => {
    if (hasMultipleImages) {
      const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(images[nextIndex]);
    }
  };

  // Close lightbox on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isLightboxOpen]);

  return (
    <>
      <div className="space-y-4">
        {/* Main image */}
        <div className="aspect-square overflow-hidden bg-muted/5 relative group rounded-2xl cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
          <img
            src={selectedImage}
            alt="Product"
            className="w-full h-full object-cover rounded-2xl"
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

      {/* Thumbnail gallery - Carousel for products 1, 2, and 3, grid for others */}
      {(productId === "1" || productId === "2" || productId === "3") && images.length > maxVisible ? (
        <div className="relative">
          {/* Carousel container - shows exactly 4 images, slides smoothly */}
          <div className="relative overflow-hidden rounded-lg" ref={carouselRef}>
            <div 
              className="flex gap-2 transition-transform duration-300 ease-in-out" 
              style={{ 
                transform: itemWidth > 0 
                  ? `translateX(-${transformValue}px)` 
                  : `translateX(calc(-${carouselIndex} * (100% / ${maxVisible} + 0.5rem)))`
              }}
            >
              {images.map((image, index) => (
                <button
                  key={index}
                  ref={index === 0 ? measureItemRef : null}
                  onClick={() => setSelectedImage(image)}
                  className={`flex-shrink-0 aspect-square overflow-hidden rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${
                    selectedImage === image
                      ? "ring-2 ring-primary ring-offset-2 shadow-md"
                      : "hover:opacity-80"
                  }`}
                  style={{ 
                    width: `calc((100% - 1.5rem) / ${maxVisible})`
                  }}
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

          {/* Navigation arrows */}
          {images.length > maxVisible && (
            <>
              <button
                onClick={scrollCarouselLeft}
                disabled={!canScrollLeft}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 h-8 w-8 rounded-full border border-border/60 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center z-10 ${
                  canScrollLeft
                    ? "bg-white/90 hover:bg-white cursor-pointer"
                    : "bg-white/50 cursor-not-allowed opacity-50"
                }`}
                aria-label="Scroll carousel left"
              >
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </button>
              <button
                onClick={scrollCarouselRight}
                disabled={!canScrollRight}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 h-8 w-8 rounded-full border border-border/60 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center z-10 ${
                  canScrollRight
                    ? "bg-white/90 hover:bg-white cursor-pointer"
                    : "bg-white/50 cursor-not-allowed opacity-50"
                }`}
                aria-label="Scroll carousel right"
              >
                <ChevronRight className="h-4 w-4 text-foreground" />
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`aspect-square overflow-hidden rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${
                selectedImage === image
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
      )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-200"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          {/* Navigation arrows - Fixed on left and right edges of screen */}
          {hasMultipleImages && images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPreviousInLightbox();
                }}
                className="fixed left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-200 z-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextInLightbox();
                }}
                className="fixed right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-200 z-50"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}

          {/* Image container */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Product"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />

            {/* Image counter */}
            {hasMultipleImages && images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-sm text-white font-medium">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImageGallery;
