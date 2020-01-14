package urban.server.models;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.List;

import static org.mockito.Mockito.*;

/**
 * Author: Mohamed Ben Ali
 * */
@RunWith(MockitoJUnitRunner.class)
public class MockChartDatasets {

    private Dataset dataset;
    private ChartDataSets chartDataSets;

    @Before
    public void setUp(){
        dataset = Dataset.generateRandomDataset();
        chartDataSets = mock(ChartDataSets.class);
        chartDataSets.setData(List.of(10, 11));
        chartDataSets.setType("bar");
        dataset.setChart(chartDataSets);
    }

    @Test
    public void testSetterAndGetter(){
        when(chartDataSets.getDataset()).thenReturn(dataset);

        Assert.assertEquals(dataset.getChart(), chartDataSets);
        Assert.assertEquals(chartDataSets.getDataset(), dataset);

        verify(chartDataSets).getDataset();
    }


}
