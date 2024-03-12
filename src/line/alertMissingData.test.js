/**
 * @jest-environment jsdom
 */

const fs = require("fs")

require("whatwg-fetch")
require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default


function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    console.log(jsPath)
    jest.isolateModules(function() {
        require(jsPath)
    })
}


test("Test that an alert is displayed if the user tries to submit the form without supplying data", async () => {
    initDomFromFiles(__dirname + "/line.html", __dirname + "/line.js")
    // Arrange:
    const xInputLabel = domTesting.getByLabelText(document, "X label")
    const yInputLabel = domTesting.getByLabelText(document, "Y label")
    const xInputValueField = domTesting.getByLabelText(document, "X")
    const yInputValueField = domTesting.getByLabelText(document, "Y")
    const generateChart = domTesting.getByRole(document, "button", {name: "Generate chart"})

    const spy = jest.spyOn(window, "alert").mockImplementation(() => {});

    // Act:
    const user = userEvent.setup()
    await user.type(xInputLabel, "Cats")
    await user.type(yInputLabel, "Dogs")
    await user.clear(xInputValueField)
    await user.clear(yInputValueField)
    await user.click(generateChart)

    // Assert:
    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
})


test("Test that an alert is displayed if the user tries to submit the form without filling in axis labels", async () => {
    initDomFromFiles(__dirname + "/line.html", __dirname + "/line.js")

    // Arrange:
    const xInputLabel = domTesting.getByLabelText(document, "X label")
    const yInputLabel = domTesting.getByLabelText(document, "Y label")
    const xInputValueField = domTesting.getByLabelText(document, "X")
    const yInputValueField = domTesting.getByLabelText(document, "Y")
    const generateChart = domTesting.getByRole(document, "button", {name: "Generate chart"})

    const spy = jest.spyOn(window, "alert").mockImplementation(() => {});

    // Act:
    const user = userEvent.setup()
    await user.clear(xInputLabel)
    await user.clear(yInputLabel)
    await user.type(xInputValueField, "1")
    await user.type(yInputValueField, "2")
    await user.click(generateChart)

    // Assert:
    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
})

