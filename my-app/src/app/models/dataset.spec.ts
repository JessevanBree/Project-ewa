import { Dataset } from './dataset';
import {User} from "./user";

describe('Dataset', () => {


  it('should create an instance', () => {
    let dataset: Dataset = new Dataset("My dataset", "EU_LEVEL", "PUBLIC",
      new User("test@hva.nl", false), 2018, Dataset.generateChartDataset(),
      ["Label 1", "Label 2"], null, null, null, 2);

    expect(new Dataset(dataset.name, dataset.region, dataset.publicity, dataset.user,
      dataset.year, dataset.chart, dataset.chartLabels, dataset.fileName,
      dataset.description, dataset.organisations, dataset.id)).toBeTruthy();
  });
});
