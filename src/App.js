import { useContext } from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import Navigation from "./components/navigation.component";
import StripeContainer from "./components/stripe-container.component";
import { UserContext } from "./contexts/user.context";
import Agendamentos from "./pages/agendamentos.page";
import Authenticate from "./pages/authentication.page";
import Favourites from "./pages/favourites.page";
import Map from "./pages/map.page";
import PrestadorDetail from "./pages/prestador-detail.page";
import Profile from "./pages/profile.page";
import Search from "./pages/search.page";
import ServicoDetail from "./pages/servico-detail.page";

const App = () => {
  const {currentUser} = useContext(UserContext);

  if (currentUser) {
    return (
      <Routes>
        <Route path='/' element={<Navigate to='/map'/>}></Route>
        <Route path='/' element={<Navigation/>}>
            <Route path='/map' element={<Map/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/appointments' element={<Agendamentos/>}/>
            <Route path='/favourites' element={<Favourites/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/prestador/:id' element={<PrestadorDetail/>}/>
            <Route path='/servico/:id' element={<ServicoDetail/>}/>
            <Route path='/payment' element={<StripeContainer/>}/>
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
