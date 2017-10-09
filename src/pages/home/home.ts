
import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { RegistrarPage } from "../registrar/registrar";
import { SqlitePage } from "../sqlite/sqlite";
import { PublicarPage } from "../publicar/publicar";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  developer = {};
  developers = [];

  constructor(public navCtrl: NavController, private databaseprovider: DatabaseProvider, private platform: Platform) {
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadDeveloperData();
      }
    })
  }

  loadDeveloperData() {
    this.databaseprovider.getAllDevelopers().then(data => {
      this.developers = data;
    })
  }

  addDeveloper() {
    this.databaseprovider.addDeveloper(this.developer['name'], this.developer['skill'], parseInt(this.developer['yearsOfExperience']))
    .then(data => {
      this.loadDeveloperData();
    });
    this.developer = {};
  }

  Registrar(){
    this.navCtrl.push(RegistrarPage)
  }

  Sqlite(){
    this.navCtrl.push(SqlitePage)
  }

  publicar()
  {
    this.navCtrl.push(PublicarPage);
  }


}
