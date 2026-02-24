import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/authContextt";
import { CartProvider } from "./context/CartProvider";
import Main from "./pages/Main";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Main />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
