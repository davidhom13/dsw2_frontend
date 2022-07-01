import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { TipoPartes } from "../models/tb_tipopartes.model";

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';

@Injectable({
    providedIn: 'root'
})
export class TipoService {

    constructor(private http:HttpClient) { }

    listaTipo():Observable<TipoPartes[]>{
        return this.http.get<TipoPartes[]>(baseUrlUtil+'/listaTipo');
    }
    
}