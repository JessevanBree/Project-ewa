package urban.server.views;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;

public class OrganisationsView {
    public static class Full { }

    public static class OnlyIdNameSerializer extends JsonSerializer<Object> {

        @Override
        public void serialize(Object object, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            ObjectMapper mapper = new ObjectMapper()
                    .configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false)
                    .setSerializationInclusion(JsonInclude.Include.NON_NULL); //only serialize non_null attributes if null do not serialize

            // Fix the serialization of LocalDateTime
            mapper.registerModule(new JavaTimeModule())
                    .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

            // Include the view-class restricted part of the serialization
            mapper.setConfig(mapper.getSerializationConfig()
                    .withView(OrganisationsView.OnlyIdNameSerializer.class));

            jsonGenerator.setCodec(mapper);
            jsonGenerator.writeObject(object);

        }
    }

    public static class OnlyIdNameUsersSerializer extends JsonSerializer<Object> {

        @Override
        public void serialize(Object object, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            ObjectMapper mapper = new ObjectMapper()
                    .configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false)
                    .setSerializationInclusion(JsonInclude.Include.NON_NULL); //only serialize non_null attributes if null do not serialize

            // Fix the serialization of LocalDateTime
            mapper.registerModule(new JavaTimeModule())
                    .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

            // Include the view-class restricted part of the serialization
            mapper.setConfig(mapper.getSerializationConfig()
                    .withView(OrganisationsView.Full.class));

            jsonGenerator.setCodec(mapper);
            jsonGenerator.writeObject(object);

        }
    }
}
