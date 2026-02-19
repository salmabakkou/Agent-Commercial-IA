import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CataloguePage from './pages/CataloguePage'
import ChatPage from './pages/ChatPage'
import OrderTrackingPage from './pages/OrderTrackingPage'

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/catalogue"
          element={
            <Layout>
              <CataloguePage />
            </Layout>
          }
        />
        <Route
          path="/chat"
          element={
            <Layout>
              <ChatPage />
            </Layout>
          }
        />
        <Route
          path="/suivi"
          element={
            <Layout>
              <OrderTrackingPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
