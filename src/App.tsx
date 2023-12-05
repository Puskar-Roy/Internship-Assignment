import './App.css'
import { Routes, Route} from "react-router-dom";
import Firstpage from './components/FirstPage/Firstpage';
import Secondpage from './components/Secondpage/Secondpage';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/user" element={<Secondpage/>} />
      </Routes>
    </>
  );
}

export default App
