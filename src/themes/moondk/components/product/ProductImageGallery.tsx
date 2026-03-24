import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
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
// Barley Tea images (1-24)
import barleyTea1 from "../../assets/tea/Barley_Tea_fol/1.jpg";
import barleyTea2 from "../../assets/tea/Barley_Tea_fol/2.jpg";
import barleyTea3 from "../../assets/tea/Barley_Tea_fol/3.jpg";
import barleyTea4 from "../../assets/tea/Barley_Tea_fol/4.jpg";
import barleyTea5 from "../../assets/tea/Barley_Tea_fol/5.jpg";
import barleyTea6 from "../../assets/tea/Barley_Tea_fol/6.jpg";
import barleyTea7 from "../../assets/tea/Barley_Tea_fol/7.jpg";
import barleyTea8 from "../../assets/tea/Barley_Tea_fol/8.jpg";
import barleyTea9 from "../../assets/tea/Barley_Tea_fol/9.jpg";
import barleyTea10 from "../../assets/tea/Barley_Tea_fol/10.jpg";
import barleyTea11 from "../../assets/tea/Barley_Tea_fol/11.jpg";
import barleyTea12 from "../../assets/tea/Barley_Tea_fol/12.jpg";
import barleyTea13 from "../../assets/tea/Barley_Tea_fol/13.jpg";
import barleyTea14 from "../../assets/tea/Barley_Tea_fol/14.jpg";
import barleyTea15 from "../../assets/tea/Barley_Tea_fol/15.jpg";
import barleyTea16 from "../../assets/tea/Barley_Tea_fol/16.jpg";
import barleyTea17 from "../../assets/tea/Barley_Tea_fol/17.jpg";
import barleyTea18 from "../../assets/tea/Barley_Tea_fol/18.jpg";
import barleyTea19 from "../../assets/tea/Barley_Tea_fol/19.jpg";
import barleyTea20 from "../../assets/tea/Barley_Tea_fol/20.jpg";
import barleyTea21 from "../../assets/tea/Barley_Tea_fol/21.jpg";
import barleyTea22 from "../../assets/tea/Barley_Tea_fol/22.jpg";
import barleyTea23 from "../../assets/tea/Barley_Tea_fol/23.jpg";
import barleyTea24 from "../../assets/tea/Barley_Tea_fol/24.jpg";
import barleyTeaImage1 from "../../assets/tea/BEOK-Barleytea1.jpg";
import barleyTeaImage2 from "../../assets/tea/BEOK-Barleytea2.jpg";
import barleyTeaImage7 from "../../assets/tea/BEOK-Barleytea7.jpg";
import sesameOilImage from "../../assets/oil/BEOK-sesameoil1.jpg";
import sesameOilImage2 from "../../assets/oil/BEOK-sesameoil2.jpg";
import sesameOilImage3 from "../../assets/oil/BEOK-sesameoil3.jpg";
import sesameOilImage4 from "../../assets/oil/BEOK-sesameoil4.jpg";
import meatImage from "../../assets/oil/BEOK-meat1.jpg";
import perillaOilImage1 from "../../assets/oil/BEOK-perillaoil.jpg";
import perillaOilImage2 from "../../assets/oil/BEOK-perillaoil2.jpg";
import perillaOilImage3 from "../../assets/oil/BEOK-perillaoil3.jpg";
import perillaOilImage4 from "../../assets/oil/BEOK-perillaoil4.jpg";
import perillaOilImage5 from "../../assets/oil/BEOK-perillaoil5.jpg";
import saucesImage from "../../assets/oil/BEOK-sauces2.jpg";
import saucesImageAlt from "../../assets/oil/BEOK-sauces.jpg";
import seorijuImage from "../../assets/alcohol/BEOK-seoriju3.jpg";
import seorijuImage1 from "../../assets/alcohol/BEOK-seoriju1.jpg";
import seorijuImage2 from "../../assets/alcohol/BEOK-seoriju2.jpg";
import wheatNoodleImage from "../../assets/IMG_1701.jpg";
import wheatNoodleImage2 from "../../assets/noodles/IMG_1702.jpg";
import giftSetImage1 from "../../assets/noodles/Myrongawon_noodle/1.jpg";
import giftSetImage2 from "../../assets/noodles/Myrongawon_noodle/2.jpg";
import giftSetImage3 from "../../assets/noodles/Myrongawon_noodle/3.jpg";
import giftSetImage4 from "../../assets/noodles/Myrongawon_noodle/4.jpg";
import giftSetImage5 from "../../assets/noodles/Myrongawon_noodle/5.jpg";
import giftSetImage6 from "../../assets/noodles/Myrongawon_noodle/6.jpg";
import giftSetImage7 from "../../assets/noodles/Myrongawon_noodle/7.jpg";
import giftSetImage8 from "../../assets/noodles/Myrongawon_noodle/8.jpg";
import potatoNoodleImage from "../../assets/noodles/BEOK-Potatonoodle3.jpg";
import potatoNoodleImage1 from "../../assets/noodles/BEOK-Potatonoodle1.jpg";
import potatoNoodleImage2 from "../../assets/noodles/BEOK-Potatonoodle2.jpg";
import potatoNoodleImage4 from "../../assets/noodles/BEOK-Potatonoodle4.jpg";
import potatoNoodleImage5 from "../../assets/noodles/BEOK-Potatonoodle5.jpg";
import potatoNoodleImage6 from "../../assets/noodles/BEOK-Potatonoodle6.jpg";
import hallabongNoodleImage1 from "../../assets/noodles/BEOK-Hanrabongnoodle.jpg";
import hallabongNoodleImage2 from "../../assets/noodles/BEOK-Hanrabongnoodle2.jpg";
import hallabongNoodleImage3 from "../../assets/noodles/BEOK-Hanrabongnoodle3.jpg";
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
  "4": barleyTea1,
  "5": sesameOilImage,
  "6": meatImage,
  "7": perillaOilImage1,
  "8": saucesImageAlt,
  "9": seorijuImage1,
  "10": wheatNoodleImage2,
  "11": giftSetImage1,
  "12": potatoNoodleImage1,
  "13": hallabongNoodleImage1,
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
  
  // Touch/swipe state for mobile carousel
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchCurrentX, setTouchCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const hasDraggedRef = useRef(false);
  
  // Touch/swipe state for lightbox
  const [lightboxTouchStartX, setLightboxTouchStartX] = useState(0);
  const [lightboxTouchCurrentX, setLightboxTouchCurrentX] = useState(0);
  const [isLightboxDragging, setIsLightboxDragging] = useState(false);
  const lightboxHasDraggedRef = useRef(false);

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
    ? [barleyTea1, barleyTea2, barleyTea3, barleyTea4, barleyTea5, barleyTea6, barleyTea7, barleyTea8, barleyTea9, barleyTea10, barleyTea11, barleyTea12, barleyTea13, barleyTea14, barleyTea15, barleyTea16, barleyTea17, barleyTea18, barleyTea19, barleyTea20, barleyTea21, barleyTea22, barleyTea23, barleyTea24]
    : productId === "5"
    ? [sesameOilImage, sesameOilImage2, sesameOilImage3, sesameOilImage4]
    : productId === "7"
    ? [perillaOilImage1, perillaOilImage2, perillaOilImage3, perillaOilImage4, perillaOilImage5]
    : productId === "8"
    ? [saucesImageAlt, saucesImage]
    : productId === "9"
    ? [seorijuImage1, seorijuImage2, seorijuImage]
    : productId === "10"
    ? [wheatNoodleImage2, giftSetImage2, giftSetImage3, giftSetImage4, giftSetImage5, giftSetImage6, giftSetImage7, giftSetImage8]
    : productId === "11"
    ? [giftSetImage1, giftSetImage2, giftSetImage3, giftSetImage4, giftSetImage5, giftSetImage6, giftSetImage7, giftSetImage8]
    : productId === "12"
    ? [potatoNoodleImage1, potatoNoodleImage2, potatoNoodleImage, potatoNoodleImage4, potatoNoodleImage5, potatoNoodleImage6]
    : productId === "13"
    ? [hallabongNoodleImage1, hallabongNoodleImage2, hallabongNoodleImage3, hallabongNoodleImage4, hallabongNoodleImage5]
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
    const selectedIndex = images.findIndex(img => img === selectedImage);
    const firstVisibleIndex = carouselIndex;
    const lastVisibleIndex = carouselIndex + maxVisible - 1;
    
    // Only slide if selected image is at the 1st visible position (first in carousel)
    if (selectedIndex === firstVisibleIndex && canScrollLeft) {
      const newIndex = Math.max(0, carouselIndex - 1);
      setCarouselIndex(newIndex);
      // Update main image to show the first visible image in the new carousel position
      const firstVisibleImage = images[newIndex];
      if (firstVisibleImage) {
        setSelectedImage(firstVisibleImage);
      }
    } else if (selectedIndex > 0) {
      // Just change the main image to previous one without sliding
      setSelectedImage(images[selectedIndex - 1]);
    }
  };

  const scrollCarouselRight = () => {
    const selectedIndex = images.findIndex(img => img === selectedImage);
    const firstVisibleIndex = carouselIndex;
    const lastVisibleIndex = carouselIndex + maxVisible - 1;
    
    // Only slide if selected image is at the 4th visible position (last in carousel)
    if (selectedIndex === lastVisibleIndex && canScrollRight) {
      const newIndex = Math.min(maxIndex, carouselIndex + 1);
      setCarouselIndex(newIndex);
      // Update main image to show the last visible image in the new carousel position
      const lastVisibleImage = images[newIndex + maxVisible - 1];
      if (lastVisibleImage) {
        setSelectedImage(lastVisibleImage);
      }
    } else if (selectedIndex < images.length - 1) {
      // Just change the main image to next one without sliding
      setSelectedImage(images[selectedIndex + 1]);
    }
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
  
  // Touch/swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const startX = e.touches[0].clientX;
    setTouchStartX(startX);
    setTouchCurrentX(startX);
    setIsDragging(true);
    hasDraggedRef.current = false;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent default scrolling behavior
    const currentX = e.touches[0].clientX;
    setTouchCurrentX(currentX);
    
    // Mark as dragged if movement exceeds threshold
    if (Math.abs(touchStartX - currentX) > 10) {
      hasDraggedRef.current = true;
    }
  };
  
  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const diff = touchStartX - touchCurrentX;
    const threshold = 30; // Minimum swipe distance in pixels
    
    // Calculate new index based on swipe distance
    let newIndex = carouselIndex;
    
    if (Math.abs(diff) > threshold) {
      let itemsToScroll = 1; // Default to at least 1 item
      
      if (itemWidth > 0) {
        // Calculate how many items to scroll based on swipe distance
        // Use itemWidth to determine the number of items scrolled
        itemsToScroll = Math.max(1, Math.round(Math.abs(diff) / itemWidth));
      } else if (carouselRef.current) {
        // Fallback if itemWidth is not yet measured - use percentage-based calculation
        const swipePercentage = Math.abs(diff) / carouselRef.current.offsetWidth;
        itemsToScroll = Math.max(1, Math.round(swipePercentage * maxVisible));
      }
      
      if (diff > 0) {
        // Swiped left - move forward (increase index)
        // Allow scrolling multiple items based on swipe distance - no limit
        newIndex = Math.min(maxIndex, carouselIndex + itemsToScroll);
      } else {
        // Swiped right - move backward (decrease index)
        // Allow scrolling multiple items based on swipe distance - no limit
        newIndex = Math.max(0, carouselIndex - itemsToScroll);
      }
    }
    
    // Reset drag state FIRST to clear drag offset immediately
    setIsDragging(false);
    setTouchStartX(0);
    setTouchCurrentX(0);
    
    // Then update carousel index - this will trigger smooth transition
    setCarouselIndex(newIndex);
    
    // Reset drag flag after a short delay to allow click handler to check it
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 100);
  };
  
  const handleTouchCancel = () => {
    // Reset everything if touch is cancelled
    setIsDragging(false);
    setTouchStartX(0);
    setTouchCurrentX(0);
    hasDraggedRef.current = false;
  };
  
  // Lightbox touch/swipe handlers for mobile
  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    if (!isLightboxOpen || !hasMultipleImages) return;
    const startX = e.touches[0].clientX;
    setLightboxTouchStartX(startX);
    setLightboxTouchCurrentX(startX);
    setIsLightboxDragging(true);
    lightboxHasDraggedRef.current = false;
  };
  
  const handleLightboxTouchMove = (e: React.TouchEvent) => {
    if (!isLightboxDragging || !isLightboxOpen || !hasMultipleImages) return;
    const currentX = e.touches[0].clientX;
    setLightboxTouchCurrentX(currentX);
    
    // Mark as dragged if movement exceeds threshold
    if (Math.abs(lightboxTouchStartX - currentX) > 10) {
      lightboxHasDraggedRef.current = true;
    }
  };
  
  const handleLightboxTouchEnd = () => {
    if (!isLightboxDragging || !isLightboxOpen || !hasMultipleImages) return;
    
    const diff = lightboxTouchStartX - lightboxTouchCurrentX;
    const threshold = 50; // Minimum swipe distance in pixels
    
    // Reset drag state first
    setIsLightboxDragging(false);
    setLightboxTouchStartX(0);
    setLightboxTouchCurrentX(0);
    
    // Navigate based on swipe direction
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left - go to next image
        goToNextInLightbox();
      } else {
        // Swiped right - go to previous image
        goToPreviousInLightbox();
      }
    }
    
    // Reset drag flag after a short delay
    setTimeout(() => {
      lightboxHasDraggedRef.current = false;
    }, 100);
  };
  
  const handleLightboxTouchCancel = () => {
    // Reset everything if touch is cancelled
    setIsLightboxDragging(false);
    setLightboxTouchStartX(0);
    setLightboxTouchCurrentX(0);
    lightboxHasDraggedRef.current = false;
  };
  
  // Calculate drag offset for smooth scrolling during touch
  // When swiping left (touchCurrentX < touchStartX), we want positive offset to move carousel left
  // When swiping right (touchCurrentX > touchStartX), we want negative offset to move carousel right
  const dragOffset = isDragging && touchStartX !== 0 && touchCurrentX !== 0 
    ? touchStartX - touchCurrentX 
    : 0;

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
          {/* Expand icon */}
          <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white border border-primary/40 shadow-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center opacity-70 group-hover:opacity-100 z-10">
            <Maximize2 className="h-4 w-4 text-primary" />
          </div>
      </div>

      {/* Thumbnail gallery - Carousel for products 1, 2, 3, 4, 7, 10, 11, 12, and 13, grid for others */}
      {(productId === "1" || productId === "2" || productId === "3" || productId === "4" || productId === "7" || productId === "10" || productId === "11" || productId === "12" || productId === "13") && images.length > maxVisible ? (
        <div className="relative">
          {/* Carousel container - shows exactly 4 images, slides smoothly */}
          <div 
            className="relative overflow-hidden rounded-lg select-none p-1 -m-1"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            style={{ 
              touchAction: 'pan-x',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div 
              className="flex gap-2 transition-transform ease-out" 
              style={{ 
                transform: itemWidth > 0 
                  ? `translateX(${-transformValue - dragOffset}px)` 
                  : `translateX(calc(-${carouselIndex} * (100% / ${maxVisible} + 0.5rem) + ${-dragOffset}px))`,
                transitionDuration: isDragging ? '0ms' : '300ms',
                transitionTimingFunction: isDragging ? 'linear' : 'ease-out',
                willChange: isDragging ? 'transform' : 'auto'
              }}
            >
              {images.map((image, index) => (
                <button
                  key={index}
                  ref={index === 0 ? measureItemRef : null}
                  onClick={() => {
                    // Prevent click if user was dragging
                    if (!hasDraggedRef.current) {
                      setSelectedImage(image);
                    }
                  }}
                  type="button"
                  className={`flex-shrink-0 aspect-square rounded-lg p-0 flex flex-col border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    selectedImage === image
                      ? "border-primary"
                      : "border-transparent shadow-sm hover:shadow-md hover:opacity-80"
                  }`}
                  style={{ 
                    width: `calc((100% - 1.5rem) / ${maxVisible})`
                  }}
                >
                  <div className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-md">
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover pointer-events-none"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          {images.length > maxVisible && (() => {
            const selectedIndex = images.findIndex(img => img === selectedImage);
            const canGoPrevious = selectedIndex > 0;
            const canGoNext = selectedIndex < images.length - 1;
            
            return (
              <>
                <button
                  onClick={scrollCarouselLeft}
                  disabled={!canGoPrevious}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 h-8 w-8 rounded-full border border-border/60 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center z-10 ${
                    canGoPrevious
                      ? "bg-white/90 hover:bg-white cursor-pointer"
                      : "bg-white/50 cursor-not-allowed opacity-50"
                  }`}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4 text-foreground" />
                </button>
                <button
                  onClick={scrollCarouselRight}
                  disabled={!canGoNext}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 h-8 w-8 rounded-full border border-border/60 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center z-10 ${
                    canGoNext
                      ? "bg-white/90 hover:bg-white cursor-pointer"
                      : "bg-white/50 cursor-not-allowed opacity-50"
                  }`}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4 text-foreground" />
                </button>
              </>
            );
          })()}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`aspect-square rounded-lg p-0 flex flex-col border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                selectedImage === image
                  ? "border-primary"
                  : "border-transparent shadow-sm hover:shadow-md hover:opacity-80"
              }`}
            >
              <div className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-md">
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => {
            // Only close if user wasn't dragging
            if (!lightboxHasDraggedRef.current) {
              setIsLightboxOpen(false);
            }
          }}
          onTouchStart={handleLightboxTouchStart}
          onTouchMove={handleLightboxTouchMove}
          onTouchEnd={handleLightboxTouchEnd}
          onTouchCancel={handleLightboxTouchCancel}
          style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
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
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center select-none"
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
