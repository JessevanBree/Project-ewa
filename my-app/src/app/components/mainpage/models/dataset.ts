export class Dataset {
  id: number;
  name: String;


  constructor(id: number, name: String){
    this.id = id;
    this.name = name;
  }

  static generateRandomID(){
    let randomId =  Math.floor(Math.random() * 9999);
    console.log(randomId);
    return randomId;
  }

  static trueCopy(dataset: Dataset): Dataset{
    return Object.assign(new Dataset(dataset.id, dataset.name), dataset);
  }

}
