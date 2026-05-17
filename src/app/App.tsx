import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { EcosystemLanding } from './pages/EcosystemLanding';
import { IntroPage } from './pages/IntroPage';
import { HuseEcosystemIntro } from './pages/HuseEcosystemIntro';
import { DemoCredentials } from './pages/DemoCredentials';
import { FeatureStatusPage } from './pages/FeatureStatusPage';
import { ReputationGuide } from './pages/ReputationGuide';
import { HuseChallenges } from './pages/HuseChallenges';
import { DofractoPlatform } from './pages/DofractoPlatform';
import { UnifiedBuildersHub } from './pages/UnifiedBuildersHub';
import { ContributorPricing } from './pages/ContributorPricing';
import { BusinessPricing } from './pages/BusinessPricing';
import { DofractoContributorSignup } from './pages/DofractoContributorSignup';
import { DofractoBusinessLogin } from './pages/DofractoBusinessLogin';
import { DofractoBuilderLogin } from './pages/DofractoBuilderLogin';
import { AllBusinessListingsPage } from './pages/AllBusinessListingsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { ReputationPage } from './pages/ReputationPage';
import { StartupDetailPage } from './pages/StartupDetailPage';
import { HuseCirclePage } from './pages/HuseCirclePage';
import { HuseCircleLoading } from './pages/HuseCircleLoading';
import { HuseCircleLogin } from './pages/HuseCircleLogin';
import { AuthCallback } from './pages/AuthCallback';
import { HuseCirclePlatform } from './pages/HuseCirclePlatform';
import { CollegeVerification } from './pages/CollegeVerification';
import { RecruiterDashboard } from './pages/RecruiterDashboard';
import { RecruiterLogin } from './pages/RecruiterLogin';
import { ContactPage } from './pages/ContactPage';
import { QuotifyPage } from './pages/QuotifyPage';
import { QuotifyLogin } from './pages/QuotifyLogin';
import { QuotifyDashboard } from './pages/quotify/QuotifyDashboard';
import { NewQuoteRequest } from './pages/quotify/NewQuoteRequest';
import { SmartMatchResults } from './pages/quotify/SmartMatchResults';
import { QuoteDetailsPage } from './pages/quotify/QuoteDetailsPage';
import { SubmitQuotePage } from './pages/quotify/SubmitQuotePage';
import { ProviderProfilePage } from './pages/quotify/ProviderProfilePage';
import { QuotifySettingsPage } from './pages/quotify/QuotifySettingsPage';
import { AdminLogin } from './pages/AdminLogin';
import { UserLogin } from './pages/UserLogin';
import { StartupDashboard } from './pages/AdminDashboard';
import { UserDashboard } from './pages/UserDashboard';
import { AddBusiness } from './pages/AddBusiness';
import { ThemePreview } from './pages/ThemePreview';
import { AdminNotifications } from './pages/AdminNotifications';
import { SuperAdminLogin } from './pages/SuperAdminLogin';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
import { BusinessPortalLogin } from './pages/BusinessPortalLogin';
import { BusinessPortalRegister } from './pages/BusinessPortalRegister';
import { HuseNotifications } from './pages/HuseNotifications';
import { HuseConnections } from './pages/HuseConnections';
import { OpportunityFeed } from './pages/OpportunityFeed';
import { StudentPortfolio } from './pages/StudentPortfolio';
import { RecruiterProfile } from './pages/RecruiterProfile';
import { RecruiterNotifications } from './pages/RecruiterNotifications';
import { RecruiterConnections } from './pages/RecruiterConnections';
import { RecruiterJobPostings } from './pages/RecruiterJobPostings';
import { DofractoOpportunities } from './pages/DofractoOpportunities';
import { ApplicationTracker } from './pages/ApplicationTracker';
import { DofractoConnections } from './pages/DofractoConnections';
import { QuotifyConnections } from './pages/QuotifyConnections';
import { VerificationHub } from './pages/VerificationHub';
import { SearchPage } from './pages/SearchPage';
import { GraduationPage } from './pages/GraduationPage';
import { ThemeProvider } from './context/ThemeContext';
import { EcosystemProvider } from './context/EcosystemContext';
import { AuthProvider } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { MessagingProvider } from './context/MessagingContext';
import { SearchProvider } from './context/SearchContext';
import { HuseOnboarding } from './pages/onboarding/HuseOnboarding';

