import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SoapService {

  private API_BUSCAR="apidemo/greeting"

  constructor(private http:HttpClient) { }
  
  buscar(){
    /*
      fetch("http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso", {
        method: "POST",
        body: "",
        headers: { "Content-type": "text/xml; charset=utf-8", "SOAPAction": "" }
      }).then(response => response.text())
      .then(xml => {
            let parser = new DOMParser();
            xmlDoc = parser.parseFromString(xml, "text/xml");
            console.info(xmlDoc.querySelector("CountryNameResul"));
            console.info("=====================");
            console.info(xmlDoc.querySelectorAll("Error")[1].innerHTML);
        }).catch (err => console.log(err));
      */

      this.http.post(
        this.API_BUSCAR, 
        "<xml ejemplo>"
      ).subscribe();
    }
}
