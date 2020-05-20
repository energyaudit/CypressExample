Feature: EATestFeature
   Test EA features

   Scenario:Test login feature
     Given I visit EA Site
     Given I click login link  
     # And I log in as user with "admin" and "password"
     Given I login as following
      |userName|Password|
      |admin   |password|