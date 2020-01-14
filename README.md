# Installation guide
### Step 1: Installing the necessary software
Before cloning the respository we need to install some software first. 
It is required to install the Node Package Manager also known as **NPM**.

NPM can be installed from the official Node.js web site: [https://nodejs.org](https://nodejs.org)

After installing NPM you need to install the **Angular CLI**. Open your terminal on your device and execute the following line.

    > npm install -g @angular/cli

### Step 2: downloading the application to your local machine
On this git projects home page: https://gitlab.fdmci.hva.nl/alim3/project-ewa click on the blue dropdown button with clone on the right side.
After clicking the button, 2 links will appear, HTTP and SSH. Use the HTTP link.

After copying the link, open a terminal of your choice on your local machine (preferably git bash).
In the terminal, navigate to the install location by using the 'cd' command.

After navigating type: git clone 'LINK' into the terminal and press enter.
There is a possibility that you may need to insert login info. For this use the information of a hva gitlab account.

If everything was correct the project should be located on your local machine at the current working directory.

### Step 3: Running the application

If everything went succesful, you now have the Angular CLI installed globally on your computer. Now, navigate via the terminal to the project directory. Execute the following command (this command will run the Angular application):

    > ng serve

Now we will install the necessary  to run the Spring Boot application. One of the neccesary dependencies to run the Spring is to install **Java** on your computer. You can get the java from [here](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
The other dependency that is required is Maven and can be install [here](https://maven.apache.org/install.html) or you can use the integrated Maven of your IDE.

If everything went succesfully until this point, you are ready to start the Spring Boot application. You can start the Spring application by running the ***main*** thread in the
*ServerApplication* class.



# Work division
## Classes
| Studentcode | Team member    | Angular / Spring | Class |
| ----------- | -------------  | ---------------- | :--------------: |
| 500801418   | Jesse van Bree | Angular | admin-panel.component.ts |
| 500801418   | Jesse van Bree | Angular | admin-cms.component.ts |
| 500801418   | Jesse van Bree | Angular | admin-dataset.component.ts |
| 500801418   | Jesse van Bree | Angular | admin-users.component.ts |
| 500801418   | Jesse van Bree | Angular | admin-organisation.component.ts |
| 500801418   | Jesse van Bree | Angular | create-organisation.component.ts |
| 500801418   | Jesse van Bree | Angular | create-user.component.ts |
| 500801418   | Jesse van Bree | Angular | edit-user.component.ts |
| 500801418   | Jesse van Bree | Angular | navbar.component.ts |
| 500801418   | Jesse van Bree | Angular | search-array.pipe.ts |
| 500801418   | Jesse van Bree | Angular | search-cms-array.pipe.ts |
| 500801418   | Jesse van Bree | Angular | search-user-array.pipe.ts |
| 500801418   | Jesse van Bree | Angular | cms.service.ts |
| 500801418   | Jesse van Bree | Angular | user.service.ts |
| 500801418   | Jesse van Bree | Angular | CMS.ts |
| 500801418   | Jesse van Bree | Angular | user.ts |
| 500801418   | Jesse van Bree | Angular | organisation.ts |
| 500801418   | Jesse van Bree | Angular | dataset.ts |
| 500801418   | Jesse van Bree | Spring | CMSDefaults.java |
| 500801418   | Jesse van Bree | Spring | CMS.java |
| 500801418   | Jesse van Bree | Spring | CMSRepository.java |
| 500801418   | Jesse van Bree | Spring | JPACMSRepository.java |
| 500801418   | Jesse van Bree | Spring | CMSController.java |
| 500801418   | Jesse van Bree | Spring | UserController.java |
| 500801418   | Jesse van Bree | Spring | CMSView.java |
| 500801418   | Jesse van Bree | Spring | ServerApplication.java |

## Tests
| Studentcode | Team member    | Angular / Spring | Test class |
| ----------- | -------------  | ---------------- | :--------------: |
| 500801418   | Jesse van Bree | Spring | CMSDefaultsTest |
| 500801418   | Jesse van Bree | Spring | JPACMSRepositoryTest |
| 500801418   | Jesse van Bree | Spring | CMSTest |
| 500801418   | Jesse van Bree | Angular | admin-cms.component.spec.ts |
| 500801418   | Jesse van Bree | Angular | admin-panel.component.spec.ts |
| 500801418   | Jesse van Bree | Angular | CMS.spec.ts |
| 500801418   | Jesse van Bree | Angular | cms.service.spec.ts |

| Studentcode | Team member    | Angular / Spring | Test class |
| ----------- | -------------  | ---------------- | :--------------: |
| 500799742   | Abdul Vahip Zor | Spring | UserDefaultsTest |
| 500799742   | Abdul Vahip Zor | Spring | JPAUserRepositoryTest |
| 500799742   | Abdul Vahip Zor | Spring | UserTest |
| 500799742   | Abdul Vahip Zor | Angular | profile.component.spec.ts |
| 500799742   | Abdul Vahip Zor | Angular | navbar.component.spec.ts |
| 500799742   | Abdul Vahip Zor | Angular | dataset.spec.ts |
| 500799742   | Abdul Vahip Zor | Angular | search-array.pipe.spec.ts |
| 500799742   | Abdul Vahip Zor | Angular | auth-guard.service.spec.ts |

| Studentcode | Team member    | Angular / Spring | Test class |
| ----------- | -------------  | ---------------- | :--------------: |
| 500804036  | Mohamed Ben Ali | Spring | DatasetTest |
| 500804036  | Mohamed Ben Ali | Spring | MockChartDatasets |
| 500804036  | Mohamed Ben Ali | Spring | JPADatasetRepositoryTest |
| 500804036  | Mohamed Ben Ali | Spring | DatasetsControllerTest |
| 500804036  | Mohamed Ben Ali | Angular | dataset.service.spec.ts |
| 500804036  | Mohamed Ben Ali | Angular | dataset-overview.spec.ts |
| 500804036  | Mohamed Ben Ali | Angular | myuploads.component.spec.ts |
| 500804036  | Mohamed Ben Ali| Angular | upload-pop-up.component.spec.ts |
