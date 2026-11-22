import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toast } from './components/Toast';
import { PortalHubPage } from './pages/PortalHubPage';
import { StudentPortal } from './pages/StudentPortal';
import { AdminPortal } from './pages/AdminPortal';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page: Pilih Portal & Buka 2 Tab Sekaligus */}
        <Route path="/" element={<PortalHubPage />} />

        {/* Route Khusus Mahasiswa (Tab 1) */}
        <Route path="/mahasiswa/*" element={<StudentPortal />} />

        {/* Route Khusus Admin PKN (Tab 2) */}
        <Route path="/admin/*" element={<AdminPortal />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Toast Feedback */}
      <Toast />
    </BrowserRouter>
  );
}

export default App;
