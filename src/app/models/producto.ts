export class Producto{

    constructor(
        public id_producto:number,
        public id_categoria:number,
        public nombre:string,
        public descripcion:string,    
        public precio:number,  
        public descuento:number,  
        public url:string,  
        public imagen:string,  
        public tags:string,  
    ){

    }
}