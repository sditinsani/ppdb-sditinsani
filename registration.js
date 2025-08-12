document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ppdbForm');
    const nextBtn = document.querySelector('.btn-next');
    const steps = document.querySelectorAll('.step');
    
    // Validasi form sebelum lanjut ke step berikutnya
    nextBtn.addEventListener('click', function() {
        let isValid = true;
        
        // Cek semua input required
        form.querySelectorAll('[required]').forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        // Validasi khusus untuk usia
        const usiaInput = document.getElementById('usia');
        if (usiaInput.value < 5 || usiaInput.value > 8) {
            usiaInput.style.borderColor = '#e74c3c';
            isValid = false;
            alert('Usia calon siswa harus antara 5-8 tahun');
        }
        
        if (isValid) {
            // Update step indicator
            steps[0].classList.remove('active');
            steps[1].classList.add('active');
            
            // Scroll ke atas
            window.scrollTo(0, 0);
            
            // Ganti form ke step berikutnya (simulasi)
            alert('Form valid! Pada implementasi nyata akan lanjut ke step 2');
            // Di sini bisa diarahkan ke halaman berikutnya atau ganti form
        } else {
            alert('Harap lengkapi semua data yang diperlukan');
        }
    });
    
    // Format tampilan tanggal di input date
    const tanggalLahirInput = document.getElementById('tanggal_lahir');
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 8);
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 5);
    
    tanggalLahirInput.min = formatDate(minDate);
    tanggalLahirInput.max = formatDate(maxDate);
    
    function formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        
        return [year, month, day].join('-');
    }
});
