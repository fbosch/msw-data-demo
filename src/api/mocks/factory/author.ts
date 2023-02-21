import { primaryKey, nullable } from '@mswjs/data'
import { Author } from '../../view-models/Author'
import { uuid, firstName, lastName, date } from 'minifaker'

export const author = <Record<keyof Author, any>>{
  id: primaryKey(uuid.v4),
  firstName: firstName,
  lastName: lastName,
  birthday: nullable(() => date({ from: new Date(1900, 0, 1), to: new Date(1999, 0, 1) })),
  imageUrl: () => `https://api.lorem.space/image/face?w=50&h=50&hash=${uuid.v4()}`
}
