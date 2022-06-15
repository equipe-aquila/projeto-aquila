import { useContext } from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import Navigation from "./components/navigation.component";
import { UserContext } from "./contexts/user.context";
import Authenticate from "./pages/authentication.page";
import Map from "./pages/map.page";
import Profile from "./pages/profile.page";
import Search from "./pages/search.page";

const App = () => {
  const {currentUser} = useContext(UserContext);

  if (currentUser) {
    return (
      <Routes>
        <Route path='/' element={<Navigate to='/map'/>}></Route>
        <Route path='/' element={<Navigation/>}>
            <Route path='/map' element={<Map/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path='*' element={<Navigate to='/'/>}/>
        <Route path='/' element={<Authenticate/>}/>
      </Routes>
    )
  }
}

export default App;
