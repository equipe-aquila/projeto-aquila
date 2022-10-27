import { CapsuleTabs, NavBar,Image } from "antd-mobile";
import { useNavigate } from "react-router";
import EditProfile from "../components/edit-profile.component";

const Profile = () => {
  const navigate = useNavigate();

    return (
    <>
    <NavBar style={{marginTop:"10px", marginBottom:"10px"}} onBack={() => navigate(-1)}>            
    <div style={{display:"flex",justifyContent:"center",backgroundColor:"#B59EE2",}}>
            <Image width={110} src="./aquilalogo.png"></Image>
            </div></NavBar>
            <div style={{display:"flex", justifyContent:"center"}}>
    <CapsuleTabs style={{width:"600px"}}>
      <CapsuleTabs.Tab title='Editar perfil' key='edit-profile' destroyOnClose={true}>
          <EditProfile/>
      </CapsuleTabs.Tab>

      <CapsuleTabs.Tab title='Meios de pagamento' key='meios-pagamento' destroyOnClose={true}>
        Meios de Pagamento
      </CapsuleTabs.Tab>
    </CapsuleTabs>
    </div>
    </>
    );
}

export default Profile;
