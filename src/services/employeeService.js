import axios from 'axios';

const API_URL = "http://localhost:8080/api/employees";

export const getEmployeeProfile = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const updateEmployeeProfile = async (employeeData) => {
    const response = await axios.put(`${API_URL}/{id}`, employeeData);
    return response.data;
};