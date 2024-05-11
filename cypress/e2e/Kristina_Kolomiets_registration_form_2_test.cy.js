beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/


describe('Section 1: Functional tests', () => {

const username = 'kristinatest'
let password = 'Pass12345'
const email = 'kristina.test@gmail.com'
const name = 'Kristina'
const lastName = 'Kolomiets'
const phone = '54678903'



    it('User can use only same both first and validation passwords', ()=>{
      
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get('#confirm').type("Pass123456")
        cy.get('#email').type(email)
        cy.get('[data-cy="name"]').type(name)
        cy.get('[data-testid="lastNameTestId"]').type(lastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(phone)
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should ('be.disabled')
        cy.get('#password_error_message').should('be.visible')
            .should('contain', 'Passwords do not match')

        cy.get('#confirm').clear().type(password)
        cy.get('#logo').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
      
    })
    
    it('User can submit form with all fields added', ()=>{
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get('#confirm').type(password)
        cy.get('#email').type(email)
        cy.get('[data-cy="name"]').type(name)
        cy.get('[data-testid="lastNameTestId"]').type(lastName)
        cy.get('[data-testid="phoneNumberTestId"]').type(phone)
        cy.get('input[type="radio"]').eq(2).check().should('be.checked')
        cy.get('.checkbox.vehicles').eq(0).check().should('be.checked') 
        cy.get('#cars').select('Volvo')
        cy.get('#animal').select('Cat')

        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should ('be.enabled'). click()
        cy.get('#success_message').should('be.visible')
            .and('contain', 'User successfully submitted registration');
    })
       

    it('User can submit form with only mandatory fields added', ()=>{

        onlyMandatoryData('kristinatest')

        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should ('be.enabled'). click()
        cy.get('#success_message').should('be.visible')
                .and('contain', 'User successfully submitted registration')   

    })
    
     it('User can NOT submit form without mandatory fields email and last name', ()=>{
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get('#confirm').type(password)
        cy.get('[data-cy="name"]').type(name)
        cy.get('[data-testid="phoneNumberTestId"]').type(phone)
    
        cy.get('h2').contains('Password section').click()
        cy.get('.submit_button').should ('be.disabled')
        
    });
    
    function onlyMandatoryData(kristinatest) {
        cy.log('Username will be filled');
        cy.get('input[data-testid="user"]').type(kristinatest);
        cy.get('#email').type(email);
        cy.get('[data-cy="name"]').type(name);
        cy.get('#lastName').type(lastName);
        cy.get('[data-testid="phoneNumberTestId"]').type(phone);
        cy.get('#password').type(password);
        cy.get('#confirm').type(password);
        cy.get('h2').contains('Password').click();
    }
    
        
/*____________________________________________________________________________________________________
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 116)
            .and('be.greaterThan', 80)   
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.url().should('contain', '/registration_form_2.html')
        cy.log('Back again in registration form 2')
    })

    it('My test for second link', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.url().should('contain', '/registration_form_2.html')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })


    it('Check that checkbox is correct', () => {
        cy.get('.checkbox.vehicles').should('have.length', 3)
        cy.get('.checkbox.vehicles').next().eq(0).should('have.text','I have a bike')
        cy.get('.checkbox.vehicles').next().eq(1).should('have.text','I have a car')
        cy.get('.checkbox.vehicles').next().eq(2).should('have.text','I have a boat')
      
        cy.get('.checkbox.vehicles').eq(0).should('not.be.checked')
        cy.get('.checkbox.vehicles').eq(1).should('not.be.checked')
        cy.get('.checkbox.vehicles').eq(2).should('not.be.checked')

        cy.get('.checkbox.vehicles').eq(0).check().should('be.checked')
        cy.get('.checkbox.vehicles').eq(1).check().should('be.checked')
      
    })

    it('Car dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    it('Animal dropdown is correct', () => {
        cy.get('#animal').select(4).screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')

        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow','mouse'])
        })
    })

    })

})