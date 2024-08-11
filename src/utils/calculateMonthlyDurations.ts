import { IPatient } from "../@types/types";
import { calculateDuration } from './utils';

export const calculateMonthlyDurations = (patients: IPatient[]) => {
    const monthlyDurations = new Array(12).fill(0);

    patients.forEach(patient => {
        const duration = calculateDuration(patient.startTime, patient.endTime);
        const treatmentDate = new Date(patient.treatmentDate);
        const month = treatmentDate.getMonth();
        monthlyDurations[month] += duration;
    });

    return monthlyDurations;
};
