import * as request from "~/utill/httpRequest"

export const getEventDetailService = async (id) =>{
    try{
        const res = await request.get(`tickets/detail_ticket?id=${id}`)
        return res
    }catch(err){
        console.log( 'Error getEventDetailService', err );        
    }
}
