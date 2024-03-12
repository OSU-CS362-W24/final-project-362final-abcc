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

test("Enter inputs and hit the + button check to see if there is space for new inputs and oldinputs are still there", async () => {
    initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`);

    // Arrange
    const xInput = domTesting.getByLabelText(document, "X");
    const yInput = domTesting.getByLabelText(document, "Y");
    const plusButton = domTesting.getByRole(document, "button", { name: "+" });

    // Act
    const user = userEvent.setup()
    await userEvent.type(xInput, "4");
    await userEvent.type(yInput, "9");
    await userEvent.click(plusButton);

    // Assert
    const newLineXInput = domTesting.getByTestId(document, "x-label-input");
    const newLineYInput = domTesting.getByTestId(document, "y-label-input");

    expect(newLineXInput).toHaveValue("");
    expect(newLineYInput).toHaveValue("");
    expect(xInput).toHaveValue(4);
    expect(yInput).toHaveValue(9);
});
