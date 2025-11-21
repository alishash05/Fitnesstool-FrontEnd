import axios from 'axios';

const BASE_URL = "http://10.0.2.2:8080/api/v1";


export const getMembers = async (gymId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${gymId}/members`);
    return response.data;
  } catch (error) {
    console.log("getMembers error:", error.response?.data || error.message);
    throw error;
  }
};

export const getMemberById = async (gymId, memberId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${gymId}/members/${memberId}`);
    return response.data;
  } catch (error) {
    console.log("getMemberById error:", error.response?.data || error.message);
    throw error;
  }
};

export const createMember = async (gymId, memberData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${gymId}/members`,
      memberData
    );
    return response.data;
  } catch (error) {
    console.log("createMember error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateMember = async (gymId, memberId, memberData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${gymId}/members/${memberId}`,
      memberData
    );
    return response.data;
  } catch (error) {
    console.log("updateMember error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteMember = async (gymId, memberId) => {
  try {
    return await axios.delete(`${BASE_URL}/${gymId}/members/${memberId}`);
  } catch (error) {
    console.log("deleteMember error:", error.response?.data || error.message);
    throw error;
  }
};