import React, { useState, useEffect } from "react";

const GallerySection = () => {
  const [activeChapter, setActiveChapter] = useState("Quiet Mornings");
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousIndex, setPreviousIndex] = useState(0);

  const chapters = [
    {
      id: "Quiet Mornings",
      title: "Quiet Mornings",
      eyebrow: "Morning",
      caption: "Begin the day in serene spaces shaped for stillness, light, and renewal.",
      detail: "Natural light fills thoughtfully arranged rooms, creating moments of calm before the day unfolds.",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",
    },
    {
      id: "Designed Spaces",
      title: "Designed Spaces",
      eyebrow: "Interior",
      caption: "Every room is composed with warmth, proportion, and quiet elegance.",
      detail: "Interior design that balances modern elegance with warm, inviting atmospheres.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
    },
    {
      id: "Elevated Dining",
      title: "Elevated Dining",
      eyebrow: "Culinary",
      caption: "Seasonal flavors and intimate settings create a dining experience worth lingering over.",
      detail: "Restaurant spaces where exceptional food meets refined hospitality.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    },
    {
      id: "Evenings in Retreat",
      title: "Evenings in Retreat",
      eyebrow: "Evening",
      caption: "As the day softens, the hotel becomes a calm setting for rest, connection, and slow luxury.",
      detail: "Evening ambiance designed for unwinding, conversation, and peaceful reflection.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    },
  ];

  const activeChapterData = chapters.find((c) => c.id === activeChapter) || chapters[0];
  const activeIndex = chapters.findIndex((c) => c.id === activeChapter);

  const changeChapter = (newChapterId: string, direction: "left" | "right") => {
    if (isTransitioning) return;
    const currentIndex = chapters.findIndex((c) => c.id === activeChapter);
    setPreviousIndex(currentIndex);
    setSlideDirection(direction);
    setIsTransitioning(true);
    setActiveChapter(newChapterId);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setSlideDirection(null);
    }, 700); // Match transition duration
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % chapters.length;
    // Always slide left when going forward, even when looping
    changeChapter(chapters[nextIndex].id, "left");
  };

  const handlePrevious = () => {
    const prevIndex = (activeIndex - 1 + chapters.length) % chapters.length;
    // Always slide right when going backward, even when looping
    changeChapter(chapters[prevIndex].id, "right");
  };

  const handleChapterClick = (chapterId: string) => {
    const clickedIndex = chapters.findIndex((c) => c.id === chapterId);
    // Determine direction, but handle looping case
    let direction: "left" | "right";
    if (clickedIndex === 0 && activeIndex === chapters.length - 1) {
      // Clicking first from last - loop forward
      direction = "left";
    } else if (clickedIndex === chapters.length - 1 && activeIndex === 0) {
      // Clicking last from first - loop backward
      direction = "right";
    } else {
      // Normal case
      direction = clickedIndex > activeIndex ? "left" : "right";
    }
    changeChapter(chapterId, direction);
  };

  return (
    <section className="bg-brand-main py-20 lg:py-32">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <p className="font-body text-sm text-brand-neutral uppercase tracking-wider mb-4">
            Visual Storytelling
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-semibold text-brand-text">
            Moments that define your stay
          </h2>
        </div>

        {/* Horizontal Chapter Navigation */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center justify-center border-b border-brand-neutral/20 pb-2">
            <div className="flex gap-2 lg:gap-4 overflow-x-auto scrollbar-hide">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterClick(chapter.id)}
                  className={`relative px-6 lg:px-8 py-4 font-body text-sm lg:text-base font-medium transition-all duration-300 whitespace-nowrap ${
                    activeChapter === chapter.id
                      ? "text-brand-primary"
                      : "text-brand-text/60 hover:text-brand-text/80"
                  }`}
                >
                  {chapter.title}
                  {activeChapter === chapter.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary transition-all duration-300"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative overflow-hidden">
          {/* Large Immersive Image */}
          <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-lg overflow-hidden bg-brand-neutral/10 mb-8">
            <div className="relative w-full h-full">
              {chapters.map((chapter, index) => {
                const isActive = chapter.id === activeChapter;
                let slideOffset: string;
                
                if (isActive) {
                  slideOffset = "0%";
                } else if (slideDirection === "left") {
                  // Sliding left (forward) - current slides left, next comes from right
                  if (previousIndex === chapters.length - 1 && index === 0) {
                    // Looping from last to first - first comes from right
                    slideOffset = "100%";
                  } else if (index < activeIndex) {
                    slideOffset = "-100%";
                  } else {
                    slideOffset = "100%";
                  }
                } else if (slideDirection === "right") {
                  // Sliding right (backward) - current slides right, previous comes from left
                  if (previousIndex === 0 && index === chapters.length - 1) {
                    // Looping from first to last - last comes from left
                    slideOffset = "-100%";
                  } else if (index > activeIndex) {
                    slideOffset = "100%";
                  } else {
                    slideOffset = "-100%";
                  }
                } else {
                  // No transition - static positioning
                  slideOffset = index < activeIndex ? "-100%" : "100%";
                }
                
                return (
                  <div
                    key={chapter.id}
                    className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                      isActive ? "z-10" : "z-0"
                    }`}
                    style={{
                      transform: `translateX(${isActive ? "0%" : slideOffset})`,
                    }}
                  >
                    <img
                      src={chapter.image}
                      alt={chapter.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay Content Card */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                      <div className="max-w-2xl">
                        <p className="font-body text-xs text-white/80 uppercase tracking-wider mb-3">
                          {chapter.eyebrow}
                        </p>
                        <h3 className="font-headline text-3xl lg:text-4xl font-semibold text-white mb-4 leading-tight">
                          {chapter.title}
                        </h3>
                        <p className="font-body text-base lg:text-lg text-white/90 leading-relaxed max-w-xl">
                          {chapter.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-brand-text hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl group z-20"
              aria-label="Previous chapter"
            >
              <svg
                className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-brand-text hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl group z-20"
              aria-label="Next chapter"
            >
              <svg
                className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
