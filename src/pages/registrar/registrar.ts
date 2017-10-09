import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';

import { Http  } from "@angular/http";

import { HomePage } from '../home/home';


import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {

  usuario = {};
  usuarios = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController
  )
  {
  }

  showAlert(title , subtitle, button) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: [button]
    });
    alert.present();
  }

  registrar()
  {
   this.http.post('http://192.168.0.102/casa/api/v1.0/usuario' , JSON.stringify(this.usuario))
   .subscribe(
    d => {
      this.navCtrl.push(HomePage);
      this.showAlert('Registro','Foi fetuado com sucesso.','ok');
    },
    e => {alert(e)});
  }

}
