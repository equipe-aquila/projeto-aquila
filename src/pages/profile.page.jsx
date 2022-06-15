import { CapsuleTabs } from "antd-mobile";
import EditProfile from "../components/edit-profile.component";

const Profile = () => {

    return (
    <>
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
