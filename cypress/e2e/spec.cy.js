//Image exists after entering data and generating
it('Input is seen in display container', () => {
  cy.visit('/line.html')
  cy.enterChartInfo()
  cy.findByText("Generate chart").click()
  cy.findByTestId("chart-display").find("img").should('exist')
})
