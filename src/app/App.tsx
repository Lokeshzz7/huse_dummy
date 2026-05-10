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
        <Route path="/" element={<EcosystemLanding />} />
        <Route path="/onboarding" element={<HuseOnboarding />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/huse-ecosystem-intro" element={<HuseEcosystemIntro />} />
        <Route path="/demo-credentials" element={<DemoCredentials />} />
        <Route path="/feature-status" element={<FeatureStatusPage />} />
        <Route path="/reputation-guide" element={<ReputationGuide />} />
        <Route path="/huse-circle-platform/challenges" element={<HuseChallenges />} />
        <Route path="/dofracto" element={<DofractoPlatform />} />
        <Route path="/dofracto-builders-hub" element={<UnifiedBuildersHub />} />
        <Route path="/unified-builders-hub" element={<UnifiedBuildersHub />} />
        <Route path="/dofracto/pricing" element={<ContributorPricing />} />
        <Route path="/dofracto/business-pricing" element={<BusinessPricing />} />
        <Route path="/dofracto-contributor-signup" element={<DofractoContributorSignup />} />
        <Route path="/dofracto-business-login" element={<DofractoBusinessLogin />} />
        <Route path="/dofracto-builder-login" element={<DofractoBuilderLogin />} />
        <Route path="/dofracto/discover" element={<AllBusinessListingsPage />} />
        <Route path="/all-business-listings" element={<AllBusinessListingsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/reputation" element={<ReputationPage />} />
        <Route path="/startup/:id" element={<StartupDetailPage />} />
        <Route path="/business/:name" element={<StartupDetailPage />} />
        <Route path="/huse-circle" element={<HuseCirclePage />} />
        <Route path="/huse-circle-loading" element={<HuseCircleLoading />} />
        <Route path="/huse-circle-login" element={<HuseCircleLogin />} />
        <Route path="/huse-circle-platform" element={<HuseCirclePlatform />} />
        <Route path="/verification-hub" element={<VerificationHub />} />
        <Route path="/college-verification" element={<CollegeVerification />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/quotify" element={<QuotifyPage />} />
        <Route path="/quotify-login" element={<QuotifyLogin />} />
        <Route path="/quotify/dashboard" element={<QuotifyDashboard />} />
        <Route path="/quotify/new-request" element={<NewQuoteRequest />} />
        <Route path="/quotify/match-results" element={<SmartMatchResults />} />
        <Route path="/quotify/request/:requestId" element={<QuoteDetailsPage />} />
        <Route path="/quotify/submit-quote/:requestId" element={<SubmitQuotePage />} />
        <Route path="/quotify/provider/:providerId" element={<ProviderProfilePage />} />
        <Route path="/quotify/settings" element={<QuotifySettingsPage />} />
        <Route path="/quotify/connections" element={<QuotifyConnections />} />
        <Route path="/quotify/messages" element={<QuotifyConnections />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-dashboard" element={<StartupDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/add-business" element={<AddBusiness />} />
        <Route path="/theme-preview" element={<ThemePreview />} />
        <Route path="/admin-notifications" element={<AdminNotifications />} />
        <Route path="/super-admin-login" element={<SuperAdminLogin />} />
        <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
        <Route path="/business-portal-login" element={<BusinessPortalLogin />} />
        <Route path="/business-portal-register" element={<BusinessPortalRegister />} />
        <Route path="/huse-notifications" element={<HuseNotifications />} />
        <Route path="/huse-chats" element={<HuseConnections />} />
        <Route path="/huse-connections" element={<HuseConnections />} />
        <Route path="/opportunity-feed" element={<OpportunityFeed />} />
        <Route path="/huse-circle-platform/portfolio/:studentId" element={<StudentPortfolio />} />
        <Route path="/recruiter-profile" element={<RecruiterProfile />} />
        <Route path="/recruiter-notifications" element={<RecruiterNotifications />} />
        <Route path="/recruiter-messages" element={<RecruiterConnections />} />
        <Route path="/recruiter-job-postings" element={<RecruiterJobPostings />} />
        <Route path="/dofracto-opportunities" element={<DofractoOpportunities />} />
        <Route path="/application-tracker" element={<ApplicationTracker />} />
        <Route path="/messaging" element={<DofractoConnections />} />
        <Route path="/dofracto-connections" element={<DofractoConnections />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/graduation" element={<GraduationPage />} />
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
