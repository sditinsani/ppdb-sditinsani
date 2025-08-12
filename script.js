// Inisialisasi Chart
document.addEventListener('DOMContentLoaded', function() {
    // Chart Pendaftaran Harian
    const registrationCtx = document.getElementById('registrationChart').getContext('2d');
    const registrationChart = new Chart(registrationCtx, {
        type: 'line',
        data: {
            labels: ['1 Jun', '2 Jun', '3 Jun', '4 Jun', '5 Jun', '6 Jun', '7 Jun'],
            datasets: [{
                label: 'Jumlah Pendaftar',
                data: [12, 19, 15, 27, 22, 18, 24],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart Distribusi Usia
    const ageCtx = document.getElementById('ageDistributionChart').getContext('2d');
    const ageChart = new Chart(ageCtx, {
        type: 'bar',
        data: {
            labels: ['5 Tahun', '6 Tahun', '7 Tahun', '8 Tahun'],
            datasets: [{
                label: 'Jumlah Pendaftar',
                data: [45, 120, 60, 23],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(241, 196, 15, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(241, 196, 15, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

// Fungsi untuk toggle dropdown profil
const userProfile = document.querySelector('.user-profile');
if (userProfile) {
    userProfile.addEventListener('click', function() {
        // Tambahkan logika dropdown di sini
        console.log('Dropdown profil diklik');
    });
}
