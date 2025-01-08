import axios from "axios";


export async function getProyectos(url, sessionCookie, agent) {
    try {

        const response = await axios.get(
            `${url}U_CO_PROYECTOS`,
            {
                headers: {
                    "content-type": "application/json",
                    Cookie: sessionCookie,
                },
                httpsAgent: agent,
            }
        )
        console.log("Datos de la tabla: ", response.data);
        return response.data
    } catch (error) {
        console.error("Error al obtener el datos de la tabla", error)
    }
}

export async function createProyecto(bodyData, sessionCookie, agent, url) {
    try {
        const response = await axios.post(
            `${url}U_CO_PROYECTOS`,
            bodyData,
            {
                headers: {
                    "content-type": "application/json",
                    Cookie: sessionCookie,
                },
                httpsAgent: agent,
            }
        )
        console.log("Datos creados", response.data)
        return response.data
    } catch (error) {
        console.error("error al Crear un Proyecto", error)
    }

}

export async function deleteProyecto(sessionCookie, agent, url, code) {
    try {
        const response = await axios.delete(
            `${url}U_CO_PROYECTOS(${code})`
            ,
            {
                headers: {
                    "content-type": "application/json",
                    Cookie: sessionCookie,
                },
                httpsAgent: agent,
            }
        )

    } catch (error) {
        console.error("Error al eliminar el Proyecto", error)

    }
}

export async function update(sessionCookie, agent, url,code, body){
    try {
        
    } catch (error) {
        console.error("Error Actualizando un usuario", error)
    }

}
