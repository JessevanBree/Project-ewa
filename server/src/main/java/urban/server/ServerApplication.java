package urban.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import urban.server.models.CMS;
import urban.server.models.Dataset;
import urban.server.models.Organisation;
import urban.server.models.User;
import urban.server.models.helpers.CMSDefaults;
import urban.server.repositories.*;

import java.util.List;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(ServerApplication.class);

    private JPAUserRepository userRepository;
    private JPAOrganisationRepository organisationRepository;
    private JPADatasetRepository datasetRepository;
    private JPACMSRepository cmsRepository;
    private CMSDefaults cmsDefaults;

    @Autowired
    public ServerApplication(JPAUserRepository userRepository,
                             JPAOrganisationRepository organisationRepository,
                             JPADatasetRepository datasetRepository,
                             JPACMSRepository cmsRepository) {
        this.userRepository = userRepository;
        this.organisationRepository = organisationRepository;
        this.datasetRepository = datasetRepository;
        this.cmsRepository = cmsRepository;
        this.cmsDefaults = new CMSDefaults();
    }

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Override
    public void run(String... args) {
        this.createInitialUserData();
        this.createInitialCMSData();
    }

    protected void createInitialCMSData(){
        List<CMS> cmsList = this.cmsRepository.findAll();

        System.out.println("Configuring default CMS data");
        for (String location : cmsDefaults.getLocations()) {
            if(cmsList.stream().filter((cms) -> cms.getLocation().equals(location)).findFirst().isEmpty()){
                CMS toSave = cmsDefaults.getDefaults().stream().filter((cms) -> cms.getLocation().equals(location)).findFirst().orElse(null);
                if(toSave != null ) cmsRepository.save(toSave);
            }
        }
    }

    protected void createInitialUserData() {
        List<User> users = this.userRepository.findAll();
        if (users.size() > 0) return;

        System.out.println("Configuring some initial Users data");

        users.add(new User("mohamed@hva.nl", "mohamed", null, null, true));
        users.add(new User("jesse@hva.nl", "jesse", null, null, true));
        users.add(new User("abdul@hva.nl", "abdul", null, null, true));
        users.add(new User("ferran@hva.nl", "ferran", null, null, true));
        users.add(new User("maarten@hva.nl", "maarten", null, null, false));


        for (int i = 0; i < users.size(); i++) {
            userRepository.save(users.get(i));
        }
    }
}