function AppContent() {
  return (
    <>
      <Routes>
        {/* ── Ecosystem / General ── */}
        <Route path="/" element={<EcosystemLanding />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/ecosystem/intro" element={<HuseEcosystemIntro />} />
        <Route path="/ecosystem/demo" element={<DemoCredentials />} />
        <Route path="/ecosystem/features" element={<FeatureStatusPage />} />
        <Route path="/ecosystem/theme" element={<ThemePreview />} />

        {/* ── HUSE Circle ── */}
        <Route path="/husecircle" element={<HuseCirclePage />} />
        <Route path="/husecircle/onboarding" element={<HuseOnboarding />} />
        <Route path="/husecircle/loading" element={<HuseCircleLoading />} />
        <Route path="/husecircle/reputation/guide" element={<ReputationGuide />} />
        <Route path="/husecircle/verify/college" element={<CollegeVerification />} />
        <Route path="/husecircle/verify/hub" element={<VerificationHub />} />
        <Route path="/husecircle/student/login" element={<HuseCircleLogin />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/husecircle/student/platform" element={<HuseCirclePlatform />} />
        <Route path="/husecircle/student/platform/challenges" element={<HuseChallenges />} />
        <Route path="/husecircle/student/portfolio/:studentId" element={<StudentPortfolio />} />
        <Route path="/husecircle/student/notifications" element={<HuseNotifications />} />
        <Route path="/husecircle/student/chats" element={<HuseConnections />} />
        <Route path="/husecircle/student/connections" element={<HuseConnections />} />
        <Route path="/husecircle/student/opportunities" element={<OpportunityFeed />} />
        <Route path="/husecircle/student/reputation" element={<ReputationPage />} />
        <Route path="/husecircle/student/graduation" element={<GraduationPage />} />

        {/* ── Dofracto ── */}
        <Route path="/dofracto" element={<DofractoPlatform />} />
        <Route path="/dofracto/discover" element={<AllBusinessListingsPage />} />
        <Route path="/dofracto/watchlist" element={<WatchlistPage />} />
        <Route path="/dofracto/notifications" element={<NotificationsPage />} />
        <Route path="/dofracto/startup/:id" element={<StartupDetailPage />} />
        <Route path="/dofracto/business/:name" element={<StartupDetailPage />} />
        <Route path="/dofracto/pricing/contributor" element={<ContributorPricing />} />
        <Route path="/dofracto/pricing/business" element={<BusinessPricing />} />
        <Route path="/dofracto/builder/login" element={<DofractoBuilderLogin />} />
        <Route path="/dofracto/builder/signup" element={<DofractoContributorSignup />} />
        <Route path="/dofracto/builder/hub" element={<UnifiedBuildersHub />} />
        <Route path="/dofracto/builder/opportunities" element={<DofractoOpportunities />} />
        <Route path="/dofracto/builder/tracker" element={<ApplicationTracker />} />
        <Route path="/dofracto/builder/connections" element={<DofractoConnections />} />
        <Route path="/dofracto/builder/messages" element={<DofractoConnections />} />
        <Route path="/dofracto/business/login" element={<DofractoBusinessLogin />} />

        {/* ── Quotify ── */}
        <Route path="/quotify" element={<QuotifyPage />} />
        <Route path="/quotify/login" element={<QuotifyLogin />} />
        <Route path="/quotify/dashboard" element={<QuotifyDashboard />} />
        <Route path="/quotify/new-request" element={<NewQuoteRequest />} />
        <Route path="/quotify/match-results" element={<SmartMatchResults />} />
        <Route path="/quotify/request/:requestId" element={<QuoteDetailsPage />} />
        <Route path="/quotify/submit/:requestId" element={<SubmitQuotePage />} />
        <Route path="/quotify/provider/:providerId" element={<ProviderProfilePage />} />
        <Route path="/quotify/settings" element={<QuotifySettingsPage />} />
        <Route path="/quotify/connections" element={<QuotifyConnections />} />
        <Route path="/quotify/messages" element={<QuotifyConnections />} />

        {/* ── Recruiter ── */}
        <Route path="/recruiter/login" element={<RecruiterLogin />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/profile" element={<RecruiterProfile />} />
        <Route path="/recruiter/notifications" element={<RecruiterNotifications />} />
        <Route path="/recruiter/messages" element={<RecruiterConnections />} />
        <Route path="/recruiter/connections" element={<RecruiterConnections />} />
        <Route path="/recruiter/jobs" element={<RecruiterJobPostings />} />

        {/* ── Admin ── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<StartupDashboard />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/super/login" element={<SuperAdminLogin />} />
        <Route path="/admin/super/dashboard" element={<SuperAdminDashboard />} />

        {/* ── User ── */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />

        {/* ── Business Portal ── */}
        <Route path="/business/login" element={<BusinessPortalLogin />} />
        <Route path="/business/register" element={<BusinessPortalRegister />} />
        <Route path="/business/add" element={<AddBusiness />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0a0a0a',
            border: '1px solid rgba(36, 198, 220, 0.3)',
            color: '#fff',
          },
          className: 'rounded-[15px]',
        }}
        theme="dark"
        richColors
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <EcosystemProvider>
          <AuthProvider>
            <ApplicationProvider>
              <MessagingProvider>
                <SearchProvider>
                  <AppContent />
                </SearchProvider>
              </MessagingProvider>
            </ApplicationProvider>
          </AuthProvider>
        </EcosystemProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
