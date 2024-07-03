import { Movimientoscaja } from "./Movimientoscaja";
import { Pagodetalle } from "./Pagodetalle";
import { Pagoestatus } from "./Pagoestatus";

export class Pagos
{
	public pagoid!: number;
	public ordenid!: number;
	public pagoestatusid!: string;
	public pagoimporte!: number;
	public pagoiva!: number;
	public pagoimportetotal!: number;
	public pagofechacreacion!: Date;
	public pagofechamodificacion!: Date;
	public pagodetalle!: Pagodetalle[];
	public pagoestatus!: Pagoestatus | undefined;
}