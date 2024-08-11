///utils.ts
import { IPatient } from "../@types/types";


export const calculateDuration = (startTime: string, endTime: string): number => {
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    return durationInMinutes;
};

export const calculateTreatmentDurations = (patients: IPatient[]) => {
    const durationCounts = {
        '0-10 min': 0,
        '10-20 min': 0,
        '20+ min': 0,
    };

    patients.forEach(patient => {
        const duration = calculateDuration(patient.startTime, patient.endTime);

        if (duration <= 10) {
            durationCounts['0-10 min']++;
        } else if (duration <= 20) {
            durationCounts['10-20 min']++;
        } else {
            durationCounts['20+ min']++;
        }
    });

    return durationCounts;
};


export const calculateMonthlyCounts = (patients: IPatient[]) => {
    const monthlyCounts = new Array(12).fill(0);

    patients.forEach(patient => {
        const treatmentDate = new Date(patient.treatmentDate);
        const month = treatmentDate.getMonth();
        monthlyCounts[month]++;
    });

    return monthlyCounts;
};


export const filterPatientsByMonthAndTimeRange = (patients: IPatient[], month: number, startTime: Date, endTime: Date): IPatient[] => {
    return patients.filter(patient => {
        const treatmentMonth = new Date(patient.treatmentDate).getMonth();
        const patientStartTime = new Date(`1970-01-01T${patient.startTime}Z`);
        const patientEndTime = new Date(`1970-01-01T${patient.endTime}Z`);
        return treatmentMonth === month &&
            patientStartTime >= startTime &&
            patientEndTime <= endTime;
    });
};










