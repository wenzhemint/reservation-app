import axios from 'axios'
import http from './http'

const getAllTables = async () => {
    const res = await http.get(`/tableinfo`)
    console.log("== res: ", res);
    return res
};

export {
    getAllTables
}