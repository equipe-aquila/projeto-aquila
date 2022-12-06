import { useEffect } from "react";
import { useContext } from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import { Loading } from "./components/Loading";
import Navigation from "./components/navigation.component";
import StripeContainer from "./components/stripe-container.component";
import { UserContext } from "./contexts/user.context";
import Agendamentos from "./pages/agendamentos.page";
import Authenticate from "./pages/authentication.page";
import Homepage from "./pages/prestador/Homepage/homepage.page";
import Favourites from "./pages/favourites.page";
import Map from "./pages/map.page";
import PrestadorDetail from "./pages/prestador-detail.page";
import Profile from "./pages/profile.page";
import Search from "./pages/search.page";
import ServicoDetail from "./pages/servico-detail.page";
import SignUp from "./pages/sign-up.page";
import NavigationPrestador from "./components/navigation-prestador.component";
import AgendamentosPrestador from "./pages/prestador/Agendamentos/agendamentos-prestador.page";
import Funcionarios from "./pages/prestador/FuncionariosCadastro/funcionarios.page";
import Comprovantes from "./pages/prestador/Comprovantes/comprovantes.page";

const App = () => {
  const {currentUser, setLoading, loading, isPrestador } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
      navigator.geolocation.getCurrentPosition(({ coords }) => {
          localStorage.setItem("userLocation", JSON.stringify({ latitude: coords.latitude, longitude: coords.longitude }));
        setLoading(false);

      });
  }, [currentUser])


  if (currentUser) {

    if(isPrestador) {
      return (
        <>
        <Loading isLoading={loading}/>
         <Routes>
  
          <Route path='*' element={<Navigate to='/prestadores'/>}/>
          <Route path='/' element={<Navigate to='/prestadores'/>}></Route>
        
          <Route path='/' element={<NavigationPrestador/>}>
            <Route path='/prestadores' element={<Homepage/>}/>
            <Route path='/appointments/:funcionario_id' element={<AgendamentosPrestador/>}/>
            <Route path='/colaboradores' element={<Funcionarios />}/>
            <Route path='/comprovantes' element={<Comprovantes />}/>
          </Route>
          </Routes>
      </>
       
      );
    }

    return (
      <>
      <Loading isLoading={loading}/>
       <Routes>

        <Route path='*' element={<Navigate to='/map'/>}/>
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
    </>
     
    );
  } else {
    return (
      <Routes>
        <Route path='*' element={<Navigate to='/signin'/>}/>
        <Route path='/signin' element={<Authenticate/>}/>
        <Route path="/signup" element={<SignUp/>}/>

      </Routes>
    )
  }
}

export default App;
