import React from "react";
import { CMSSettingsProvider } from "../../sparti-cms/context/CMSSettingsContext";
import MinimalCMSDashboard from "../../sparti-cms/components/admin/MinimalCMSDashboard";

/**
 * PublicDashboard renders the minimal CMS dashboard without any authentication.
 */
const PublicDashboard = () => {
  return (
    <CMSSettingsProvider>
      <MinimalCMSDashboard defaultTab="themes" />
    </CMSSettingsProvider>
  );
};

export default PublicDashboard;