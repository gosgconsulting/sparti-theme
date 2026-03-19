import { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { ThemeLink } from "@/components/ThemeLink";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import heroImage from "../assets/PrivateDinning/20241107_160428.jpg";
import aboutBrokImage from "../assets/PrivateDinning/20241111_141148.jpg";
import reserveImage from "../assets/PrivateDinning/20241125_170824.jpg";
import faqImage from "../assets/PrivateDinning/IMG_4205.jpg";
import ContactFormSheet from "../components/ContactFormSheet";

export default function BrokPrivateDinningPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Image Background */}
      <section className="relative w-full min-h-[650px] overflow-hidden">
        <img
          src={heroImage}
          alt="Private Dining Experience"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content */}
        <div className="relative z-20 flex items-center justify-center min-h-[650px]">
          <div className="w-full px-2">
            <div className="mx-auto max-w-6xl flex justify-center">
              <main className="max-w-4xl">
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* Main Heading */}
                  <h1 className="font-body text-5xl md:text-6xl leading-[0.95] tracking-tight mb-6">
                    <span className="whitespace-nowrap"><span className="text-white">Intimate</span> <span className="font-heading italic font-normal text-white">Private</span></span>
                    <span className="block text-white">Dining</span>
                  </h1>

                  {/* Description */}
                  <div className="text-base md:text-lg font-body text-white mb-8 max-w-2xl mx-auto leading-relaxed space-y-4">
                    <p>
                      This is a space that holds the calm, warmth, and sincerity of the Korean dining table. So that a meal may be more than just a meal.
                      <br />
                      Bēok tells the story of Korea, beyond its food.
                    </p>
                    <p className="text-white">
                      이곳은 한국의 식탁이 가진 고요함과 따뜻함, 그리고 정성을 담아내는 공간입니다.
                      <br />
                      한 끼 식사가 그저 한 끼로 끝나지 않도록. 비옥은 음식 너머의 한국을 이야기합니다.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <a 
                      href="#menu"
                      className="px-8 py-3 rounded-full bg-transparent border border-white/30 !text-white font-normal text-sm transition-all duration-300 hover:bg-white/20 hover:border-white/70 hover:scale-105 hover:shadow-lg cursor-pointer inline-flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        const menuSection = document.getElementById('menu');
                        if (menuSection) {
                          menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      View Menu
                    </a>
                    <button
                      onClick={() => setIsContactFormOpen(true)}
                      className="px-8 py-3 rounded-full bg-white text-black font-normal text-sm transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-lg cursor-pointer inline-flex items-center gap-2 group"
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              </main>
            </div>
          </div>
        </div>
      </section>

      {/* About Brok Section */}
      <section className="px-2 pt-16 pb-16 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left: Image (sticky on desktop) */}
            <motion.div 
              className="order-1 md:order-1 md:sticky md:top-48"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="rounded-[1.5rem] overflow-hidden bg-white shadow-md">
                <img
                  src={aboutBrokImage}
                  alt="Private dining experience at Bēok"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>

            {/* Right: Text Content */}
            <motion.div 
              className="order-2 md:order-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-6">
                Experience our private dining
              </h2>
              <div className="space-y-4 text-base md:text-lg font-body text-foreground/70 leading-relaxed">
                <p>
                  We constantly reflect on what truly matters in Korean cooking.
                </p>
                <p>
                  More than flashy techniques or decorative plating, we value what is made by hand, the time spent with care, and the heart poured into each dish.
                </p>
                <p>
                  We see cooking not as something to be made, but something to be built — something to be quietly and honestly prepared, piece by piece, at the table.
                </p>
                <div
                  id="about-brok-more"
                  role="region"
                  aria-hidden={!isAboutExpanded}
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] space-y-4 ${isAboutExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p>
                    Just as rich soil nurtures the pure taste of nature, our cooking follows the flow of seasons and time.
                  </p>
                  <p>
                    We are focused more deeply. Our menu changes naturally with the seasons, and Bēok moves slowly and gently — but with quiet strength.
                  </p>
                  <p>
                    한식의 본질을 조용히 풀어내는 공간, 비옥은 한국의 요리에서 가장 중요한 것들이 무엇인지 늘 고민합니다.
                  </p>
                  <p>
                    화려한 기술이나 장식보다, 손으로 직접 만들고 오래 바라본 시간, 그리고 그 안에 담긴 마음을 더 중요하게 생각합니다.
                  </p>
                  <p>
                    우리는 음식을 &lsquo;만드는 일&rsquo;이 아니라 &lsquo;짓는 일&rsquo;이라 여기며, 식탁 위의 모든 것을 조용히, 정직하게 준비합니다. 비옥한 토양에서 자라난 자연의 맛을 담아내듯, 계절과 시간의 흐름을 그대로 따르며 요리를 짓습니다.
                  </p>
                  <p>
                    더 깊게 집중하며, 계절에 따라 자연스럽게 바뀝니다. 비옥은 그렇게 작고 느리게, 하지만 단단하게 움직이는 다이닝입니다.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAboutExpanded((prev) => !prev)}
                  aria-expanded={isAboutExpanded}
                  aria-controls="about-brok-more"
                  className="text-primary font-medium hover:underline focus:outline-none focus:underline"
                >
                  {isAboutExpanded ? "Read less" : "Read more..."}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reserve Section */}
      <section className="relative w-full min-h-[400px] overflow-hidden px-8 md:px-16 lg:px-24 bg-background">
        <img
          src={reserveImage}
          alt="Reserve Your Seat"
          className="absolute inset-x-8 md:inset-x-16 lg:inset-x-24 inset-y-0 w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] lg:w-[calc(100%-12rem)] h-full object-cover rounded-lg"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-x-8 md:inset-x-16 lg:inset-x-24 inset-y-0 bg-black/40 rounded-lg" />
        
        {/* Content */}
        <div className="relative z-20 flex items-center justify-center min-h-[400px]">
          <div className="w-full px-2">
            <div className="mx-auto max-w-6xl flex justify-center">
              <motion.div 
                className="max-w-2xl text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h2 className="text-3xl md:text-4xl font-body !text-white mb-8 tracking-tight">
                  Book your seat at BEOK
                </h2>
                <div>
                  <button
                    onClick={() => setIsContactFormOpen(true)}
                    className="px-8 py-3 rounded-full bg-white text-black font-normal text-sm transition-all duration-300 hover:bg-white/90 hover:scale-105 hover:shadow-lg cursor-pointer inline-flex items-center gap-2 group"
                  >
                    Reserve Now
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-2 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left: Text Content */}
            <motion.div 
              className="order-2 md:order-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="mb-2">
                <span className="text-sm font-body text-foreground/60 underline">FAQ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-body text-primary mb-8 tracking-tight">
                QUICK QUESTION
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b border-border">
                  <AccordionTrigger className="text-left font-body text-base md:text-lg text-foreground hover:no-underline py-4">
                    WHAT KIND OF CUISINE DO YOU SERVE?
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg font-body text-foreground/70 leading-relaxed">
                    We serve Korean contemporary cuisine focused on natural flavour. Expect seasonal ingredients, clean seasoning, and modern techniques that keep the spirit of Korean food intact.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b border-border">
                  <AccordionTrigger className="text-left font-body text-base md:text-lg text-foreground hover:no-underline py-4">
                    WHAT ARE THE HOUSE RULES?
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg font-body text-foreground/70 leading-relaxed">
                  Dinner Commence from 7PM and ends no later than 10.30PM.

                  We regret that we are currently unable to host children under 12 years of age.

                  Noise level are to be kept to a reasonable level at all times.

                  The menu is subject to change at any given moment. This depends on the availability and freshness of ingredients.

                  We are unable to cater to special dietary requirements, unless prior arrangements have been made.

                  We have a BYO policy with no additional corkage charge. We provide a few options for drinks at additional charges.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b border-border">
                  <AccordionTrigger className="text-left font-body text-base md:text-lg text-foreground hover:no-underline py-4">
                    WHERE ARE YOU LOCATED AND WHAT ARE YOUR OPENING HOURS?
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg font-body text-foreground/70 leading-relaxed">
                  We are located in Farrer Road, and detailed address will be sent upon confirming the reservation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-b border-border">
                  <AccordionTrigger className="text-left font-body text-base md:text-lg text-foreground hover:no-underline py-4">
                    WHAT IS YOUR PRICE RANGE?
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg font-body text-foreground/70 leading-relaxed">
                  Price is SGD $155/pax with number of guests of 6-8 guests. 

