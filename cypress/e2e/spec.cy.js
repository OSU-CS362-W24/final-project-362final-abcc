//e2e test 1
//Image exists after entering data and generating
it('Input is seen in display container', () => {
  cy.visit('/line.html')
  cy.enterChartInfo(1,2,3,3,5,9)
  cy.findByText("Generate chart").click()
  cy.findByTestId("chart-display").find("img").should('exist')
})

//e2e test 2
//Chart information is maintained between html chart layout pages
it('Chart details are maintained when switching between all three pages of chart type', () => {
  cy.visit('/line.html')
  cy.enterChartInfo(1,2,3,3,5,9)
  cy.findByText("Generate chart").click()
  cy.visit('/scatter.html')
  cy.checkChartInfo(1,2,3,3,5,9)
  cy.visit('/bar.html')
  cy.checkChartInfo(1,2,3,3,5,9)
})

//e2e test 3
it('Creating and Saving chart to gallery, should appear in gallery page', () => {
  cy.visit('/line.html')
  cy.enterChartInfo(1,2,3,3,5,9)
  cy.findByText("Generate chart").click()
  cy.findByText('Save chart').click()
  cy.visit('/')
  cy.findByTestId('gallery').findAllByRole('heading').eq(0).should('contain', "Test Chart")
  cy.visit('/line.html')
  cy.findByText('Chart title').findByRole("textbox").clear()
  cy.findByText('Chart title').type('Chart 2')
  cy.findByText("Generate chart").click()
  cy.findByText('Save chart').click()
  cy.visit('/')
  cy.findByTestId('gallery').findAllByRole('heading').eq(0).should('contain', "Test Chart")
  cy.findByTestId('gallery').findAllByRole('heading').eq(1).should('contain', "Chart 2")
})

//e2e test 4
it('Creating and Saving chart to gallery, then reopening saved chart, should display chart image', () => {
  cy.visit('/line.html')
})