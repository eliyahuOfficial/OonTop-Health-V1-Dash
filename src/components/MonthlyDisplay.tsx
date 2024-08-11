import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaChevronDown, FaChevronUp, FaClock, FaGenderless, FaUser, FaUserMd } from 'react-icons/fa';
import { RiProfileLine } from "react-icons/ri";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { getTotalAndPercentageDurations } from '../utils/getTotalDuration';
import { calculateDuration } from '../utils/utils';
import { usePatients } from '../hooks/usePatients';
import { IPatient } from '../@types/types';
import { formatDate } from '../utils/dateUtils';

const getMonthOptions = () => {
    return [
        'All Months', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
};

const MonthlyDisplay: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [genderFilter, setGenderFilter] = useState<string>('');
    const [providerFilter, setProviderFilter] = useState<string>('');
    const [currentMonthPatients, setCurrentMonthPatients] = useState<IPatient[]>([]);
    const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);

    const { patients, loading, error } = usePatients();

    useEffect(() => {
        const filteredPatients = patients.filter(patient => {
            const matchesMonth = selectedMonth === 0 || new Date(patient.treatmentDate).getMonth() + 1 === selectedMonth;
            const matchesSearch = `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesGender = genderFilter === '' || patient.patientGender === genderFilter;
            const matchesProvider = providerFilter === '' || patient.providers.includes(providerFilter);
            return matchesMonth && matchesSearch && matchesGender && matchesProvider;
        });
        setCurrentMonthPatients(filteredPatients);
    }, [selectedMonth, searchQuery, genderFilter, providerFilter, patients]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const { durationsAndPercentages, totalDuration } = getTotalAndPercentageDurations(currentMonthPatients);
    const totalProviders = [...new Set(currentMonthPatients.map(patient => patient.providers))].length;
    const monthOptions = getMonthOptions();

    const lineData = {
        labels: currentMonthPatients.map(patient => `${patient.firstName} ${patient.lastName}`),
        datasets: [
            {
                label: 'Treatment Duration (minutes)',
                data: currentMonthPatients.map(patient => calculateDuration(patient.startTime, patient.endTime)),
                backgroundColor: 'rgba(53, 162, 235, 0.7)',
                borderColor: 'rgba(53, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(53, 162, 235, 0.9)',
                hoverBorderColor: 'rgba(53, 162, 235, 1)',
            },
        ],
    };

    const lineOptions = {
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context: { raw: any; }) {
                        return `${context.raw} min`;
                    }
                }
            }
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <div className="mb-4">
                <label className="flex items-center space-x-2 text-blue-600">
                    <FaCalendarAlt />
                    <span>Month</span>
                </label>
                <select
                    id="month-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    {monthOptions.map((month, index) => (
                        <option key={index} value={index}>{month}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="flex items-center space-x-2 text-blue-600">
                    <FaUser />
                    <span>Patient Name</span>
                </label>
                <input
                    id="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    placeholder="Enter patient name"
                />
            </div>

            <div className="mb-4">
                <label className="flex items-center space-x-2 text-blue-600">
                    <FaGenderless />
                    <span>Gender</span>
                </label>
                <select
                    id="gender-filter"
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            <div className="mb-4">
                <div className="flex flex-col space-y-2">
                    <label className="flex items-center space-x-2 text-blue-600">
                        <FaUserMd />
                        <span>Providers</span>
                    </label>
                    <select
                        value={providerFilter}
                        onChange={e => setProviderFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full"
                    >
                        <option value="">All Providers</option>
                        <option value="eCW">eCW</option>
                        <option value="AMD">AMD</option>
                        <option value="Quest">Quest</option>
                        <option value="Behavidance">Behavidance</option>
                    </select>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Total minutes spent in {monthOptions[selectedMonth]}</h2>

            <div className="mb-6">
                <div className="relative h-64">
                    <Line data={lineData} options={lineOptions} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-between">
                    <div className="text-4xl text-blue-500">
                        <FaClock />
                    </div>
                    <div className="mt-4">
                        <h2 className="text-3xl font-bold text-center">{totalDuration} min</h2>
                        <p className="text-gray-600 text-center">Total Minutes</p>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-between">
                    <div className="text-4xl text-blue-500">
                        <FaUser />
                    </div>
                    <div className="mt-4">
                        <h2 className="text-3xl font-bold text-center">{currentMonthPatients.length}</h2>
                        <p className="text-gray-600 text-center">Total Patients</p>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-between">
                    <div className="text-4xl text-blue-500">
                        <RiProfileLine />
                    </div>
                    <div className="mt-4">
                        <h2 className="text-3xl font-bold text-center">{totalProviders}</h2>
                        <p className="text-gray-600 text-center">Total Providers</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {durationsAndPercentages && Object.keys(durationsAndPercentages).map((patientName, index) => {
                    const { duration } = durationsAndPercentages[patientName];
                    const isOpen = openCardIndex === index;

                    const correctedPercentage = ((duration / totalDuration) * 100).toFixed(2);

                    const patientDetails = currentMonthPatients.find(pat => `${pat.firstName} ${pat.lastName}` === patientName);

                    return (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-white to-gray-200 p-4 rounded-lg shadow-lg flex flex-col space-y-4 transition-transform transform hover:scale-105"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white shadow-md">
                                    <FaUser className="text-2xl" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-700">{patientName}</p>
                                    <p className="text-2xl font-bold text-blue-700">{duration} min</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600" data-tip data-for={`tooltip-${index}`}>{correctedPercentage}% of total</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                                        style={{ width: `${correctedPercentage}%` }}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => setOpenCardIndex(isOpen ? null : index)}
                                className="flex items-center space-x-1 text-blue-500 mt-2"
                            >
                                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                                <span>{isOpen ? 'Hide' : 'Show'} Details</span>
                            </button>
                            {isOpen && patientDetails && (
                                <div className="mt-2 space-y-1 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
                                    <p className="text-sm text-gray-700">Provider: {patientDetails.providers}</p>
                                    <p className="text-sm text-gray-700">Treatment Date: {formatDate(patientDetails.treatmentDate)}</p>
                                    <p className="text-sm text-gray-700">Start Time: {patientDetails.startTime}</p>
                                    <p className="text-sm text-gray-700">End Time: {patientDetails.endTime}</p>
                                    <p className="text-sm text-gray-700">Day Start: {patientDetails.dayStart}</p>
                                    <p className="text-sm text-gray-700">Day End: {patientDetails.dayEnd}</p>
                                </div>
                            )}
                            <ReactTooltip id={`tooltip-${index}`} place="top">
                                <span>{patientName}: {duration} minutes ({correctedPercentage}%)</span>
                            </ReactTooltip>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MonthlyDisplay;
