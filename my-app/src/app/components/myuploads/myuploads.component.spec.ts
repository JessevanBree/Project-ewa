import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FirebaseDatasetService} from "../../services/firebase-dataset.service";
import { MyuploadsComponent } from './myuploads.component';
import {ViewDatasetPopupComponent} from "../view-dataset-popup/view-dataset-popup.component";
import {UploadPopUpComponent} from "../upload-pop-up/upload-pop-up.component";
import {FormsModule} from "@angular/forms";
import {EditMetadataPopupComponent} from "../edit-metadata-popup/edit-metadata-popup.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {ChartsModule} from "ng2-charts";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {PapaParseModule} from "ngx-papaparse";
import {HttpClientTestingModule} from "@angular/common/http/testing";


describe('MyuploadsComponent', () => {
  let myUploadscomponent: MyuploadsComponent;
  let myUploadsfixture: ComponentFixture<MyuploadsComponent>;

  let uploadPopupcomponent: UploadPopUpComponent;
  let uploadPopupfixture: ComponentFixture<UploadPopUpComponent>;

  let editDatasetcomponent: ViewDatasetPopupComponent;
  let editDatasetfixture: ComponentFixture<ViewDatasetPopupComponent>;

  let datasetService: FirebaseDatasetService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyuploadsComponent, UploadPopUpComponent, ViewDatasetPopupComponent, EditMetadataPopupComponent],
      imports: [ FormsModule, NgSelectModule, ChartsModule, PdfViewerModule, RouterTestingModule, PapaParseModule,
      HttpClientTestingModule],
      providers: []

    })
    .compileComponents(); //Compile the components
  }));

  //Set everything up (create the components)
  beforeEach(() => {
    //Set up my uploads component
    myUploadsfixture = TestBed.createComponent(MyuploadsComponent);
    myUploadscomponent = myUploadsfixture.componentInstance;
    datasetService = myUploadsfixture.debugElement.injector.get(FirebaseDatasetService); //Get the dataset service
    myUploadsfixture.detectChanges();

    //Set up upload popup component
    uploadPopupfixture = TestBed.createComponent(UploadPopUpComponent);
    uploadPopupcomponent = uploadPopupfixture.componentInstance;
    uploadPopupfixture.detectChanges();

    //Set up edit dataset popup component
    editDatasetfixture = TestBed.createComponent(ViewDatasetPopupComponent);
    editDatasetcomponent = editDatasetfixture.componentInstance;
    editDatasetfixture.detectChanges();
  });

  //Check if the myUploads component is succesfully created
  it('should create', () => {
    expect(myUploadscomponent).toBeTruthy();
  });

/*  //Check if upload popup component is succesfully created
  it('should create', () => {
    expect(uploadPopupcomponent).toBeTruthy();
  });

  //Check if the edit dataset component is succesfully created
  it('should create', () => {
    expect(editDatasetcomponent).toBeTruthy();
  });

  //Check if the datasets are succesfully loaded from the database
  it('should get the datasets from the database', () =>{
    //Check if getAllDatasets() does not return an empty list, if not that means the datasets are succesfully retreived
    expect(datasetService.getAllDatasets.length).not.toEqual(0);
  });

  /!*!//Check if the datasets are succesfully loaded into the myuploads component
  it('should get the datasets from the database', () =>{
    //Check if getAllDatasets() does not return an empty list, if not that means the datasets are succesfully loaded into the component
    expect(myUploadscomponent.userDatasets.length).not.toEqual(0);
  });*!/*/

});
