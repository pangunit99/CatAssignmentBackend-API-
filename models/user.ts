import * as db from '../helpers/database'
export const findByUsername = async (login:string) =>{
  const query = 'SELECT * FROM staff where login = ?'
  const user= await db.run_query(query,[login]);
  return user
}