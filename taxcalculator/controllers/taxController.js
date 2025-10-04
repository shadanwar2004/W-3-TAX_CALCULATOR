const { computeTax } = require('../utils/taxLogic');
const generateTaxReportPDF = require('../utils/pdfGenerator');

router.post('/compute', computeTaxHandler);
router.post('/download-report', downloadTaxReport);


const computeTaxHandler = async (req, res, next) => {
  try {
    const { income } = req.body;

    if (typeof income !== 'number' || income < 0) {
      return res.status(400).json({ message: 'Income must be a positive number' });
    }

    const taxAmount = computeTax(income);

    res.json({
      income,
      taxAmount,
    });
  } catch (err) {
    next(err);
  }
};

const downloadTaxReport = async (req, res, next) => {
  try {
    const { income } = req.body;
    if (typeof income !== 'number' || income < 0) {
      return res.status(400).json({ message: 'Income must be a positive number' });
    }

    const taxAmount = computeTax(income);

    generateTaxReportPDF(req.user, income, taxAmount, res);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  computeTaxHandler,
  downloadTaxReport,
};

module.exports = router;
