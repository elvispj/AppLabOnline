export class Clientes
{
	public clienteid: number;
	public clienteactivo: boolean;
	public clientetipo: string;
	public clientenombre: string;
	public clienteapellidopaterno: string;
	public clienteapellidomaterno: string;
	public clientefechacreacion: Date;
	public clientefechamodificacion: Date;
	public bitacoraid: number;
	public clienteedad: number;
	public clientetelefono: string;
	public clientedireccion: string;
	public clientedatosclinicos: string;

	constructor (clienteid_: number,clienteactivo_: boolean,clientetipo_: string,clientenombre_: string,clienteapellidopaterno_: string,clienteapellidomaterno_: string,clientefechacreacion_: Date,clientefechamodificacion_: Date,bitacoraid_: number,clienteedad_: number,clientetelefono_: string,clientedireccion_: string,clientedatosclinicos_: string)
	{
		this.clienteid = clienteid_;
		this.clienteactivo = clienteactivo_;
		this.clientetipo = clientetipo_;
		this.clientenombre = clientenombre_;
		this.clienteapellidopaterno = clienteapellidopaterno_;
		this.clienteapellidomaterno = clienteapellidomaterno_;
		this.clientefechacreacion = clientefechacreacion_;
		this.clientefechamodificacion = clientefechamodificacion_;
		this.bitacoraid = bitacoraid_;
		this.clienteedad = clienteedad_;
		this.clientetelefono = clientetelefono_;
		this.clientedireccion = clientedireccion_;
		this.clientedatosclinicos = clientedatosclinicos_;
	}
}