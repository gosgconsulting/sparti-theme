import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CMSSettingsProvider } from '../context/CMSSettingsContext';
import EmbedPagesManager from './embed/EmbedPagesManager';
import MinimalCMSDashboard from './admin/MinimalCMSDashboard';

interface SpartiCMSProps {
  themeSlug?: string;
}

export const SpartiCMS: React.FC<SpartiCMSProps> = ({ themeSlug }) => {
  return (
    <CMSSettingsProvider>
      <Routes>
        {/* Root path shows the minimal dashboard */}
        <Route path="/" element={<MinimalCMSDashboard defaultTab="themes" />} />

        {/* Keep embed route for iframe access */}
        <Route path="/embed/pages" element={<EmbedPagesManager />} />

        {/* All other paths redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CMSSettingsProvider>
  );
};

export default SpartiCMS;