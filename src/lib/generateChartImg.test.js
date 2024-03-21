const nock = require('nock');
const generateChartImg = require('./generateChartImg');

describe('generateChartImg', () => {
    beforeEach(() => {
        nock.cleanAll();
    });

    test('generate a chart image', async () => {
        const chartType = 'line';
        const chartData = [{ x: 1, y: 2 }, { x: 2, y: 3 }];
        const xLabel = 'x-axis';
        const yLabel = 'y-axis';
        const title = 'Test Chart';
        const color = 'blue';

        const mockResponse = new Blob(['test'], { type: 'image/png' });

        nock('https://quickchart.io')
            .post('/chart')
            .reply(200, mockResponse);

        const result = await generateChartImg(chartType, chartData, xLabel, yLabel, title, color);

        expect(result).toBeDefined();
        expect(typeof result).toBe('string');

    });
});