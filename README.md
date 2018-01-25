# test-interview-sejasa-react-native

1. Aplikasi memiliki tiga fungsi utama: menampilkan nilai tukar, menampilkan kepemilikan Anda dalam US $, dan mekanisme kunci sandi.
2. Saat membuka aplikasi untuk pertama kalinya, pengguna diminta menyiapkan kata sandi awal, konfirmasi kata sandi diperlukan.
3. Pengguna akan selalu dimintai password setiap saat kembali dari aplikasi lain, bahkan saat pengguna hanya menekan Home
4. Jika password salah, tampilkan peringatan dan aktivitas dekat
5. Pengguna dapat mengubah kata sandi dengan membuka halaman "Settings", dapat diakses melalui menu laci
6. Hanya ada satu item dalam setting, yaitu mengganti password.
7. Untuk mengganti kata sandi, pengguna perlu memasukkan kata sandi lama, kata sandi baru, dan konfirmasi kata sandi baru
8. Setelah menyiapkan password awal, user diarahkan ke halaman "Rates".
9. Halaman harga menampilkan 25 koin teratas dengan daftar atau kartu, termasuk logo, nama, harga di $, dan 24 jam terakhir% perubahan
10. Gunakan https://coinmarketcap.com/api/ atau API lain yang Anda sukai
11. Lakukan pull-to-refresh untuk menyegarkan tarif dari API
12. Saat pengguna mengetuk salah satu koin dalam daftar, tampilkan sebuah modal atau pop-up dengan textbox, tombol HODL, dan tombol CANCEL
13. Pengguna bisa memasukkan jumlah masing-masing koin yang dipegangnya, sampai 8 tempat desimal
14. Jumlah koin yang dipegangnya ditampilkan di halaman "Holding"
15. Awalnya, halaman Holding akan selalu kosong kecuali pengguna memiliki koin yang tersimpan
16. Saat memegang kosong, jangan tampilkan daftar apapun, malah tunjukkan pesan di latar belakang yang berbunyi: "Anda tidak punya koin, tolong beli beberapa!"
17. Saat pengguna memegang, menampilkan kartu atau daftar, menampilkan logo koin, nama, harga dalam $, perubahan 24 jam terakhir%, jumlah uang logam yang dipegang, dan jumlah koin dalam $
18. Mengklik satu koin dalam holding memungkinkan pengguna untuk mengubah jumlah holding untuk koin itu
19. Textbox harus terisi penuh sesuai dengan jumlah penahanan saat ini saat muncul
20. Jika jumlah baru dimasukkan, jumlah koin terus di $ segera diperbarui
21. Tampilkan total aset portofolio di $ di bagian atas laci, diperbarui bila tarif disegarkan
22. Tarif, Holding, dan Settings dapat diakses dari laci; Ada total 3 menu dalam laci
23. Dengan menggunakan proyek open source yang ada tidak diperbolehkan, Anda harus mengkodekan aplikasi dari awal. Dengan menggunakan perpustakaan, diperbolehkan
24. Gunakan desain minimal, fokus pada fungsionalitas
