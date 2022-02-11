import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root' // permet de ne pas l'ajouter dans le appmodule.ts
})
export class Personal {
  apiKey: string = 'AIzaSyB1Og82cAbA_T9stZHDII51QsFLZfQHNsA';
}
