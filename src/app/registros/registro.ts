import { Empleado } from "../empleados/empleado";
import { Proyecto } from "../proyectos/proyecto";
import {DetalleRegistro} from "../detalle-registro/detalle-registro";

export class Registro {
    id: number;
    numeroRegistro: string;
    formatoRegistro: string;
    numeroTrabajadores: number;
    revisado: boolean;
    aprobado: boolean;
    entregado: boolean;
    nombreProyectoOperario: string;
    plantaOperario: string;
    fechaRegistro: Date;
    codigoEmpleado: Empleado = new Empleado();
    codigoProyecto: Proyecto = new Proyecto();
    detalleRegistroList: DetalleRegistro[] = [];
}
