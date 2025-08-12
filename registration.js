document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.getElementById('nextBtn');
    
    nextBtn.addEventListener('click', function() {
        let isValid = true;
        
        // Validasi form
        document.querySelectorAll('[required]').forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (isValid) {
            alert('Form valid! Lanjut ke step berikutnya');
            // window.location.href = 'pendaftaran-2.html';
        } else {
            alert('Harap lengkapi semua field yang diperlukan');
        }
    });
});
