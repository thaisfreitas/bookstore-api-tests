Feature: Book Store API flow

  Scenario: Create and authorize user, rent books and validate
    Given I have a new random user
    When I create the user via API
    And I generate an access token
    And I confirm the user is authorized
    And I retrieve the list of books
    And I select and rent two books
    Then I should see the selected books in the user details