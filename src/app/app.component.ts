import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DataService } from './servicios/data/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[DataService],
})
export class AppComponent {
  title = 'paises';
  resultado = '';
  private API_BUSCAR="/websamples.countryinfo/CountryInfoService.wso";

 
  constructor(private dataSvc:DataService, private http:HttpClient) {

  }
  ngOnInit(){
    this.dataSvc.getAll().subscribe((res)=>{
      console.log("Res",res);
    })
  }

  testAPI() {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': '',
      'Accept-Encoding': 'gzip,deflate',
      'Host': 'webservices.oorsprong.org'
    })
    
    let body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.oorsprong.org/websamples.countryinfo">
    <soapenv:Header/>
    <soapenv:Body>
       <web:CountryName>
          <web:sCountryISOCode>EC</web:sCountryISOCode>
       </web:CountryName>
    </soapenv:Body>
 </soapenv:Envelope>`;

    return this.http.post( this.API_BUSCAR, 
      body,
      {
        headers
      }
      ).subscribe();
      
  }

  onSubmit(form: NgForm): any {
    if (form.invalid)
      {
        console.log("formulario invalido");
        return false;
      }

    let cod = form.value.cod; 

    console.log("codigo a consultar: "+cod);
    
    this.testAPI();
    return true;
  }

}
