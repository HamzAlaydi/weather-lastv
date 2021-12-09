import { useRecoilState } from "recoil";
import FetchDataFromAPI from "./components/FetchDataFromAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DayScreen from "./screens/DayScreen";
import Index from "./screens/Index";
import DisplayData from "./screens/DisplayData";
import GetLocation from "./components/GetLocation";
import { searchedCityState } from "./recoil/atom/cityAtom";
function App() {
  const [searchedCity, setSearchedCity] = useRecoilState(searchedCityState);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} exact />
        </Routes>
        <Routes>
          <Route
            path={`DisplayFiveDays/:city`}
            element={<DisplayData />}
            exact
          />
        </Routes>
        <Routes>
          <Route path="/Day/:id" element={<DayScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
