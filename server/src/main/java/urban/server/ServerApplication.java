package urban.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import urban.server.models.Dataset;
import urban.server.models.Organisation;
import urban.server.models.User;
import urban.server.repositories.DatasetRepository;
import urban.server.repositories.JPAUserRepository;
import urban.server.repositories.OrganisationRepository;
import urban.server.repositories.UserRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(ServerApplication.class);

    @Autowired
    private JPAUserRepository userRepository;

    @Autowired
    private OrganisationRepository organisationRepository;

    @Autowired
    private DatasetRepository datasetRepository;

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        this.createInitials();
    }

    protected void createInitials() {
        List<User> users = this.userRepository.findAll();
        if (users.size() > 0) return;
        System.out.println("Configuring some initial Users data");

        users.add(new User("mohamed@hva.nl", "mohamed", null, null, true));
        users.add(new User("jesse@hva.nl", "jesse", null, null, true));
        users.add(new User("abdul@hva.nl", "abdul", null, null, true));
        users.add(new User("ferran@hva.nl", "ferran", null, null, true));
        users.add(new User("maarten@hva.nl", "maarten", null, null, false));


        User orgUser = User.generateRandomUser();
        orgUser = userRepository.save(orgUser);

        for (int i = 0; i < 5; i++) {
            Organisation organisation = Organisation.getRandomRegistration();
            logger.info("{}", organisation);
            organisation.addUser(users.get(i));

            if (i == 3) {
                User ferranUser = userRepository.findById((long) 9);
                organisation.setOrganisationAdmin(ferranUser);
            }
            if (i == 4) {

                organisation.setOrganisationAdmin(orgUser);
                logger.info("Org admin: {}", organisation.getOrganisationAdmin());

                organisation = organisationRepository.save(organisation);
//                secondUser = userRepository.save(secondUser);
            }

            organisationRepository.save(organisation);
            userRepository.save(users.get(i));
        }
    }
}
