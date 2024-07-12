import axios from 'axios'
import http from './http'

const getAllTables = async () => {
    const res = await http.get(`/tableinfo`)
    return res?.data
};

const getAvailableTables = async (arrivalTime: string) => {
    const res = await http.get(`/tableinfo/available?arrivalTime=${arrivalTime}`)
    return res?.data
};

export {
    getAllTables,
    getAvailableTables
}