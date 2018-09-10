import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';
const dataMapper = res => res.data

const getAll = () => axios.get(baseUrl).then(dataMapper);

const createOne = (newObject) => axios.post(baseUrl, newObject).then(dataMapper)

const deleteOne = (id) => axios.delete(baseUrl + "/" + id).then(dataMapper)

const updateOne = (id, updatedObject) => axios.put(baseUrl + "/" + id, updatedObject).then(dataMapper)

export default { getAll, createOne, deleteOne, updateOne}