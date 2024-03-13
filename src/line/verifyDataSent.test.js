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
    require(jsPath)
}

beforeEach(() => {
    jest.resetModules()
})

test("Verify data is sent to generateChartImg", async () => {
    // Arrange
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

    // get X and Y input fields, X and Y data fields
    const xInputField = domTesting.getByLabelText(document, "X label")
    const yInputField = domTesting.getByLabelText(document, "Y label")
    const xDataField = domTesting.getByLabelText(document, "X")
    const yDataField = domTesting.getByLabelText(document, "Y")

    // Get generate chart button
    const generateChart = domTesting.getByRole(document, "button", {name: "Generate chart"})

    // Spy on generateChartImg
    // const spy = jest.spyOn(generateChartImgModule, "generateChartImg").mockResolvedValue("http://placekitten.com/480/480");
    jest.mock("../lib/generateChartImg.js")
    const spy = require("../lib/generateChartImg")

    spy.mockImplementation(() => {
        return "http://placekitten.com/480/480"
    })


    // Act
    const user = userEvent.setup()
    await user.type(xInputField, "Cats")
    await user.type(yInputField, "Dogs")
    await user.type(xDataField, "1")
    await user.type(yDataField, "2")
    await user.click(generateChart)

    // Assert
    // Check that the function was called
    expect(spy).toHaveBeenCalled();

    // Checked that the function returns the stubbed value
    const spyResult = spy.mock.results[0].value
    expect(spyResult).toBe("http://placekitten.com/480/480")

    // Clean up
    spy.mockRestore();
})