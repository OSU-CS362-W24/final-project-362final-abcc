//Simple test
it('Input is seen in display container', () => {
  cy.visit('/line.html')
  cy.findByText('Chart title').type('Test Chart')
})
