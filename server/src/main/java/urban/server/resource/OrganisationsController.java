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

    @Autowired
    private JPAUserRepository userRepository;

    // Get mapping to get all the organisations
    @GetMapping()
    public MappingJacksonValue getAllOrganisations() {
        List<Organisation> organisations = organisationRepo.findAll();

        MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(organisations);
        mappingJacksonValue.setSerializationView(OrganisationsView.Full.class);
        return mappingJacksonValue;
    }

    //TODO: Error, 405 request method not supported (method not allowed)
    @GetMapping("/orgMembers/{id}")
    public List<User> getOrganisationMembers(@PathVariable Long id){
        Organisation org = organisationRepo.findById(id);

        return org.getUsers();
    }

    // Get mapping to get an organisation by the id
    @GetMapping("/{id}")
    public Organisation getOrganisationById(
            @PathVariable Long id) {

        Organisation organisationById = organisationRepo.findById(id);

        if (organisationById == null) {
            throw new ResourceNotFoundException("id = " + id);
        }

        return organisationById;
    }

    // Mapping to get the organisation admin
    //TODO This mapping does not work yet, 405 method not allowed
    @GetMapping("/getAdmin/{id}")
    public ResponseEntity<User> getAdminFromOrganisation(@PathVariable Long id){
        Organisation organisation = organisationRepo.findById(id);

        User organisationAdmin = organisation.getOrganisationAdmin();

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/getAdmin/{id}").buildAndExpand(organisationAdmin.getId()).toUri();

        return ResponseEntity.created(location).body(organisationAdmin);
    }

    // Post mapping to create an organisation
    @PostMapping()
    public ResponseEntity<Organisation> createOrganisation(@RequestBody Organisation organisation) {

        Organisation savedOrganisation = organisationRepo.save(organisation);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedOrganisation.getId()).toUri();

        return ResponseEntity.created(location).body(savedOrganisation);
    }

    @PutMapping()
    public ResponseEntity<Organisation> updateOrganisation(@RequestBody Organisation organisation) {

        Organisation organisationById = organisationRepo.findById(organisation.getId());

        if (organisationById == null) {
            throw new ResourceNotFoundException("id = " + organisation.getId());
        }

        organisationRepo.save(organisation);

        return ResponseEntity.ok().build();
    }

    // Delete mapping to delete an organisation
    @DeleteMapping("/{id}")
    public ResponseEntity<Organisation> deleteOrganisation(@PathVariable Long id) {

        Organisation organisation = getOrganisationById(id);

        organisationRepo.delete(organisation);

        return ResponseEntity.ok(organisation);
    }

    // Post mapping to add a user to an organisation
    @PostMapping("/{id}")
    public ResponseEntity<User> addUser(@RequestBody User user, @PathVariable Long id) {

        Organisation organisation = organisationRepo.findById(id);
        User userToBeAdded = userRepository.findById(user.getId());

        organisation.addUser(userToBeAdded);
        userToBeAdded.addOrganisation(organisation);

        organisationRepo.save(organisation);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId()).toUri();

        return ResponseEntity.created(location).body(user);
    }

    // Delete mapping to delete a user from an organisation
    @DeleteMapping("/{organisationId}/{userId}")
    public ResponseEntity<Organisation> deleteUser(@PathVariable Long organisationId, @PathVariable Long userId) {

        Organisation organisation = getOrganisationById(organisationId);
        User user = userRepository.findById(userId);

        organisation.deleteUser(user);
        user.deleteOrganisation(organisation);

        organisationRepo.save(organisation);

        return ResponseEntity.ok(organisation);
    }

}
