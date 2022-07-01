import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppSettings } from "../app.settings";
import { CategoriaPrograma } from "../models/tb_cateprogram.model";

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    constructor(private http:HttpClient) { }

    listaCategoria():Observable<CategoriaPrograma[]>{
        return this.http.get<CategoriaPrograma[]>(baseUrlUtil + '/listaCategoria');
    }

}