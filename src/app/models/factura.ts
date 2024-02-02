export class Factura{

    constructor(
        public id_factura:number,
        public id_empresa:number,
        public total:number,  
        public subtotal:number,
        public fecha:string,
        public iva=0.12,  
        public iva_0=0.0,  
    ){

    }

    }
