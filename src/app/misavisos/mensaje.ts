export interface Mensaje {
    id?: number;
    tipo?:number;
    emisor:string;
    recepto:string;
    topic?:string;
    titulo?:string;
    descripcion?:string;
    etiqueta?:string;
    fecha?:Date;
    entregado?:Date;
    enviado?:boolean;
    respuesta?:number;
}
