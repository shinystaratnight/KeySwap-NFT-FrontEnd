import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Footer } from './components/footer/Footer';
import Header from './components/header/Header';
import { Home } from './pages/home/Home';
import { ProductDetails } from './pages/productDetails/ProductDetail';
import Creator from './pages/creator/Creator';
import Detail from './pages/creator/detail/index';
import Upload from './pages/creator/upload/Upload';
import Edit from './pages/creator/edit/Edit';
import { useEagerConnect } from 'hooks/useEagerConnect';
import { useFetchProfile, useFetchProfileList } from 'state/hooks';
import { Toaster } from 'react-hot-toast';
import NotFound from 'pages/NotFound';
import ScrollToTop from 'utils/scrollToTop';

function App() {
  useEagerConnect();
  useFetchProfileList();
  useFetchProfile();

  return (
    <>
      <Toaster position="top-center" toastOptions={{ success: { duration: 3000 }, error: { duration: 3000 } }} />
      <div className="app">
        <Router basename={process.env.PUBLIC_URL}>
          <ScrollToTop />
          <Header />
          <div className="body">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/details/:baseId" component={ProductDetails} />
              <Route exact path="/creator" component={Creator} />
              <Route exact path="/creatorDetail/:walletAddress" component={Detail} />
              <Route exact path="/upload" component={Upload} />
              <Route exact path="/account/edit" component={Edit} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
