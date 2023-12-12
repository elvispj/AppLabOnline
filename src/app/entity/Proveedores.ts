export class Proveedores
{
	public proveedorid: number;
	public proveedoractivo: boolean;
	public proveedornombre: string;
	public proveedorfechacreacion: Date;
	public proveedorfechamodificacion: Date;
	public bitacoraid: number;

	constructor (proveedorid_: number,proveedoractivo_: boolean,proveedornombre_: string,proveedorfechacreacion_: Date,proveedorfechamodificacion_: Date,bitacoraid_: number)
	{
		this.proveedorid = proveedorid_;
		this.proveedoractivo = proveedoractivo_;
		this.proveedornombre = proveedornombre_;
		this.proveedorfechacreacion = proveedorfechacreacion_;
		this.proveedorfechamodificacion = proveedorfechamodificacion_;
		this.bitacoraid = bitacoraid_;
	}
}