import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast'
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ogradi:string
  ogrno:string
  ogrsinif:string
  ogrenciler:any [];
  constructor(public navCtrl: NavController, public t: Toast, public sqlite: SQLite) {

  }


  createDb() {

    this.sqlite.create({
      name: 'ogrenci.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('CREATE TABLE ogrenci (name text, no text,sinif text)', [])
          .then(() =>

            this.toastDeneme('Veritabanı oluşturuldu')

          )
          .catch(e => {

            this.toastDeneme("Veritabanı oluşturulamadı " + e)

          })

      })

  }

  addData() {
    this.sqlite.create({
      name:'ogrenci.db', /* Veritabanı */
      location:'default' /* konum */
    })
    .then((db:SQLiteObject) => {

      db.executeSql('INSERT INTO ogrenci VALUES(?,?,?)',[this.ogradi,this.ogrno,this.ogrsinif])
      .then(()=>{

        this.toastDeneme("Veri eklendi")
        this.getData();

      })
      .catch(e => {

        this.toastDeneme("Veri eklenemedi "+ e)

      })
    })

  }

  getData() {
    this.ogrenciler = [];
    this.sqlite.create({
      name:'ogrenci.db',
      location :'default'
    })
    .then((db:SQLiteObject) =>{

      db.executeSql('SELECT * FROM ogrenci',[])
      .then(veri => {
        for(let i=0;i<veri.rows.length;i++){

         this.ogrenciler.push(veri.rows.item(i))

        }
      })
      .catch(e => {

        this.toastDeneme("Veri alınamadı" + e)

      })

    })

  }

  deleteData(b:any){
    this.sqlite.create({
      name:'ogrenci.db',
      location:'default'
    })
    .then((db:SQLiteObject)=>{

      db.executeSql('DELETE FROM ogrenci WHERE name=?',[b])
      .then(()=>{
        this.toastDeneme(b + " verisi silindi")
        this.getData()
      })
      .catch(e => {

        this.toastDeneme("Veri silinemedi " + e)
      })
    } )

  }

  toastDeneme(yazi: string) {

    this.t.show(yazi, "2000", "bottom").subscribe(() => console.log("toast açıldı"))

  }

}
