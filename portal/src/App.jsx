import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GlobalNav from './components/GlobalNav';

// Member views
import MemberPortal from './member/MemberPortal';
import MemberDashboard from './member/MemberDashboard';
import TransitionJourney from './member/TransitionJourney';
import ChecklistEngine from './member/ChecklistEngine';
import SelfAssessment from './member/SelfAssessment';
import DocumentVault from './member/DocumentVault';
import LifePlanner from './member/LifePlanner';
import CommunityFeed from './member/CommunityFeed';

// Advisor views
import AdvisorPortal from './advisor/AdvisorPortal';
import AdvisorDashboard from './advisor/AdvisorDashboard';
import ClientRoster from './advisor/ClientRoster';
import AlertFeed from './advisor/AlertFeed';
import BenchmarkInsights from './advisor/BenchmarkInsights';
import OutreachCenter from './advisor/OutreachCenter';
import PracticeReport from './advisor/PracticeReport';

function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <GlobalNav
        onOpenDropdown={() => setDropdownOpen(!dropdownOpen)}
        dropdownOpen={dropdownOpen}
      />

      <Routes>
        {/* Default route → Member Portal */}
        <Route path="/" element={<Navigate to="/member" replace />} />

        {/* Member Portal */}
        <Route path="/member" element={<MemberPortal />}>
          <Route index element={<MemberDashboard />} />
          <Route path="journey" element={<TransitionJourney />} />
          <Route path="checklist" element={<ChecklistEngine />} />
          <Route path="assessment" element={<SelfAssessment />} />
          <Route path="documents" element={<DocumentVault />} />
          <Route path="planner" element={<LifePlanner />} />
          <Route path="community" element={<CommunityFeed />} />
        </Route>

        {/* Advisor Portal */}
        <Route path="/advisor" element={<AdvisorPortal />}>
          <Route index element={<AdvisorDashboard />} />
          <Route path="clients" element={<ClientRoster />} />
          <Route path="alerts" element={<AlertFeed />} />
          <Route path="benchmarks" element={<BenchmarkInsights />} />
          <Route path="outreach" element={<OutreachCenter />} />
          <Route path="report" element={<PracticeReport />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
