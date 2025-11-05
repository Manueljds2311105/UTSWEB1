// ===== LOGIN FUNCTIONALITY =====
if (document.getElementById('loginForm')) {
  const loginForm = document.getElementById('loginForm');
  
  loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      
      // Validasi input
      if (!email || !password) {
          alert('Email dan password harus diisi!');
          return;
      }
      
      // Cari user di data
      const user = dataPengguna.find(u => 
          u.email === email && u.password === password
      );
      
      if (user) {
          // Login berhasil
          localStorage.setItem('currentUser', JSON.stringify(user));
          window.location.href = 'dashboard.html';
      } else {
          // Login gagal
          showAlert('Email/password yang anda masukkan salah!');
      }
  });
}

// ===== MODAL FUNCTIONALITY =====
// Lupa Password Modal
const lupaPasswordBtn = document.getElementById('lupaPasswordBtn');
const lupaPasswordModal = document.getElementById('lupaPasswordModal');
const lupaPasswordForm = document.getElementById('lupaPasswordForm');

if (lupaPasswordBtn) {
  lupaPasswordBtn.addEventListener('click', function(e) {
      e.preventDefault();
      lupaPasswordModal.style.display = 'block';
  });
}

if (lupaPasswordForm) {
  lupaPasswordForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('emailReset').value;
      
      // Cek apakah email terdaftar
      const user = dataPengguna.find(u => u.email === email);
      
      if (user) {
          alert('Link reset password telah dikirim ke email: ' + email);
          lupaPasswordModal.style.display = 'none';
          lupaPasswordForm.reset();
      } else {
          alert('Email tidak terdaftar dalam sistem!');
      }
  });
}

// Daftar Modal
const daftarBtn = document.getElementById('daftarBtn');
const daftarModal = document.getElementById('daftarModal');
const daftarForm = document.getElementById('daftarForm');

if (daftarBtn) {
  daftarBtn.addEventListener('click', function(e) {
      e.preventDefault();
      daftarModal.style.display = 'block';
  });
}

if (daftarForm) {
  daftarForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nama = document.getElementById('namaDaftar').value;
      const email = document.getElementById('emailDaftar').value;
      const password = document.getElementById('passwordDaftar').value;
      
      // Validasi email sudah terdaftar
      const existingUser = dataPengguna.find(u => u.email === email);
      if (existingUser) {
          alert('Email sudah terdaftar! Gunakan email lain.');
          return;
      }
      
      // Validasi password minimal 6 karakter
      if (password.length < 6) {
          alert('Password minimal 6 karakter!');
          return;
      }
      
      // Tambah user baru
      const newUser = {
          id: dataPengguna.length + 1,
          nama: nama,
          email: email,
          password: password,
          role: "User"
      };
      
      dataPengguna.push(newUser);
      
      alert('Pendaftaran berhasil! Silakan login dengan akun baru Anda.');
      daftarModal.style.display = 'none';
      daftarForm.reset();
  });
}

// Close modal functionality
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      document.getElementById(modalId).style.display = 'none';
  });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
  }
});

// ===== UTILITY FUNCTIONS =====
function showAlert(message) {
  // Custom alert dengan styling lebih baik
  const alertBox = document.createElement('div');
  alertBox.className = 'custom-alert';
  alertBox.innerHTML = `
      <div style="
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 30px 40px;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          z-index: 10000;
          text-align: center;
          min-width: 300px;
      ">
          <p style="margin-bottom: 20px; color: #333; font-size: 16px;">${message}</p>
          <button onclick="this.parentElement.parentElement.remove()" style="
              background: #667eea;
              color: white;
              border: none;
              padding: 10px 30px;
              border-radius: 8px;
              cursor: pointer;
              font-size: 14px;
          ">OK</button>
      </div>
      <div style="
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 9999;
      " onclick="this.parentElement.remove()"></div>
  `;
  document.body.appendChild(alertBox);
}

// Format rupiah
function formatRupiah(angka) {
  return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Validasi email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ===== FORM VALIDATION =====
// Add real-time validation for all forms
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      
      inputs.forEach(input => {
          input.addEventListener('blur', function() {
              if (!this.value.trim()) {
                  this.style.borderColor = '#dc3545';
              } else {
                  this.style.borderColor = '#28a745';
              }
          });
          
          input.addEventListener('input', function() {
              if (this.value.trim()) {
                  this.style.borderColor = '#e0e0e0';
              }
          });
      });
  });
  
  // Email validation
  const emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach(input => {
      input.addEventListener('blur', function() {
          if (this.value && !validateEmail(this.value)) {
              this.style.borderColor = '#dc3545';
              
              // Show error message
              let errorMsg = this.nextElementSibling;
              if (!errorMsg || !errorMsg.classList.contains('error-msg')) {
                  errorMsg = document.createElement('span');
                  errorMsg.className = 'error-msg';
                  errorMsg.style.color = '#dc3545';
                  errorMsg.style.fontSize = '12px';
                  errorMsg.style.marginTop = '5px';
                  errorMsg.style.display = 'block';
                  errorMsg.textContent = 'Format email tidak valid';
                  this.parentNode.appendChild(errorMsg);
              }
          } else {
              // Remove error message
              const errorMsg = this.nextElementSibling;
              if (errorMsg && errorMsg.classList.contains('error-msg')) {
                  errorMsg.remove();
              }
              if (this.value) {
                  this.style.borderColor = '#28a745';
              }
          }
      });
  });
});

// ===== PREVENT BACK AFTER LOGOUT =====
window.addEventListener('load', function() {
  // Disable back button after logout
  if (window.location.href.includes('index.html')) {
      window.history.forward();
  }
});

// ===== CONSOLE GREETING =====
console.log('%c🎓 Aplikasi Toko Buku Online', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cDibuat untuk UTS Pemrograman Web 1', 'font-size: 14px; color: #666;');
console.log('%c\nCredentials untuk testing:', 'font-size: 12px; font-weight: bold;');
console.log('Email: rina@gmail.com | Password: rina123');
console.log('Email: agus@gmail.com | Password: agus123');
console.log('Email: siti@gmail.com | Password: siti123');