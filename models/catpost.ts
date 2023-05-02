import * as db from '../helpers/database'

export const getAll = async()=>{
  const query = 'select * from catpost;'
  const data = await db.run_query(query,null)
  return data;
}

export const getID = async(id:any)=>{
  const query = 'select * from catpost where ID = ?';
  const values = [id];
  const data = await db.run_query(query,values);
  return data;
}

export const getBreed = async(breed:any)=>{
  const query = 'select * from catpost where breed = ?'
  const values = [breed];
  const data = await db.run_query(query,values);
  return data;
}

export const add = async(post:any)=>{
  const keys = Object.keys(post);
  const values = Object.values(post);
  const key = keys.join(',');
  let parm = '';
  for(let i = 0 ; i<values.length ;i++){
    parm +='?,'
  }
  parm = parm.slice(0,-1);
  const sql = `INSERT INTO catpost (${key}) VALUES (${parm})`
  try{
    await db.run_insert(sql,values);
    return {status:201};
  }catch(err:any){
    return err;
  }
}

export const update = async(id:any,catpost:any)=>{
  const aid = Object.values(id);
  const keys = Object.keys(catpost);
  const values = Object.values(catpost);
  let parm = '';
  for(let i = 0 ; i<values.length ;i++){
    parm += `${keys[i]} = '${values[i]}',`
  }
  parm = parm.slice(0,-1);
  const sql = `UPDATE catpost SET ${parm} WHERE id = ?`
  try{
    await db.run_update(sql,aid);
    return {status:201};
  }catch(err:any){
    return err;
  }
}

/*export const update = async(id:any,post:any)=>{
  const keys = Object.keys(post);
  const values = Object.values(post);
  let update =''
  for(let i = 0 ; i<values.length ;i++){
    update +=`${keys[i]}=?,`
  }
  update = update.slice(0,-1);
  const sql = `UPDATE catpost (${update}) WHERE id=${id}`
  try{
    await db.run_insert(sql,values);
    return {status:201};
  }catch(err:any){
    return err;
  }
}*/

export const del = async(id:any,post:any)=>{
  const aid = Object.values(id);

  const sql = `DELETE from articles where id=?`
  try{
    await db.run_query(sql,aid);
    return {status:201};
  }catch(err:any){
    return err;
  }
}