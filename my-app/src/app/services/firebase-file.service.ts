import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as firebase from "firebase";
import ListResult = firebase.storage.ListResult;
import Reference = firebase.storage.Reference;

@Injectable({
  providedIn: 'root'
})
export class FirebaseFileService {
  private readonly STORAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/projectewa-a2355.appspot.com/o/';
  //https://firebasestorage.googleapis.com/v0/b/projectewa-a2355.appspot.com/o/
  private fileDownloadUrls: string[];
  private storage = firebase.storage();

  constructor(private httpClient: HttpClient) {
    this.fileDownloadUrls = [];
  }

  //Saves the file to firebase cloud storage
  public saveFile(file: File, datasetId: number, datasetName: string) {
    let indexOf = file.name.indexOf(".");
    let fileType = file.name.slice(indexOf);
    let urlReference = datasetName + "_" + datasetId + fileType;
    let fileReference = this.storage.ref(urlReference);
    fileReference.put(file).then(
      () => {
        console.log("Complete!")
      }
    );

    /*this.httpClient.put<File>(this.STORAGE_URL, file).subscribe(
      (file: File) => {
        console.log(file);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("File upload complete");
      },
    );*/

  }

  //Retrieves given url from firebase storage for downloading purposes
  public getFileUrl(fileName: string) {
    return this.storage.ref().child(fileName).getDownloadURL();
  }

  public getAllFileUrls() {
    let items: Reference[] = [];
    this.fileDownloadUrls = [];
    this.httpClient.get(this.STORAGE_URL).subscribe(
      (data: ListResult) => {
        data.items.forEach(item => items.push(item));
      },
      error => console.log(error),
      () => {
        items.forEach(item => {
          console.log(item);
          this.storage.ref().child(item.name).getDownloadURL().then(
            url => {
              this.fileDownloadUrls.push(url)
            }
          ).finally(() => console.log(this.fileDownloadUrls));
        });
      }
    );
  }

  public getDownloadUrlsList(){
    return this.fileDownloadUrls;
  }

  public deleteFile() {

  }


}