A deposit of $70/pax is mandatory.

Reservations are confirmed upon payment of deposit within 12 hours. Otherwise, the date shall be available for reservations again.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            {/* Right: Image */}
            <motion.div 
              className="order-1 md:order-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <div className="rounded-[1.5rem] overflow-hidden bg-white shadow-md">
                <img
                  src={faqImage}
                  alt="Korean BBQ grilling experience"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="px-2 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading tracking-tight mb-2">Beok</h2>
              <p className="text-lg font-body text-foreground/70">Spring & Summer</p>
            </div>

            <div className="space-y-8">
              {/* Menu Item 1 */}
              <div className="border-b border-border pb-6">
                <h3 className="text-xl md:text-2xl font-heading mb-2">막걸리빵 / 편수 / 문어쌈</h3>
                <p className="text-base md:text-lg font-body text-foreground/80 mb-2">Makgeolli Bread / Pyeonsu / Octopus Ssam</p>
                <p className="text-sm md:text-base font-body text-foreground/60">Mugwort Butter / Korean Zucchini / Gamromae salsa</p>
              </div>

              {/* Menu Item 2 */}
              <div className="border-b border-border pb-6">
                <h3 className="text-xl md:text-2xl font-heading mb-2">관자 물회</h3>
                <p className="text-base md:text-lg font-body text-foreground/80 mb-2">Scallop Mulhoei</p>
                <p className="text-sm md:text-base font-body text-foreground/60">Hokkaido Scallop, Tofu Mascapone, Tomato Water</p>
              </div>

              {/* Menu Item 3 */}
              <div className="border-b border-border pb-6">
                <h3 className="text-xl md:text-2xl font-heading mb-2">아롱사태 수육</h3>
                <p className="text-base md:text-lg font-body text-foreground/80 mb-2">Arongsatae Suyuk</p>
                <p className="text-sm md:text-base font-body text-foreground/60">Beef Heel muscle, Yuja Chive Gremolata</p>
              </div>

              {/* Menu Item 4 */}
              <div className="border-b border-border pb-6">
                <h3 className="text-xl md:text-2xl font-heading mb-2">잣 국수</h3>
                <p className="text-base md:text-lg font-body text-foreground/80 mb-2">Jatt Guksu</p>
                <p className="text-sm md:text-base font-body text-foreground/60">Hand-Stretched Noodle, Kombucha, White Kimchi</p>
              </div>

              {/* Menu Item 5 */}
              <div className="border-b border-border pb-6">
                <h3 className="text-xl md:text-2xl font-heading mb-2">생선찜</h3>
                <p className="text-base md:text-lg font-body text-foreground/80 mb-2">Fish Jjim</p>
                <p className="text-sm md:text-base font-body text-foreground/60">Seasonal Fish, Sunchoke, Caviar</p>
              </div>

              {/* Menu Item 6 */}
              <div className="border-b border-border pb-6">
                <h3 className="text-xl md:text-2xl font-heading mb-2">너비아니 반상</h3>
                <p className="text-base md:text-lg font-body text-foreground/80 mb-2">Neobiani Bansang</p>
                <p className="text-sm md:text-base font-body text-foreground/60">Jeju Pork Collar, Native Korean Bean Rice, Seasonal Soup</p>
              </div>

              {/* Menu Item 7 - Dessert */}
              <div className="pb-6">
                <h3 className="text-xl md:text-2xl font-heading mb-2">오미자 파나코타</h3>
                <p className="text-base md:text-lg font-body text-foreground/80 mb-2">Omija Panna Cotta</p>
                <p className="text-sm md:text-base font-body text-foreground/60">Seasonal Fruit Mamalade, Basil</p>
              </div>
            </div>
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
