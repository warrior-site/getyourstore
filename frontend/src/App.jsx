import { useAuth } from "@clerk/react";
import PageLoader from "./components/PageLoader";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import CheckoutReturnPage from "./pages/CheckoutReturnPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import { SentryDemoPage } from "./pages/SentryDemoPage.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
import OrderSummaryPage from "./pages/OrderSummaryPage.jsx";
import OrderChatPage from "./pages/OrderChatPage.jsx";
import OrderVideoPage from "./pages/OrderVideoPage.jsx";
import AdminProductsPage from "./pages/AdminProductsPage.jsx";

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <PageLoader />;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />

        <Route
          path="/orders"
          element={isSignedIn ? <OrdersPage /> : <Navigate to="/" replace />}
        />

        <Route path="/checkout/return" element={<CheckoutReturnPage />} />

        <Route path="/demo-sentry" element={<SentryDemoPage />} />

        <Route
          path="/orders/:id/call"
          element={isSignedIn ? <OrderVideoPage /> : <Navigate to="/" replace />}
        />

        <Route
          path="/admin"
          element={isSignedIn ? <AdminProductsPage /> : <Navigate to="/" replace />}
        />

        {/* Nested Routes */}
        <Route
          path="/orders/:id"
          element={isSignedIn ? <OrderDetailPage /> : <Navigate to="/" replace />}
        >
          <Route index element={<OrderSummaryPage />} />
          <Route path="chat" element={<OrderChatPage />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;