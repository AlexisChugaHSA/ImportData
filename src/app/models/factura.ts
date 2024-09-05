export class Factura{

    constructor(
        public id_factura:number,
        public id_empresa:number,
        public total:number,  
        public subtotal:number,
        public fecha:string,
        public iva=0.0,  
        public iva_0=0.0,  
        public ruc_empresa:string,
        public nombre_empresa:string,
        public telefono_empresa:string,
        public correo_empresa:string,
        public id_usuario:number
    ){

    }

    }
