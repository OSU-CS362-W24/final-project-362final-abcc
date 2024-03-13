/**
 * @jest-environment jsdom
 */

const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function () {
        require(jsPath)
    })
}

test("clear chart data when clear button is clicked", async () => {
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`);

    // Arrange
    const xLabelInput = domTesting.getByLabelText(document, "X label");
    const yLabelInput = domTesting.getByLabelText(document, "Y label");
    const xValueInput = domTesting.getByTestId(document, "x-label-input");
    const yValueInput = domTesting.getByTestId(document, "y-label-input");
    const chartTitleInput = domTesting.getByLabelText(document, "Chart title");
    const chartColorInput = domTesting.getByLabelText(document, "Chart color");
    const clearButton = domTesting.getByRole(document, "button", { name: "Clear chart data" });
    const addButton = domTesting.getByText(document, "+");

    // Act
    await userEvent.type(xValueInput, "1");
    await userEvent.type(yValueInput, "2");
    await userEvent.click(addButton);
    await userEvent.type(xValueInput, "3");
    await userEvent.type(yValueInput, "4");
    await userEvent.type(chartTitleInput, "Example Title");
    await userEvent.click(chartColorInput);
    await userEvent.click(chartColorInput);
    await userEvent.click(chartColorInput);
    await userEvent.type(chartColorInput, "#ff4600");
    await userEvent.click(clearButton);

    // Get all X and Y value inputs
    const xValueInputs = document.querySelectorAll(".x-value-input");
    const yValueInputs = document.querySelectorAll(".y-value-input");

    // Assert
    expect(xLabelInput).toHaveValue("");
    expect(yLabelInput).toHaveValue("");
    expect(xValueInput).toHaveValue("");
    expect(yValueInput).toHaveValue("");
    expect(xValueInputs.length).toBe(1); // Only one set of X value inputs remaining
    expect(yValueInputs.length).toBe(1)
    expect(chartTitleInput).toHaveValue("");
    expect(chartColorInput).toHaveValue("#ff4500");
});


