import * as db from '../helpers/database'

export const createmessage = async(post:any)=>{
  const keys = Object.keys(post);
  const values = Object.values(post);
  const key = keys.join(',');
  let parm = '';
  for(let i = 0 ; i<values.length ;i++){
    parm +='?,'
  }
  parm = parm.slice(0,-1);
  const sql = `INSERT INTO messages (${key}) VALUES (${parm})`
  try{
    await db.run_insert(sql,values);
    return {status:201};
  }catch(err:any){
    return err;
  }
}


export const repeat = async(post:any,mid:any)=>{
  const id = [mid];
  const keys = Object.keys(post);
  const values = Object.values(post);
  let parm = '';
  for(let i = 0 ; i<values.length ;i++){
    parm += `${keys[i]} = '${values[i]}',`
  }
  parm = parm.slice(0,-1);
  const sql = `UPDATE messages SET ${parm} Where mid = ?`
  try{
    await db.run_update(sql,id);
    return {status:201};
  }catch(err:any){
    return err;
  }
}


export const getmsg = async(username:any)=>{
  const query = 'select * from messages where username = ?';
  const values = [username];
  const data = await db.run_query(query,values);
  return data;
}

export const getallmsg = async()=>{
  const query = 'select * from messages';
  const data = await db.run_query(query,null);
  return data;
}

export const getmsgid = async(mid:any)=>{
  const values = [mid];
  const query = 'select * from messages WHERE mid = ?';
  const data = await db.run_query(query,values);
  return data;
}