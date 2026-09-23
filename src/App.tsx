import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { PackagesListPage } from './components/PackagesListPage';
import { AdminPanelPage } from './components/AdminPanelPage';
import { OrderTrackingPage } from './components/OrderTrackingPage';
import { NotFoundPage } from './components/NotFoundPage';
import { ScrollToTop } from './components/ScrollToTop';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderStatusModal } from './components/OrderStatusModal';
import { FollowerPackage, OrderDetails } from './types';
import { PACKAGES_DATA, CHECKOUT_CONFIG } from './data/packagesData';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<FollowerPackage | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderDetails[]>([]);

  // When customer clicks Order Now for a specific package, redirect directly to existing product checkout page
  const handleBuyPackage = (pkg: FollowerPackage) => {
    CHECKOUT_CONFIG.redirectToCheckout(pkg);
  };

  // When customer clicks general Order Now button, smoothly scroll to packages to select specific product
  const handleOrderNowClick = () => {
    const el = document.getElementById('packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      CHECKOUT_CONFIG.redirectToCheckout(PACKAGES_DATA[0]);
    }
  };

  // Save placed order
  const handleOrderPlaced = (order: OrderDetails) => {
    setOrders((prev) => [order, ...prev]);
  };

  const handleUpdateOrderStatus = (
    orderId: string,
    status: 'pending' | 'processing' | 'completed' | 'cancelled'
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
    );
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
        {/* Header & Navigation */}
        <Navbar
          onOpenTrackOrder={() => setIsTrackingOpen(true)}
          onOrderNowClick={handleOrderNowClick}
        />

        <main className="flex-grow">
          <Routes>
            {/* 1. Main Landing Page Route */}
            <Route
              path="/"
              element={
                <HomePage
                  onOrderNowClick={handleOrderNowClick}
                  onBuyPackage={handleBuyPackage}
                />
              }
            />

            {/* 2. Product Detail Routes (supports /product/:id and /package/:id) */}
            <Route
              path="/product/:id"
              element={<ProductDetailPage onBuyPackage={handleBuyPackage} />}
            />
            <Route
              path="/package/:id"
              element={<ProductDetailPage onBuyPackage={handleBuyPackage} />}
            />

            {/* 3. Product Catalog List Routes */}
            <Route
              path="/products"
              element={<PackagesListPage onBuyPackage={handleBuyPackage} />}
            />
            <Route
              path="/packages"
              element={<PackagesListPage onBuyPackage={handleBuyPackage} />}
            />

            {/* 4. Admin Panel Routes */}
            <Route
              path="/admin"
              element={
                <AdminPanelPage
                  orders={orders}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                  onAddOrder={handleOrderPlaced}
                />
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminPanelPage
                  orders={orders}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                  onAddOrder={handleOrderPlaced}
                />
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <AdminPanelPage
                  orders={orders}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                  onAddOrder={handleOrderPlaced}
                />
              }
            />

            {/* 5. Order & Tracking Routes */}
            <Route
              path="/track-order"
              element={<OrderTrackingPage orders={orders} />}
            />
            <Route
              path="/track"
              element={<Navigate to="/track-order" replace />}
            />
            <Route
              path="/orders"
              element={<OrderTrackingPage orders={orders} />}
            />
            <Route
              path="/order"
              element={<OrderTrackingPage orders={orders} />}
            />
            <Route
              path="/order-status"
              element={<OrderTrackingPage orders={orders} />}
            />

            {/* 6. Checkout Route */}
            <Route
              path="/checkout"
              element={<Navigate to="/#packages" replace />}
            />

            {/* 7. 404 Not Found Route (Handles missing routes cleanly) */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Checkout Modal (optional in-page modal flow) */}
        {isCheckoutOpen && selectedPackage && (
          <CheckoutModal
            pkg={selectedPackage}
            onClose={() => {
              setIsCheckoutOpen(false);
              setSelectedPackage(null);
            }}
            onOrderPlaced={handleOrderPlaced}
          />
        )}

        {/* Order Status & Tracking Modal (optional in-page modal flow) */}
        {isTrackingOpen && (
          <OrderStatusModal
            orders={orders}
            onClose={() => setIsTrackingOpen(false)}
          />
        )}

        {/* Floating WhatsApp Action Button */}
        <FloatingWhatsAppButton />
      </div>
    </BrowserRouter>
  );
}
