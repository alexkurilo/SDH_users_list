import axios from 'axios'

import { IUser } from '../types/user'

type BodyRequest = IUser

const baseUrl = process.env.REACT_APP_API_LINK
const apiVersion = process.env.REACT_APP_API_VERSION

class API {
  async get(url: string) {
    return await axios.get(`${baseUrl}${apiVersion}${url}`)
  }

  async post(url: string, body: BodyRequest) {
    return await axios.post(`${baseUrl}${apiVersion}${url}`, body)
  }

  async put(url: string, body: BodyRequest) {
    return await axios.put(`${baseUrl}${apiVersion}${url}`, body)
  }

  async delete(url: string) {
    return await axios.delete(`${baseUrl}${apiVersion}${url}`)
  }
}

export const api = new API();
