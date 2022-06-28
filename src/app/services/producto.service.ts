import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlProducto = AppSettings.API_ENDPOINT+ '/producto';
const baseUrlCrud = AppSettings.API_ENDPOINT+ '/crudProducto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  registrar(data:Producto): Observable<any>{
      return this.http.post(baseUrlProducto, data);
  }

  listaProducto(nombre:string, serie:string, idPais:number, idMarca:number, estado:number) : Observable<any>{
    const params = new HttpParams().set("nombre", nombre).set("serie", serie).set("idPais", idPais).set("idMarca", idMarca).set("estado", estado);
    return this.http.get<any>(baseUrlProducto + "/listaProducto", {params});
  }

  ConsultaProducto(filtro : any) : Observable<any>{
    return this.http.get(baseUrlCrud + "/listaProductoxNombre/" + filtro);
  }

  registraProducto(aux: Producto): Observable<any>{
    return this.http.post(baseUrlCrud + "/registrarProducto", aux);
  }

  actualizaProducto(aux: Producto): Observable<any>{
    return this.http.put(baseUrlCrud + "/actualizaProducto", aux);
  }

  eliminaProducto(id: any): Observable<any>{
    return this.http.delete(baseUrlCrud + "/eliminaProducto/"+ id);
  }

}


