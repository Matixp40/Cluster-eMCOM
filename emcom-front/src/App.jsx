import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Stations from "./pages/Stations.jsx";
import Node from "./pages/Node.jsx"
import "./App.css"
import AddStation from "./pages/AddStation.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Home/>}/>
                <Route path="/stations/" element={<Stations/>}/>
                <Route path="/stations/:id" element={<Node/>}/>
                <Route path="/add-node/" element={<AddStation/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;