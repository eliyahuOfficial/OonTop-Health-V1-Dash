///patient.ts

import axios from "axios";


export const baseUrl = "http://localhost:8080/api/v1";

export const getPatients = () => axios.get(`${baseUrl}/patients`);


const patients = {
    getPatients,

}

export default patients;
