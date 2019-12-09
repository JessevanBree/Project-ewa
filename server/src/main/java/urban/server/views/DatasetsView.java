package urban.server.views;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;

public class DatasetsView {
    public static class Full {
    }

    public static class OnlyIdData {
    }

    public static class OnlyIdNameUsersOrganisationsSerializer{}
}
