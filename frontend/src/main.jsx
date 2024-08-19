import ReactDOM from 'react-dom/client'; // Updated import for React 18
import App from './App';
import { Provider } from 'react-redux'; // Redux provider
import { store } from './redux/store'; // Redux store
import { SidebarProvider } from './context/sidebarContext'; // Sidebar context provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </Provider>
);
