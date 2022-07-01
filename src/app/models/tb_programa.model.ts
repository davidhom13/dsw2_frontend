import { CategoriaPrograma } from "./tb_cateprogram.model";

export class Programa {
    id_programa?: number;
    idCatePrograma?: CategoriaPrograma;
    nom_prog?: String;
    desc_prog?: String;
    precio?: number;
}