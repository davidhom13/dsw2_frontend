import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede.model';
import { AppSettings } from '../app.settings';


const baseUrlSede = AppSettings.API_ENDPOINT+ '/sede';
const baseUrlCrud = AppSettings.API_ENDPOINT+ '/crudSede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http: HttpClient) { }

  registrar(data:Sede): Observable<any>{
   
    return this.http.post(baseUrlSede, data);
  }

  listaSede(nombre:string, codigoPostal:string, idPais:number, estado:number):Observable<any> {
    const params = new HttpParams().set("nombre", nombre).set("codigoPostal", codigoPostal).set("idPais", idPais).set("estado", estado);

    return this.http.get<any>(baseUrlSede + "/listaSedeConParametros", {params});
  }
  

  ConsultaSede(filtro : any) : Observable<any>{
    return this.http.get(baseUrlCrud + "/listaSedexNombre/" + filtro);
  }

  registraSede(obj: Sede): Observable<any>{
    console.log(obj);
    console.log(baseUrlCrud + "/registrarSedeNuevo");
    return this.http.post(baseUrlCrud + "/registrarSedeNuevo", obj);
  }
  
  actualizaSede(obj: Sede): Observable<any>{
    return this.http.put(baseUrlCrud + "/actualizaSede", obj);
  }

  eliminaSede(id: any): Observable<any>{
    return this.http.delete(baseUrlCrud + "/eliminaSede/"+ id);
  }
}
