import{ Sequelize,QueryTypes} from 'sequelize';
import {config} from '../config';

export const run_query = async(query,values)=>{
  try{
    const sequelize = new 
      Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
    await sequelize.authenticate();
    const data = await sequelize.query(query,{
      replacements:values,
      type: QueryTypes.SELECT
    });
    await sequelize.close();
    return data;
  }catch(err:any){
    console.error(err,query,values);
    throw 'Database query error'
  }
}

export const run_insert = async(sql,values)=>{
  try{
    const sequelize = new 
      Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
    await sequelize.authenticate();
    const data = await sequelize.query(sql,{
      replacements:values,
      type: QueryTypes.INSERT
    });
    await sequelize.close();
    console.log(data)
    return data;
  }catch(err:any){
    console.error(err,sql,values);
    throw 'Database insert error'
  }
}

export const run_update = async(sql,values)=>{
  try{
    const sequelize = new 
      Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
    await sequelize.authenticate();
    const data = await sequelize.query(sql,{
      replacements:values,
      type: QueryTypes.UPDATE
    });
    await sequelize.close();
    console.log(data)
    return data;
  }catch(err:any){
    console.error(err,sql,values);
    throw 'Database update error'
  }
}
