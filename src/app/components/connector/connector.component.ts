import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/entities/pais';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css']
})
export class ConnectorComponent implements OnInit {

  paises: Pais[] = [];
  pais: Pais = new Pais();
  paisAux: Pais = new Pais();
  constructor(public http:HttpClient) { }

  ngOnInit(): void {
    this.getCountries();
  }
  
  getCountries(){
      
        this.http.get<Pais[]>("https://restcountries.eu/rest/v2").subscribe(
        paises => {
          this.paises = {...paises}
          console.log(this.paises)

         paises.forEach((pais: Pais) =>{
          this.postCountries(pais)
         });
        },
      error => { console.error(error)
      })
}

  postCountries(pais: Pais){
  return this.http.post<Pais>('http://localhost:9000/api/paises', {nombre: pais.name, capital: pais.capital}).subscribe(
    p =>{
    this.paisAux = p;
    console.log(this.paisAux)
  })
 
}
}


/*postCountries(pais: Pais) {
  return this.http.post<Pais>( "http://localhost:9000/api/paises", null, 
  {
    params: new HttpParams()
    .set("nombre", pais.name)
    .set("capital", pais.capitol)
    .set("precio", pais.region)
    .set("population", pais.population.toString())
  });
  console.log(pais)
}*/

/*
paises.forEach(pais =>{
  this.http.post<Pais>('http://localhost:9000/api/paises', {title: 'Angular POST Request Example'},
  {
    params: new HttpParams()
    .set("nombre", pais.name)
    .set("capital", pais.capital)
    .set("population", pais.population.toString())
    .set("region", pais.region)
})
console.log(this.pais) 
 })*/



