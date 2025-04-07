import { r as registerInstance, h } from './index-e05416ab.js';

const ExpeerlyCarousel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.theme = 'light';
        this.maxVideos = 4;
        this.storeId = '';
        this.reviews = [];
        this.loading = true;
        this.errorMessage = '';
        this.currentSlide = 0;
    }
    // Fetch reviews when the component is about to load
    componentWillLoad() {
        this.fetchReviews();
    }
    // Start auto-sliding after the component has loaded and reviews are available
    componentDidLoad() {
        if (this.reviews.length > 0) {
            this.startAutoSlide();
        }
    }
    // Clean up auto-slide interval when the component is disconnected
    disconnectedCallback() {
        this.stopAutoSlide();
    }
    // Fetch review videos from the Expeerly API
    async fetchReviews() {
        if (!this.gtin) {
            this.errorMessage = 'Missing gtin attribute';
            this.loading = false;
            return;
        }
        this.apiUrl = `https://app.expeerly.com/api/1.1/wf/get-product-videos-processed/?gtin=${encodeURIComponent(this.gtin)}`;
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            if (!data || data.status !== 'success' || !data.response || !Array.isArray(data.response.videos)) {
                this.errorMessage = 'No reviews available.';
                this.loading = false;
                return;
            }
            const fetchedReviews = data.response.videos;
            if (fetchedReviews.length === 0) {
                this.errorMessage = 'No reviews found.';
                this.loading = false;
                return;
            }
            this.reviews = fetchedReviews;
        }
        catch (error) {
            this.errorMessage = 'Error fetching reviews.';
        }
        finally {
            this.loading = false;
        }
    }
    // Start the auto-slide interval (slides advance every 5 seconds)
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    // Stop the auto-slide interval
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    // Go to the next slide (wrapping around to the beginning)
    nextSlide() {
        const totalSlides = Math.min(this.reviews.length, this.maxVideos);
        this.currentSlide = (this.currentSlide + 1) % totalSlides;
    }
    // Go to the previous slide
    prevSlide() {
        const totalSlides = Math.min(this.reviews.length, this.maxVideos);
        this.currentSlide = (this.currentSlide - 1 + totalSlides) % totalSlides;
    }
    // Render the carousel with slides, arrows, and pagination dots
    renderCarousel() {
        const slideWidth = 180; // width of each slide (in pixels)
        const slideGap = 16; // gap between slides (in pixels)
        const offset = this.currentSlide * (slideWidth + slideGap);
        return (h("div", { style: {
                fontFamily: 'Mulish, sans-serif',
                position: 'relative',
                overflow: 'hidden',
                margin: '20px auto',
                padding: '10px',
                borderRadius: '6px',
            } }, h("div", { style: {
                display: 'flex',
                gap: `${slideGap}px`,
                transition: 'transform 0.5s ease',
                transform: `translateX(-${offset}px)`,
            } }, this.reviews.slice(0, this.maxVideos).map(rev => {
            const playbackId = rev.mux_playback_id_text || '';
            return (h("div", { style: {
                    position: 'relative',
                    width: `${slideWidth}px`,
                    height: '320px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: '0',
                } }, playbackId ? (h("mux-player", { "playback-id": playbackId, "stream-type": "on-demand", controls: true, muted: true, "metadata-custom-1": this.storeId, style: { width: '100%', height: '100%', objectFit: 'cover' } })) : (h("div", { style: {
                    width: '100%',
                    height: '100%',
                    background: '#ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                } }, "No video"))));
        })), h("button", { onClick: () => {
                this.prevSlide();
                this.stopAutoSlide();
            }, style: {
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
            } }, "\u276E"), h("button", { onClick: () => {
                this.nextSlide();
                this.stopAutoSlide();
            }, style: {
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
            } }, "\u276F"), h("div", { style: {
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '5px',
            } }, this.reviews.slice(0, this.maxVideos).map((_, index) => (h("span", { key: index, onClick: () => {
                this.currentSlide = index;
                this.stopAutoSlide();
            }, style: {
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: this.currentSlide === index ? '#fff' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
            } }))))));
    }
    // Main render method
    render() {
        if (this.loading) {
            return h("div", { style: { fontFamily: 'Mulish, sans-serif' } }, "Loading reviews...");
        }
        if (this.errorMessage) {
            return h("div", { style: { fontFamily: 'Mulish, sans-serif' } }, this.errorMessage);
        }
        return this.renderCarousel();
    }
};

export { ExpeerlyCarousel as expeerly_carousel };

//# sourceMappingURL=expeerly-carousel.entry.js.map