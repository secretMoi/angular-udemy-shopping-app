import {Injectable} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

@Injectable({
  providedIn: 'root' // permet de ne pas l'ajouter dans le appmodule.ts
})
export class DataStorageService {
  constructor(private httpClientModule: HttpClientModule) {

  }
}
