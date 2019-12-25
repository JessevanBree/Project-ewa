package urban.server.models.helpers;

import urban.server.models.CMS;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


/**
 * @Doel
 * @Author Jesse van Bree
 */
public class CMSDefaults {
    private List<CMS> defaults;
    private String[] locations;


    public CMSDefaults() {
        this.defaults = new ArrayList<>();

        /// Landing page
        this.defaults.add(new CMS("LANDING_TITLE", pages.landing.name(), "Dataset visualization tool of Empower 2.0", "Title in landing page text block"));
        this.defaults.add(new CMS("LANDING_INFO", pages.landing.name(),
                "EMPOWER 2.0 is the abbreviation of Empowering the citizens - Towards European Energy Market 2.0 (Enabling More People’s Ownership in Energy transition). The project aims to demonstrate and accelerate the empowerment of citizens to become active energy citizens - and to create local energy communities via existing civil society structures - through development of new solutions (e.g. organisational) and adoption of new, emerging and existing solutions for energy ownership. This will lead to an increase of energy awareness and renewable energy production, and hence reduce the environmental footprint in the North Sea Region."
        , "Text in landing page text block"));
        this.defaults.add(new CMS("LANDING_BUTTON", pages.landing.name(), "Explore", "Button text in landing page button"));

        // navbar
        this.defaults.add(new CMS("NAV_HOME", pages.navbar.name(), "Home", "Home page link in navbar"));
        this.defaults.add(new CMS("NAV_MY_UPLOADS", pages.navbar.name(), "My uploads", ""));
        this.defaults.add(new CMS("NAV_PROFILE", pages.navbar.name(), "Profile", ""));
        this.defaults.add(new CMS("NAV_ORG_PANEL", pages.navbar.name(), "Organisation panel", ""));
        this.defaults.add(new CMS("NAV_ADMIN", pages.navbar.name(), "Admin panel", ""));
        this.defaults.add(new CMS("NAV_LOG_IN", pages.navbar.name(), "Log in", ""));
        this.defaults.add(new CMS("NAV_LOG_OUT", pages.navbar.name(), "Log out", ""));

        // Home
        this.defaults.add(new CMS("HOME_SEARCH", pages.home.name(), "Search by year or name", ""));
        this.defaults.add(new CMS("HOME_REGION_FILTER", pages.home.name(), "Region filter", ""));
        this.defaults.add(new CMS("HOME_PUBLICITY_FILTER", pages.home.name(), "Publicity filter", ""));
        this.defaults.add(new CMS("HOME_FILTER_BUTTON", pages.home.name(), "Filter", ""));
        this.defaults.add(new CMS("HOME_LIST_TITLE", pages.home.name(), "Datasets", ""));
        this.defaults.add(new CMS("HOME_CHART_TITLE", pages.home.name(), "Dataset visualization", ""));
        this.defaults.add(new CMS("HOME_CHART_DOWNLOAD", pages.home.name(), "Download", ""));
        this.defaults.add(new CMS("HOME_DETAIL_TITLE", pages.home.name(), "Dataset visualization", ""));
        this.defaults.add(new CMS("HOME_DETAIL_NAME", pages.home.name(), "Name", ""));
        this.defaults.add(new CMS("HOME_DETAIL_DESC", pages.home.name(), "Description", ""));
        this.defaults.add(new CMS("HOME_DETAIL_REGION", pages.home.name(), "Region", ""));
        this.defaults.add(new CMS("HOME_DETAIL_PUBLICITY", pages.home.name(), "Publicity", ""));
        this.defaults.add(new CMS("HOME_DETAIL_YEAR", pages.home.name(), "Year", ""));
        this.defaults.add(new CMS("HOME_DETAIL_BY", pages.home.name(), "Uploaded by", ""));

        // My uploads
        this.defaults.add(new CMS("MY_UPLOADS_TITLE", pages.my_uploads.name(), "My uploaded datasets", ""));
        this.defaults.add(new CMS("MY_UPLOADS_UPLOAD_BUTTON", pages.my_uploads.name(), "Upload datasets", ""));
        this.defaults.add(new CMS("MY_UPLOADS_DL_HOVER", pages.my_uploads.name(), "Download dataset file", ""));
        this.defaults.add(new CMS("MY_UPLOADS_VIEW_HOVER", pages.my_uploads.name(), "View this dataset", ""));
        this.defaults.add(new CMS("MY_UPLOADS_EDIT_HOVER", pages.my_uploads.name(), "Edit this dataset", ""));
        this.defaults.add(new CMS("MY_UPLOADS_DEL_HOVER", pages.my_uploads.name(), "Delete this dataset", ""));

        // Profile
        this.defaults.add(new CMS("PROFILE_FIRSTNAME_EDIT", pages.profile.name(), "Firstname", ""));
        this.defaults.add(new CMS("PROFILE_SURNAME_EDIT", pages.profile.name(), "Surname", ""));
        this.defaults.add(new CMS("PROFILE_UPDATE_BUTTON", pages.profile.name(), "Update", ""));
        this.defaults.add(new CMS("PROFILE_UPDATE_COUNT", pages.profile.name(), "Uploads", ""));

        // Organisation panel
        this.defaults.add(new CMS("ORG_PANEL_NO_ORGANISATION_MSG", pages.org_panel.name(), "You are not part of any organisation", ""));
        this.defaults.add(new CMS("ORG_PANEL_NO_ORGANISATION_BTN", pages.org_panel.name(), "Back to the homepage", ""));

        // Admin panel
        //TODO: ADD ADMIN PANEL CMS VALUES

        // Login panel
        this.defaults.add(new CMS("LOGIN_TITLE", pages.log_in.name(), "Login", ""));
        this.defaults.add(new CMS("LOGIN_EMAIL", pages.log_in.name(), "Email", ""));
        this.defaults.add(new CMS("LOGIN_PASSWORD", pages.log_in.name(), "Password", ""));
        this.defaults.add(new CMS("LOGIN_BUTTON", pages.log_in.name(), "Login", ""));
        this.defaults.add(new CMS("LOGIN_FORGET", pages.log_in.name(), "Forgot password?", ""));

        // Admin panel
        //TODO: ADD CMS VALUES FOR CRUD MODALS

        this.locations = new String[]{
                "LANDING_TITLE",
                "LANDING_INFO",
                "LANDING_BUTTON",
                "NAV_HOME",
                "NAV_MY_UPLOADS",
                "NAV_PROFILE",
                "NAV_ORG_PANEL",
                "NAV_ADMIN",
                "NAV_LOG_IN",
                "NAV_LOG_OUT",
                "HOME_SEARCH",
                "HOME_REGION_FILTER",
                "HOME_PUBLICITY_FILTER",
                "HOME_FILTER_BUTTON",
                "HOME_LIST_TITLE",
                "HOME_CHART_TITLE",
                "HOME_CHART_DOWNLOAD",
                "HOME_DETAIL_TITLE",
                "HOME_DETAIL_NAME",
                "HOME_DETAIL_DESC",
                "HOME_DETAIL_REGION",
                "HOME_DETAIL_PUBLICITY",
                "HOME_DETAIL_YEAR",
                "HOME_DETAIL_BY",
                "MY_UPLOADS_TITLE",
                "MY_UPLOADS_UPLOAD_BUTTON",
                "MY_UPLOADS_DL_HOVER",
                "MY_UPLOADS_VIEW_HOVER",
                "MY_UPLOADS_EDIT_HOVER",
                "MY_UPLOADS_DEL_HOVER",
                "PROFILE_FIRSTNAME_EDIT",
                "PROFILE_SURNAME_EDIT",
                "PROFILE_UPDATE_BUTTON",
                "PROFILE_UPDATE_COUNT",
                "ORG_PANEL_NO_ORGANISATION_MSG",
                "ORG_PANEL_NO_ORGANISATION_BTN",
                "LOGIN_TITLE",
                "LOGIN_EMAIL",
                "LOGIN_PASSWORD",
                "LOGIN_BUTTON",
                "LOGIN_FORGET"
        };
    }

    @Override
    public String toString() {
        return defaults.stream().map(CMS::getLocation).collect(Collectors.joining("\",\n\""));
    }

    public List<CMS> getDefaults() {
        return defaults;
    }

    public String[] getAppPages() {
        return Arrays.stream(pages.values()).map(Enum::name).toArray(String[]::new);
    }

    public String[] getLocations() {
        return locations;
    }

    private enum pages {
        navbar,
        landing,
        home,
        my_uploads,
        profile,
        org_panel,
        admin,
        log_in

    }

}
