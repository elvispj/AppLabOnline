export class Pagodetalle
{
	public pagodetalleid!: number;
    public pagoid!: number;
    public movimientocajaid!: number;
    public pagodetalleactivo!: boolean;
    public pagodetalleimporte!: number;
    public pagodetallefechacreacion!: Date;
    public pagodetallefechamodificacion!: Date;
}

export interface Int_PagoDetalle{
    pagodetalleid: number;
    pagoid: number;
    pagodetalleimporte: number;
    formapagoid: string;
    formapagonombre: string;
    tipomovimientoid: string;
    usuarioid: number;
    pagodetallefechacreacion: Date;
}