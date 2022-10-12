import { nanoid } from 'nanoid'
import { Category } from '../domain/Category'

/**
 * Temporary persistance only lives during session.
 * To be replaced by db.
 *
 */
export const categoryDB = {
  [nanoid()]: new Category('Bränsle'),
  [nanoid()]: new Category('Resturang')
}
