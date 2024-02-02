export class ProductoUsuario{

    constructor(
        public id_producto_usuario:number,
        public id_usuario:number,
        public id_producto:number,
        public id_pago:number,
        public activo:number,
        public precio:number,
        public fecha:string,
        public periodo:number
    ){

    }
}