(function () {
  /**
   * expeerly(globalOptions)
   *
   * 1. Ensures Mux Player script & Mulish font are loaded.
   * 2. Collects all <expeerly> elements & merges their data attributes with globalOptions.
   * 3. Fetches rating/videos from Bubble for the specified GTIN.
   * 4. data-type => "badge", "reviewblock", or "carousel"
   *    If missing/invalid => default "reviewblock"
   */
  function expeerly(globalOptions) {
    globalOptions = globalOptions || {};
    ensureMuxScript();
    ensureMulishFont();

    const expeerlyElements = document.querySelectorAll("expeerly");
    if (!expeerlyElements.length) {
      console.warn("Expeerly: No <expeerly> elements found on the page.");
      return;
    }

    // Basic localized text for "(X reviews)"
    const REVIEW_TEXT_SINGULAR_MAP = {
      en: "review",
      de: "Bewertung",
      fr: "avis",
      it: "recensione",
    };
    const REVIEW_TEXT_PLURAL_MAP = {
      en: "reviews",
      de: "Bewertungen",
      fr: "avis",
      it: "recensioni",
    };

    // For localized footer text (with link to expeerly.com)
    const FOOTER_TEXT_MAP = {
      en: `Expeerly is an independent review community and service. <a href="https://expeerly.com" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;">Learn more.</a>`,
      de: `Expeerly ist eine unabhängige Bewertungs-Community und Service. <a href="https://expeerly.com" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;">Mehr erfahren.</a>`,
      fr: `Expeerly est une communauté et un service d'évaluation indépendant. <a href="https://expeerly.com" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;">En savoir plus.</a>`,
      it: `Expeerly è una comunità e un servizio di recensioni indipendente. <a href="https://expeerly.com" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;">Scopri di più.</a>`,
    };

    expeerlyElements.forEach((container) => {
      // Merge data attributes with globalOptions
      const gtin =
        container.getAttribute("data-gtin") || globalOptions.gtin || null;
      if (!gtin) {
        container.innerHTML =
          "Expeerly: Missing data-gtin attribute or global GTIN.";
        return;
      }

      // data-type => "badge", "reviewblock", or "carousel"
      let dataType = container.getAttribute("data-type");
      // If invalid or missing, default to "reviewblock"
      if (
        !dataType ||
        !["badge", "reviewblock", "carousel"].includes(dataType)
      ) {
        dataType = "reviewblock";
      }

      // max
      const maxStr =
        container.getAttribute("data-max") || globalOptions.maxVideos || "999";
      let maxVideos = parseInt(maxStr, 10);
      if (isNaN(maxVideos)) maxVideos = 999;

      // Theme: "dark" | "light" | "minimal" (default "dark")
      const theme =
        container.getAttribute("data-theme") || globalOptions.theme || "dark";

      // (Optional) store-id for Mux
      const storeId =
        container.getAttribute("data-store-id") || globalOptions.storeId || "";

      // (Optional) accent-color
      const accentColor =
        container.getAttribute("accent-color") ||
        globalOptions.accentColor ||
        "#4B49EB";

      // Show a loading placeholder
      container.innerHTML = `<div style="font-family:Mulish,sans-serif;">Loading Expeerly reviews...</div>`;

      // 2. Build API URL & fetch data
      const apiUrl =
        "https://app.expeerly.com/api/1.1/wf/get-product-videos-processed/?gtin=" +
        encodeURIComponent(gtin);

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

          const reviews = data.response.videos;
          if (!reviews.length) {
            container.innerHTML = "No Expeerly reviews found for this product.";
            return;
          }

          // 2a. Limit to maxVideos
          const finalReviews = reviews.slice(0, maxVideos);

          // 2b. Compute average rating over finalReviews, BUT ONLY for rating_number > 0
          //     So if rating_number is missing or <= 0, skip it
          let sumRating = 0;
          let ratingCount = 0;
          finalReviews.forEach((rev) => {
            if (
              typeof rev.rating_number === "number" &&
              rev.rating_number > 0
            ) {
              sumRating += rev.rating_number;
              ratingCount++;
            }
          });

          let avgRating = 0;
          let totalCount = 0;
          if (ratingCount > 0) {
            avgRating = sumRating / ratingCount;
            totalCount = ratingCount;
          }
          // Convert to 1 decimal place string
          const avgRatingStr = (Math.round(avgRating * 10) / 10).toFixed(1);

          // 3. Determine expeerly logo from theme
          let expeerlyLogo =
            "https://www.expeerly.com/expeerly_reviewed_icon_DARK.svg"; // default
          if (theme === "light") {
            expeerlyLogo =
              "https://www.expeerly.com/expeerly_reviewed_icon_LIGHT.svg";
          } else if (theme === "minimal") {
            expeerlyLogo =
              "https://www.expeerly.com/expeerly_reviewed_MINIMAL.svg";
          }

          // 4. Decide singular vs. plural "review" text
          const locale = globalOptions.locale || "en";
          const singularWord =
            REVIEW_TEXT_SINGULAR_MAP[locale] || REVIEW_TEXT_SINGULAR_MAP.en;
          const pluralWord =
            REVIEW_TEXT_PLURAL_MAP[locale] || REVIEW_TEXT_PLURAL_MAP.en;
          const reviewLabel = totalCount === 1 ? singularWord : pluralWord;

          // 5. Render based on data-type
          let outputHTML = "";
          if (dataType === "badge") {
            outputHTML = renderBadge({
              theme,
              expeerlyLogo,
              avgRating: avgRatingStr,
              totalReviews: totalCount,
            });
          } else if (dataType === "reviewblock") {
            outputHTML = renderReviewblock({
              theme,
              expeerlyLogo,
              accentColor,
              reviews: finalReviews,
              avgRating,
              avgRatingStr,
              totalReviews: totalCount,
              reviewLabel,
              footerLabel: FOOTER_TEXT_MAP[globalOptions.locale || "en"],
              storeId,
            });
          } else if (dataType === "carousel") {
            outputHTML = renderCarousel({
              reviews: finalReviews,
              storeId,
            });
          }

          container.innerHTML = outputHTML;

          // If this is a badge, we add a click handler that scrolls to the first review block.
          if (dataType === "badge") {
            const badgeEl = container.querySelector(".expeerly--badge");
            if (badgeEl) {
              badgeEl.addEventListener("click", () => {
                scrollToReviewBlock();
              });
            }
          }
        })
        .catch((err) => {
          console.error("Expeerly fetch error:", err);
          container.innerHTML = "Error loading Expeerly reviews.";
        });
    });

    /*-------------------------------------------------------------
     * THEME UTILITIES
     *-----------------------------------------------------------*/
    function getBackgroundColor(theme) {
      // If theme is dark => "#2C1277", else => "#FFFFFF"
      if (theme === "dark") {
        return "#2C1277";
      }
      return "#FFFFFF";
    }
    function getTextColor(theme) {
      // If theme is dark => white, else => black
      if (theme === "dark") {
        return "#FFFFFF";
      }
      return "#000000";
    }
    function getLogoHeight(theme) {
      // If theme is minimal => 24px, else => 60px
      if (theme === "minimal") {
        return "24px";
      }
      return "60px";
    }

    /*-------------------------------------------------------------
     * RENDER FUNCTIONS
     *-----------------------------------------------------------*/

    /**
     * Renders a "Badge" (button)
     * If theme is dark => background: #2C1277, color white
     * If theme is light or minimal => background: #FFFFFF, color black
     * Also if minimal => expeerlyLogo is 24px high
     */
    function renderBadge({ theme, expeerlyLogo, avgRating, totalReviews }) {
      const bg = theme === "dark" ? "#2C1277" : "#FFFFFF";
      const fg = theme === "dark" ? "#FFFFFF" : "#000000";
      const logoHeight = theme === "minimal" ? "24px" : "48px";

      return `
        <div class="expeerly--badge" style="
          font-family:Mulish,sans-serif;
          display:inline-flex;
          align-items:center;
          gap:6px;
          padding:4px 12px;
          background:${bg};
          color:${fg};
          border-radius:9999px;
          margin-top: 10px;
          cursor:pointer;
          justify-content:space-between;">

          <img src="${expeerlyLogo}" alt="Expeerly Reviewed" style="height:${logoHeight};" />
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-weight:600;">${avgRating}</span>
            ${renderStarsInline(avgRating)}
            <span style="color:#FA0F9C; font-size:0.85rem;">(${totalReviews})</span>
          </div>
        </div>
      `;
    }

    /**
     * Render function for dataType="reviewblock"
     * This layout will have a header with background color & text color
     */
    function renderReviewblock({
      theme,
      expeerlyLogo,
      accentColor,
      reviews,
      avgRating,
      avgRatingStr,
      totalReviews,
      reviewLabel,
      footerLabel,
      storeId,
    }) {
      const blockBg = getBackgroundColor(theme); // #2C1277 or #FFF
      const blockFg = getTextColor(theme); // white or black
      const logoHeight = getLogoHeight(theme); // 60px or 24px
      return `
        <div class="expeerly--reviewblock" style="font-family:Mulish,sans-serif; margin:20px auto; padding:10px;">
          <!-- Header with background -->
          <div style="background:${blockBg}; color:${blockFg}; padding:8px; border-radius:8px; margin-bottom:8px; max-width:300px;">
            <img src="${expeerlyLogo}" alt="Expeerly Logo" style="height:${logoHeight};" />
            <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
              <div style="font-size:14px; font-weight:bold;">
                ${avgRatingStr}
              </div>
              <div style="display:inline-flex; align-items:center;">
                ${renderStarsInline(avgRating)}
              </div>
              <span style="color:#ff0080;">(${totalReviews} ${reviewLabel})</span>
            </div>
          </div>

          <!-- The reviews themselves in a horizontal scroll -->
          <div style="display:flex; gap:16px; overflow-x:auto;">
            ${reviews.map((r) => renderReviewItem(r, storeId, theme)).join("")}
          </div>

          <!-- Footer text -->
          <div style="margin-top:12px; font-size:14px; color:${accentColor};">
            <p>
              ${footerLabel}
            </p>
          </div>
        </div>
      `;
    }

    /**
     * Renders each review tile in the "reviewblock" scenario
     */
    function renderReviewItem(review, storeId) {
      const playbackId = review.mux_playback_id_text || "";
      const firstName = review.reviewer_first_name_text || "User";
      const lastName = review.reviewer_last_name_text || "";
      const shortLast = lastName ? lastName[0].toUpperCase() + "." : "";
      const rating =
        typeof review.rating_number === "number" ? review.rating_number : 0;
      return `
        <div class="expeerly--review-item" style="position:relative; width:180px; height:320px; border-radius:8px; overflow:hidden; flex-shrink:0; border:1px solid #ddd;">
          ${
            playbackId
              ? `
                <mux-player
                  playback-id="${playbackId}"
                  stream-type="on-demand"
                  controls
                  muted
                  data-store-id="${storeId}"
                  style="width:100%; height:100%; object-fit:cover;"
                ></mux-player>
              `
              : `<div style="width:100%; height:100%; background:#ccc; display:flex; align-items:center; justify-content:center;">No video</div>`
          }

          <!-- rating top-left -->
          <div style="position:absolute; top:8px; left:8px; color:white;">
            <div style="display:flex; margin-bottom:4px;">
              ${renderStarsInline(rating, 14)}
            </div>
          </div>

          <!-- reviewer bottom -->
          <div style="position:absolute; bottom:0; left:0; width:100%; background:linear-gradient(transparent, rgba(0,0,0,0.7)); color:white; padding:8px; display:flex; align-items:center; gap:8px; font-size:0.9rem;">
            <div style="width:32px; height:32px; background:#ccc; border-radius:50%; flex-shrink:0;"></div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span>${firstName} ${shortLast}</span>
              <svg style="width:16px; height:16px; border-radius:50%; background:#1ecbe1; fill:white;" viewBox="0 0 24 24">
                <path d="M9 16.17l-3.88-3.88-1.42 1.42L9 19l10-11-1.41-1.41z"></path>
              </svg>
            </div>
          </div>
        </div>
      `;
    }

    /**
     * Render function for dataType="carousel"
     * We'll do a simpler layout
     */
    function renderCarousel({ reviews, storeId }) {
      let html = `
        <div class="expeerly--carousel" style="font-family:Mulish,sans-serif; margin:20px auto; padding:10px; border-radius:6px;">
          <!-- The reviews in some layout -->
          <div style="display:flex; gap:16px; overflow-x:auto;">
      `;

      reviews.forEach((rev) => {
        const playbackId = rev.mux_playback_id_text || "";

        html += `
          <div class="expeerly--slide" style="position:relative; width:180px; height:320px; border-radius:8px; overflow:hidden; flex-shrink:0;">
            ${
              playbackId
                ? `
                <mux-player
                  playback-id="${playbackId}"
                  stream-type="on-demand"
                  controls
                  muted
                  data-store-id="${storeId}"
                  style="width:100%; height:100%; object-fit:cover;"
                ></mux-player>
              `
                : `<div style="width:100%; height:100%; background:#ccc; display:flex; align-items:center; justify-content:center;">No video</div>`
            }
          </div>
        `;
      });

      return html + `</div></div>`;
    }

    /**
     * Renders 5 stars inline (filled/unfilled).
     * rating=4.2 => 4 filled, 1 unfilled star
     */
    function renderStarsInline(rating, starSize = 20) {
      let out = "";
      const roundRating = Math.round(parseFloat(rating));
      for (let i = 0; i < 5; i++) {
        const filled = i < roundRating;
        out += starSVG(filled, starSize);
      }
      return `<div style="display:inline-flex;">${out}</div>`;
    }

    /**
     * Returns an inline star (filled or empty).
     */
    function starSVG(filled, size) {
      if (filled) {
        return `
          <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" style="margin-right:2px;">
            <path d="M12 17.27l6.18 3.73-1.64-7.08L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.68-1.64 7.08L12 17.27z"/>
          </svg>
        `;
      }
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="#E8E8EA" stroke="none" stroke-width="2" style="margin-right:2px;">
          <path d="M12 17.27l6.18 3.73-1.64-7.08L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.68-1.64 7.08L12 17.27z"/>
        </svg>
      `;
    }

    // Helper: find the first expeerly data-type="reviewblock" and scroll to it
    function scrollToReviewBlock() {
      const reviewBlockEl = document.querySelector(
        'expeerly[data-type="reviewblock"]'
      );
      if (reviewBlockEl) {
        reviewBlockEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  /**
   * ensureMuxScript()
   * Dynamically loads the Mux Player script if not present
   */
  function ensureMuxScript() {
    const existingMux = document.querySelector('script[src*="mux-player"]');
    if (!existingMux) {
      const scriptEl = document.createElement("script");
      scriptEl.src = "https://cdn.jsdelivr.net/npm/@mux/mux-player";
      document.head.appendChild(scriptEl);
    }
  }

  /**
   * ensureMulishFont()
   * Dynamically loads the Mulish font from Google Fonts if not present
   */
  function ensureMulishFont() {
    const link = document.querySelector(
      'link[href*="fonts.googleapis.com"][href*="Mulish"]'
    );
    if (!link) {
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href =
        "https://fonts.googleapis.com/css2?family=Mulish:wght@400;700&display=swap";
      document.head.appendChild(l);
    }
  }

  // Expose globally
  window.expeerly = expeerly;
})();
