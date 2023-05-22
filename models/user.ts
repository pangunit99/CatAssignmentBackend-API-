import * as db from '../helpers/database'

export const findUser = async (username:string) =>{
  const query = 'SELECT * FROM users where username = ?'
  const user= await db.run_query(query,[username]);
  return user
}

export const adduser = async(userreg:any)=>{
  const keys = Object.keys(userreg);
  const values = Object.values(userreg);
  const key = keys.join(',');
  let parm = '';
  for(let i = 0 ; i<values.length ;i++){
    parm +='?,'
  }
  parm = parm.slice(0,-1);
  const sql = `INSERT INTO users (${key}) VALUES (${parm})`
  try{
    await db.run_insert(sql,values);
    return {status:201};
  }catch(err:any){
    return err;
  }
}

export const userp = async (username:string) =>{
  const query = 'SELECT * FROM users where username = ?'
  const user= await db.run_query(query,[username]);
  return user
}