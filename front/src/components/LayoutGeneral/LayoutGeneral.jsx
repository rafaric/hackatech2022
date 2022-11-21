import { useLocation } from "react-router-dom";
import Header from '../../components/Header/Header'
import Footer from "../../components/Footer/Footer";
import './LayoutGeneral.css'

function LayoutGeneral({ children }) {
    const loc = useLocation();
    
  return (
    <>
        <Header page={loc.pathname}/>
            <main style={{'margin' : '80px 15px', 'minHeight' : 'calc(100vh - 80px - 65px)'}}>
              { children }
            </main>
        <Footer />
    </>
  );
}

export default LayoutGeneral;
