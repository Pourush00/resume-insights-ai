import axios from 'axios';

// Base API URL - update this to your FastAPI backend URL
const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds timeout for AI processing
});

/**
 * Semantic Match Analysis - Resume vs Job Description
 * @param {File} resume - PDF resume file
 * @param {string} jobDescription - Job description text
 */
export const getSemanticMatch = async (resume, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', resume);
  formData.append('job_description', jobDescription);
  
  const response = await api.post('/semantic/full-gap-analysis', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/**
 * Resume Quality Score - ATS compatibility check
 * @param {File} resume - PDF resume file
 * @param {string} jobDescription - Job description text
 */
export const getResumeQuality = async (resume, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', resume);
  formData.append('job_description', jobDescription);
  
  const response = await api.post('/quality/score', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/**
 * Resume Improvement Suggestions
 * @param {File} resume - PDF resume file
 * @param {string} jobDescription - Job description text
 */
export const getImprovementSuggestions = async (resume, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', resume);
  formData.append('job_description', jobDescription);
  
  const response = await api.post('/improvement/suggestions', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/**
 * ML-based Resume Score Prediction
 * @param {File} resume - PDF resume file
 * @param {string} jobDescription - Job description text
 */
export const getMLScore = async (resume, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', resume);
  formData.append('job_description', jobDescription);
  
  const response = await api.post('/ml-score/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export default api;
