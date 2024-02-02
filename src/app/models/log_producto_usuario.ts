export class LogProductoUsuario{

    constructor(
        public id_log_prod_uder:number,
        public id_usuario:number,
        public id_producto:number,
        public id_producto_usuario:number,
        public precio:number,
        public fecha:string
    ){

    }
}