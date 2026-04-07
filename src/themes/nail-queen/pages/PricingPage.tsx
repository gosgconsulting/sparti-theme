import React from "react";
import { getThemeAssetUrl } from "../../../utils/themeAssets";
import { Layout } from "../components/Layout";

const THEME_SLUG = "nail-queen";

export default function PricingPage({ basePath, tenantId }: { basePath: string; tenantId?: string }) {
  const asset = (path: string) => getThemeAssetUrl(basePath, path, THEME_SLUG);

  return (
    <Layout basePath={basePath} tenantId={tenantId}>
      {/* Header */}
      <section className="bg-background pb-6 pt-16 md:pb-8">
        <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6 break-words text-center text-4xl font-bold text-nail-queen-brown sm:mb-8 sm:text-5xl md:text-6xl">
            Pricing
          </h1>
        </div>
      </section>

      {/* Service Categories */}
      <section className="bg-background pb-10 pt-4 md:pb-12 md:pt-5">
        <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            id="pricing-mani-pedi"
            className="grid min-w-0 scroll-mt-32 grid-cols-1 gap-6 md:grid-cols-2 md:scroll-mt-36 md:gap-6 lg:gap-8"
          >
            {/* Manicures */}
            <div className="flex h-full min-w-0 max-w-full flex-col rounded-3xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
              <div className="aspect-square bg-gray-200 rounded-2xl mb-6 overflow-hidden">
                <img src={asset("pricing/manicure.jpg")} alt="Manicures" className="w-full h-full object-cover" />
              </div>
              <h2 className="break-words text-2xl font-bold text-nail-queen-brown sm:text-3xl mb-4">Manicures</h2>
              <p className="text-gray-600 mb-8">
                Indulge your hands with our different manicure options, from quick and efficient to thorough and luxurious.
              </p>

              <div className="space-y-6">
                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">EXPRESS NON-GEL MANICURE</h3>
                    <p className="text-sm text-gray-600">
                      Perfect for those on the go, this service includes cut, shape, and a coat of vibrant NON GEL colour.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$16.35</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">CLASSIC NON-GEL MANICURE</h3>
                    <p className="text-sm text-gray-600">
                      An upgrade on our Express Manicure, the Classic includes cuticle care and a soothing lotion massage in addition to cut, shape, and NON GEL colour application.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$27.25</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">EXPRESS GEL MANICURE</h3>
                    <p className="text-sm text-gray-600">
                      Get a long-lasting, glossy finish with our Express Gel Manicure. The service involves cutting and shaping nails, followed by the application of GEL colour.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$38.15</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">CLASSIC GEL MANICURE</h3>
                    <p className="text-sm text-gray-600">
                      Experience a full package of nail care, featuring cut, shape, cuticle care, GEL colour application, and lotion massage.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$49.05</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">BIAB MANICURE</h3>
                    <p className="text-sm text-gray-600">
                      Builder in a bottle gel application for stronger, healthier nails with a natural-looking finish.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$74.12</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">RUSSIAN MANICURE</h3>
                    <p className="text-sm text-gray-600">
                      Precision cuticle care using specialized tools for a clean, polished look around the nail bed. (dry cuticle care and trimming only)
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$41.42</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">GEL, ACRYLIC OVERLAY/INFILL</h3>
                    <p className="text-sm text-gray-600">Fill up the growing gap part and create a smooth nail surface.</p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">extra $65.4/set</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">GEL X/HARD GEL/ACRYLIC EXTENSION</h3>
                    <p className="text-sm text-gray-600">
                      Make your short nails longer and create an apex for your nails using nail tip extension.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">extra $95.92/set</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">GEL X EXTENSION + COLOUR (FOR STUDENT ONLY)</h3>
                    <p className="text-sm text-gray-600">
                      Full set of Gel X extensions with your choice of gel colour. Valid student ID required.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$95.92</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">STRENGTHENER</h3>
                    <p className="text-sm text-gray-600">Restore a balanced nail surface with our nail hardening technology.</p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">extra $32.70/set</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">DIPPING POWDER NAILS</h3>
                    <p className="text-sm text-gray-600">
                      Experience overlays using hard gel, no need for curing lamp, no need for coloured polish.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">extra $87.20/set</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">SOFT GEL/BIAB soak off</h3>
                    <p className="text-sm text-gray-600">
                      Safe removal of soft gel or Builder in a Bottle without filing down the natural nail.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$16.35/set</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">HARD GEL/ACRYLIC/DIP POWDER soak off</h3>
                    <p className="text-sm text-gray-600">
                      Professional removal of hard gel, acrylic, or dip powder extensions to minimise damage to the natural nail.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$27.25/set</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pedicures */}
            <div className="flex h-full min-w-0 max-w-full flex-col rounded-3xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
              <div className="aspect-square bg-gray-200 rounded-2xl mb-6 overflow-hidden">
                <img src={asset("pricing/pedicure.png")} alt="Pedicures" className="w-full h-full object-cover" />
              </div>
              <h2 className="break-words text-2xl font-bold text-nail-queen-brown sm:text-3xl mb-4">Pedicures</h2>
              <p className="text-gray-600 mb-8">Treat your feet to a spa-like experience with our range of pedicure services.</p>

              <div className="space-y-6">
                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">EXPRESS NON-GEL PEDICURE</h3>
                    <p className="text-sm text-gray-600">This service encompasses cut, shape, and NON GEL colour application</p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$16.35</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">CLASSIC NON-GEL PEDICURE</h3>
                    <p className="text-sm text-gray-600">
                      Indulge in sea-salt soaking, cuticle care, foot scrub, and lotion massage, followed by NON GEL colour application.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$38.15</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">EXPRESS GEL PEDICURE</h3>
                    <p className="text-sm text-gray-600">
                      This service includes cut, shape, and GEL colour application for a long-lasting finish.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$38.15</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">CLASSIC GEL PEDICURE</h3>
                    <p className="text-sm text-gray-600">
                      Enjoy an all-inclusive pedicure service with cut, shape, sea-salt soaking, cuticle care, foot scrub, lotion massage, and GEL colour application.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$59.95</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">BIAB PEDICURE</h3>
                    <p className="text-sm text-gray-600">
                      Full pedicure with Builder in a Bottle gel on toes for stronger nails and a long-lasting, natural-looking finish.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$85.02</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">INGROWN NAILS</h3>
                    <p className="text-sm text-gray-600">
                      Relieve pressure and pain caused by ingrown nails with our gentle, hygienic care. Designed to reduce inflammation and support healthy nail growth.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$30.52</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">FUNGUS TREATMENT</h3>
                    <p className="text-sm text-gray-600">
                      A clean, safe solution to restore nail clarity and prevent fungal spread. (Includes in-salon antibacterial soak & treatment and a take-home antifungal treatment for continued care.)
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$106.82</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">CALLUS TREATMENT</h3>
                    <p className="text-sm text-gray-600">
                      For thick, hard dead skin/corn offering callus medicine, extra foot scrub, and paraffin treatment.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$30.52</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">ECZEMA SPA TREATMENT</h3>
                    <p className="text-sm text-gray-600">
                      Specially designed to manage the condition and improve the quality of life for those affected by eczema.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$16.35</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1 break-words">
                    <h3 className="font-bold text-nail-queen-brown">SPA TREATMENT</h3>
                    <p className="text-sm text-gray-600">
                      A 5-step luxury nourishing spa with a hot steaming machine combined, restoring smooth, radiant skin and providing ample moisture for your hands and feet.
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                    <span className="font-bold">$30.52</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Eyebrows */}
            <div
              id="pricing-eyebrows"
              className="col-span-1 min-w-0 max-w-full scroll-mt-32 rounded-3xl bg-white p-4 shadow-lg sm:p-6 md:col-span-2 md:scroll-mt-36 md:p-8"
            >
              <div className="flex min-w-0 flex-col gap-6 md:flex-row md:items-center md:gap-8">
                <div className="aspect-square w-full shrink-0 overflow-hidden rounded-2xl bg-gray-200 md:max-w-sm md:basis-[42%] lg:max-w-md">
                  <img
                    src={asset("browshaping/13.png")}
                    alt="Eyebrow services"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center md:-translate-y-2">
                  <h2 className="mb-4 break-words text-2xl font-bold text-nail-queen-brown sm:text-3xl">Eyebrows</h2>
                  <p className="mb-8 text-gray-600">
                    Define and refine your brows with precise threading and gentle waxing for a polished, balanced look.
                  </p>

                  <div className="space-y-6">
                    <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="min-w-0 flex-1 break-words">
                        <h3 className="font-bold text-nail-queen-brown">BROW THREADING</h3>
                        <p className="text-sm text-gray-600">
                          Hair removal with thread for clean edges and a natural arch
                          <br />
                          tailored to your face.
                        </p>
                      </div>
                      <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                        <span className="font-bold">$15</span>
                        <p className="text-xs text-gray-500">(inclusive of GST)</p>
                      </div>
                    </div>

                    <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="min-w-0 flex-1 break-words">
                        <h3 className="font-bold text-nail-queen-brown">BROW WAXING</h3>
                        <p className="text-sm text-gray-600">
                          Quick waxing to remove unwanted hairs and leave the brow area
                          <br />
                          smooth and neat.
                        </p>
                      </div>
                      <div className="shrink-0 text-left sm:ml-4 sm:text-right">
                        <span className="font-bold">$18</span>
                        <p className="text-xs text-gray-500">(inclusive of GST)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Luxe Spa Mani–Pedi Collection */}
          <div
            id="pricing-luxe-spa-collection"
            className="mt-16 scroll-mt-32 md:scroll-mt-36 -mx-4 bg-secondary px-4 py-12 sm:-mx-6 sm:px-6 sm:py-14 md:py-16 lg:-mx-8 lg:px-8"
          >
            <div className="text-center mb-12">
              <h2 className="break-words text-3xl font-bold text-nail-queen-brown sm:text-4xl mb-4 px-1">
                Luxe Spa Mani–Pedi Collection
              </h2>
              <p className="text-lg text-nail-queen-brown/80 max-w-3xl mx-auto leading-relaxed">
                A Four-Senses Ritual crafted from delicate techniques, soft aromas, and layers of nourishing care that unfold slowly on the skin. Each concept offers its own emotional landscape — guided by color, scent, texture, and a signature refreshment served at the end as the final note of the ritual. This is more than a treatment. It is a sensory journey — aesthetic, emotional, and deeply calming, designed to match the mood you want to slip into today.
              </p>
            </div>

            <div className="grid min-w-0 grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
              <div className="flex h-full min-w-0 max-w-full flex-col rounded-3xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
                <div className="aspect-video bg-gray-200 rounded-2xl mb-6 overflow-hidden">
                  <img src={asset("pricing/spa/matcha-lover.jpg")} alt="Matcha Lover Spa Treatment" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-nail-queen-brown mb-2">1. Matcha Lover</h3>
                <h4 className="text-m font-bold text-nail-queen-brown mb-2">A Quiet Moment of Japanese Calm</h4>
                <div className="flex min-h-0 flex-1 flex-col pb-5">
                  <p className="mb-4 text-gray-600">
                    Matcha Lover captures the serenity of a Japanese morning: soft green hues, gentle warmth on the skin, and a subtle scent that invites stillness. A velvety matcha mask embraces the hands and feet, while slow, intentional massage strokes embody the art of slow beauty — unhurried, grounding, and deeply pure.
                  </p>
                  <p className="text-gray-600">
                    The ritual concludes with a thoughtfully prepared matcha latte, not as a beverage, but as a quiet punctuation mark — a moment to breathe, reset, and return to yourself.
                  </p>
                </div>
                <div className="mt-auto flex min-w-0 flex-col gap-2 border-t pt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <span className="min-w-0 font-bold break-words text-nail-queen-brown">LUXE SPA TREATMENT</span>
                  <div className="shrink-0 text-left sm:text-right">
                    <span className="font-bold">$63.22</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>
              </div>

              <div className="flex h-full min-w-0 max-w-full flex-col rounded-3xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
                <div className="aspect-video bg-gray-200 rounded-2xl mb-6 overflow-hidden">
                  <img src={asset("pricing/spa/whisper-rosy.jpg")} alt="Roselle Spa Treatment" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-nail-queen-brown mb-2">2. Roselle</h3>
                <h4 className="text-m font-bold text-nail-queen-brown mb-2">Rosy Elegance in a Modern Ritual</h4>
                <div className="flex min-h-0 flex-1 flex-col pb-5">
                  <p className="mb-4 text-gray-600">
                    Roselle blends the clarity of roselle red with the refined femininity of rose petals — a modern, effortless elegance. A delicate rose mask soothes the skin, while the refining scrub brings back its natural softness and radiance.
                  </p>
                  <p className="text-gray-600">
                    At the end, a cool roselle refreshment is served — a floral whisper that completes the experience and leaves behind a feeling of lightness and graceful confidence.
                  </p>
                </div>
                <div className="mt-auto flex min-w-0 flex-col gap-2 border-t pt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <span className="min-w-0 font-bold break-words text-nail-queen-brown">LUXE SPA TREATMENT</span>
                  <div className="shrink-0 text-left sm:text-right">
                    <span className="font-bold">$63.22</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>
              </div>

              <div className="flex h-full min-w-0 max-w-full flex-col rounded-3xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
                <div className="aspect-video bg-gray-200 rounded-2xl mb-6 overflow-hidden">
                  <img src={asset("pricing/spa/golden-expresso.jpg")} alt="Golden Espresso Spa Treatment" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-nail-queen-brown mb-2">3. Golden Espresso</h3>
                <h4 className="text-m font-bold text-nail-queen-brown mb-2">The Warmth of a Slow Morning</h4>
                <div className="flex min-h-0 flex-1 flex-col pb-5">
                  <p className="mb-4 text-gray-600">
                    Golden Espresso is inspired by the quiet luxury of slow, warm mornings. A coffee-based scrub awakens the skin and stimulates circulation, creating a comforting warmth across the hands and feet. The nourishing mask that follows enhances softness and vitality.
                  </p>
                  <p className="text-gray-600">
                    A petite espresso closes the ritual — not for stimulation, but as a sunlit final note, leaving you feeling centred, restored, and gently energised from within.
                  </p>
                </div>
                <div className="mt-auto flex min-w-0 flex-col gap-2 border-t pt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <span className="min-w-0 font-bold break-words text-nail-queen-brown">LUXE SPA TREATMENT</span>
                  <div className="shrink-0 text-left sm:text-right">
                    <span className="font-bold">$63.22</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>
              </div>

              <div className="flex h-full min-w-0 max-w-full flex-col rounded-3xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
                <div className="aspect-video bg-gray-200 rounded-2xl mb-6 overflow-hidden">
                  <img src={asset("pricing/spa/cucumber-escape.jpg")} alt="Mint Cucumber Escape Spa Treatment" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-nail-queen-brown mb-2">4. Mint Cucumber Escape</h3>
                <h4 className="text-m font-bold text-nail-queen-brown mb-2">A Breath of Cool, Clean Air</h4>
                <div className="flex min-h-0 flex-1 flex-col pb-5">
                  <p className="mb-4 text-gray-600">
                    This treatment feels like stepping into a cool, airy garden: a hint of mint, a wash of green, and a refreshing clarity on the skin. The mint mask melts fatigue away, soothing the hands and feet, while gentle massage strokes bring a sense of cleanliness and renewal.
                  </p>
                  <p className="text-gray-600">
                    The ritual ends with a nojito, served as a crisp, delicate finishing touch — a soft breeze that refreshes both body and mood.
                  </p>
                </div>
                <div className="mt-auto flex min-w-0 flex-col gap-2 border-t pt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <span className="min-w-0 font-bold break-words text-nail-queen-brown">LUXE SPA TREATMENT</span>
                  <div className="shrink-0 text-left sm:text-right">
                    <span className="font-bold">$63.22</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>
              </div>

              <div className="flex h-full min-w-0 max-w-full flex-col rounded-3xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
                <div className="aspect-video bg-gray-200 rounded-2xl mb-6 overflow-hidden">
                  <img src={asset("pricing/spa/orange-sunset.jpg")} alt="Orange Creamy Spa Treatment" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-nail-queen-brown mb-2">5. Orange Creamy</h3>
                <h4 className="text-m font-bold text-nail-queen-brown mb-2">A Soft, Warm Kind of Happiness</h4>
                <div className="flex min-h-0 flex-1 flex-col pb-5">
                  <p className="mb-4 text-gray-600">
                    Orange Creamy radiates warmth and comfort from the very first touch of its soft citrus hue. A nourishing orange mask adds moisture and lightness, while the rhythmic massage creates a cocoon of ease and contentment.
                  </p>
                  <p className="text-gray-600">
                    A subtly served orange creamy completes the journey — a gentle, uplifting last note that leaves the mind brightened and the body comforted.
                  </p>
                </div>
                <div className="mt-auto flex min-w-0 flex-col gap-2 border-t pt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <span className="min-w-0 font-bold break-words text-nail-queen-brown">LUXE SPA TREATMENT</span>
                  <div className="shrink-0 text-left sm:text-right">
                    <span className="font-bold">$63.22</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>
              </div>

              <div className="flex h-full min-w-0 max-w-full flex-col rounded-3xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
                <div className="aspect-video bg-gray-200 rounded-2xl mb-6 overflow-hidden">
                  <img src={asset("pricing/spa/seasonal-spa.jpg")} alt="Seasonal Spa Treatment" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-nail-queen-brown mb-2">6. Seasonal Spa</h3>
                <h4 className="text-m font-bold text-nail-queen-brown mb-2">Seasonal Care Ritual</h4>
                <div className="flex min-h-0 flex-1 flex-col pb-5">
                  <p className="mb-4 text-gray-600">A curated hand & foot spa experience that changes throughout the year.</p>
                  <p className="text-gray-600">
                    Inspired by seasons and festive moments, each version focuses on restoring tired hands and feet while enhancing overall comfort.
                  </p>
                </div>
                <div className="mt-auto flex min-w-0 flex-col gap-2 border-t pt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <span className="min-w-0 font-bold break-words text-nail-queen-brown">LUXE SPA TREATMENT</span>
                  <div className="shrink-0 text-left sm:text-right">
                    <span className="font-bold">$63.22</span>
                    <p className="text-xs text-gray-500">(inclusive of GST)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
