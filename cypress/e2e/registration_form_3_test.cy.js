import 'cypress-file-upload';
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
    * /*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */
describe('Section 1: Functional tests', () => {
    

    const email = 'kristina.bonus@gmail.com'
    const name = 'Kristina Kolomiets'
    const bday = '1990-05-21'
   
    


        it('User can submit form with all fields added', ()=>{
          
            cy.get('#name').type(name)
            cy.get('[ng-model="email"]').type(email)
            cy.get('#country').select('Spain') 
            //important to use .select, then after selecting a country, the list of cities will appear
            cy.get('#city').select('Valencia')

            cy.contains('Date of registration').next().type('2024-01-05').should('have.value', '2024-01-05') 
            //need to be more specific in the name of date, as there are two dates in the form
            cy.get('input[type="radio"]').eq(1).check().should('be.checked')
            cy.get('#birthday').type(bday)
            
            cy.get('input[type="checkbox"]').should('have.length', 2)
            //So for the first test I actually check the whole as it is visible in the screenshot highlighted part:
            cy.get('input[type="checkbox"]').parent().should('contain', 'Accept our privacy policy')
            //As for the extra space in the end of the string, then we can use command "contain", instead of "have.text", which checks for exact match.
            cy.get('input[type="checkbox"]').parent().get('a[href]').should('contain', 'Accept our cookie policy')
            
            cy.get('input[type="file"]').attachFile({
                filePath: 'IMG_1681.jpg'
              });
              //need to use only name of the file, as the long path is not working as the file is located in the folder FIXTURES
              
            cy.contains('Submit file').click();
              // new page opens with the confirmation that the file was submitted
            cy.url().should('contain', '/upload_file.html?name=Kristina+Kolomiets&email=kristina.bonus%40gmail.com&freq=Weekly&birthday=1990-05-21&filename=IMG_1681.jpg')
            cy.go('back')
            //we need to go back, as the submit button for the form is located on the another page
            cy.url().should('contain', '/registration_form_3.html')
          
            // need to use 'force' as the button initiallt is disabled
            cy.get('input[type="submit"]').click({force: true})
            cy.get('#successFrame')
                .should('exist')
                .get('#successFrame')
            
            })
      
    
 //____________________________________________________________________________   
        
        
        it('User can submit form with only mandatory fields added', ()=>{
            
            cy.get('#name').type(name)
            cy.get('[ng-model="email"]').type(email)
            cy.get('#country').select('Spain') 
            cy.get('#city').select('Valencia')

            cy.contains('Date of registration').next().type('2024-01-05').should('have.value', '2024-01-05') 
            cy.get('input[type="radio"]').eq(1).check().should('be.checked')

        
            cy.get('input[type="checkbox"]').should('have.length', 2)
            cy.get('input[type="checkbox"]').parent().should('contain', 'Accept our privacy policy')
            cy.get('input[type="checkbox"]').parent().get('a[href]').should('contain', 'Accept our cookie policy')

            
            cy.get('input[type="submit"]').click({force: true})
            cy.get('#successFrame')
                .should('exist')
                .get('#successFrame')
    
        })

//___________________________________________________________________________________________________

        it('User can NOT submit form without name and email', ()=>{
            
            cy.get('#country').select('Spain') 
            cy.get('#city').select('Valencia')

            cy.contains('Date of registration').next().type('2024-01-05').should('have.value', '2024-01-05') 
            cy.get('input[type="radio"]').eq(1).check().should('be.checked')
            cy.get('#birthday').type(bday)
            
            cy.get('input[type="checkbox"]').should('have.length', 2)
            cy.get('input[type="checkbox"]').parent().should('contain', 'Accept our privacy policy')
            cy.get('input[type="checkbox"]').parent().get('a[href]').should('contain', 'Accept our cookie policy')
            
            cy.get('input[type="file"]').attachFile({
                filePath: 'IMG_1681.jpg'
              });
              
            cy.contains('Submit file').click();
            
            cy.url().should('contain', 'http://localhost:52873/cypress/fixtures/upload_file.html?name=&email=&freq=Weekly&birthday=1990-05-21&filename=IMG_1681.jpg')
            cy.go('back')
            cy.url().should('contain', '/registration_form_3.html')
          
        
            cy.get('input[type="submit"]').should ('be.disabled')
            })
        })
        


           
    

