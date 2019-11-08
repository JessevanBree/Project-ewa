import { Dataset } from './dataset';

describe('Dataset', () => {
  it('should create an instance', () => {
    let dataset: Dataset = Dataset.generateRandomDataset();
    expect(new Dataset(dataset.id, dataset.name, dataset.region, dataset.publicity, dataset.chartData, dataset.chartLabels, dataset.user, dataset.organisation)).toBeTruthy();
  });
});
