///getTotalDuration.ts
import { IPatient } from '../@types/types';
import { calculateDuration } from './utils';





export const getTotalAndPercentageDurations = (patients: IPatient[]) => {
    const totalDurationByPatient: Record<string, Record<string, number>> = {};

    patients.forEach(patient => {
        const duration = calculateDuration(patient.startTime, patient.endTime);
        const patientName = `${patient.firstName} ${patient.lastName}`;

        if (!totalDurationByPatient[patientName]) {
            totalDurationByPatient[patientName] = {};
        }
        totalDurationByPatient[patientName][patient.features] =
            (totalDurationByPatient[patientName][patient.features] || 0) + duration;
    });

    const totalDuration = Object.values(totalDurationByPatient).reduce((total, patientFeatures) => {
        return total + Object.values(patientFeatures).reduce((subTotal, duration) => subTotal + duration, 0);
    }, 0);

    const durationsAndPercentages = Object.keys(totalDurationByPatient).reduce((acc, patient) => {
        const patientTotalDuration = Object.values(totalDurationByPatient[patient]).reduce((subTotal, duration) => subTotal + duration, 0);
        acc[patient] = {
            duration: patientTotalDuration,
            percentage: ((patientTotalDuration / totalDuration) * 500).toFixed(2),
        };
        return acc;
    }, {} as Record<string, { duration: number; percentage: string }>);

    return { durationsAndPercentages, totalDuration };
};

