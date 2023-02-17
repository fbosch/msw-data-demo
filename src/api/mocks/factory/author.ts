import { primaryKey, nullable } from '@mswjs/data'
import { Author } from '../../view-models/Author'
import { uuid, firstName, lastName, date, number } from 'minifaker'

export const author = <Record<keyof Author, any>>{
  id: primaryKey(uuid.v4),
  firstName: firstName,
  lastName: lastName,
  birthday: nullable(() => date({ from: new Date(1900, 0, 1), to: new Date(1999, 0, 1) })),
  imageUrl: nullable(() => `https://picsum.photos/200/300?random=${number()}`),
}
