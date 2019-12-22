package urban.server.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import urban.server.models.CMS;
import urban.server.models.User;
import urban.server.repositories.JPACMSRepository;
import urban.server.repositories.JPADatasetRepository;
import urban.server.views.UsersView;

import java.util.List;

/**
 * @Author Jesse van Bree
 */
@RestController
@RequestMapping("/cms")
public class CMSController {
    @Autowired
    private JPACMSRepository cmsRepository;

    @GetMapping()
    public MappingJacksonValue getAllUsers() {
        List<CMS> cmsList = cmsRepository.findAll();

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(cmsList);
        mappingJacksonValue.setSerializationView(UsersView.Full.class);
        return mappingJacksonValue;
    }
}
