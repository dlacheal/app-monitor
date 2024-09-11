export class Notificacion {
  id: number;
  rutaFotograma: string;
  fechaNotificacion: string;
  revisado: boolean; //fue visto
  enviado: boolean; // generó memorandum
  criticidad: number; // 0:low - 1:medium - 2:high
  descripcion: string = "";
}
