import { r as registerInstance, h, g as getElement } from './index-02ff1379.js';

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
            fr: 'Limite quotidienne de requêtes API atteinte. Veuillez réessayer demain.',
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
        this.apiUrl = `https://api.expeerly.com/api/videos?gtin=${encodeURIComponent(this.gtin)}&access_key=${encodeURIComponent(this.accessKey)}`;
        // 1. Check in-memory response cache
        const cached = ExpeerlyComponent.responseCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < ExpeerlyComponent.CACHE_TTL) {
            this.reviews = cached.data;
            this.loading = false;
            return;
        }
        // 2. Reuse in-flight promise if already fetching
        let fetchPromise = ExpeerlyComponent.promiseCache.get(this.apiUrl);
        if (!fetchPromise) {
            fetchPromise = fetch(this.apiUrl, {
                mode: 'cors', // ← explicitly request CORS
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(data => {
                var _a;
                // new shape: { status, response: { videos: [...] } }
                if ((data === null || data === void 0 ? void 0 : data.status) !== 'success' || !Array.isArray((_a = data.response) === null || _a === void 0 ? void 0 : _a.videos)) {
                    throw new Error('Invalid Expeerly response');
                }
                return data.response.videos;
            })
                .then(videos => {
                ExpeerlyComponent.responseCache.set(this.apiUrl, {
                    timestamp: Date.now(),
                    data: videos,
                });
                return videos;
            })
                .finally(() => {
                ExpeerlyComponent.promiseCache.delete(this.apiUrl);
            });
            ExpeerlyComponent.promiseCache.set(this.apiUrl, fetchPromise);
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
        const playbackId = reviewData.muxPlaybackId || '';
        const isPlaying = this.playingPlaybackId === playbackId;
        const hasPlayed = this.playedPlaybackIds.has(playbackId);
        const firstName = reviewData.reviewerFirstName || 'User';
        const lastName = reviewData.reviewerLastName || '';
        const shortLast = lastName ? lastName[0].toUpperCase() + '.' : '';
        const rating = typeof reviewData.rating === 'number' ? reviewData.rating : 0;
        const profilePic = reviewData.reviewerProfilePic || 'https://via.placeholder.com/64';
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
            if (typeof rev.rating === 'number' && rev.rating > 0) {
                sumRating += rev.rating;
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

const ExpeerlyFlyWidget = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.theme = 'light';
        this.position = 'top-right';
        this.zIndex = 1000;
        this.locale = 'de';
        // State
        this.expanded = false;
        this.loading = true;
        this.errorMessage = '';
        this.currentIndex = 0;
        this.videos = [];
        this.totalReviews = 0;
        this.avgRating = 0;
        this.viewportSlides = 3;
        this.playingPlaybackId = '';
        this.playingId = null;
        // Card widths
        this.ACTIVE_W = 167;
        this.GHOST_W = 130;
        this.hiddenFooterIds = new Set();
        this.setSlidesForViewport = () => {
            this.viewportSlides = window.innerWidth < 768 ? 1 : 3;
        };
        this.setPlaying = (playbackId) => {
            var _a;
            // Pause other players
            (((_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('mux-player')) || []).forEach((p) => {
                if (p.getAttribute('playback-id') !== playbackId)
                    p.pause();
            });
            // Mark this one as the active player and lock its footer hidden
            this.playingPlaybackId = playbackId;
            this.hiddenFooterIds.add(playbackId); // <- keep hidden even when paused
            this.applyFooterVisibility();
        };
        this.clearPlaying = (playbackId) => {
            if (!playbackId || this.playingPlaybackId === playbackId) {
                this.playingPlaybackId = '';
            }
            this.applyFooterVisibility();
        };
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
        // Controls
        this.toggleExpanded = () => (this.expanded = !this.expanded);
        this.closeExpanded = () => (this.expanded = false);
        this.showPrev = () => (this.currentIndex = Math.max(0, this.currentIndex - 1));
        this.showNext = () => {
            const visible = this.viewportSlides;
            const maxIndex = Math.max(0, this.videos.length - visible);
            this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
        };
    }
    // Utils
    ensureMuxScript() {
        const existing = document.querySelector('script[src*="mux-player"]');
        if (!existing) {
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/@mux/mux-player';
            document.head.appendChild(s);
        }
    }
    applyFooterVisibility() {
        const root = this.el.shadowRoot;
        if (!root)
            return;
        const cards = root.querySelectorAll('.ex-card');
        cards.forEach(card => {
            const pid = card.dataset.pid;
            const footer = card.querySelector('.ex-footer');
            if (!footer)
                return;
            const shouldHide = this.hiddenFooterIds.has(pid) || this.playingPlaybackId === pid;
            footer.style.display = shouldHide ? 'none' : '';
        });
    }
    normalizeInputs() {
        if (!this.accessKey) {
            this.accessKey = this.el.getAttribute('access-key') || this.el.getAttribute('access_key') || '';
        }
        if (!this.brandId) {
            this.brandId = this.el.getAttribute('brand-id') || this.el.getAttribute('brand_id') || this.el.getAttribute('brandid') || '';
        }
    }
    async propsChanged() {
        await this.loadBrandVideos();
    }
    async componentWillLoad() {
        this.ensureMuxScript();
        this.setSlidesForViewport();
        window.addEventListener('resize', this.setSlidesForViewport);
        this.normalizeInputs();
        await this.loadBrandVideos();
    }
    disconnectedCallback() {
        window.removeEventListener('resize', this.setSlidesForViewport);
    }
    async loadBrandVideos() {
        var _a;
        this.normalizeInputs();
        if (!this.accessKey || !this.brandId) {
            console.warn('[expeerly-fly-widget] Missing accessKey or brandId', {
                accessKey: this.accessKey,
                brandId: this.brandId,
            });
            this.errorMessage = 'Missing access key or brand id.';
            this.loading = false;
            return;
        }
        this.loading = true;
        try {
            const url = `https://api.expeerly.com/api/brand-videos?access_key=${encodeURIComponent(this.accessKey)}&brand_id=${encodeURIComponent(this.brandId)}`;
            const res = await fetch(url, { mode: 'cors' });
            const json = await res.json();
            if (json.status !== 'success' || !((_a = json.response) === null || _a === void 0 ? void 0 : _a.videos))
                throw new Error('Invalid response');
            const vids = json.response.videos.map(v => ({
                id: v._id,
                playbackId: v.muxPlaybackId,
                productName: v.productName,
                rating: v.rating || 0,
                reviewerFirstName: v.reviewerFirstName || 'User',
                reviewerLastName: v.reviewerLastName || '',
                reviewerProfilePic: v.reviewerProfilePic || 'https://via.placeholder.com/64',
                createdDate: v['Created Date'],
            }));
            // newest first
            this.videos = vids.sort((a, b) => (b.createdDate || 0) - (a.createdDate || 0));
            this.totalReviews = this.videos.length;
            const sum = this.videos.reduce((s, v) => s + (v.rating || 0), 0);
            this.avgRating = this.videos.length ? Math.round((sum / this.videos.length) * 10) / 10 : 0;
            this.errorMessage = '';
        }
        catch (e) {
            console.error(e);
            this.errorMessage = 'Unable to load brand videos.';
        }
        finally {
            this.loading = false;
        }
    }
    // Style helpers
    getPositionStyle() {
        const base = { position: 'fixed', zIndex: String(this.zIndex) };
        const inset = '20px';
        switch (this.position) {
            case 'top-left':
                Object.assign(base, { top: inset, left: inset });
                break;
            case 'top-right':
                Object.assign(base, { top: inset, right: inset });
                break;
            case 'bottom-left':
                Object.assign(base, { bottom: inset, left: inset });
                break;
            case 'bottom-right':
                Object.assign(base, { bottom: inset, right: inset });
                break;
        }
        return base;
    }
    getModalAnchorStyle() {
        const inset = '20px';
        const base = { position: 'fixed', zIndex: String(this.zIndex + 1) };
        switch (this.position) {
            case 'top-left':
                Object.assign(base, { top: inset, left: inset });
                break;
            case 'top-right':
                Object.assign(base, { top: inset, right: inset });
                break;
            case 'bottom-left':
                Object.assign(base, { bottom: inset, left: inset });
                break;
            case 'bottom-right':
                Object.assign(base, { bottom: inset, right: inset });
                break;
        }
        return base;
    }
    colors() {
        const isDark = this.theme === 'dark';
        return {
            badgeBg: isDark ? '#2C1277' : '#FFFFFF',
            badgeFg: isDark ? '#FFFFFF' : '#000000',
            modalBg: isDark ? '#2C1277' : '#FFFFFF',
            modalFg: isDark ? '#FFFFFF' : '#000000',
            accent: '#FA0F9C',
        };
    }
    getExpeerlyLogo() {
        return this.theme === 'light' ? 'https://www.expeerly.com/expeerly_reviewed_icon_LIGHT.svg' : 'https://www.expeerly.com/expeerly_reviewed_icon_DARK.svg';
    }
    reviewWord() {
        const singular = { en: 'review', de: 'Bewertung', fr: 'avis', it: 'recensione' };
        const plural = { en: 'reviews', de: 'Bewertungen', fr: 'avis', it: 'recensioni' };
        return this.totalReviews === 1 ? singular[this.locale] || singular.en : plural[this.locale] || plural.en;
    }
    renderStars(value, key) {
        const stars = [];
        const full = Math.floor(value);
        const frac = value - full;
        for (let i = 0; i < 5; i++) {
            if (i < full) {
                stars.push(h("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "#FFD700", stroke: "#FFD700", style: { marginRight: '2px' } }, h("path", { d: "M12 17.27l6.18 3.73-1.64-7.08L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.68-1.64 7.08L12 17.27z" })));
            }
            else if (i === full && frac > 0) {
                const id = `half-${key}-${i}`;
                const pct = Math.round(frac * 100);
                stars.push(h("svg", { width: "20", height: "20", viewBox: "0 0 24 24", style: { marginRight: '2px' } }, h("defs", null, h("linearGradient", { id: id, x1: "0%", y1: "0%", x2: "100%", y2: "0%" }, h("stop", { offset: `${pct}%`, "stop-color": "#FFD700" }), h("stop", { offset: `${pct}%`, "stop-color": "#E8E8EA" }))), h("path", { d: "M12 17.27l6.18 3.73-1.64-7.08L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.68-1.64 7.08L12 17.27z", fill: `url(#${id})`, stroke: "#FFD700" })));
            }
            else {
                stars.push(h("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "#E8E8EA", style: { marginRight: '2px' } }, h("path", { d: "M12 17.27l6.18 3.73-1.64-7.08L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.68-1.64 7.08L12 17.27z" })));
            }
        }
        return h("span", { style: { display: 'inline-flex' } }, stars);
    }
    // RENDER
    render() {
        const { badgeBg, badgeFg, modalBg, modalFg, accent } = this.colors();
        // —— Badge ——
        const badge = (h("div", { part: "badge", style: Object.assign(Object.assign({}, this.getPositionStyle()), { background: badgeBg, color: badgeFg, padding: '16px', borderRadius: '12px', boxShadow: '0 10px 22px rgba(0,0,0,.15)', cursor: 'pointer', display: 'inline-flex', flexDirection: 'column', gap: '4px', minWidth: '160px', fontFamily: 'Mulish,sans-serif' }), onClick: this.toggleExpanded }, h("div", { style: { display: 'flex', alignItems: 'center', gap: '10px' } }, h("img", { src: this.getExpeerlyLogo(), alt: "Expeerly Reviewed", style: { height: '80px' } })), h("div", { style: { display: 'flex', alignItems: 'center', gap: '10px' } }, h("span", { style: { fontWeight: '700', fontSize: '20px' } }, this.avgRating.toFixed(1)), this.renderStars(this.avgRating, 'badge')), h("div", { style: { color: accent, fontSize: '18px', fontWeight: '700' } }, "(", this.totalReviews, " ", this.reviewWord(), ")")));
        // —— Expanded modal ——
        const visible = this.viewportSlides;
        const leftGhost = this.currentIndex > 0 ? this.videos[this.currentIndex - 1] : null;
        const active = this.videos.slice(this.currentIndex, this.currentIndex + visible);
        const rightGhost = this.currentIndex + visible < this.videos.length ? this.videos[this.currentIndex + visible] : null;
        // ghost renderer (directional fade)
        const renderGhost = (v, side) => {
            const pos = side === 'left' ? { left: '8px' } : { right: '8px' };
            const fadeMask = side === 'left' ? 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 35%)' : 'linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,1) 35%)';
            return (h("div", { style: Object.assign({ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: `${this.GHOST_W}px`, opacity: '0.35', filter: 'grayscale(30%)', pointerEvents: 'none', WebkitMaskImage: fadeMask, maskImage: fadeMask }, pos) }, this.renderCard(v)));
        };
        const modal = this.expanded && (h("div", { part: "overlay", style: {
                position: 'fixed',
                inset: '0',
                background: 'transparent',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                zIndex: String(this.zIndex + 1),
            }, onClick: this.closeExpanded }, h("div", { part: "modal", style: Object.assign(Object.assign({}, this.getModalAnchorStyle()), { background: modalBg, color: modalFg, borderRadius: '16px', marginRight: '20px', boxShadow: '0 24px 64px rgba(0,0,0,.3)', padding: '16px', overflow: 'hidden', fontFamily: 'Mulish,sans-serif' }), onClick: e => e.stopPropagation() }, h("div", { style: {
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '10px',
                flexWrap: this.viewportSlides === 1 ? 'wrap' : 'nowrap',
            } }, h("img", { src: this.getExpeerlyLogo(), alt: "Expeerly", style: { height: '48px' } }), h("div", { style: {
                display: 'flex',
                flexDirection: this.viewportSlides === 1 ? 'column' : 'row',
                alignItems: this.viewportSlides === 1 ? 'flex-start' : 'center',
                gap: this.viewportSlides === 1 ? '6px' : '10px',
            } }, h("div", { style: { display: 'flex', alignItems: 'center', gap: '5px' } }, h("div", { style: { fontWeight: '800', fontSize: '14px', marginLeft: '4px' } }, this.avgRating.toFixed(1)), h("div", null, this.renderStars(this.avgRating, 'hdr'))), h("div", { style: {
                color: accent,
                fontSize: '14px',
                fontWeight: '600',
                marginLeft: this.viewportSlides === 1 ? '0' : '4px',
            } }, "(", this.totalReviews, " ", this.reviewWord(), ")")), h("button", { "aria-label": "Close", onClick: this.closeExpanded, style: {
                marginLeft: 'auto',
                background: 'transparent',
                border: 'none',
                color: modalFg,
                fontSize: '1.6rem',
                cursor: 'pointer',
            } }, "\u2715")), h("div", { style: { position: 'relative', padding: '0 64px', minHeight: '272px' } }, leftGhost && renderGhost(leftGhost, 'left'), h("div", { style: { display: 'flex', gap: '18px', justifyContent: 'center', position: 'relative', zIndex: '2' } }, this.loading ? (h("div", { style: { margin: 'auto' } }, "Loading\u2026")) : (active.map(v => h("div", { style: { width: `${this.ACTIVE_W}px`, flex: '0 0 auto' } }, this.renderCard(v, true))))), rightGhost && renderGhost(rightGhost, 'right'), h("button", { onClick: this.showPrev, disabled: this.currentIndex === 0, "aria-label": "Previous", style: {
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                background: '#ECEAF6',
                color: '#333',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,.2)',
            } }, h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } }, h("path", { d: "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" }))), h("button", { onClick: this.showNext, disabled: this.currentIndex + visible >= this.videos.length, "aria-label": "Next", style: {
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                background: '#ECEAF6',
                color: '#333',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,.2)',
            } }, h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", style: { display: 'flex', alignItems: 'center', justifyContent: 'center' } }, h("path", { d: "m8.59 16.59 1.41 1.41 6-6-6-6-1.41 1.41L13.17 12z" })))))));
        return (h(h.Fragment, null, badge, modal));
    }
    // Card renderer (active or ghost)
    renderCard(v, emphasize = false) {
        const radius = '18px';
        const shortLast = v.reviewerLastName ? v.reviewerLastName[0].toUpperCase() + '.' : '';
        const cardH = emphasize ? 272 : 212;
        const isPlaying = this.playingPlaybackId === v.playbackId;
        const hideFooter = isPlaying || this.hiddenFooterIds.has(v.playbackId);
        return (h("div", { class: "ex-card", "data-pid": v.playbackId, style: {
                position: 'relative',
                borderRadius: radius,
                overflow: 'hidden',
                background: '#000',
                boxShadow: emphasize ? '0 12px 28px rgba(0,0,0,.35)' : '0 6px 14px rgba(0,0,0,.2)',
                fontFamily: 'Mulish,sans-serif',
                width: '100%',
                height: `${cardH}px`,
            } }, h("mux-player", { "playback-id": v.playbackId, "stream-type": "on-demand", controls: true, "default-hidden-captions": false, onLoadedData: this.handleLoadedData, onPlay: () => this.setPlaying(v.playbackId), onPlaying: () => this.setPlaying(v.playbackId), onPause: () => this.clearPlaying(v.playbackId), onEnded: () => this.clearPlaying(v.playbackId), style: {
                'width': '100%',
                'height': '100%',
                '--media-object-fit': 'cover',
                '--media-object-position': 'center',
                '--poster-object-fit': 'cover',
                '--poster-object-position': 'center',
                'background': 'transparent',
                'display': 'block',
            } }), h("div", { style: { position: 'absolute', top: '10px', left: '12px' } }, this.renderStars(v.rating || 0, `card-${v.id}`)), h("div", { style: {
                position: 'absolute',
                display: hideFooter ? 'none' : 'block',
                left: '0',
                right: '0',
                bottom: '0',
                padding: '10px',
                color: '#fff',
                background: 'linear-gradient(transparent, rgba(0,0,0,.7))',
            } }, h("div", { style: { display: hideFooter ? 'none' : 'flex', alignItems: 'center', gap: '10px' } }, h("div", { style: { width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', flexShrink: '0' } }, h("img", { src: v.reviewerProfilePic, alt: "Reviewer", style: { width: '28px', height: '28px', objectFit: 'cover' } })), h("div", { style: { flex: '1 1 auto', minWidth: '0' } }, h("div", { style: {
                fontWeight: '700',
                fontSize: '14px',
                lineHeight: '1.1',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }, title: v.productName }, v.productName), h("div", { style: { marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' } }, h("span", null, v.reviewerFirstName, " ", shortLast), h("svg", { style: { width: '16px', height: '16px', borderRadius: '50%', background: '#1ecbe1', fill: 'white' }, viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M9 16.17 5.12 12.29 3.7 13.71 9 19l10-11-1.41-1.41z" }))))))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "accessKey": ["propsChanged"],
        "brandId": ["propsChanged"]
    }; }
};

export { ExpeerlyComponent as expeerly_component, ExpeerlyFlyWidget as expeerly_fly_widget };

//# sourceMappingURL=expeerly-component_2.entry.js.map