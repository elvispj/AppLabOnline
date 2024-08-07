import { Especialidades } from "./Especialidades";

export class Doctores
{
	public doctorid!: number;
	public doctoractivo!: boolean;
	public doctornombre!: string;
	public doctorapellidopaterno!: string;
	public doctorapellidomaterno!: string;
	public doctorcedula!: string;
	public doctortitulo!: string;
	public doctorfechacreacion!: Date;
	public doctorfechamodificacion!: Date;
	public bitacoraid!: number;
	public usuarioid!: number;
	public usuariopref!: string;
	public especialidades!: Especialidades[];
}