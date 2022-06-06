const BASE_API = "https://projeto-aquila.herokuapp.com/docs/";
const BASE_API_PAYPAL = "";

export default {
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}#/Usuário/get_api_users__id_`,{
            method: 'POST',
            header:{
                Accept: 'application/json',
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
    signIn: async(email,password) => {
        const req = await fetch (`${BASE_API}/#/Usuário/get_api_users`,{
            method: 'POST',
            header:{
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const json = await req.json();
        return json;

    },
    signUp: async (name,email,password) => {
            const req = await fetch (`${BASE_API}/#/Usuário/get_api_users`,{
                method: 'POST',
                header:{
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, password})
            });
            const json = await req.json();
            return json;
    }
};