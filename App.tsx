
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './components/LanguageContext';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';
import { ModalProvider } from './components/modal/ModalContext';
import ModalContainer from './components/modal/ModalContainer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ManageProducts from './pages/ManageProducts';
import EditProduct from './pages/EditProduct';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsExplorePage from './pages/ProductsExplorePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <ModalProvider>
              <ModalContainer />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add" element={<AdminPage />} />
                <Route path="/manage" element={<ManageProducts />} />
                <Route path="/edit/:id" element={<EditProduct />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/products" element={<ProductsExplorePage />} />
              </Routes>
            </ModalProvider>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
