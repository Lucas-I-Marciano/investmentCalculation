// What my table.js file needs?
// 1. Tailwindcss
// 2. <table> tag  without any elements
// 3. Two arrays to generate table
//     3.1 Data array
//     3.2 Array to caracterize the columns
//     3.3 If needed, a function to format data

export { createTable };

function isNonEmptyArray(arrayElement) {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
}

const createTable = (columnsArray, dataArray, tableId) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableId
  ) {
    throw new Error(
      "To create your table, please provide two arrays (column and data) and your table id"
    );
  }
  const tableElement = document.getElementById(tableId);
  if (!tableElement || tableElement.nodeName !== "TABLE") {
    throw new Error("Table not founded with this ID");
  }

  createTableHeader(tableElement, columnsArray);
  createTableBody(tableElement, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
  /* <table></table> ||
    <table>
        <thead></thead>
        <tbody></tbody>
    </table> 
    My goal it is to reach the second point, independently from where I start*/
  function createTheadElement(tableReference) {
    const thead = document.createElement("thead");
    tableReference.appendChild(thead);
    return thead;
  }
  const tableHeaderReference =
    // If it returns null, I will create by myself the <thead> element
    tableReference.querySelector("thead") ?? createTheadElement(tableReference);

  tableHeaderReference.innerHTML = "";
  // Inside <thead></thead> I want
  // <thead><tr> <th>Column Name1</th> <th>Column Name2</th> <th>Column Name3</th> </tr></thead>
  const headerRow = document.createElement("tr");
  for (const tableColumnObject of columnsArray) {
    // With "es6-string-html" extension, I can ask VS Code to format my innerHTML as html instead string by using /*html*/
    const headerElement = /*htmk*/ `<th class='text-center bg-blue-900 text-slate-200 sticky top-0'>${tableColumnObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }
  tableHeaderReference.appendChild(headerRow);
}

function createTableBody(tableReference, tableItems, columnsArray) {
  function createTbodyElement(tableReference) {
    const tbody = document.createElement("tbody");
    tableReference.appendChild(tbody);
    return tbody;
  }
  const tableBodyerReference =
    tableReference.querySelector("tbody") ?? createTbodyElement(tableReference);

  tableBodyerReference.innerHTML = "";
  for (const [itemsIndex, tableItem] of tableItems.entries()) {
    const tableRow = document.createElement("tr");
    if (itemsIndex % 2 === 1) {
      tableRow.classList.add("bg-blue-200");
    }
    for (const tableColumn of columnsArray) {
      const formatFunction = tableColumn.format ?? ((info) => info);
      tableRow.innerHTML += /*html*/ `<td class='text-center'>${formatFunction(
        tableItem[tableColumn.accessor]
      )}</td>`;
    }
    tableBodyerReference.appendChild(tableRow);
  }
}
