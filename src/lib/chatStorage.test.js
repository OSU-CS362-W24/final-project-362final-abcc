/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const domTestingLibrary = require('@testing-library/dom');
require('@testing-library/jest-dom');

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
        const chart = {data: [1, 2, 3]}
        saveChart(chart)
        expect(loadAllSavedCharts()).toEqual([chart])
    })

    test('overwrites the existing data for a chart if an index is specified', () => {
        const chart1 = {data: [1, 2, 3]}
        const chart2 = {data: [4, 5, 6]}
        saveChart(chart1)
        saveChart(chart2, 0)
        expect(loadAllSavedCharts()).toEqual([chart2])
    })

    test('adds a new chart to the end of the array of charts if no index is specified', () => {
        const chart1 = {data: [1, 2, 3]}
        const chart2 = {data: [4, 5, 6]}
        saveChart(chart1)
        saveChart(chart2)
        expect(loadAllSavedCharts()).toEqual([chart1, chart2])
    })
});