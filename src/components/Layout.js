import Header from './Header';
import Navbar from './Navbar';
import MainContent from './MainContent';
import Footer from './Footer';
import './Layout.css';

function Layout() {
  return (
    <div>
      <Header />
      <Navbar />
      <MainContent />
      <Footer />
    </div>
  );
}

export default Layout;