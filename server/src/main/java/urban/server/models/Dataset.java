package urban.server.models;

public class Dataset {

    public enum RegionLevel {
        NAT_LEVEL,
        EU_LEVEL,
        URBAN_LEBEL
    }

    public enum Publicity {
        PUBLIC,
        PRIVATE,
        GROUP
    }

    private int id;
    private String name;
    private RegionLevel region;
    private Publicity publicity;
    private String description;
    private int year;
    private User user;
    private Organisation organisation;
    private Object chart;
    private String[] chartLabels;

    public Dataset(int id, String name, RegionLevel region, Publicity publicity,
                   User user, int year, String[] chartLabels, Object chart,
                   String description, Organisation organisation) {
        this.id = id;
        this.name = name;
        this.region = region;
        this.publicity = publicity;
        this.user = user;
        this.year = year;
        this.chartLabels = chartLabels;
        this.chart = chart;
    }


}
