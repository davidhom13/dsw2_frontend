import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../models/reclamo.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlReclamo = AppSettings.API_ENDPOINT+ '/reclamo';

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {

  constructor(private http:HttpClient) {   }

  registrar(data:Reclamo): Observable<any>{
    return this.http.post(baseUrlReclamo, data);
  }
  listaReclamo(descripcion:string, estado:boolean, idCliente:number, idTipoReclamo:number):Observable<any> {
    var est = estado==true? 1:0;
    const params = new HttpParams().set("descripcion", descripcion).set("estado", est).set("idCliente", idCliente).set("idTipoReclamo", idTipoReclamo);

    return this.http.get<any>(baseUrlReclamo + "/listaReclamoConParametros", {params});
  }
  
ConsultaReclamo(filtro:string):Observable<Reclamo[]> {
  return this.http.get<Reclamo[]>(baseUrlReclamo + "/listaReclamoPorDescripcionLike/"+ filtro);
}  
  actualizaReclamo(obj: Reclamo): Observable<any>{
    return this.http.put(baseUrlReclamo + "/actualizaReclamo", obj);
    }
    
    eliminaReclamo(id: any): Observable<any>{
      return this.http.delete(baseUrlReclamo + "/eliminaReclamo/" + id);
    }
}
