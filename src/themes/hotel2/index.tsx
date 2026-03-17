import React from "react";
import Header from "../hotel1/components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import "./theme.css";

interface Hotel2ThemeProps {
  basePath?: string;
  pageSlug?: string;
  tenantName?: string;
  tenantSlug?: string;
}

const Hotel2Theme: React.FC<Hotel2ThemeProps> = ({
  basePath = "/theme/hotel2",
  tenantName = "Hotel2",
  tenantSlug = "hotel2",
}) => {
  return (
    <div className="theme-hotel2 min-h-screen flex flex-col">
      <Header tenantName={tenantName} tenantSlug={tenantSlug} basePath={basePath} />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer tenantName={tenantName} tenantSlug={tenantSlug} basePath={basePath} />
    </div>
  );
};

export default Hotel2Theme;

