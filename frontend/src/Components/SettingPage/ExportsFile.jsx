import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { ExpenseVarible } from "../../Context/expense/Expense";
import { useContext } from "react";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";

export default function ExportFile() {
  let { transection } = useContext(ExpenseVarible);

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, 210, 30);
    doc.setTextColor(0, 0, 0);
    doc.text("Expense Report", 60, 18);
    autoTable(doc, {
      head: [["Date", "Category", "Amount", "PaymentMode", "Item"]],
      body: transection.map((item) => [
        item.date.slice(0, 10),
        item.category,
        item.finalAmount,
        item.paymentMode,
        item.subCategory,
      ]),
    });
    doc.save("expense_report.pdf");
  };
  //! this fully make by ai
  const downloadCSV = () => {
    // CSV Header
    const header = ["Date", "Category", "Sub Category", "Amount"];

    // CSV Rows
    const rows = transection.map((item) => [
      new Date(item.date).toLocaleDateString("en-IN"),
      item.category,
      item.subCategory,
      item.finalAmount,
    ]);

    // Header + Rows
    const csvData = [header, ...rows].map((row) => row.join(",")).join("\n");

    // CSV File
    const blob = new Blob([csvData], {
      type: "text/csv;charset=utf-8;",
    });

    // Download
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "expense_report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };
  return (
    <div className="w-full rounded-3xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm" >
      {/* Heading */}
      <div className="flex items-center gap-3">
        <Download size={24} className="text-gray-600" />

        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Export Data
        </h1>
      </div>

      {/* Export Buttons */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* CSV */}
        <button
          className="group flex flex-col items-center justify-center
          rounded-3xl border border-gray-200 bg-white
          py-6 sm:py-8 transition-all duration-300
          hover:border-indigo-500 hover:shadow-md"
          onClick={downloadCSV}
        >
          <FaFileCsv className="w-7 h-7 text-green-600" />

          <p className="mt-3 text-lg sm:text-xl font-semibold text-gray-700">
            Export CSV
          </p>
        </button>

        {/* PDF */}
        <button
          className="group flex flex-col items-center justify-center
          rounded-3xl border border-gray-200 bg-white
          py-6 sm:py-8 transition-all duration-300
          hover:border-indigo-500 hover:shadow-md"
          onClick={downloadPdf}
        >

          <FaFilePdf className="w-7 h-7 text-red-500" />

          <p className="mt-3 text-lg sm:text-xl font-semibold text-gray-700">
            Export PDF
          </p>
        </button>
      </div>

      {/* Description */}
      <p className="mt-6 text-sm sm:text-lg leading-6 sm:leading-8 text-gray-500">
        Export your expense data for backup or analysis in other tools.
      </p>
    </div>
  );
}
