import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera , CameraOptions } from '@ionic-native/camera';


import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@IonicPage()
@Component({
  selector: 'page-publicar',
  templateUrl: 'publicar.html',
})
export class PublicarPage {

   public nameImg: any;
   public nimg: string;
   public base64Image: string;

   public ArrayImg = [];



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera :Camera,
    private transfer: FileTransfer
  )
  { }

  public fileTransfer: FileTransferObject = this.transfer.create();

  ngOnInit(){
    this.nameImg = [];
  }

  abrirCamera()
  {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,  //Corrects Android orientation quirks
      saveToPhotoAlbum:true,
    }

    this.camera.getPicture(options).then(imageData  => {
    this.nimg = imageData;
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
    this.ArrayImg.push(this.base64Image);
    this.nameImg.push(this.base64Image);
    this.nameImg.reverse();
    }, (err) => {
     // Handle error
    });
  }


  publicar(){
    alert('certo');

    this.ArrayImg.forEach(data => {

        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: Math.floor(Math.random() * 10)+'.jpg',
          headers: {}
        }

      this.fileTransfer.upload(data, 'http://192.168.0.102/casa/api/v1.0/publicar', options)
        .then((data) => {
          // success
          alert('enviado com sucesso');
        }, (err) => {
          // error
          alert('error ao enviar');
        })

      });
  }



}
