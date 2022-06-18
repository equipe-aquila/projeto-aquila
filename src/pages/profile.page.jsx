import { CapsuleTabs, NavBar } from "antd-mobile";
import { useNavigate } from "react-router";
import EditProfile from "../components/edit-profile.component";

const Profile = () => {
  const navigate = useNavigate();

    return (
    <>
    <NavBar onBack={() => navigate(-1)}>Perfil</NavBar>
    <CapsuleTabs>
      <CapsuleTabs.Tab title='Editar perfil' key='edit-profile' destroyOnClose={true}>
          <EditProfile/>
      </CapsuleTabs.Tab>

      <CapsuleTabs.Tab title='Meios de pagamento' key='meios-pagamento' destroyOnClose={true}>
        Meios de Pagamento
      </CapsuleTabs.Tab>
    </CapsuleTabs>
    </>
    );
}

export default Profile;
