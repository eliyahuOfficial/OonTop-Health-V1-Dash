///usePatient.ts
import { useEffect, useState } from "react";
import { IPatient } from "../@types/types";
import { getPatients } from "../services/patients";

export const usePatients = () => {
    const [patients, setPatients] = useState<IPatient[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>();


    useEffect(() => {
        setError(null);
        setLoading(true);
        getPatients()
            .then((res) => {
                setPatients(res.data);
                setError(null);
            })
            .catch(() => {
                setError("Network error");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { patients, loading, error, setPatients };
};