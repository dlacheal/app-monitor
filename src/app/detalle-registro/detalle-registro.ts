import {Epp} from "../epps/epp";


export class DetalleRegistro {

  cantidad: number;
  observacion: string;
  nombreEpp: string;
  tallaEpp: string;
  fechaEntrega: string;
  conformidad: boolean;
  motivoEntrega: string;
  codigoEpp: Epp = new Epp();
}
