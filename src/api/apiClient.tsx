import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://app.ticketmaster.eu/discovery/v2`
});

const defaultParam = {
  apikey: 'oXnjeUUwBBsTT5eKKSf83oOyAUizdDJ3',
  countryCode: 'US'
};

export {defaultParam, axiosClient};