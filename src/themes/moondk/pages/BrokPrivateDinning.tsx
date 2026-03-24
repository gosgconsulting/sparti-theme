import { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { ArrowRight, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductAccordion from "../components/product/ProductAccordion";
import { motion } from "framer-motion";
import heroImage from "../assets/PrivateDinning/20241107_160428.jpg";
import aboutBrokImage from "../assets/PrivateDinning/20241111_141148.jpg";
import reserveImage from "../assets/PrivateDinning/20241125_170824.jpg";
import faqImage from "../assets/PrivateDinning/IMG_4205.jpg";
import ContactFormSheet from "../components/ContactFormSheet";
import { cn } from "@/lib/utils";

const menuCourses = [
  {
    ko: "막걸리빵 / 편수 / 문어쌈",
    en: "Makgeolli Bread / Pyeonsu / Octopus Ssam",
    note: "Mugwort Butter / Korean Zucchini / Gamromae salsa",
  },
  {
    ko: "관자 물회",
    en: "Scallop Mulhoei",
    note: "Hokkaido Scallop, Tofu Mascapone, Tomato Water",
  },
  {
    ko: "아롱사태 수육",
    en: "Arongsatae Suyuk",
    note: "Beef Heel muscle, Yuja Chive Gremolata",
  },
  {
    ko: "잣 국수",
    en: "Jatt Guksu",
    note: "Hand-Stretched Noodle, Kombucha, White Kimchi",
  },
  {
    ko: "생선찜",
    en: "Fish Jjim",
    note: "Seasonal Fish, Sunchoke, Caviar",
  },
  {
    ko: "너비아니 반상",
    en: "Neobiani Bansang",
    note: "Jeju Pork Collar, Native Korean Bean Rice, Seasonal Soup",
  },
  {
    ko: "오미자 파나코타",
    en: "Omija Panna Cotta",
    note: "Seasonal Fruit Marmalade, Basil",
    isLast: true,
  },
] as const;

const privateDiningFaqItems = [
  {
    id: "cuisine",
    title: "What kind of cuisine do you serve?",
    content: (
      <p>
        We serve Korean contemporary cuisine focused on natural flavour. Expect
        seasonal ingredients, clean seasoning, and modern techniques that keep
        the spirit of Korean food intact.
      </p>
    ),
  },
  {
    id: "house-rules",
    title: "What are the house rules?",
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Dinner commences from 7:00 p.m. and ends no later than 10:30 p.m.
        </li>
        <li>
          We regret that we are currently unable to host children under 12
          years of age.
        </li>
        <li>Noise levels should be kept reasonable at all times.</li>
        <li>
          The menu may change depending on ingredient availability and
          freshness.
        </li>
        <li>
          We cannot cater to special dietary requirements unless arranged in
          advance.
        </li>
        <li>
          BYO is welcome with no corkage; we also offer drinks at an additional
          charge.
        </li>
      </ul>
    ),
  },
  {
    id: "location-hours",
    title: "Where are you located and what are your opening hours?",
    content: (
      <p>
        We are located on Farrer Road; the full address is shared once your
        reservation is confirmed.
      </p>
    ),
  },
  {
    id: "price-range",
    title: "What is your price range?",
    content: (
      <div className="space-y-4">
        <p>
          <span className="font-medium text-foreground/85">
            SGD 155 per person
          </span>{" "}
          for parties of 6–8 guests.
        </p>
        <p>
          A deposit of SGD 70 per person is required. Reservations are confirmed
          once the deposit is paid within 12 hours; otherwise the date may be
          released.
        </p>
      </div>
    ),
  },
];

export default function BrokPrivateDinningPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative w-full min-h-[min(85vh,820px)] overflow-hidden">
        <img
          src={heroImage}
          alt="Private Dining Experience"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60"
          aria-hidden
        />

        <div className="relative z-20 flex items-center justify-center min-h-[min(85vh,820px)] px-6">
          <div className="mx-auto w-full max-w-6xl flex justify-center">
            <main className="max-w-4xl w-full">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <p className="font-body text-xs uppercase tracking-[0.2em] text-white/80 mb-6">
                  Bēok · Private dining
                </p>
                <h1 className="font-body text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6">
                  <span className="whitespace-nowrap">
                    <span className="text-white">Intimate</span>{" "}
                    <span className="font-heading italic font-normal text-white">
                      Private
                    </span>
                  </span>
                  <span className="block text-white">Dining</span>
                </h1>

                <div className="text-base md:text-lg font-body text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed space-y-4">
                  <p>
                    This is a space that holds the calm, warmth, and sincerity
                    of the Korean dining table. So that a meal may be more than
                    just a meal.
                    <br />
                    Bēok tells the story of Korea, beyond its food.
                  </p>
                  <p className="text-white/85 text-[0.95em] leading-relaxed">
                    이곳은 한국의 식탁이 가진 고요함과 따뜻함, 그리고 정성을 담아내는
                    공간입니다.
                    <br />
                    한 끼 식사가 그저 한 끼로 끝나지 않도록. 비옥은 음식 너머의 한국을
                    이야기합니다.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "rounded-full px-8 py-6 text-sm font-normal border-white/40 bg-white/5 text-white backdrop-blur-[2px]",
                      "hover:bg-white/15 hover:text-white hover:border-white/70 hover:scale-[1.02]",
                      "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                    )}
                    onClick={() => {
                      const menuSection = document.getElementById("menu");
                      menuSection?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    View menu
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsContactFormOpen(true)}
                    className={cn(
                      "group rounded-full px-8 py-6 text-sm font-normal bg-white text-foreground shadow-md",
                      "hover:bg-white/95 hover:scale-[1.02]",
                      "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                    )}
                  >
                    Book now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            </main>
          </div>
        </div>
      </section>

      <section className="px-6 pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
            <motion.div
              className="md:sticky md:top-40"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="rounded-[1.5rem] overflow-hidden bg-card shadow-md ring-1 ring-border/40">
                <img
                  src={aboutBrokImage}
                  alt="Private dining experience at Bēok"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              <div className="flex items-center gap-2 text-primary mb-4">
                <Utensils className="h-5 w-5 shrink-0" aria-hidden />
                <span className="text-sm font-body tracking-wide">
                  Our approach
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-6 text-primary">
                Experience our private dining
              </h2>
              <div className="space-y-4 text-base md:text-lg font-body text-foreground/75 leading-relaxed">
                <p>
                  We constantly reflect on what truly matters in Korean cooking.
                </p>
                <p>
                  More than flashy techniques or decorative plating, we value
                  what is made by hand, the time spent with care, and the heart
                  poured into each dish.
                </p>
                <p>
                  We see cooking not as something to be made, but something to
                  be built — something to be quietly and honestly prepared,
                  piece by piece, at the table.
                </p>
                <div
                  id="about-brok-more"
                  role="region"
                  aria-hidden={!isAboutExpanded}
                  className={cn(
                    "overflow-hidden transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] space-y-4",
                    isAboutExpanded
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <p>
                    Just as rich soil nurtures the pure taste of nature, our
                    cooking follows the flow of seasons and time.
                  </p>
                  <p>
                    We are focused more deeply. Our menu changes naturally with
                    the seasons, and Bēok moves slowly and gently — but with quiet
                    strength.
                  </p>
                  <p>
                    한식의 본질을 조용히 풀어내는 공간, 비옥은 한국의 요리에서 가장
                    중요한 것들이 무엇인지 늘 고민합니다.
                  </p>
                  <p>
                    화려한 기술이나 장식보다, 손으로 직접 만들고 오래 바라본 시간,
                    그리고 그 안에 담긴 마음을 더 중요하게 생각합니다.
                  </p>
                  <p>
                    우리는 음식을 &lsquo;만드는 일&rsquo;이 아니라 &lsquo;짓는
                    일&rsquo;이라 여기며, 식탁 위의 모든 것을 조용히, 정직하게
                    준비합니다. 비옥한 토양에서 자라난 자연의 맛을 담아내듯, 계절과
                    시간의 흐름을 그대로 따르며 요리를 짓습니다.
                  </p>
                  <p>
                    더 깊게 집중하며, 계절에 따라 자연스럽게 바뀝니다. 비옥은 그렇게
                    작고 느리게, 하지만 단단하게 움직이는 다이닝입니다.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAboutExpanded((prev) => !prev)}
                  aria-expanded={isAboutExpanded}
                  aria-controls="about-brok-more"
                  className="text-primary font-medium text-sm hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                >
                  {isAboutExpanded ? "Read less" : "Read more…"}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 md:pb-10">
        <div className="mx-auto max-w-6xl">
          <div className="relative min-h-[420px] md:min-h-[460px] overflow-hidden rounded-[1.75rem] shadow-lg ring-1 ring-border/30">
            <img
              src={reserveImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/35"
              aria-hidden
            />

            <div className="relative z-10 flex min-h-[420px] md:min-h-[460px] items-center justify-center px-6 py-14">
              <motion.div
                className="max-w-xl text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <p className="text-xs font-body uppercase tracking-[0.2em] text-white/75 mb-3">
                  Reservations
                </p>
                <h2 className="text-3xl md:text-4xl font-heading mb-8 tracking-tight !text-white">
                  Book your seat at Bēok
                </h2>
                <Button
                  type="button"
                  onClick={() => setIsContactFormOpen(true)}
                  className={cn(
                    "group rounded-full px-8 py-6 text-sm font-normal bg-white text-foreground shadow-md",
                    "hover:bg-white/95 hover:scale-[1.02]",
                    "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
                  )}
                >
                  Reserve now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="mb-2 text-xs font-body font-light uppercase tracking-wider text-foreground/50">
                FAQ
              </p>
              <h2 className="mb-6 text-3xl font-heading tracking-tight text-primary md:mb-8 md:text-4xl">
                Quick questions
              </h2>
              <ProductAccordion items={privateDiningFaqItems} />
            </motion.div>

            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              <div className="rounded-[1.5rem] overflow-hidden bg-card shadow-md ring-1 ring-border/40">
                <img
                  src={faqImage}
                  alt="Bēok dining experience"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="menu" className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-[2rem] bg-card p-8 md:p-12 shadow-md ring-1 ring-border/25"
          >
            <div className="text-center mb-10 md:mb-12">
              <p className="text-xs font-body uppercase tracking-[0.2em] text-foreground/50 mb-3">
                Seasonal tasting
              </p>
              <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-2">
                Bēok
              </h2>
              <p className="text-base md:text-lg font-body text-foreground/65">
                Spring &amp; Summer
              </p>
            </div>

            <ul className="space-y-0">
              {menuCourses.map((course, index) => (
                <li
                  key={course.ko}
                  className={cn(
                    "flex gap-4 md:gap-6 py-6 md:py-7 border-border/60",
                    !course.isLast && "border-b",
                  )}
                >
                  <span
                    className="font-heading text-lg text-primary/90 tabular-nums w-8 shrink-0 pt-0.5"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1 border-l-2 border-primary/20 pl-4 md:pl-5">
                    <h3 className="text-xl md:text-2xl font-heading mb-1">
                      {course.ko}
                    </h3>
                    <p className="text-base md:text-lg font-body text-foreground/80 mb-1">
                      {course.en}
                    </p>
                    <p className="text-sm md:text-base font-body text-foreground/55">
                      {course.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />

      <ContactFormSheet
        open={isContactFormOpen}
        onOpenChange={setIsContactFormOpen}
      />
    </div>
  );
}
