import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map,tap,delay,scan, filter, subscribeOn } from 'rxjs/operators'
import { of } from 'rxjs';
import { ParseTreeResult, devOnlyGuardedExpression } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'paises';
  
  private API_BUSCAR="/websamples.countryinfo/CountryInfoService.wso";

 
  constructor(private http:HttpClient) {

  }
  ngOnInit(){
  }

  testAPI(cod: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'Accept': 'text/xml'
    })
    
    let body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.oorsprong.org/websamples.countryinfo">
    <soapenv:Header/>
    <soapenv:Body>
       <web:CountryName>
          <web:sCountryISOCode>` + cod + `</web:sCountryISOCode>
       </web:CountryName>
    </soapenv:Body>
 </soapenv:Envelope>`;

    return this.http.post( this.API_BUSCAR, 
      body,
      {
        headers,
        responseType: 'text'
      },
      ).pipe(
        map( (response) => {
          const xmlString=`<?xml version="1.0" encoding="utf-8"?>
          <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
              <m:CountryNameResponse xmlns:m="http://www.oorsprong.org/websamples.countryinfo">
                <m:CountryNameResult> ` +response+ `</m:CountryNameResult>
              </m:CountryNameResponse>
            </soap:Body>
          </soap:Envelope>`;
       const xmlDocument = new DOMParser().parseFromString(response,"text/xml");
 
       const tutorials=xmlDocument.querySelector("CountryNameResult")?.textContent
 
          return tutorials;
        
        }
      )
      ).subscribe((result) => {
        console.log(result)
        
      });
      
  }

  onSubmit(form: NgForm): any {
    if (form.invalid)
      {
        console.log("formulario invalido");
        return false;
      }

    let cod = form.value.cod; 

    console.log("codigo a consultar: "+cod);

    this.testAPI(cod);

    return true;
  }

}
