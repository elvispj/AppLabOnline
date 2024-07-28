export class Pacientes
{
    public pacienteid!: number;
    public pacienteactivo!: boolean;
    public doctorid!: number;
    public pacientenombre!: string;
    public pacienteapellidopaterno!: string;
    public pacienteapellidomaterno!: string;
    public pacientesexo!: string;
    public pacienteedad!: number;
	public pacientetiposangre!: string;
	public pacienteemail!: string;
	public pacientetelefono!: string;
    public pacientedireccion!: string;
    public pacientefechacreacion!: Date;
    public pacientefechamodificacion!: Date;
}