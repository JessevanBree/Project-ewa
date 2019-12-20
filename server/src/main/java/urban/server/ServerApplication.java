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
import urban.server.repositories.OrganisationRepository;
import urban.server.repositories.UserRepository;

import java.util.List;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(ServerApplication.class);

    private UserRepository userRepository;
    private OrganisationRepository organisationRepository;
    private DatasetRepository datasetRepository;

    @Autowired
    public ServerApplication(UserRepository userRepository,
                             OrganisationRepository organisationRepository,
                             DatasetRepository datasetRepository) {
        this.userRepository = userRepository;
        this.organisationRepository = organisationRepository;
        this.datasetRepository = datasetRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Override
    public void run(String... args) {
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


        for (int i = 0; i < 5; i++) {
            userRepository.save(users.get(i));
        }
    }
}
