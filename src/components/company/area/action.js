export const LOAD_AREA   =  "loadArea";
export const CREATE_AREA =  "CREATE_AREA";


export function loadArea(id) {
   return {
       type : LOAD_AREA,
       id : id
   }
}
export function createArea(name, address, company_id) {
   return {
       type : CREATE_AREA,
       name : name,
       address : address,
       company_id : company_id
   }
}