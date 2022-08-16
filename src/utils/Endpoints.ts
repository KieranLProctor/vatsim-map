import axios from 'axios';

export const getAllSigmets = async () => {
  return axios
    .request({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_SIMAWARE_ROOT_URL}/api/livedata/sigmets.json`,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const getAllVatsimData = async () => {
  return axios
    .request({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_SIMAWARE_ROOT_URL}/api/livedata/vatsimdata.json`,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const getAllLocals = async () => {
  return axios
    .request({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_SIMAWARE_ROOT_URL}/api/livedata/locals.json`,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const getAllAppDep = async () => {
  return axios
    .request({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_SIMAWARE_ROOT_URL}/api/livedata/appdepp.json`,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const getAllOnlineFIRs = async () => {
  return axios
    .request({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_SIMAWARE_ROOT_URL}/api/livedata/onlinefirs.json`,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const getAllUIRs = async () => {
  return axios
    .request({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_SIMAWARE_ROOT_URL}/api/livedata/uirs.json`,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const getAllFIRs = async () => {
  return axios
    .request({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_SIMAWARE_ROOT_URL}/api/livedata/firs.json`,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const getAllLiveFlights = async () => {
  return axios
    .request({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_SIMAWARE_ROOT_URL}/api/livedata/live.json`,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const getAllAirports = async () => {
  return axios
    .request({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_SIMAWARE_ROOT_URL}/api/livedata/airports.json`,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};

export const getAllCountries = async () => {
  return axios
    .request({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_SIMAWARE_ROOT_URL}/api/livedata/countries.json`,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.error(error));
};
