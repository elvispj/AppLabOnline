import { Inventario } from "./Inventario";

export class Compras
{
	public compraid!: number;
	public proveedorid!: number;
	public compraactivo!: boolean;
	public compranumeroarticulos!: number;
	public compraimporteneto!: number;
	public compraimporteiva!: number;
	public compraimportetotal!: number;
	public comprafechacreacion!: Date;
	public comprafechamodificacion!: Date;
	public bitacoraid!: number;
	public listaInventario!: Inventario[];
}

export interface CompraProveedor{
	proveedornombre: string;
    compraid: number;
    proveedorid: number;
    compraactivo: boolean;
    compranumeroarticulos: number;
    compraimporteneto: number;
    compraimporteiva: number;
    compraimportetotal: number;
    comprafechacreacion: Date;
    comprafechamodificacion: Date;
    bitacoraid: number;
	listaInventario: Inventario[];
}