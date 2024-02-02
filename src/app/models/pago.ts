export class Pago{

    constructor(
        public id_pago:number,
        public id_empresa:number,
        public valor:number,
        public descuento:number,    
        public periodo:number,  
        public fecha:string,  
        public procesado:number,  
        public intentos:number,  
        public detalle:string, 
        public cancelado:number,
        public fecha_hasta:string 
    ){

    }
}