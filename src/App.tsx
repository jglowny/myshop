import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import CartModal from "./components/CartModal";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
  const isCartModalOpen = useSelector(
    (state: RootState) => state.openCartModal.isOpen
  );
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/*" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
        {isCartModalOpen && <CartModal />}
      </div>
    </Router>
  );
}

export default App;
