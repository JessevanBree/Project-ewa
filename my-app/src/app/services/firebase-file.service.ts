import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as firebase from "firebase";
import ListResult = firebase.storage.ListResult;
import Reference = firebase.storage.Reference;
import {Dataset} from "../models/dataset";

@Injectable({
  providedIn: 'root'
})
export class FirebaseFileService {
  private readonly STORAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/projectewa-a2355.appspot.com/o/';
  //https://firebasestorage.googleapis.com/v0/b/projectewa-a2355.appspot.com/o/
  private fileDownloadUrls: string[]; // Stores the download url's from firebase storage
  private storage = firebase.storage();

  constructor(private httpClient: HttpClient) {
    this.fileDownloadUrls = [];
  }

  //Saves the file to firebase storage
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
  public getDownloadUrl(fileName: string) {
    // return this.storage.ref().child(fileName).getDownloadURL();
  // return this.httpClient.get(this.STORAGE_URL + fileName + ".csv?alt=media");
  return this.STORAGE_URL + fileName + ".csv?alt=media";


  }

  //Retrieves all file urls
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
              url ? this.fileDownloadUrls.push(url) : null;
            }
          ).finally(() => console.log(this.fileDownloadUrls));
        });
      }
    );
  }

  public getDownloadUrlList() {
    return this.fileDownloadUrls;
  }

  // Retrieves specific download url from the service list
  public getDownloadUrlFromList(dataset: Dataset): string {
    let url;
    this.fileDownloadUrls.forEach(
      downloadUrl => {
        if (downloadUrl.includes(dataset.id + ".csv")) {
          url = downloadUrl;
          console.log(url);
          return;
        }
      }
    );
    return url;

  }

  //Deletes files from firebase storage
  public deleteFile(dataset: Dataset) {
    this.httpClient.delete(this.STORAGE_URL + dataset.name + "_" + dataset.id + ".csv").subscribe(
      () => {},
      error => console.log(error),
      () => {
        console.log("Deleted file");
      }
    )
  }


}
