package urban.server.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import urban.server.models.CMS;
import urban.server.models.User;
import urban.server.repositories.JPACMSRepository;
import urban.server.repositories.JPADatasetRepository;
import urban.server.views.CMSView;
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

    @GetMapping("/{page}")
    public MappingJacksonValue getCMSContent(@PathVariable String page) {
        List<CMS> cmsList = cmsRepository.findByPage(page);

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(cmsList);
        mappingJacksonValue.setSerializationView(CMSView.Full.class);
        return mappingJacksonValue;
    }
}
