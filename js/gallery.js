/* ========================================
   GALLERY.JS — Галерея фото с lightbox
   ======================================== */

const Gallery = {
  gridContainer: null,
  lightbox: null,
  lightboxImg: null,
  lightboxName: null,
  lightboxTier: null,
  currentFilter: 'all',

  init() {
    this.gridContainer = document.getElementById('gallery-grid');
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxName = document.getElementById('lightbox-name');
    this.lightboxTier = document.getElementById('lightbox-tier');

    // Lightbox close
    document.getElementById('lightbox-close').addEventListener('click', () => {
      this.closeLightbox();
    });

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });

    // Keyboard close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
        this.closeLightbox();
      }
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.render();
      });
    });
  },

  render() {
    this.gridContainer.innerHTML = '';

    const tierNames = {
      easy: 'Обычное',
      medium: 'Среднее',
      hard: 'Хард',
    };

    let filteredPhotos = PHOTO_GALLERY;

    if (this.currentFilter === 'unlocked') {
      filteredPhotos = PHOTO_GALLERY.filter(p => App.state.unlockedPhotos.includes(p.path));
    } else if (this.currentFilter !== 'all') {
      filteredPhotos = PHOTO_GALLERY.filter(p => p.tier === this.currentFilter);
    }

    // Update counter
    const unlocked = App.state.unlockedPhotos.length;
    document.getElementById('gallery-unlocked').textContent = unlocked;
    document.getElementById('gallery-total').textContent = PHOTO_GALLERY.length;

    filteredPhotos.forEach(photo => {
      const isUnlocked = App.state.unlockedPhotos.includes(photo.path);
      const item = document.createElement('div');
      item.className = `gallery-item ${isUnlocked ? 'unlocked' : 'locked'}`;

      const img = document.createElement('img');
      img.src = photo.path;
      img.alt = photo.name;
      img.loading = 'lazy';
      item.appendChild(img);

      if (!isUnlocked) {
        const overlay = document.createElement('div');
        overlay.className = 'gallery-lock-overlay';
        overlay.innerHTML = `
          <span class="lock-icon">🔒</span>
          <span class="lock-tier tier-${photo.tier}">${tierNames[photo.tier]}</span>
        `;
        item.appendChild(overlay);
      }

      if (isUnlocked) {
        item.addEventListener('click', () => {
          this.openLightbox(photo.path);
        });
      }

      this.gridContainer.appendChild(item);
    });

    // Empty state
    if (filteredPhotos.length === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);';
      empty.innerHTML = '<p style="font-size: 32px; margin-bottom: 8px;">📭</p><p>Нет фото в этой категории</p>';
      this.gridContainer.appendChild(empty);
    }
  },

  openLightbox(photoPath) {
    const photo = PHOTO_GALLERY.find(p => p.path === photoPath);
    if (!photo) return;

    // Only open if unlocked
    if (!App.state.unlockedPhotos.includes(photoPath)) return;

    const tierNames = { easy: 'Обычное', medium: 'Среднее', hard: 'Хард' };

    this.lightboxImg.src = photoPath;
    this.lightboxImg.alt = photo.name;
    this.lightboxName.textContent = photo.name;
    this.lightboxTier.textContent = tierNames[photo.tier];
    this.lightboxTier.className = `lightbox-tier tier-${photo.tier}`;

    this.lightbox.classList.add('active');
  },

  closeLightbox() {
    this.lightbox.classList.remove('active');
  },
};
