import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { Programa } from "../models/tb_programa.model";

const baseUrlProgramasPc = AppSettings.API_ENDPOINT+ '/crudProgramasPC';

@Injectable({
    providedIn: 'root'
  })

export class ProgramaService {

    constructor(private http:HttpClient) { }

    listaCategoria(idCatePrograma: any) : Observable<any>{
        return this.http.get(baseUrlProgramasPc + "/listadoxCategoria/" + idCatePrograma);
    }

    actualizaPrograma(aux: Programa): Observable<any>{
        return this.http.post(baseUrlProgramasPc + "/actualizaProgramasPC", aux);
    }

    eliminaPrograma(idCatePrograma: any) : Observable<any>{
        return this.http.delete(baseUrlProgramasPc + "/eliminarProgramasPC/" + idCatePrograma);
    }

    registrar(aux:Programa): Observable<any>{
        return this.http.post(baseUrlProgramasPc + "/registroProgramasPC", aux);
    }

}