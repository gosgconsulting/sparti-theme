import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../sections/HeroSection";
import HotelResultsSection from "../sections/HotelResultsSection";
import CollectionsSection from "../sections/CollectionsSection";
import type { Hotel2Destination } from "../booking/countries";
import { buildHotel2SearchHref } from "../utils/searchUrl";
import { getHotel2Hotels } from "../data/hotels";

type Props = {
  basePath: string;
};

const HomePage: React.FC<Props> = ({ basePath }) => {
  const navigate = useNavigate();
  const hotels = useMemo(() => getHotel2Hotels(), []);

  const [destination, setDestination] = useState<Hotel2Destination>("All");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  return (
    <div className="bg-background">
      <HeroSection
        destination={destination}
        onDestinationChange={setDestination}
        adults={adults}
        children={children}
        onAdultsChange={setAdults}
        onChildrenChange={setChildren}
        onFindHotels={(payload) => {
          navigate(buildHotel2SearchHref(basePath, payload));
        }}
      />
      <HotelResultsSection hotels={hotels} destination={destination} />
      <CollectionsSection hotels={hotels} />
    </div>
  );
};

export default HomePage;

