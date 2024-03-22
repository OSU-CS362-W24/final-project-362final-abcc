/**
 * @jest-environment jsdom
 */

const {
    saveChart,
    loadAllSavedCharts,
    loadSavedChart,
    updateCurrentChartData,
    loadCurrentChartData
  } = require('./chartStorage')


beforeEach(() => {
    localStorage.clear()
})

describe('saveChart', () => {
    test('saves a chart in the collection of saved charts', () => {
        const chart = {
            x_axis: "x",
            y_axis: "y",
            type: 'line',
            data: [{x: 1, y: 2},
                    {x: 2, y:3}]
            }
        saveChart(chart)
        const savedCharts = JSON.parse(localStorage.getItem("savedCharts"))
        expect(savedCharts.length).toBe(1)
        expect(savedCharts[0]).toEqual(chart)
    })

    test('overwrites the existing data for a chart if an index is specified', () => {
        var chart1 = ({
            type: "scatter",
            data: [{x:4,y:1},{x:5,y:11},{x:12,y:12},{x:15,y:12}],
            xLabel: "x-Label",
            yLabel: "y-Label",
            title: "Sample chart"
        })
        localStorage.setItem("savedCharts", JSON.stringify([chart1]))
        var chart2 = ({
            type: "line",
            data: [{x:3,y:5},{x:6,y:9},{x:10,y:10},{x:13,y:15}],
            xLabel: "alt-x-Label",
            yLabel: "alt-y-Label",
            title: "alt-Sample-chart"
        })
        saveChart(chart2, 0)
        const savedCharts = JSON.parse(localStorage.getItem("savedCharts"))
        expect(savedCharts.length).toBe(1)
        expect(savedCharts[0]).toEqual(chart2)
    })

    test('adds a new chart to the end of the array of charts if no index is specified', () => {
        var chart1 = ({
            type: "scatter",
            data: [{x:4,y:1},{x:5,y:11},{x:12,y:12},{x:15,y:12}],
            xLabel: "x-Label",
            yLabel: "y-Label",
            title: "Sample chart"
        })
        var chart2 = ({
            type: "line",
            data: [{x:3,y:5},{x:6,y:9},{x:10,y:10},{x:13,y:15}],
            xLabel: "alt-x-Label",
            yLabel: "alt-y-Label",
            title: "alt-Sample-chart"
        })
        saveChart(chart1)
        saveChart(chart2)
        const savedCharts = JSON.parse(localStorage.getItem("savedCharts"))
        expect(savedCharts.length).toBe(2)
        expect(savedCharts[0]).toEqual(chart1)
        expect(savedCharts[1]).toEqual(chart2)
    })
});

describe('loadAllSavedCharts', () => {
    test('loads and returns the array of all saved charts', () => {
        var chart1 = ({
            type: "scatter",
            data: [{x:4,y:1},{x:5,y:11},{x:12,y:12},{x:15,y:12}],
            xLabel: "x-Label",
            yLabel: "y-Label",
            title: "Sample chart"
        })
        var chart2 = ({
            type: "line",
            data: [{x:3,y:5},{x:6,y:9},{x:10,y:10},{x:13,y:15}],
            xLabel: "alt-x-Label",
            yLabel: "alt-y-Label",
            title: "alt-Sample-chart"
        })
        saveChart(chart1)
        saveChart(chart2)
        const savedCharts = JSON.parse(localStorage.getItem("savedCharts"))
        expect(loadAllSavedCharts()).toEqual(savedCharts)
    })
    test('returns an empty array if there are no saved charts', () => {
        expect(loadAllSavedCharts()).toEqual([])
    })
    test('throws a SyntaxError if the saved charts are not valid JSON', () => {
        localStorage.setItem("savedCharts", "invalid JSON")
        expect(() => loadAllSavedCharts()).toThrow(SyntaxError)
    })
});

describe('loadSavedChart', () => {
    test('loads and returns a specific chart from the array of saved charts', () => {
        var chart1 = ({
            type: "scatter",
            data: [{x:4,y:1},{x:5,y:11},{x:12,y:12},{x:15,y:12}],
            xLabel: "x-Label",
            yLabel: "y-Label",
            title: "Sample chart"
        })
        var chart2 = ({
            type: "line",
            data: [{x:3,y:5},{x:6,y:9},{x:10,y:10},{x:13,y:15}],
            xLabel: "alt-x-Label",
            yLabel: "alt-y-Label",
            title: "alt-Sample-chart"
        })
        var chart3 = ({
            type: "box",
            data: [{x:1,y:5},{x:2,y:3},{x:4,y:10},{x:6,y:9}],
            xLabel: "third-x-Label",
            yLabel: "third-y-Label",
            title: "third-sample-chart"
        })
        saveChart(chart1)
        saveChart(chart2)
        saveChart(chart3)
        const savedCharts = JSON.parse(localStorage.getItem("savedCharts"))
        expect(loadSavedChart(2)).toEqual(savedCharts[2])
    })
    test('returns an empty object if the index is out of range', () => {
        expect(loadSavedChart(100)).toEqual({})
    })
});

describe('updateCurrentChartData', () => {
    test('updates the current chart data', () => {
        var chart1 = ({
            type: "scatter",
            data: [{x:4,y:1},{x:5,y:11},{x:12,y:12},{x:15,y:12}],
            xLabel: "x-Label",
            yLabel: "y-Label",
            title: "Sample chart"
        })
        updateCurrentChartData(chart1)
        const savedCharts = JSON.parse(localStorage.getItem("currentChartData"))
        expect(loadCurrentChartData()).toEqual(savedCharts)
    })

    test('overwrites the existing current chart data', () => {
        var chart1 = ({
            type: "scatter",
            data: [{x:4,y:1},{x:5,y:11},{x:12,y:12},{x:15,y:12}],
            xLabel: "x-Label",
            yLabel: "y-Label",
            title: "Sample chart"
        })
        var chart2 = ({
            type: "line",
            data: [{x:3,y:5},{x:6,y:9},{x:10,y:10},{x:13,y:15}],
            xLabel: "alt-x-Label",
            yLabel: "alt-y-Label",
            title: "alt-Sample-chart"
        })
        updateCurrentChartData(chart1)
        updateCurrentChartData(chart2)
        const savedCharts = JSON.parse(localStorage.getItem("currentChartData"))
        expect(savedCharts).toEqual(chart2)
    })
});

describe('loadCurrentChartData', () => {
    test('loads and returns the data for the chart currently being built', () => {
        var chart1 = ({
            type: "scatter",
            data: [{x:4,y:1},{x:5,y:11},{x:12,y:12},{x:15,y:12}],
            xLabel: "x-Label",
            yLabel: "y-Label",
            title: "Sample chart"
        })
        updateCurrentChartData(chart1)
        const savedCharts = JSON.parse(localStorage.getItem("currentChartData"))
        expect(loadCurrentChartData()).toEqual(savedCharts)
    })
    test('returns an empty object if there is no current chart data', () => {
        expect(loadCurrentChartData()).toEqual({})
    })
});