const API_URL = "https://script.google.com/macros/s/AKfycbxy-Ph9RIQMnDDtsOhW8eFj03DK6gmbG1lupGDCYSZ7VBuf69FjvC810xL2U0hRoGfI0A/exec";

let allData = [];
let isFetching = false;

// Cache DOM elements
const elements = {
    tableBody: document.querySelector("#data-table tbody"),
    cardContainer: document.getElementById("card-view"),
    totalPendaftar: document.getElementById("total-pendaftar"),
    refreshButton: document.getElementById('refresh-data-button'),
    toastMessage: document.getElementById('toast-message'),
    searchInput: document.getElementById('search-input'),
    viewToggle: document.getElementById('view-toggle')
};

function showLoading() {
    elements.tableBody.innerHTML = `<tr><td colspan="6" class="loading">⏳ Memuat data...</td></tr>`;
    elements.cardContainer.innerHTML = `<div class="loading-card">⏳ Memuat data...</div>`;
    elements.totalPendaftar.textContent = "";
    
    if (elements.refreshButton) {
        elements.refreshButton.classList.add('is-loading');
        elements.refreshButton.disabled = true;
    }
}

function hideLoading() {
    if (elements.refreshButton) {
        elements.refreshButton.classList.remove('is-loading');
        elements.refreshButton.disabled = false;
    }
}

function showToast(message, isSuccess = true) {
    if (!elements.toastMessage) return;
    
    elements.toastMessage.textContent = message;
    elements.toastMessage.className = isSuccess ? 'toast-success' : 'toast-error';
    elements.toastMessage.style.display = 'block';
    
    setTimeout(() => {
        elements.toastMessage.style.opacity = '0';
        setTimeout(() => {
            elements.toastMessage.style.display = 'none';
            elements.toastMessage.style.opacity = '1';
        }, 500);
    }, 3000);
}

async function fetchData() {
    if (isFetching) return;
    isFetching = true;
    
    showLoading();
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validate and filter data
        allData = data.filter(row => 
            row["No. Urut"] && row["Nama Lengkap Siswa"]
        ).map(row => ({
            ...row,
            searchableName: row["Nama Lengkap Siswa"]?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        }));
        
        renderData(allData);
        showToast('Data berhasil diperbarui', true);
        
    } catch (error) {
        console.error("Gagal memuat data:", error);
        elements.tableBody.innerHTML = `<tr><td colspan="6" class="error">⚠️ Gagal memuat data: ${error.message}</td></tr>`;
        elements.cardContainer.innerHTML = `<div class="error-card">⚠️ Gagal memuat data: ${error.message}</div>`;
        showToast('Gagal memuat data', false);
    } finally {
        isFetching = false;
        hideLoading();
    }
}

function renderData(dataToRender) {
    elements.totalPendaftar.textContent = `Total: ${dataToRender.length}`;
    
    renderTableView(dataToRender);
    renderCardView(dataToRender);
}

function renderTableView(dataToRender) {
    elements.tableBody.innerHTML = "";
    
    if (dataToRender.length === 0) {
        const searchTerm = elements.searchInput?.value || "";
        const noDataMessage = searchTerm ? 
            `❌ Tidak ada data dengan nama '${searchTerm}'` : 
            `❌ Tidak ada data`;
        elements.tableBody.innerHTML = `<tr><td colspan="6" class="no-data">${noDataMessage}</td></tr>`;
        return;
    }
    
    dataToRender.forEach(row => {
        const tr = document.createElement("tr");
        const statusText = row["Status Pendaftaran"]?.toLowerCase();
        const statusClass = statusText === "diterima" ? "status-diterima" : 
                          statusText === "ditolak" ? "status-ditolak" : "status-pending";
        
        tr.innerHTML = `
            <td>${row["No. Urut"] || "-"}</td>
            <td>${row["Nama Lengkap Siswa"] || "-"}</td>
            <td>${row["Asal TK/RA"] || "-"}</td>
            <td>${row["Jenis Kelamin"] || "-"}</td>
            <td>${formatDate(row["Tanggal Pendaftaran"]) || "-"}</td>
            <td class="${statusClass}">${row["Status Pendaftaran"] || "-"}</td>
        `;
        elements.tableBody.appendChild(tr);
    });
}

function renderCardView(dataToRender) {
    elements.cardContainer.innerHTML = "";
    
    if (dataToRender.length === 0) {
        const searchTerm = elements.searchInput?.value || "";
        const noDataMessage = searchTerm ? 
            `❌ Tidak ada data dengan nama '${searchTerm}'` : 
            `❌ Tidak ada data`;
        elements.cardContainer.innerHTML = `<div class="no-data-card">${noDataMessage}</div>`;
        return;
    }
    
    const cardFragment = document.createDocumentFragment();
    
    dataToRender.forEach(row => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        const statusText = row["Status Pendaftaran"]?.toLowerCase();
        const statusClass = statusText === "diterima" ? "status-diterima" : 
                          statusText === "ditolak" ? "status-ditolak" : "status-pending";
        
        card.innerHTML = `
            <div class="card-item">
                <span class="card-label">No. Urut:</span>
                <span class="card-value">${row["No. Urut"] || "-"}</span>
            </div>
            <div class="card-item">
                <span class="card-label">Nama:</span>
                <span class="card-value">${row["Nama Lengkap Siswa"] || "-"}</span>
            </div>
            <div class="card-item">
                <span class="card-label">Asal TK/RA:</span>
                <span class="card-value">${row["Asal TK/RA"] || "-"}</span>
            </div>
            <div class="card-item">
                <span class="card-label">Jenis Kelamin:</span>
                <span class="card-value">${row["Jenis Kelamin"] || "-"}</span>
            </div>
            <div class="card-item">
                <span class="card-label">Tgl. Daftar:</span>
                <span class="card-value">${formatDate(row["Tanggal Pendaftaran"]) || "-"}</span>
            </div>
            <div class="card-item">
                <span class="card-label">Status:</span>
                <span class="card-value"><span class="${statusClass}">${row["Status Pendaftaran"] || "-"}</span></span>
            </div>
        `;
        cardFragment.appendChild(card);
    });
    
    elements.cardContainer.appendChild(cardFragment);
}

function formatDate(dateString) {
    if (!dateString) return null;
    
    try {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('id-ID');
    } catch {
        return dateString;
    }
}

function handleSearch() {
    const searchTerm = elements.searchInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const filteredData = allData.filter(row => {
        return row.searchableName.includes(searchTerm);
    });
    
    renderData(filteredData);
}

function toggleView() {
    const isCardView = elements.viewToggle.checked;
    
    if (isCardView) {
        document.querySelector('.table-container').style.display = 'none';
        document.querySelector('.card-container').style.display = 'block';
    } else {
        document.querySelector('.table-container').style.display = 'block';
        document.querySelector('.card-container').style.display = 'none';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    
    if (elements.refreshButton) {
        elements.refreshButton.addEventListener('click', fetchData);
    }
    
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', handleSearch);
    }
    
    if (elements.viewToggle) {
        elements.viewToggle.addEventListener('change', toggleView);
        // Set initial view
        toggleView();
    }
});

// Auto-refresh every 5 minutes
setInterval(fetchData, 5 * 60 * 1000);
