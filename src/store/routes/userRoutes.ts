import { IUserRoutes } from '../../types/user'

export const userRoutes: IUserRoutes = {
  user: id => id ? `contact/${id}` : 'contact/',
}
