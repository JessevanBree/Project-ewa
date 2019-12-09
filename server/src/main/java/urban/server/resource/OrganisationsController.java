package urban.server.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import urban.server.models.Organisation;
import urban.server.models.User;
import urban.server.repositories.JPAOrganisationRepository;
import urban.server.repositories.JPAUserRepository;
import urban.server.resource.exceptions.ResourceNotFoundException;
import urban.server.views.DatasetsView;
import urban.server.views.OrganisationsView;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/organisations")
public class OrganisationsController {
    @Autowired
    private JPAOrganisationRepository organisationRepo;

    @GetMapping()
    public MappingJacksonValue getAllUsers() {
        List<Organisation> organisations = organisationRepo.findAll();

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(organisations);
        mappingJacksonValue.setSerializationView(OrganisationsView.Full.class);
        return mappingJacksonValue;
    }

    @GetMapping("/{id}")
    public Organisation getUserById(
            @PathVariable Long id) {

        Organisation organisationById = organisationRepo.findById(id);

        if (organisationById == null) {
            throw new ResourceNotFoundException("id = " + id);
        }

        return organisationById;
    }

    @PostMapping()
    public ResponseEntity<Organisation> createUser(@RequestBody Organisation organisation) {

        Organisation savedUser = organisationRepo.save(organisation);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getId()).toUri();

        return ResponseEntity.created(location).body(savedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Organisation> deleteUser(@PathVariable Long id) {

        Organisation organisation = getUserById(id);

        organisationRepo.delete(organisation);

        return ResponseEntity.ok(organisation);

    }

    @PutMapping()
    public ResponseEntity<Organisation> updateUser(@RequestBody Organisation organisation) {


        Organisation organisationById = organisationRepo.findById(organisation.getId());

        if (organisationById == null) {
            throw new ResourceNotFoundException("id = " + organisation.getId());
        }

        organisationRepo.save(organisation);

        return ResponseEntity.ok().build();
    }
}