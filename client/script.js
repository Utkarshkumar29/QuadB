document.addEventListener('DOMContentLoaded', fetchDataAndCreateTable);

async function fetchDataAndCreateTable() {
    try {
        const data = await fetchData('http://localhost:4000/getData');
        createTable(data);
    } catch (error) {
        console.log("Error getting the data", error);
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

function createTable(data) {
    const container = document.getElementById('container');
    const table = document.createElement('table');
    table.classList.add('custom-table');
    const headerRow = document.createElement('tr');
    headerRow.classList.add('header-row');
    const tagNames = ['#', 'Platform', 'Last Traded Price', 'Buy/Sell Price', 'Volume', 'Base_unit'];
    tagNames.forEach(tagName => {
        const headerCell = createTableCell(tagName, 'center', 'custom-cell');
        headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);

    data.forEach((ticker, index) => {
        const tickerRow = document.createElement('tr');
        tickerRow.classList.add('custom-row');
    
        const numberCell = document.createElement('td');
        numberCell.textContent = index + 1;
        numberCell.style.textAlign = 'center';
        numberCell.classList.add('custom-cell');
    
        const nameCell = document.createElement('td');
        nameCell.textContent = ticker.name;
        nameCell.style.textAlign = 'center';
        nameCell.classList.add('custom-cell');
    
        const lastCell = document.createElement('td');
        lastCell.textContent = `₹   ${ticker.last}`;
        lastCell.style.textAlign = 'center';
        lastCell.classList.add('custom-cell');
    
        const buySellCell = document.createElement('td');
        buySellCell.textContent = `₹${ticker.buy} / ₹${ticker.sell}`;
        buySellCell.style.textAlign = 'center';
        buySellCell.classList.add('custom-cell');
    
        const volumeCell = document.createElement('td');
        volumeCell.textContent = `${ticker.volume}`;
        volumeCell.style.textAlign = 'center';
        volumeCell.style.color = 'red';
        volumeCell.classList.add('custom-cell');
    
        const baseUnitCell = document.createElement('td');
        baseUnitCell.textContent = `${ticker.base_unit}`;
        baseUnitCell.style.textAlign = 'center';
        baseUnitCell.style.color = 'lightgreen';
        baseUnitCell.classList.add('custom-cell');
    
        tickerRow.appendChild(numberCell);
        tickerRow.appendChild(nameCell);
        tickerRow.appendChild(lastCell);
        tickerRow.appendChild(buySellCell);
        tickerRow.appendChild(volumeCell);
        tickerRow.appendChild(baseUnitCell);
    
        table.appendChild(tickerRow);
    });
    


    container.appendChild(table);
}

function createTableCell(content, textAlign, className) {
    const cell = document.createElement('td');
    cell.textContent = content;
    cell.style.textAlign = textAlign;
    cell.classList.add(className);
    return cell;
}
