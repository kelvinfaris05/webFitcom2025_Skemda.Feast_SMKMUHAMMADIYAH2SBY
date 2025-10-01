// Global JavaScript functions for Smart Farm Website

// Authentication check
function checkAuth() {
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "index.html"
    return
  }

  // Set username in header
  const username = localStorage.getItem("username") || "User"
  document.getElementById("currentUser").textContent = username
}

// Logout function
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    window.location.href = "index.html"
  }
}

// Toggle submenu
function toggleSubmenu(event) {
  event.preventDefault()
  const submenu = event.target.closest(".nav-item").querySelector(".submenu")
  const chevron = event.target.querySelector(".fa-chevron-down")

  if (submenu.style.display === "block") {
    submenu.style.display = "none"
    chevron.classList.remove("fa-chevron-up")
    chevron.classList.add("fa-chevron-down")
  } else {
    submenu.style.display = "block"
    chevron.classList.remove("fa-chevron-down")
    chevron.classList.add("fa-chevron-up")
  }
}

// Format currency
function formatCurrency(amount) {
  return "Rp. " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

// Format date to Indonesian
function formatDateID(dateString) {
  const date = new Date(dateString)
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }
  return date.toLocaleDateString("id-ID", options)
}

// Show notification
function showNotification(message, type = "success") {
  const alertClass = type === "success" ? "alert-success" : "alert-danger"
  const notification = `
        <div class="alert ${alertClass} alert-dismissible fade show success-message" role="alert">
            <strong>${type === "success" ? "Berhasil!" : "Error!"}</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `

  document.body.innerHTML += notification

  // Auto dismiss after 3 seconds
  setTimeout(() => {
    document.querySelector(".success-message").style.display = "none"
  }, 3000)
}

// Initialize tooltips
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Bootstrap tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new window.bootstrap.Tooltip(tooltipTriggerEl)
  })

  // Auto-hide sidebar on mobile after link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        const offcanvas = window.bootstrap.Offcanvas.getInstance(document.getElementById("sidebar"))
        if (offcanvas) {
          offcanvas.hide()
        }
      }
    })
  })
})

// Utility functions
const Utils = {
  // Generate unique ID
  generateId: () => Date.now() + Math.random().toString(36).substr(2, 9),

  // Validate form data
  validateForm: (formData) => {
    for (const key in formData) {
      if (!formData[key] || formData[key].toString().trim() === "") {
        return false
      }
    }
    return true
  },

  // Local storage helpers
  storage: {
    get: (key) => {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      } catch (e) {
        console.error("Error parsing localStorage item:", e)
        return null
      }
    },

    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
        return true
      } catch (e) {
        console.error("Error setting localStorage item:", e)
        return false
      }
    },

    remove: (key) => {
      localStorage.removeItem(key)
    },
  },

  // Image handling
  imageToBase64: (file, callback) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      callback(e.target.result)
    }
    reader.readAsDataURL(file)
  },
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { Utils, formatCurrency, formatDateID, showNotification }
}
