import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Provider } from "react-redux";
import { store } from "./store/store";
const App = () => {
  return(<Provider store={store}>
      <Dashboard />
    </Provider>
  )
};

export default App;
