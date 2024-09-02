import { ToastContainer } from "react-toastify";

import { RegistrationProvider } from "~/contexts/ContextRegistre";

import Router from "~/router";
import { Header } from "./components/Header";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <RegistrationProvider>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
      <ToastContainer />
    </RegistrationProvider>
  );
}

export default App;
