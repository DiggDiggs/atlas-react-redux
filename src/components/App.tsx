import { Header } from "./Header";
import Footer from "./Footer";
import { Board } from "./Board";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store";
import store from "../store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="">
          <Header />
          <Board />
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
