import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http'
import { Toast } from '@ionic-native/toast';
import 'rxjs/add/operator/map';
import * as xml2js from "xml2js";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  veriler:JSON [] = [];
  constructor(public navCtrl: NavController, public http: Http, public toast: Toast) {

  }

  vericek() {
    
    this.http.get('http://www.hurriyet.com.tr/rss/anasayfa')
  .subscribe(data => {
    for(let i of this.xmlToJson(data)){
      this.veriler.push(i);
    }
     
     
      
  })
  } 

  tYaz(yazi: string) {

    this.toast.show(yazi, "2000", "bottom").subscribe(() => console.log("toast açıldı"))

  }

  xmlToJson(data:any):JSON []{
    let veri:JSON [] = [];
    xml2js.parseString(data.text(), function (err, result) {
      veri = result.rss.channel[0].item;
      });
      return veri;
  }
}
