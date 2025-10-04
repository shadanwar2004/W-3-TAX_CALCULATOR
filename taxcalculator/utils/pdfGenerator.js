const PDFDocument = require('pdfkit');

function generateTaxReportPDF(user, income, taxAmount, res) {
  const doc = new PDFDocument();

  // Set response headers to serve PDF directly
  res.setHeader('Content-disposition', `attachment; filename=tax_report_${user.username}.pdf`);
  res.setHeader('Content-type', 'application/pdf');

  doc.pipe(res);

  doc.fontSize(20).text('Income Tax Report', { align: 'center' });

  doc.moveDown();
  doc.fontSize(12).text(`Name: ${user.username}`);
  doc.text(`Email: ${user.email}`);
  doc.text(`Income: ₹${income.toLocaleString()}`);
  doc.text(`Total Tax: ₹${taxAmount.toLocaleString()}`);

  doc.moveDown();
  doc.text('Thank you for using Tax Calculator API.', { align: 'center' });

  doc.end();
}

module.exports = generateTaxReportPDF;