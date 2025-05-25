import { r as registerInstance, h, g as getElement } from './index-366bcf8a.js';

window.expeerly = {
    config: {
        locale: 'en',
        accentColor: '#4B49EB',
        storeId: '',
        theme: 'dark',
        maxVideo: 999,
        rateLimits: {},
    },
};
function ensureMuxScript() {
    const existingMux = document.querySelector('script[src*="mux-player"]');
    if (!existingMux) {
        const scriptEl = document.createElement('script');
        scriptEl.src = 'https://cdn.jsdelivr.net/npm/@mux/mux-player';
        document.head.appendChild(scriptEl);
    }
}
ensureMuxScript();
const ExpeerlyComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.type = 'reviewblock';
        this.maxVideos = window.expeerly.config.maxVideo;
        this.theme = window.expeerly.config.theme;
        this.storeId = '';
        this.accentColor = window.expeerly.config.accentColor;
        this.locale = window.expeerly.config.locale;
        this.loading = true;
        this.errorMessage = '';
        this.reviews = [];
        this.playingPlaybackId = '';
        this.rateLimited = false;
        this.playedPlaybackIds = new Set();
        this.MAX_REQUESTS_PER_DAY = 1000;
        this.RATE_LIMIT_TIME_WINDOW = 24 * 60 * 60 * 1000;
        // LOCALE MAPS
        this.REVIEW_TEXT_SINGULAR_MAP = {
            en: 'review',
            de: 'Bewertung',
            fr: 'avis',
            it: 'recensione',
        };
        this.REVIEW_TEXT_PLURAL_MAP = {
            en: 'reviews',
            de: 'Bewertungen',
            fr: 'avis',
            it: 'recensioni',
        };
        this.FOOTER_TEXT_MAP = {
            en: `Expeerly is an independent review community and service. <a href="https://expeerly.com" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;">Learn more.</a>`,
            de: `Expeerly ist eine unabhängige Bewertungs-Community und Service. <a href="https://expeerly.com" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;">Mehr erfahren.</a>`,
            fr: `Expeerly est une communauté et un service d'évaluation indépendant. <a href="https://expeerly.com" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;">En savoir plus.</a>`,
            it: `Expeerly è una comunità e un servizio di recensioni indipendente. <a href="https://expeerly.com" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;">Scopri di più.</a>`,
        };
        // Rate limiting error messages
        this.RATE_LIMIT_ERROR_MAP = {
            en: 'Daily API request limit reached. Please try again tomorrow.',
            de: 'Tägliches API-Anfragelimit erreicht. Bitte versuchen Sie es morgen erneut.',
            fr: "Limite quotidienne de requêtes API atteinte. Veuillez réessayer demain.",
            it: 'Limite giornaliero di richieste API raggiunto. Si prega di riprovare domani.',
        };
        /**
         * Called when any mux‑player starts playing.
         * We pause all the others, then mark this one as playing.
         */
        this.handlePlaying = (_ev, playbackId) => {
            var _a;
            // mark it as played
            this.playedPlaybackIds.add(playbackId);
            // pause every other mux-player in our shadow
            const players = ((_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('mux-player')) || [];
            players.forEach((p) => {
                if (p.getAttribute('playback-id') !== playbackId) {
                    p.pause();
                }
            });
            this.playingPlaybackId = playbackId;
        };
        /**
         * Called on pause or ended: clear our playing flag if it matches.
         */
        this.handlePauseOrEnd = (_ev, playbackId) => {
            if (this.playingPlaybackId === playbackId) {
                this.playingPlaybackId = '';
            }
        };
        /**
         * Fired when <mux-player> has enough data to start playback.
         * We can now reach `event.target.media` (the <video>),
         * read its audioTracks/textTracks, and enable the ones matching our locale.
         */
        this.handleLoadedData = (ev) => {
            const playerEl = ev.target; // the <mux-player> element
            const media = playerEl.media; // underlying <video>
            if (!media)
                return;
            // 1) switch audio tracks
            const atList = media.audioTracks;
            if (atList === null || atList === void 0 ? void 0 : atList.length) {
                for (let i = 0; i < atList.length; i++) {
                    const t = atList[i];
                    t.enabled = t.language.startsWith(this.locale);
                }
            }
            // 2) switch subtitle (text) tracks
            for (let i = 0; i < media.textTracks.length; i++) {
                const t = media.textTracks[i];
                t.mode = t.language.startsWith(this.locale) ? 'showing' : 'hidden';
            }
        };
    }
    /**
     * Check if the current access key has exceeded its rate limit
     * Returns true if rate limited, false otherwise
     */
    checkRateLimit() {
        if (!this.accessKey)
            return false;
        // Initialize rate limit tracking for this access key if it doesn't exist
        if (!window.expeerly.config.rateLimits[this.accessKey]) {
            window.expeerly.config.rateLimits[this.accessKey] = {
                requestTimestamps: [],
            };
        }
        const limitConfig = window.expeerly.config.rateLimits[this.accessKey];
        const now = Date.now();
        // Remove timestamps that are outside the current time window (24 hours)
        limitConfig.requestTimestamps = limitConfig.requestTimestamps.filter(timestamp => now - timestamp < this.RATE_LIMIT_TIME_WINDOW);
        // Check if rate limit is exceeded (200 requests per day)
        if (limitConfig.requestTimestamps.length >= this.MAX_REQUESTS_PER_DAY) {
            console.warn(`Rate limit exceeded for access key: ${this.accessKey}`);
            return true;
        }
        // If not rate limited, add current timestamp to the list
        limitConfig.requestTimestamps.push(now);
        return false;
    }
    componentWillLoad() {
        this.loadReviews();
    }
    async loadReviews() {
        if (!this.gtin) {
            this.errorMessage = 'Expeerly: Missing data-gtin attribute.';
            this.loading = false;
            return;
        }
        // Check rate limit before proceeding
        this.rateLimited = this.checkRateLimit();
        if (this.rateLimited) {
            this.errorMessage = this.RATE_LIMIT_ERROR_MAP[this.locale] || this.RATE_LIMIT_ERROR_MAP.en;
            this.loading = false;
            return;
        }
        const cacheKey = `${this.gtin}::${this.accessKey}`;
        this.apiUrl = `https://app.expeerly.com/api/1.1/wf/get-product-videos-processed/?gtin=${encodeURIComponent(this.gtin)}&access_key=${encodeURIComponent(this.accessKey)}`;
        // 1. Check in-memory response cache
        const cached = ExpeerlyComponent.responseCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < ExpeerlyComponent.CACHE_TTL) {
            this.reviews = cached.data;
            this.loading = false;
            return;
        }
        // 2. Reuse in-flight promise if already fetching
        let fetchPromise = ExpeerlyComponent.promiseCache.get(cacheKey);
        if (!fetchPromise) {
            fetchPromise = fetch(this.apiUrl)
                .then(res => res.json())
                .then(data => {
                var _a;
                if (!data || data.status !== 'success' || !((_a = data.response) === null || _a === void 0 ? void 0 : _a.videos)) {
                    throw new Error('Invalid Expeerly response');
                }
                return data.response.videos;
            })
                .then(videos => {
                // store in response cache
                ExpeerlyComponent.responseCache.set(cacheKey, {
                    timestamp: Date.now(),
                    data: videos,
                });
                return videos;
            })
                .finally(() => {
                // clean up promise cache
                ExpeerlyComponent.promiseCache.delete(cacheKey);
            });
            ExpeerlyComponent.promiseCache.set(cacheKey, fetchPromise);
        }
        try {
            const videos = await fetchPromise;
            if (videos.length === 0) {
                this.errorMessage = 'No Expeerly reviews found for this product.';
                this.reviews = [];
            }
            else {
                this.reviews = videos;
            }
        }
        catch (err) {
            console.error(err);
            this.errorMessage = 'Error fetching reviews.';
        }
        finally {
            this.loading = false;
        }
    }
    render() {
        if (this.loading) {
            return h("div", { style: { fontFamily: 'Mulish,sans-serif' } }, "Loading Expeerly reviews...");
        }
        if (this.rateLimited) {
            console.error(this.errorMessage);
            return null;
        }
        if (this.errorMessage) {
            console.error(this.errorMessage);
            return null;
        }
        // Render based on type
        switch (this.type) {
            case 'badge':
                return this.renderBadge({
                    theme: this.theme,
                    expeerlyLogo: this.getExpeerlyLogo(),
                    avgRating: this.calculateAvgRating(),
                    totalReviews: this.reviews.length,
                });
            case 'reviewblock':
                return this.renderReviewBlock({
                    theme: this.theme,
                    expeerlyLogo: this.getExpeerlyLogo(),
                    accentColor: this.accentColor,
                    reviews: this.reviews.slice(0, this.maxVideos),
                    avgRating: this.calculateAvgRating(),
                    avgRatingStr: this.calculateAvgRating().toString(),
                    totalReviews: this.reviews.length,
                });
        }
    }
    /**
     * If the user clicks on the badge, find the first expeerly-component of type="reviewblock" in the document and scroll to it smoothly.
     */
    handleBadgeClick() {
        const reviewBlockEl = document.querySelector('expeerly-component[type="reviewblock"]');
        if (reviewBlockEl) {
            reviewBlockEl.scrollIntoView({ behavior: 'smooth' });
        }
    }
    renderBadge({ theme, expeerlyLogo, avgRating, totalReviews }) {
        const bg = theme === 'dark' ? '#2C1277' : '#FFFFFF';
        const fg = theme === 'dark' ? '#FFFFFF' : '#000000';
        const logoHeight = theme === 'minimal' ? '24px' : '48px';
        return (h("div", { class: "expeerly--badge", style: {
                fontFamily: 'Mulish,sans-serif',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                background: bg,
                color: fg,
                borderRadius: '9999px',
                marginTop: '10px',
                cursor: 'pointer',
                justifyContent: 'space-between',
            }, onClick: () => this.handleBadgeClick() }, h("img", { src: expeerlyLogo, alt: "Expeerly Reviewed", style: { height: logoHeight } }), h("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' } }, h("span", { style: { fontWeight: '600' } }, avgRating), this.renderStarsInline(avgRating), h("span", { style: { color: '#FA0F9C', fontSize: '0.85rem' } }, "(", totalReviews, ")"))));
    }
    renderReviewBlock({ theme, expeerlyLogo, accentColor, reviews, avgRating, avgRatingStr, totalReviews }) {
        // Decide singular vs. plural based on totalReviews
        const singularWord = this.REVIEW_TEXT_SINGULAR_MAP[this.locale] || this.REVIEW_TEXT_SINGULAR_MAP.en;
        const pluralWord = this.REVIEW_TEXT_PLURAL_MAP[this.locale] || this.REVIEW_TEXT_PLURAL_MAP.en;
        const reviewLabel = totalReviews === 1 ? singularWord : pluralWord;
        // For the footer text
        const footerLabel = this.FOOTER_TEXT_MAP[this.locale] || this.FOOTER_TEXT_MAP.en;
        const blockBg = theme === 'dark' ? '#2C1277' : '#FFFFFF'; // Background color based on theme
        const blockFg = theme === 'dark' ? '#FFFFFF' : '#000000'; // Text color based on theme
        const logoHeight = theme === 'minimal' ? '24px' : '60px'; // Logo height based on theme
        return (h("div", { class: "expeerly--reviewblock", style: {
                fontFamily: 'Mulish,sans-serif',
                margin: reviews.length > 0 ? '20px auto' : '0',
                padding: reviews.length > 0 ? '10px' : '0',
            } }, h("div", { style: { background: blockBg, color: blockFg, padding: '8px', borderRadius: '8px', marginBottom: '8px', maxWidth: '300px' } }, h("img", { src: expeerlyLogo, alt: "Expeerly Logo", style: { height: logoHeight } }), h("div", { style: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' } }, h("div", { style: { fontSize: '14px', fontWeight: 'bold' } }, avgRatingStr), h("div", { style: { display: 'inline-flex', alignItems: 'center' } }, this.renderStarsInline(avgRating)), h("span", { style: { color: '#ff0080' } }, "(", totalReviews, " ", reviewLabel, ")"))), h("div", { style: { display: 'flex', gap: '16px', overflowX: 'auto' } }, reviews.map(r => this.renderReviewItem(r))), h("div", { style: { marginTop: '12px', fontSize: '14px', color: accentColor }, innerHTML: footerLabel })));
    }
    renderStarsInline(avgRating) {
        const roundRating = Math.round(avgRating);
        const stars = [];
        for (let i = 0; i < 5; i++) {
            const filled = i < roundRating;
            if (filled) {
                stars.push(h("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "#FFD700", stroke: "#FFD700", style: { marginRight: '2px' } }, h("path", { d: "M12 17.27l6.18 3.73-1.64-7.08L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.68-1.64 7.08L12 17.27z" })));
            }
            else {
                stars.push(h("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "#E8E8EA", stroke: "none", "stroke-width": "2", style: { marginRight: '2px' } }, h("path", { d: "M12 17.27l6.18 3.73-1.64-7.08L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.68-1.64 7.08L12 17.27z" })));
            }
        }
        return h("span", { style: { display: 'inline-flex' } }, stars);
    }
    renderReviewItem(reviewData) {
        const playbackId = reviewData.mux_playback_id_text || '';
        const isPlaying = this.playingPlaybackId === playbackId;
        const hasPlayed = this.playedPlaybackIds.has(playbackId);
        const firstName = reviewData.reviewer_first_name_text || 'User';
        const lastName = reviewData.reviewer_last_name_text || '';
        const shortLast = lastName ? lastName[0].toUpperCase() + '.' : '';
        const rating = typeof reviewData.rating_number === 'number' ? reviewData.rating_number : 0;
        const profilePic = reviewData.reviewer_profile_pic_image || 'https://via.placeholder.com/64';
        return (h("div", { style: {
                position: 'relative',
                width: '180px',
                height: '320px',
                borderRadius: '8px',
                overflow: 'hidden',
                flexShrink: '0',
                border: '1px solid #ddd',
            } }, playbackId ? (h("mux-player", { id: `player-${playbackId}`, "playback-id": playbackId, "playback-engine": "mse", "stream-type": "on-demand", controls: true, "metadata-custom-1": this.storeId, "default-hidden-captions": false, onLoadedData: this.handleLoadedData, style: { width: '100%', height: '100%', objectFit: 'cover' }, onPlaying: (ev) => this.handlePlaying(ev, playbackId), onPause: (ev) => this.handlePauseOrEnd(ev, playbackId), onEnded: (ev) => this.handlePauseOrEnd(ev, playbackId) })) : (h("div", { style: {
                width: '100%',
                height: '100%',
                background: '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            } }, "No video")), h("div", { style: { position: 'absolute', top: '8px', left: '8px', color: 'white' } }, h("div", { style: { display: 'flex', marginBottom: '4px' } }, this.renderStarsInline(rating))), h("div", { class: "review-overlay", style: {
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                color: 'white',
                padding: '8px',
                display: hasPlayed || isPlaying ? 'none' : 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.9rem',
            } }, h("div", { style: { width: '32px', height: '32px', borderRadius: '50%', flexShrink: '0' } }, h("img", { src: profilePic, alt: "Reviewer", style: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' } })), h("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' } }, h("span", null, firstName, " ", shortLast), h("svg", { style: { width: '16px', height: '16px', borderRadius: '50%', background: '#1ecbe1', fill: 'white' }, viewBox: "0 0 24 24" }, h("path", { d: "M9 16.17l-3.88-3.88-1.42 1.42L9 19l10-11-1.41-1.41z" }))))));
    }
    getExpeerlyLogo() {
        let logoUrl = 'https://www.expeerly.com/expeerly_reviewed_icon_DARK.svg'; // default
        if (this.theme === 'light') {
            logoUrl = 'https://www.expeerly.com/expeerly_reviewed_icon_LIGHT.svg';
        }
        else if (this.theme === 'minimal') {
            logoUrl = 'https://www.expeerly.com/expeerly_reviewed_MINIMAL.svg';
        }
        return logoUrl;
    }
    calculateAvgRating() {
        let sumRating = 0;
        let ratingCount = 0;
        for (const rev of this.reviews) {
            if (typeof rev.rating_number === 'number' && rev.rating_number > 0) {
                sumRating += rev.rating_number;
                ratingCount++;
            }
        }
        return ratingCount > 0 ? parseFloat((Math.round((sumRating / ratingCount) * 10) / 10).toFixed(1)) : 0;
    }
    get el() { return getElement(this); }
};
// --- CACHING SETUP ---
ExpeerlyComponent.responseCache = new Map();
ExpeerlyComponent.promiseCache = new Map();
ExpeerlyComponent.CACHE_TTL = 5 * 60 * 1000;

export { ExpeerlyComponent as expeerly_component };

//# sourceMappingURL=expeerly-component.entry.js.map