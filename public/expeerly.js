(function () {
  /**
   * expeerly()
   *
   * Finds all <expeerly> elements, retrieves config from their attributes,
   * fetches the video data from the Bubble endpoint, and renders a layout
   */
  function expeerly() {
    const expeerlyElements = document.querySelectorAll("expeerly");
    if (!expeerlyElements.length) {
      console.warn("Expeerly: No <expeerly> elements found on the page.");
      return;
    }

    // For simple localization of the “(X reviews)” text
    const REVIEW_TEXT_MAP = {
      en: "reviews",
      de: "Bewertungen",
      fr: "avis",
      it: "recensioni",
    };

    // For localized footer text
    const FOOTER_TEXT_MAP = {
      en: "Expeerly is an independent review community and service. Learn more.",
      de: "Expeerly ist eine unabhängige Bewertungs-Community und Service. Mehr erfahren.",
      fr: "Expeerly est une communauté et un service d'évaluation indépendant. En savoir plus.",
      it: "Expeerly è una comunità e un servizio di recensioni indipendente. Scopri di più.",
    };

    expeerlyElements.forEach((container) => {
      // Gather attributes
      const gtin = container.getAttribute("gtin");
      if (!gtin) {
        container.innerHTML = "Expeerly: Missing GTIN attribute.";
        return;
      }
      const maxVideos = parseInt(
        container.getAttribute("max-videos") || "999",
        10
      );
      const accentColor = container.getAttribute("accent-color") || "#00bcd4";
      const theme = container.getAttribute("theme") || "light"; // 'light' or 'dark'
      const lang = container.getAttribute("lang") || "en";
      const storeId = container.getAttribute("store-id") || "";

      // Show loading placeholder
      container.innerHTML = "<div>Loading Expeerly reviews...</div>";

      // Build API URL with dynamic GTIN
      const apiUrl = `https://app.expeerly.com/version-71uz2/api/1.1/wf/get-product-videos-processed/?gtin=${encodeURIComponent(
        gtin
      )}`;

      // Fetch from the API
      fetch(apiUrl)
        .then((resp) => resp.json())
        .then((data) => {
          if (
            !data ||
            data.status !== "success" ||
            !data.response ||
            !Array.isArray(data.response.videos)
          ) {
            container.innerHTML = "No Expeerly reviews available.";
            return;
          }

          const allVideos = data.response.videos;
          const totalCount = allVideos.length;
          if (!totalCount) {
            container.innerHTML = "No Expeerly reviews found for this product.";
            return;
          }

          // Compute average rating across ALL videos
          let sumRating = 0;
          allVideos.forEach((vid) => {
            if (typeof vid.rating_number === "number") {
              sumRating += vid.rating_number;
            }
          });
          const avgRating = sumRating / totalCount;
          const avgRating1Decimal = (Math.round(avgRating * 10) / 10).toFixed(
            1
          );

          // Slice displayed videos
          const videos = allVideos.slice(0, maxVideos);

          // Choose Expeerly icon based on theme
          const expeerlyLogo =
            theme === "dark"
              ? "./expeerly_reviewed_icon_DARK.svg"
              : "./expeerly_reviewed_icon_LIGHT.svg";

          // Build final HTML
          let html = `
          <div class="expeerly-wrapper" style="max-width:900px; margin:20px auto; padding:10px;">
            <!-- Header: Expeerly icon + rating + (X reviews) -->
            <div style="display:flex; flex-direction: column; align-items:flex-start; gap:10px; margin-bottom:8px;">
              <img src="${expeerlyLogo}" alt="Expeerly Logo" style="height:60px;" />
              <!-- Put rating block below the logo with margin-top -->
              <div style="display: flex; gap: 10px;">
                <div style="font-size:1.5rem; color:#2C1277; font-weight:bold;">
                  ${avgRating1Decimal}
                </div>
                <div style="display:inline-flex; align-items:center; margin-top:4px;">
                  ${renderStarsInline(avgRating)}
                  <span style="margin-left:8px; color:#ff0080; font-weight:500;">
                    (${totalCount} ${
            REVIEW_TEXT_MAP[lang] || REVIEW_TEXT_MAP.en
          })
                  </span>
                </div>
              </div>
            </div>

            <!-- Video Slider -->
            <div style="display:flex; gap:16px; overflow-x:auto; padding:8px 0;">
          `;

          videos.forEach((vid) => {
            const playbackId = vid.mux_playback_id_text || "";
            const firstName = vid.reviewer_first_name_text || "User";
            // Shorten last name: capital first letter + "."
            const lastNameFull = vid.reviewer_last_name_text || "";
            const shortLast = lastNameFull
              ? lastNameFull[0].toUpperCase() + "."
              : "";

            const rating =
              typeof vid.rating_number === "number" ? vid.rating_number : 0;

            html += `
              <div style="position:relative; width:180px; height:320px; border-radius:8px; overflow:hidden; flex-shrink:0;">
                <!-- MUX Player -->
                <mux-player
                  playback-id="${playbackId}"
                  stream-type="on-demand"
                  controls
                  muted
                  style="width:100%; height:100%; object-fit:cover;"
                  data-store-id="${storeId}"
                >
                </mux-player>
                
                <!-- Top-left rating + view count under it -->
                <div style="position:absolute; top:8px; left:8px; color:white;">
                  <div style="display:flex; margin-bottom:4px;">
                    ${renderStarsInline(rating, 16)}
                  </div>
                  <div style="display:flex; align-items:center; font-size:0.85rem;">
                    <svg style="width:14px; height:14px; margin-right:4px;" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                    1.425.255
                  </div>
                </div>

                <!-- Bottom overlay with reviewer info -->
                <div style="position:absolute; bottom:0; left:0; width:100%;
                  background:linear-gradient(transparent, rgba(0,0,0,0.7)); color:white;
                  padding:8px; display:flex; align-items:center; gap:8px; font-size:0.9rem;">
                  <!-- Gray circle placeholder for avatar -->
                  <div style="width:32px; height:32px; background:#ccc; border-radius:50%; flex-shrink:0;"></div>
                  <div style="display:flex; align-items:center; gap:6px;">
                    <span>${firstName} ${shortLast}</span>
                    <!-- Verified check placeholder -->
                    <svg style="width:16px; height:16px; border-radius:50%; background:#1ecbe1; fill:white;" viewBox="0 0 24 24">
                      <path d="M9 16.17l-3.88-3.88-1.42 1.42L9 19l10-11-1.41-1.41z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            `;
          });

          // Close the slider, add footer
          html += `
            </div>
            <!-- Footer text -->
            <div style="margin-top:12px; font-size:0.9rem; color:${accentColor}">
              <p>
                ${FOOTER_TEXT_MAP[lang] || FOOTER_TEXT_MAP.en}
                <a href="https://expeerly.com" target="_blank" rel="noopener noreferrer" style="color:${accentColor}; text-decoration:underline;">
                  <strong>Expeerly.com</strong>
                </a>
              </p>
            </div>
          </div>
          `;

          container.innerHTML = html;
        })
        .catch((err) => {
          console.error("Expeerly fetch error:", err);
          container.innerHTML = "Error loading Expeerly reviews.";
        });
    });

    /**
     * Renders 5 stars inline (filled or empty) for the given rating,
     * with default size=20. If rating=4.2 => 4 filled, 1 empty.
     */
    function renderStarsInline(rating, starSize = 20) {
      let starsHTML = "";
      const roundRating = Math.round(rating);
      for (let i = 0; i < 5; i++) {
        const filled = i < roundRating;
        starsHTML += starSVG(filled, starSize);
      }
      return starsHTML;
    }

    /**
     * Returns an inline star (filled or empty) as an SVG string.
     */
    function starSVG(filled, size) {
      if (filled) {
        // Filled star
        return `
          <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" style="margin-right:2px;">
            <path d="M12 17.27l6.18 3.73-1.64-7.08L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.68-1.64 7.08L12 17.27z"/>
          </svg>
        `;
      } else {
        // Empty (unfilled) star
        return `
          <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2" style="margin-right:2px;">
            <path d="M12 17.27l6.18 3.73-1.64-7.08L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.68-1.64 7.08L12 17.27z"/>
          </svg>
        `;
      }
    }
  }

  // Expose globally
  window.expeerly = expeerly;
})();
