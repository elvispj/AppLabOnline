import { Tiposmovimiento } from "./Tiposmovimiento";
import { Usuarios } from "./Usuarios";
import { Formaspago } from "./Formaspago";

export class Movimientoscaja
{
    public movimientoid!: number;
    public tipomovimientoid!: string;
    public formapagoid!: string;
    public usuarioid!: number;
    public corteid!: number;
    public movimientocargo!: number;
    public movimientoabono!: number;
    public movimientosaldo!: number;
    public movimientocomentarios!: string;
    public movimientofecha!: Date;
    public bitacoraid!: number;
    public tiposmovimiento!: Tiposmovimiento | undefined;
    public usuario!: Usuarios | undefined;
    public formapago!: Formaspago | undefined;
}