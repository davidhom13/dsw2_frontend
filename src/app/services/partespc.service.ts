import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { PartesPc } from "../models/tb_partespc.model";

const baseUrlPartesPc = AppSettings.API_ENDPOINT+ '/crudPartesPC';

@Injectable({
    providedIn: 'root'
  })

  export class PartesPcService {

    constructor(private http:HttpClient) { }

    registrar(aux:PartesPc): Observable<any>{
        return this.http.post(baseUrlPartesPc + "/registroPartesPC", aux);
    }

    listaTipoS(id_tipopartes: number) : Observable<any>{
        const params = new HttpParams().set("id_tipopartes", id_tipopartes);
        return this.http.get<any>(baseUrlPartesPc + "/listadoxTipo", {params});
    }

    listaTipo(id_tipopartes: any) : Observable<any>{
        return this.http.get(baseUrlPartesPc + "/listadoxTipo/" + id_tipopartes);
    }

    actualizaPartes(aux: PartesPc): Observable<any>{
        return this.http.post(baseUrlPartesPc + "/actualizaPartesPC", aux);
    }

    eliminaPartes(id_partes: any): Observable<any>{
        return this.http.delete(baseUrlPartesPc + "/eliminarPartesPC/" + id_partes);
    }

  }