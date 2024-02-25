import { Tipoproducto } from "./Tipoproducto";

export class Inventario
{
	public inventarioid!: number;
	public compraid!: number;
	public tipoproductoid!: number;
	public inventarioactivo!: boolean;
	public inventariocostoporunidad!: number;
	public inventariocantidadoriginal!: number;
	public inventariocantidadactual!: number;
	public inventarioimagen!: number[];
	public inventariofechacreacion!: Date;
	public inventariofechamodificacion!: Date;
	public tipoproducto: Tipoproducto=new Tipoproducto();
}

export interface InventarioTipoProducto{
	inventarioid: number;
	compraid: number;
	tipoproductoid: number;
	proveedornombre: string;
	tipoproductonombre: string;
	inventarioactivo: boolean;
	inventariocostoporunidad: number;
	inventariocantidadoriginal: number;
	inventariocantidadactual: number;
	inventarioimagen: number[];
	inventariofechacreacion: Date;
	inventariofechamodificacion: Date;
}