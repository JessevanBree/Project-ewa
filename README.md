
# Installation guide
### Step 1: Installing the neccesery software

### Step 2: Pull the git repository to your local machine
1. On this git projects home page: https://gitlab.fdmci.hva.nl/alim3/project-ewa click on the blue dropdown button with clone on the right side.
2. Copy the link of the prevered method SSH or HTTPS
3. On your local machine open a terminal of choice

### Step 3: Installing the neccesery packages
After forking the repository, you need to install some software. First you need to install the Node Package Manager also known as **NPM**.

NPM can be installed from the official Node.js web site: [https://nodejs.org](https://nodejs.org)

After installing NPM you need to install the **Angular CLI**. Open your terminal on your device and execute the following line.

    > npm install -g @angular/cli

If everything went succesful, you now have the Angular CLI installed globally on your computer. Now, navigate via the terminal to the project directory. Execute the following command (this command will run the Angular application):

    > ng serve

Now we will install everything to run the Spring Boot application. One of the neccesary dependencies to run the Spring is to install Java on your computer. You can get the java from [here](http://www.oracle.com/technetwork/java/javase/downloads/index.html).
### Step 4: Running the application


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
| 500801418   | Jesse van Bree | Spring | CMSDefaults |
| 500801418   | Jesse van Bree | Angular | admin-cms.component.spec.ts |
| 500801418   | Jesse van Bree | Angular | admin-dataset.component.spec.ts |
| 500801418   | Jesse van Bree | Angular | admin-organisation.component.spec.ts |
| 500801418   | Jesse van Bree | Angular | admin-organisation.component.spec.ts |