
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerificationForm from './Components/VerificationForm/VerificationForm';
import Admin from './Components/Admin/Admin';
import AdminHome from './Components/AdminHome/AdminHome';
import AddCertificate from './Components/AddCertificate/AddCertificate';
import CheckPayment from './Components/CheckPayment/CheckPayment';
import MakeDonation from './Components/MakeDonation/MakeDonation';
import MakeAdmin from './Components/MakeAdmin/MakeAdmin';
import AddPayment from './Components/AddPayment/AddPayment';
import AuthProvider from './context/AuthProvider';
import Login from './Components/AdminLogin/Login';
import AdminPrivateRouter from './PrivateRouter/AdminPrivateRouter';
import Register from './Components/Register/Register';
import PrivateRouter from './PrivateRouter/PrivateRouter';
import Footer from './Components/Footer/Footer';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ErrorPage from './Components/ErrorPage/ErrorPage';
const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<VerificationForm />}>
              </Route>
              <Route path="/check-online-payment" element={<PrivateRouter><CheckPayment /></PrivateRouter>}>
              </Route>
              <Route path="/make-a-donation" element={<PrivateRouter><MakeDonation /></PrivateRouter>}>
              </Route>
              <Route path="/register" element={<Register />}>
              </Route>
              <Route path="/login" element={<Login />}>
              </Route>
              <Route path="/reset-password" element={<ResetPassword />}>
              </Route>
              <Route path="*" element={<ErrorPage />}>
              </Route>
              <Route path="/admin" element={<AdminPrivateRouter><Admin /></AdminPrivateRouter>}>
                <Route path="" element={<AdminHome />}></Route>
                <Route path="add-certificate" element={<AddCertificate />}></Route>
                <Route path="make-admin" element={<MakeAdmin />}></Route>
                <Route path="add-payment" element={<AddPayment />}></Route>
              </Route>
            </Routes>
            <Footer />
          </BrowserRouter>

        </AuthProvider>
      </QueryClientProvider>

    </div>
  );
}

export default App;
