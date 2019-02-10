import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { IlbilgisiPage} from '../ilbilgisi/ilbilgisi'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  veriler:JSON [] = [];

  constructor(public navCtrl: NavController,public http:HTTP) {
    this.vericek();
  }

  vericek(){

    this.http.get("http://web.karabuk.edu.tr/yasinortakci/dokumanlar/web_dokumanlari/iller.json",{},{})
    .then(data => {

     for(let a of JSON.parse(data.data)){

      for(let b of a.illeri){

        this.veriler.push(b);

      }

     }

    })
    .catch(hata => {
     console.log(hata.error)
    })

  }
  
  ilegit(il:JSON){

    this.navCtrl.push(IlbilgisiPage,{obje:il})

  }


}
