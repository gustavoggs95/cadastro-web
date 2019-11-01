import axios from 'axios'

// para armanezamendo de dados foi usado a ferramenta mockApi: https://www.mockapi.io/

export function getAllData(){
    return axios.get('http://5dbb80733ec5fb0014319d93.mockapi.io/alldata')
}

export function AddData(data){
    return axios.post('http://5dbb80733ec5fb0014319d93.mockapi.io/alldata',data)
}

export function DeleteData(id){
    return axios.delete(`http://5dbb80733ec5fb0014319d93.mockapi.io/alldata/${id}`)
}