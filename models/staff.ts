import * as db from '../helpers/database'

export const findByUsername = async (login:string) =>{
  const query = 'SELECT * FROM staff where login = ?'
  const user= await db.run_query(query,[login]);
  return user
}

export const addstaff = async(staff:any)=>{
  const keys = Object.keys(staff);
  const values = Object.values(staff);
  const key = keys.join(',');
  let parm = '';
  for(let i = 0 ; i<values.length ;i++){
    parm +='?,'
  }
  parm = parm.slice(0,-1);
  const sql = `INSERT INTO staff (${key}) VALUES (${parm})`
  try{
    await db.run_insert(sql,values);
    return {status:201};
  }catch(err:any){
    return err;
  }
}

export const staffprofile = async (login:string) =>{
  const query = 'SELECT * FROM staff where login = ?'
  const staff= await db.run_query(query,[login]);
  return staff;
}

