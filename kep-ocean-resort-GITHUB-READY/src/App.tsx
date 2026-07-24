import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppDataProvider } from './context/AppDataContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { BookingFlowProvider } from './context/BookingFlowContext';

import PublicLayout from './components/layout/PublicLayout';
import Home from './pages/public/Home';
import Villas from './pages/public/Villas';
import VillaDetail from './pages/public/VillaDetail';
import Dining from './pages/public/Dining';
import Bar from './pages/public/Bar';
import Experiences from './pages/public/Experiences';
import Gallery from './pages/public/Gallery';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import PolicyPage from './pages/public/PolicyPage';
import NotFound from './pages/public/NotFound';

import BookingLayout from './pages/booking/BookingLayout';
import StepSearch from './pages/booking/StepSearch';
import StepSelectVilla from './pages/booking/StepSelectVilla';
import StepExtras from './pages/booking/StepExtras';
import StepGuestInfo from './pages/booking/StepGuestInfo';
import StepReview from './pages/booking/StepReview';
import Confirmation from './pages/booking/Confirmation';

import AdminLogin from './pages/dashboard/AdminLogin';
import AdminLayout from './pages/dashboard/AdminLayout';
import Overview from './pages/dashboard/Overview';
import BookingsPage from './pages/dashboard/BookingsPage';
import BookingDetail from './pages/dashboard/BookingDetail';
import CalendarPage from './pages/dashboard/CalendarPage';
import VillasAdmin from './pages/dashboard/VillasAdmin';
import GuestsAdmin from './pages/dashboard/GuestsAdmin';
import GuestDetail from './pages/dashboard/GuestDetail';
import FoodBarAdmin from './pages/dashboard/FoodBarAdmin';
import PaymentsAdmin from './pages/dashboard/PaymentsAdmin';
import ReportsAdmin from './pages/dashboard/ReportsAdmin';
import ContentAdmin from './pages/dashboard/ContentAdmin';
import SettingsAdmin from './pages/dashboard/SettingsAdmin';

export default function App() {
  return (
    <AppDataProvider>
      <AdminAuthProvider>
        <HashRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/villas" element={<Villas />} />
              <Route path="/villas/:slug" element={<VillaDetail />} />
              <Route path="/dining" element={<Dining />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/policies/:slug" element={<PolicyPage />} />
            </Route>

            <Route
              path="/book"
              element={
                <BookingFlowProvider>
                  <BookingLayout />
                </BookingFlowProvider>
              }
            >
              <Route index element={<Navigate to="/book/search" replace />} />
              <Route path="search" element={<StepSearch />} />
              <Route path="select" element={<StepSelectVilla />} />
              <Route path="extras" element={<StepExtras />} />
              <Route path="guest-info" element={<StepGuestInfo />} />
              <Route path="review" element={<StepReview />} />
              <Route path="confirmation" element={<Confirmation />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Overview />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="bookings/:id" element={<BookingDetail />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="villas" element={<VillasAdmin />} />
              <Route path="guests" element={<GuestsAdmin />} />
              <Route path="guests/:id" element={<GuestDetail />} />
              <Route path="food-bar" element={<FoodBarAdmin />} />
              <Route path="payments" element={<PaymentsAdmin />} />
              <Route path="reports" element={<ReportsAdmin />} />
              <Route path="content" element={<ContentAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </AdminAuthProvider>
    </AppDataProvider>
  );
}
