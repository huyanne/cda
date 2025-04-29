document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageInfo = document.getElementById('page-info');
    const copyFeedback = document.getElementById('copy-feedback');

    const totalItems = 1801; // 0 to 1800
    const itemsPerPage = 100; // Adjust as needed
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let currentPage = 1;

    // --- Set Header Dates ---
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR'); // Format as DD/MM/YYYY for Brazil

    document.getElementById('table-creation-date').textContent = formattedDate;
    document.getElementById('table-update-date').textContent = formattedDate;
    document.getElementById('css-update-date').textContent = formattedDate;

    // --- Copy to Clipboard Function ---
    function copyToClipboard(text, element) {
        navigator.clipboard.writeText(text).then(() => {
            // Show feedback
            copyFeedback.textContent = `Copiado: ${text}`;
            copyFeedback.classList.add('show');
            // Highlight the clicked cell briefly
            element.style.backgroundColor = '#a8d8a8'; // Light green feedback

            setTimeout(() => {
                copyFeedback.classList.remove('show');
                 element.style.backgroundColor = ''; // Reset background
            }, 1500); // Hide feedback and reset style after 1.5 seconds
        }).catch(err => {
            console.error('Erro ao copiar texto: ', err);
            copyFeedback.textContent = 'Falha ao copiar!';
            copyFeedback.classList.add('show');
             setTimeout(() => copyFeedback.classList.remove('show'), 1500);
        });
    }

    // --- Display Page Function ---
    function displayPage(page) {
        currentPage = page;
        tableBody.innerHTML = ''; // Clear previous rows

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems); // Use totalItems

        for (let i = startIndex; i < endIndex; i++) {
            const row = tableBody.insertRow();
            const className = `wr-backcolor-${i}`;

            // Cell 1: Class Name
            const cell1 = row.insertCell();
            cell1.textContent = className;
            cell1.classList.add(className); // Add class for potential user CSS styling
            cell1.addEventListener('click', (e) => copyToClipboard(className, e.target));
            cell1.title = `Clique para copiar: ${className}`; // Tooltip

            // Cell 2: Number
            const cell2 = row.insertCell();
            cell2.textContent = i;
            cell2.classList.add(className); // Add class for potential user CSS styling
            cell2.addEventListener('click', (e) => copyToClipboard(i.toString(), e.target));
            cell2.title = `Clique para copiar: ${i}`; // Tooltip
        }

        // Update pagination controls
        pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    // --- Event Listeners for Pagination ---
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            displayPage(currentPage - 1);
             window.scrollTo(0, 0); // Scroll to top when changing page
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            displayPage(currentPage + 1);
             window.scrollTo(0, 0); // Scroll to top when changing page
        }
    });

    // --- Initial Load ---
    displayPage(1);
});
