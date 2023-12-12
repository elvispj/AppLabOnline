export class Ordendetalle
{
	public ordendetalleid: number;
	public ordenid: number;
	public estudioid: number;
	public ordendetalleactivo: boolean;
	public ordendetallecosto: number;
	public ordendetalledescuento: number;
	public ordendetallecostofinal: number;
	public ordendetallefechacreacion: Date;
	public ordendetallefechamodificacion: Date;
	public bitacoraid: number;

	constructor (ordendetalleid_: number,ordenid_: number,estudioid_: number,ordendetalleactivo_: boolean,ordendetallecosto_: number,ordendetalledescuento_: number,ordendetallecostofinal_: number,ordendetallefechacreacion_: Date,ordendetallefechamodificacion_: Date,bitacoraid_: number)
	{
		this.ordendetalleid = ordendetalleid_;
		this.ordenid = ordenid_;
		this.estudioid = estudioid_;
		this.ordendetalleactivo = ordendetalleactivo_;
		this.ordendetallecosto = ordendetallecosto_;
		this.ordendetalledescuento = ordendetalledescuento_;
		this.ordendetallecostofinal = ordendetallecostofinal_;
		this.ordendetallefechacreacion = ordendetallefechacreacion_;
		this.ordendetallefechamodificacion = ordendetallefechamodificacion_;
		this.bitacoraid = bitacoraid_;
	}
}