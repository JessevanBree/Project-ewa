package urban.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import urban.server.models.Organisation;
import urban.server.models.User;
import urban.server.repositories.OrganisationRepository;
import urban.server.repositories.UserRepository;

import java.util.List;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(ServerApplication.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrganisationRepository organisationRepository;

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

        for (int i = 0; i < 5; i++) {
            User user = User.generateRandomUser();
            logger.info("{}", user);
            user = userRepository.save(user);

            Organisation organisation = Organisation.getRandomRegistration();
            logger.info("{}", organisation);
            organisation.addUser(user);

            organisation = organisationRepository.save(organisation);
            user = userRepository.save(user);
        }
    }
}
