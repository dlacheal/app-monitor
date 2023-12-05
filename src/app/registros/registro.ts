import { Empleado } from "../empleados/empleado";
import { Proyecto } from "../proyectos/proyecto";

export class Registro {
    id: number;
    numeroRegistro: string;
    formatoRegistro: string;
    numeroTrabajadores: string;
    revisado: boolean;
    aprobado: boolean;
    entregado: boolean;
    nombreProyectoOperario: string;
    plantaOperario: string;
    fechaRegistro: Date;
    codigoEmpleado: Empleado;
    codigoProyecto: Proyecto;
}
