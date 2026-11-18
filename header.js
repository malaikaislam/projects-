// funtionality of all code 
document.addEventListener('DOMContentLoaded', function () {
    const userProfile  = document.getElementById('userProfile');
    const userDropdown = document.getElementById('userDropdown');
    const userImg      = document.getElementById('userImg');
    const userName     = document.getElementById('userName');
    const hiddenSelect = document.getElementById('hiddenSelect');
    const items        = document.querySelectorAll('.user-dropdown a');

    // Dropdown open/close
    userProfile.addEventListener('click', function (e) {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
        userProfile.classList.toggle('active');
    });

    // Bahar click karne par band
    document.addEventListener('click', function (e) {
        if (!userProfile.contains(e.target)) {
            userDropdown.classList.remove('show');
            userProfile.classList.remove('active');
        }
    });

    // Item select → img + name + hidden select update
    items.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            const newName = this.getAttribute('data-name');
            const newImg  = this.getAttribute('data-img');

            userName.textContent = newName;   // ← Naam change
            userImg.src = newImg;             // ← Photo change

            // Hidden select ki value bhi update (form ke liye)
            if (hiddenSelect) {
                hiddenSelect.value = newName.toLowerCase().replace(/\s+/g, '');
            }

            userDropdown.classList.remove('show');
            userProfile.classList.remove('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. CATEGORY TABS SWITCHER (Cars, Private Jets, Boats & Yachts)
  // =========================================================================
  const categoryButtons = document.querySelectorAll(".category-tab-btn");

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // =========================================================================
  // 2. CUSTOM DROPDOWNS (Pickup Address, Select Destination, Select Time)
  // =========================================================================
  const selectWrappers = document.querySelectorAll(".custom-select-wrapper");

  const closeAllMenus = (exceptMenu = null) => {
    document.querySelectorAll(".custom-options-menu.open").forEach((menu) => {
      if (menu !== exceptMenu) {
        menu.classList.remove("open");
      }
    });
  };

  selectWrappers.forEach((wrapper) => {
    const input = wrapper.querySelector(".booking-input");
    const menu = wrapper.querySelector(".custom-options-menu");
    const options = wrapper.querySelectorAll(".option-item");

    if (!input || !menu) return;

    // Input par click karne se dropdown list open/close hogi
    input.addEventListener("click", (e) => {
      e.stopPropagation();
      const isAlreadyOpen = menu.classList.contains("open");
      closeAllMenus();
      if (!isAlreadyOpen) {
        menu.classList.add("open");
      }
    });

    // Kisi option ko select karne par value input box mein show hogi
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        const selectedValue = option.getAttribute("data-value") || option.textContent.trim();

        input.value = selectedValue;
        input.classList.add("is-filled");

        // Selected option ko highlight karein
        options.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");

        // Menu band karein
        menu.classList.remove("open");
      });
    });
  });

  // Bahar kahin bhi click karne par khuli hui lists band ho jayein
  document.addEventListener("click", () => {
    closeAllMenus();
  });

  // =========================================================================
  // 3. SELECT DATE PICKER (Day, Month, Year Calendar)
  // =========================================================================
  const dateInput = document.getElementById("bookingDateInput");
  const calendarIcon = document.getElementById("calendarTriggerBtn");

  if (dateInput) {
    // Aaj ki date set karein taaki past dates select na hon (optional)
    const today = new Date().toISOString().split("T")[0];

    const activateDatePicker = (e) => {
      e.stopPropagation();
      closeAllMenus();
      dateInput.type = "date";
      dateInput.min = today;

      if (typeof dateInput.showPicker === "function") {
        try {
          dateInput.showPicker();
        } catch (error) {
          dateInput.focus();
        }
      } else {
        dateInput.focus();
      }
    };

    dateInput.addEventListener("click", activateDatePicker);
    if (calendarIcon) {
      calendarIcon.addEventListener("click", activateDatePicker);
    }

    dateInput.addEventListener("change", () => {
      if (dateInput.value) {
        dateInput.classList.add("is-filled");
      } else {
        dateInput.classList.remove("is-filled");
        dateInput.type = "text";
      }
    });

    dateInput.addEventListener("blur", () => {
      if (!dateInput.value) {
        dateInput.type = "text";
        dateInput.classList.remove("is-filled");
      }
    });
  }

  // =========================================================================
  // 4. FORM SUBMISSION VALIDATION
  // =========================================================================
  const bookingForm = document.getElementById("luxuryBookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const activeCategory = document.querySelector(".category-tab-btn.active")?.dataset.category || "Cars";
      const pickup = document.getElementById("pickupAddressInput").value;
      const destination = document.getElementById("destinationAddressInput").value;
      const date = document.getElementById("bookingDateInput").value;
      const time = document.getElementById("bookingTimeInput").value;

      if (!pickup || !destination || !date || !time) {
        alert("Please select Pickup Address, Destination, Date, and Time before booking.");
        return;
      }

      alert(
        `Booking Confirmed!\nCategory: ${activeCategory}\nPickup: ${pickup}\nDestination: ${destination}\nDate: ${date}\nTime: ${time}`
      );
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // Existing filter tabs logic...
  const trendTabButtons = document.querySelectorAll(".trend-tab-btn");
  const trendingItems = document.querySelectorAll(".trending-item");

  trendTabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      trendTabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      trendingItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // NEW: Favorite Heart Click Logic (Turns Red on Click)
  const favButtons = document.querySelectorAll(".trend-fav-btn");
  favButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Card ya doosri cheezon par click event trigger na ho
      btn.classList.toggle("active"); // 'active' class toggle hogi jo color red kar degi
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.getElementById("cardsScrollContainer");
  const scrollLeftBtn = document.getElementById("scrollLeftBtn");
  const scrollRightBtn = document.getElementById("scrollRightBtn");

  if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
    // Har click par ek card ki width (295px + 16px gap = 311px) scroll hogi
    const scrollAmount = 311;

    scrollLeftBtn.addEventListener("click", () => {
      scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      });
    });

    scrollRightBtn.addEventListener("click", () => {
      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. Horizontal Scroll Arrow Buttons Logic
  const scrollWrapper = document.getElementById("handpickedScrollWrapper");
  const scrollLeftBtn = document.getElementById("handpickedScrollLeft");
  const scrollRightBtn = document.getElementById("handpickedScrollRight");

  if (scrollWrapper && scrollLeftBtn && scrollRightBtn) {
    const scrollAmount = 340; // Scroll distance per click

    scrollLeftBtn.addEventListener("click", () => {
      scrollWrapper.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      });
    });

    scrollRightBtn.addEventListener("click", () => {
      scrollWrapper.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    });
  }

  // 2. Favorite Heart Icon Click Logic (Turns Red)
  const favButtons = document.querySelectorAll(".handpicked-fav-btn");
  favButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.toggle("active");
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.getElementById("arrivePrevBtn");
  const nextBtn = document.getElementById("arriveNextBtn");
  
  const tagEl = document.getElementById("arriveTag");
  const headingEl = document.getElementById("arriveHeading");
  const descEl = document.getElementById("arriveDesc");
  const carImgEl = document.getElementById("arriveCarImage");

  // Array of slides containing unique text, tags, and images
  const slidesData = [
    {
      tag: "Luxury Experience Highlights",
      heading: "Arrive in Style — Rent the World's Finest Cars",
      desc: "From sleek sports cars to executive sedans, access a curated fleet of premium vehicles at your fingertips. Wherever you are, drive luxury without compromise.",
      img: "images/blackcar.png"
    },
    {
      tag: "Elite Supercar Collection",
      heading: "Unleash Pure Speed & Aerodynamic Power",
      desc: "Experience unmatched track performance and breathtaking design with our elite supercars built for ultimate status and thrilling speed.",
      img: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80"
    },
    {
      tag: "Executive Comfort",
      heading: "Travel in Prestige with Luxury Sedans",
      desc: "Arrive like royalty. Experience professional chauffeurs, high-end German engineering, and stress-free city transportation.",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  let currentIndex = 0;

  function renderSlide(index) {
    if (!headingEl || !carImgEl) return;

    // Fade out effect
    headingEl.style.opacity = "0";
    headingEl.style.transform = "translateY(10px)";
    descEl.style.opacity = "0";
    carImgEl.style.opacity = "0";
    carImgEl.style.transform = "scale(0.95)";

    setTimeout(() => {
      // Update content
      tagEl.textContent = slidesData[index].tag;
      headingEl.textContent = slidesData[index].heading;
      descEl.textContent = slidesData[index].desc;
      carImgEl.src = slidesData[index].img;

      // Fade in effect
      headingEl.style.opacity = "1";
      headingEl.style.transform = "translateY(0)";
      descEl.style.opacity = "1";
      carImgEl.style.opacity = "1";
      carImgEl.style.transform = "scale(1)";
    }, 250);
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slidesData.length;
      renderSlide(currentIndex);
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
      renderSlide(currentIndex);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const clientCards = document.querySelectorAll(".client-card");
  const reviewBox = document.getElementById("reviewBox");
  const reviewAuthorTitle = document.getElementById("reviewAuthorTitle");
  const reviewText = document.getElementById("reviewText");
  const ratingStars = document.getElementById("ratingStars");

  // Database of reviews for each client
  const reviewsData = [
    {
      title: "Emily Johnson - Austin, Texas",
      rating: 5,
      text: "The private jet service exceeded expectations in every possible way. Booking was incredibly smooth, the team was extremely helpful throughout, and every detail — from ground transport to in-flight concierge — was handled with precision and care. ITIRR made us feel confident, supported, and truly valued. A five-star experience that builds real trust."
    },
    {
      title: "Michael Smith - Denver, Colorado",
      rating: 5,
      text: "Renting the luxury supercar was an absolute game changer for our weekend getaway. The vehicle was delivered right to our hotel in pristine condition. ITIRR's customer support and global standards are truly unmatched in the luxury rental space."
    },
    {
      title: "Jessica Brown - Seattle, Washington",
      rating: 4,
      text: "Seamless booking and top-tier yacht charter experience. The crew was professional, the booking was instant, and everything went without a single hitch. Highly recommend ITIRR for anyone looking for uncompromised luxury."
    }
  ];

  clientCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove active class from all cards
      clientCards.forEach((c) => c.classList.remove("active"));
      // Add active class to clicked card
      card.classList.add("active");

      const index = card.getAttribute("data-index");
      const selectedReview = reviewsData[index];

      // Smooth fade transition
      reviewBox.style.opacity = "0";
      reviewBox.style.transform = "translateY(8px)";

      setTimeout(() => {
        // Update content
        reviewAuthorTitle.textContent = selectedReview.title;
        reviewText.textContent = `"${selectedReview.text}"`;

        // Generate stars dynamically based on rating
        let starsHtml = "";
        for (let i = 0; i < 5; i++) {
          if (i < selectedReview.rating) {
            starsHtml += `<i class="bi bi-star-fill text-warning"></i>`;
          } else {
            starsHtml += `<i class="bi bi-star text-muted"></i>`;
          }
        }
        ratingStars.innerHTML = starsHtml;

        // Fade back in
        reviewBox.style.opacity = "1";
        reviewBox.style.transform = "translateY(0)";
      }, 200);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const storeButtons = document.querySelectorAll(".store-btn");

  // Optional subtle click feedback for download buttons
  storeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Redirecting to mobile application store download...");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sliderWrapper = document.getElementById("sliderWrapper");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (sliderWrapper && prevBtn && nextBtn) {
    const scrollAmount = 330; // Scroll distance per click (card width + gap)

    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sliderWrapper.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    });

    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sliderWrapper.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      });
    });
  }

  // Heart Favorite Button Click Toggle (White to Red)
  const favButtons = document.querySelectorAll(".dest-fav-btn");
  favButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.toggle("active");
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const partnerBtn = document.getElementById("partnerBtn");

  if (partnerBtn) {
    partnerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Smooth interactive feedback when clicked
      alert("Redirecting to Partner Registration Program...");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("emailInput");
      if (emailInput && emailInput.value.trim() !== "") {
        alert(`Thank you for subscribing! Confirmation sent to: ${emailInput.value}`);
        emailInput.value = "";
      }
    });
  }
});




document.addEventListener("DOMContentLoaded", () => {
  const openVideoBtn = document.getElementById("openVideoModalBtn");
  const videoModalEl = document.getElementById("luxuryVideoModal");
  const videoFrame = document.getElementById("showcaseVideoFrame");

  // Apni showcase video ka embed URL yahan lagayein
  const showcaseVideoURL = "https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1";

  if (openVideoBtn && videoModalEl && videoFrame) {
    const bsModal = new bootstrap.Modal(videoModalEl);

    openVideoBtn.addEventListener("click", () => {
      videoFrame.src = showcaseVideoURL;
      bsModal.show();
    });

    // Modal band hone par video stop karne ke liye
    videoModalEl.addEventListener("hidden.bs.modal", () => {
      videoFrame.src = "";
    });
  }
});