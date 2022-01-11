import axios from 'axios'

const URL = 'https://www.students.cs.ubc.ca/~antongri/index.php'
export const apiPost = (data?: any, params?: any) =>
  axios.post(URL, data, { params })
export const apiGet = <T>(opCode: string, params: any) =>
  axios.get<T>(URL, { params: { opCode, ...params } })

//TODO?: we might need to use http response and do stuff with it using promises as shown below:(commented out for now)

// export const apiGet = (data: any) => axios.get(URL, { data }).then(res => console.log(res))
