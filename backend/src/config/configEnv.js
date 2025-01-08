import dotenv from "dotenv"
dotenv.config()

// Configuración inicial desde las variables de entorno
export const serviceLayerURL = process.env.SERVICE_LAYER_URL;



export const credentials = {
  UserName: process.env.NAME_USER, // Usar el valor de la variable de entorno
  Password: process.env.PASSWORD, // Usar el valor de la variable de entorno
  CompanyDB: process.env.COMPANY_DB, // Usar el valor de la variable de entorno
};




