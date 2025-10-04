const express = require('express');
const router = express.Router();
const pdfGenerator = require('../utils/pdfGenerator');
const taxLogic = require('../utils/taxLogic');

const computeTaxHandler = async (req, res) => {
  try {
    const { income, deductions } = req.body;

    if (typeof income !== 'number' || typeof deductions !== 'number') {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const taxAmount = taxLogic.calculateTax(income, deductions);

    res.json({ income, deductions, taxAmount });
  } catch (error) {
    console.error('Error computing tax:', error);
    res.status(500).json({ error: 'Failed to compute tax' });
  }
};

const downloadTaxReport = async (req, res) => {
  try {
    const { income, deductions } = req.body;

    if (typeof income !== 'number' || typeof deductions !== 'number') {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const taxAmount = taxLogic.calculateTax(income, deductions);

    // Prepare data for PDF
    const reportData = { income, deductions, taxAmount };

    // Generate PDF buffer
    const pdfBuffer = await pdfGenerator.generateTaxReport(reportData);

    // Set headers to prompt file download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=tax-report.pdf',
      'Content-Length': pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating tax report:', error);
    res.status(500).json({ error: 'Failed to generate tax report' });
  }
};

module.exports = {
  computeTaxHandler,
  downloadTaxReport,
};
module.exports = router;