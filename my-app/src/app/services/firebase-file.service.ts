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
  private readonly STORAGE_URL = "https://firebasestorage.googleapis.com/v0/b/projectewa-a2355.appspot.com/o/";
  private readonly CSV_FILE_TYPE = ".csv";
  private fileDownloadUrls: string[]; // Stores the download url's from firebase storage
  private storage = firebase.storage();

  constructor(private httpClient: HttpClient) {
    this.fileDownloadUrls = [];
  }

  //Saves the file to firebase storage
  public saveFile(file: File, datasetId: number, datasetName?: string) {
    let fileName = file.name.split(/\.pdf|\.csv/g);
    let fileType = file.type.split("/")[1];
    console.log(file);
    console.log(fileName);
    this.httpClient.post<File>(this.STORAGE_URL + fileName[0] + "_" + datasetId
      + "." + fileType, file).subscribe(
      (file: File) => {
        console.log(file);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("File upload complete");
      },
    );
  }

  //Retrieves given url from firebase storage for downloading purposes
  public getDownloadUrl(fileName: string, datasetId: number, fileType: string) {
    // return this.storage.ref().child(fileName).getDownloadURL();
    // return this.httpClient.get(this.STORAGE_URL + fileName + ".csv?alt=media");
    return this.STORAGE_URL + fileName + "_" + datasetId + "." + fileType + "?alt=media";
  }

  public getPDFUrl(fileName: string, datasetId: number) {
    /*this.httpClient.get(this.STORAGE_URL + fileName + "_" + datasetId + ".pdf").subscribe(
      (response) => console.log(response)
    );*/
    return this.STORAGE_URL + fileName + "_" + datasetId + ".pdf?alt=media";
  }



  //Retrieves all file urls from firebase storage and stores them in a list
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

  // Retrieves list of download urls from service
  public getDownloadUrlList() {
    return this.fileDownloadUrls;
  }

  // Retrieves specific download url from the service list
  public getDownloadUrlFromList(dataset: Dataset): string {
    let url;
    this.fileDownloadUrls.forEach(
      downloadUrl => {
        if (downloadUrl.includes(dataset.fileName + "_" + dataset.id)) {
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
    this.httpClient.delete(this.STORAGE_URL + dataset.fileName + "_" + dataset.id + "." + dataset.fileType)
      .subscribe(
      () => {
      },
      error => console.log(error.error),
      () => {
        console.log("Deleted file");
      }
    )
  }


}
