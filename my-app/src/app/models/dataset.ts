import {User} from 'src/app/models/user';
import {Organisation} from 'src/app/models/organisation';

export enum Publicity {
  PUBLIC = "Public",
  GROUP = "Group",
  PRIVATE = "Private"
}

export class Dataset {
  title: string;
  description: string;
  publicity: string;
  uploader: User;
  organisation: Organisation;

  constructor(title: string, description: string, publicity: string, uploader: User, organisation: Organisation) {
    this.title = title;
    this.description = description;
    this.publicity = publicity;
    this.uploader = uploader;
    this.organisation = organisation;
  }

  equals(dataset: Dataset): Boolean {
      return this.title === dataset.title &&
      this.description === dataset.description &&
      this.publicity === dataset.publicity &&
      this.organisation.equals(dataset.organisation) &&
      this.uploader.equals(dataset.uploader);
  }

  static trueCopy(dataset: Dataset): Dataset{
    return Object.assign(new Dataset(dataset.title, dataset.description, dataset.publicity, dataset.uploader, dataset.organisation));
  }
}
