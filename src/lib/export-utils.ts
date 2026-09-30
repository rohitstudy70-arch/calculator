import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export function exportToPDF(
  title: string,
  summary: { label: string; value: string }[],
  tableHeaders: string[],
  tableData: (string | number)[][],
  chartImageBase64?: string
): void {
  const doc = new jsPDF();
  let currentY = 20;

  doc.setFontSize(18);
  doc.text(title, 14, currentY);
  currentY += 10;

  doc.setFontSize(12);
  summary.forEach((item) => {
    doc.text(`${item.label}: ${item.value}`, 14, currentY);
    currentY += 8;
  });
  currentY += 10;

  if (chartImageBase64) {
    try {
      doc.addImage(chartImageBase64, 'PNG', 14, currentY, 180, 80);
      currentY += 90;
    } catch (e) {
      console.error('Failed to add chart to PDF', e);
    }
  }

  if (tableHeaders.length > 0 && tableData.length > 0) {
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      startY: currentY,
    });
  }

  doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
}

export function exportToCSV(
  headers: string[],
  data: (string | number)[][],
  filename: string
): void {
  const csvContent = [
    headers.join(','),
    ...data.map(row => row.map(item => `"${String(item).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function exportToExcel(
  headers: string[],
  data: (string | number)[][],
  filename: string,
  sheetName: string = 'Sheet1'
): void {
  const worksheetData = [headers, ...data];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}
