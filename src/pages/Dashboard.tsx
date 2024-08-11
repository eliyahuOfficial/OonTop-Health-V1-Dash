import React, { useState } from 'react';
import { FaDollarSign, FaUser, FaCalendarAlt, FaUserCheck, FaInfoCircle, FaUserClock, FaClock, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { usePatients } from '../hooks/usePatients';
import { calculateTreatmentDurations, calculateMonthlyCounts, calculateDuration } from '../utils/utils';
import { getTotalAndPercentageDurations } from '../utils/getTotalDuration';
import { calculateMonthlyDurations } from '../utils/calculateMonthlyDurations';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import MonthlyDisplay from '../components/MonthlyDisplay';

const Dashboard: React.FC = () => {
    const { patients, loading, error } = usePatients();
    const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const treatmentDurationCounts = calculateTreatmentDurations(patients);
    const monthlyCounts = calculateMonthlyCounts(patients);
    const monthlyDurations = calculateMonthlyDurations(patients);
    const { durationsAndPercentages, totalDuration } = getTotalAndPercentageDurations(patients);

    const totalPatients = patients.length;
    const patientsWithZeroMinutes = treatmentDurationCounts['0-10 min'];
    const patientsWithMoreThanTenMinutes = treatmentDurationCounts['10-20 min'];
    const patientsReachedGoal = treatmentDurationCounts['20+ min'];

    const percentagePatientsWithZeroMinutes = ((patientsWithZeroMinutes / totalPatients) * 100).toFixed(2);
    const percentagePatientsWithMoreThanTenMinutes = ((patientsWithMoreThanTenMinutes / totalPatients) * 100).toFixed(2);
    const percentagePatientsReachedGoal = ((patientsReachedGoal / totalPatients) * 100).toFixed(2);

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Number of Patients',
                data: monthlyCounts,
                fill: false,
                backgroundColor: '#2563eb',
                borderColor: '#2563eb',
                tension: 0.4,
            },
        ],
    };

    const doughnutData = {
        labels: ['0-10 min', '10-20 min', '20+ min'],
        datasets: [
            {
                label: 'Treatment Duration',
                data: [
                    treatmentDurationCounts['0-10 min'],
                    treatmentDurationCounts['10-20 min'],
                    treatmentDurationCounts['20+ min'],
                ],
                backgroundColor: ['#f43f5e', '#4BC0C0', '#2563eb'],
                borderColor: ['#f43f5e', '#4BC0C0', '#2563eb'],
                borderWidth: 1,
            },
        ],
    };

    const totalIncomeFromPatients = patientsReachedGoal * 70;

    const treatmentData = [
        { label: '0-10 min', percentage: percentagePatientsWithZeroMinutes, color: 'bg-red-500', duration: treatmentDurationCounts['0-10 min'] },
        { label: '10-20 min', percentage: percentagePatientsWithMoreThanTenMinutes, color: 'bg-teal-500', duration: treatmentDurationCounts['10-20 min'] },
        { label: '20+ min', percentage: percentagePatientsReachedGoal, color: 'bg-blue-500', duration: treatmentDurationCounts['20+ min'] }
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
                    <div className="text-4xl text-yellow-500">
                        <FaDollarSign />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-3xl font-bold">${totalIncomeFromPatients}</h2>
                        <p className="text-gray-600">Income from patients over 20 minutes per year</p>
                        <div className="mt-2 p-1 bg-yellow-100 text-yellow-500 rounded flex items-center">

                            <p>{percentagePatientsReachedGoal}% of patients</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
                    <div className="text-4xl text-red-500">
                        <FaUser />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-3xl font-bold">{patientsWithZeroMinutes}</h2>
                        <p className="text-gray-600">Number of patients with 0-10 minutes per year</p>
                        <div className="mt-2 p-1 bg-red-100 text-red-500 rounded flex items-center">

                            <p>{percentagePatientsWithZeroMinutes}% of patients</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
                    <div className="text-4xl text-teal-500">
                        <FaUser />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-3xl font-bold">{patientsWithMoreThanTenMinutes}</h2>
                        <p className="text-gray-600">Number of patients with 10-20 minutes per year</p>
                        <div className="mt-2 p-1 bg-teal-100 text-teal-500 rounded flex items-center">

                            <p>{percentagePatientsWithMoreThanTenMinutes}% of patients</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
                    <div className="text-4xl text-blue-500">
                        <FaUser />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-3xl font-bold">{patientsReachedGoal}</h2>
                        <p className="text-gray-600">Number of patients with 20+ minutes per year</p>
                        <div className="mt-2 p-1 bg-blue-100 text-blue-500 rounded flex items-center">

                            <p>{percentagePatientsReachedGoal}% of patients</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">

                <div className="bg-gradient-to-br from-white to-gray-200 shadow-lg rounded-lg p-6 col-span-2">
                    <h2 className="text-2xl font-bold mb-4">Number of patients by month</h2>
                    <div className="relative h-96">
                        <Line data={lineData} options={{
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            maintainAspectRatio: false
                        }} />
                    </div>
                    <div className="mt-16 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-md space-y-4 md:space-y-0">
                        <div className="flex flex-col items-center text-center">
                            <div className="flex items-center space-x-2">
                                <FaClock className="text-blue-600 text-2xl" />
                                <p className="text-4xl font-bold text-blue-600">{totalDuration} min</p>
                            </div>
                            <p className="text-gray-600">Total Duration</p>
                            <p className="text-sm text-gray-500">Average Duration: {Math.round(totalDuration / totalPatients)} min</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="flex items-center space-x-2">
                                <FaUsers className="text-blue-600 text-2xl" />
                                <p className="text-4xl font-bold text-blue-600">{totalPatients}</p>
                            </div>
                            <p className="text-gray-600">Total Patients</p>
                            <p className="text-sm text-gray-500">Highest in: {lineData.labels[lineData.datasets[0].data.indexOf(Math.max(...lineData.datasets[0].data))]}</p>
                        </div>
                    </div>

                    <p className='mt-10 text-center'>Includes average duration per patient and the month with the highest patient count for deeper insights.</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Total treatment times</h2>
                    <Doughnut data={doughnutData} />
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {treatmentData.map((item, index) => (
                            <div key={index} className="bg-gradient-to-br from-white to-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center space-y-2 transform transition-transform hover:scale-105">
                                <div className="flex flex-col items-center">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${item.color}`}>
                                        <FaClock className="text-xl text-white" />
                                    </div>
                                    <p className="text-lg font-semibold text-gray-700 mt-2">{item.label}</p>
                                </div>
                                <div className="relative w-full mt-2">
                                    <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-200">
                                        <div style={{ width: `${item.percentage}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${item.color}`}>
                                            {item.percentage}%
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-2">
                                    <FaInfoCircle className="text-gray-600" data-tip data-for={`tooltip-${index}`} />
                                    <ReactTooltip id={`tooltip-${index}`} place="top">
                                        <span>{item.label}: {item.duration} treatments ({item.percentage}%)</span>
                                    </ReactTooltip>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>{item.duration} treatments</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 col-span-3">
                    <h2 className="text-xl font-bold mb-4">The percentage of time spent by the medical team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {Object.keys(durationsAndPercentages).map((patient, index) => (
                            <div key={patient} className="bg-gradient-to-br from-white to-gray-100 p-4 rounded-lg shadow-lg flex flex-col space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <FaUserClock className="text-xl text-blue-500" />
                                        <p className="text-lg font-semibold text-gray-700">{patient}</p>
                                    </div>
                                    <div className="text-sm text-gray-600 flex items-center space-x-2">
                                        <FaInfoCircle data-tip data-for={`tooltip-${index}`} />
                                        <ReactTooltip id={`tooltip-${index}`} place="top" >
                                            <span>{patient}: {durationsAndPercentages[patient].duration} minutes ({durationsAndPercentages[patient].percentage}%)</span>
                                        </ReactTooltip>
                                        <p>{durationsAndPercentages[patient].duration} min</p>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4 relative">
                                    <div className="bg-blue-500 h-4 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${durationsAndPercentages[patient].percentage}%` }}>
                                        <span className="absolute right-0 pr-2 text-sm text-blue-700 font-bold">
                                            {durationsAndPercentages[patient].percentage}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <MonthlyDisplay />
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                <h2 className="text-xl font-bold mb-4">Total minutes spent each month</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {monthlyDurations.map((duration, index) => {
                        const percentage = ((duration / totalDuration) * 100).toFixed(2);
                        const patientsForMonth = patients.filter(patient => new Date(patient.treatmentDate).getMonth() === index);
                        const treatmentsCount = patientsForMonth.length;
                        const avgDuration = (duration / treatmentsCount).toFixed(2);

                        const isOpen = openCardIndex === index;

                        return (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-white to-gray-200 p-4 rounded-lg shadow-lg flex flex-col space-y-4 transition-transform transform hover:scale-105"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white shadow-md">
                                        <FaCalendarAlt className="text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-gray-700">{lineData.labels[index]}</p>
                                        <p className="text-2xl font-bold text-blue-700">{duration} min</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600" data-tip data-for={`tooltip-${index}`}>{percentage}% of total</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <FaUserCheck className="text-xl" />
                                        <p className="text-lg">{treatmentsCount} treatments</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaInfoCircle className="text-xl" />
                                        <p className="text-lg">Avg: {avgDuration} min</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setOpenCardIndex(isOpen ? null : index)}
                                    className="flex items-center space-x-1 text-blue-500 mt-2"
                                >
                                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                                    <span>{isOpen ? 'Hide' : 'Show'} Patients</span>
                                </button>
                                {isOpen && (
                                    <div className="mt-2 space-y-1 max-h-24 overflow-y-auto">
                                        {patientsForMonth.map(patient => (
                                            <p key={patient.id} className="text-sm text-gray-700">{patient.firstName} {patient.lastName}: {calculateDuration(patient.startTime, patient.endTime)} min</p>
                                        ))}
                                    </div>
                                )}
                                <ReactTooltip id={`tooltip-${index}`} place="top">
                                    <span>{lineData.labels[index]}: {duration} minutes ({treatmentsCount} treatments, Avg: {avgDuration} min)</span>
                                </ReactTooltip>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
