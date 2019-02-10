import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IlbilgisiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ilbilgisi',
  templateUrl: 'ilbilgisi.html',
})
export class IlbilgisiPage {
  veri:JSON;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.veri = this.navParams.get("obje")

  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad IlbilgisiPage');
  }

}
