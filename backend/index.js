import axios from 'axios';
import https from 'https';
import { serviceLayerURL, credentials } from './src/config/configEnv.js'
import { createProyecto, deleteProyecto, getProyectos } from './src/controllers/co_proyectos.controller.js';
import { create } from 'domain';
import { url } from 'inspector';

// Crear un agente HTTPS que ignore la validación del certificado
const agent = new https.Agent({
  rejectUnauthorized: false, // Ignora la verificación del certificado
});

// Función para autenticarse
async function login() {
  try {
    console.log(credentials)
    const response = await axios.post(`${serviceLayerURL}Login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
      httpsAgent: agent, // Agregar el agente para ignorar SSL
    });

    console.log("Autenticación exitosa");
    return response.headers["set-cookie"];
  } catch (error) {
    console.error(
      "Error al autenticarse:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// Función para consultar un Socio de Negocios
async function getBusinessPartner(cardCode, sessionCookie) {
  try {
    const response = await axios.get(
      `${serviceLayerURL}BusinessPartners('${cardCode}')`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: sessionCookie,
        },
        httpsAgent: agent, // Reutilizar el agente para ignorar SSL
      }
    );

    console.log("Datos del socio de negocios:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener datos del socio de negocios:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// // Uso del programa
// (async () => {
//   try {
//     const sessionCookie = await login();

//     // Cambia el código del socio de negocios que deseas consultar
//     const cardCode = "E12099347-k";
//     const businessPartner = await getBusinessPartner(cardCode, sessionCookie);

//     console.log("Resultado final:", businessPartner);
//   } catch (error) {
//     console.error("Error en la operación:", error.message);
//   }
// })();


(async () => {
  try {
    const sessionCookie = await login();
    const codeProyecto=3
    await deleteProyecto(sessionCookie,agent,serviceLayerURL, codeProyecto)

    // Cambia el código del socio de negocios que deseas consultar
    const tablaPoyectos = await getProyectos(serviceLayerURL, sessionCookie, agent)
    
    const body =
    {
      "Name": "PA20000",
      "U_TipoProyecto": "PA",
      "U_NumeroProyecto": "PA20000",
      "U_Descripcion": "Proyecto de ampliación de pruebas",
      "U_Fecha": "2024-02-25",
      "U_Hora": "15:30:00",
      "U_Estado": "Abierto",
      "U_CodeClasificacion": 1,
      "U_Sector": "Cerro El Caipo"
    }




    await createProyecto(body, sessionCookie, agent, serviceLayerURL)

    
    



    console.log("Resultado final:", tablaPoyectos);
  } catch (error) {
    console.error("Error en la operación:", error.message);
  }
})();
