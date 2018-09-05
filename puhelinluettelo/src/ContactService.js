import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';
const dataMapper = res => res.data

const getAll = () => axios.get(baseUrl).then(dataMapper);

const create = (newObject) => axios.post(baseUrl, newObject).then(dataMapper)

export default { getAll, create }