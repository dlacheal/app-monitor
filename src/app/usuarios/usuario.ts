import { Empleado } from "../empleados/empleado";

export class Usuario {
    id: number;
    username: string;
    password: string;
    enable: boolean;
    authorities: String[] = [];
    codigoEmpleado: Empleado = new Empleado();

}
