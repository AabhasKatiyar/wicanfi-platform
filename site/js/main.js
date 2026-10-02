/**
 * WiCanFi Official Website Interactive Scripts
 * Author: Aabhas Katiyar
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initInstallTabs();
    initLiveGitHubStars();
    initDownloadTracking();
  });

  /**
   * 1. Browser Installation Guide Tabs
   */
  const BROWSER_GUIDES = {
    chrome: {
      name: 'Google Chrome',
      extUrl: 'chrome://extensions',
      steps: [
        {
          title: 'Download & Extract',
          desc: 'Download <code>WiCanFi-Extension.zip</code> and extract the archive to any folder on your laptop.'
        },
        {
          title: 'Open Extension Manager',
          desc: 'In Chrome, navigate to <code>chrome://extensions</code> in the address bar.'
        },
        {
          title: 'Toggle Developer Mode',
          desc: 'Turn ON the <strong>Developer mode</strong> switch located in the top-right corner.'
        },
        {
          title: 'Load Unpacked',
          desc: 'Click <strong>"Load unpacked"</strong> in the top-left and select the extracted folder.'
        }
      ]
    },
    edge: {
      name: 'Microsoft Edge',
      extUrl: 'edge://extensions',
      steps: [
        {
          title: 'Download & Extract',
          desc: 'Download <code>WiCanFi-Extension.zip</code> and extract the folder to your Documents or Downloads.'
        },
        {
          title: 'Open Extensions Hub',
          desc: 'In Edge, navigate to <code>edge://extensions</code> in the address bar.'
        },
        {
          title: 'Enable Developer Mode',
          desc: 'Turn ON <strong>Developer mode</strong> toggle in the left navigation sidebar.'
        },
        {
          title: 'Load Unpacked Extension',
          desc: 'Click <strong>"Load unpacked"</strong> button at the top and select the WiCanFi folder.'
        }
      ]
    },
    brave: {
      name: 'Brave Browser',
      extUrl: 'brave://extensions',
      steps: [
        {
          title: 'Download & Extract',
          desc: 'Download <code>WiCanFi-Extension.zip</code> and extract the contents to a safe local directory.'
        },
        {
          title: 'Open Brave Extensions',
          desc: 'Type <code>brave://extensions</code> into your address bar and press Enter.'
        },
        {
          title: 'Switch on Developer Mode',
          desc: 'Flip the <strong>Developer mode</strong> toggle switch in the upper right.'
        },
        {
          title: 'Select Folder',
          desc: 'Click <strong>"Load unpacked"</strong> and pick the extracted WiCanFi folder.'
        }
      ]
    },
    arc: {
      name: 'Arc Browser',
      extUrl: 'arc://extensions',
      steps: [
        {
          title: 'Download & Extract',
          desc: 'Download <code>WiCanFi-Extension.zip</code> and unzip it on your Mac or Windows system.'
        },
        {
          title: 'Open Extensions Page',
          desc: 'Press <code>Cmd + T</code> (or <code>Ctrl + T</code>) and type <code>arc://extensions</code>.'
        },
        {
          title: 'Turn Developer Mode On',
          desc: 'Enable the Developer mode toggle in the top-right of the Chromium settings view.'
        },
        {
          title: 'Load Unpacked',
          desc: 'Click <strong>"Load unpacked"</strong> and select the WiCanFi unzipped directory.'
        }
      ]
    }
  };

  function initInstallTabs() {
    const tabBtns = document.querySelectorAll('.install-tab-btn');
    const stepsGrid = document.getElementById('installStepsGrid');
    if (!tabBtns.length || !stepsGrid) return;

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const browserKey = btn.dataset.browser || 'chrome';
        const guide = BROWSER_GUIDES[browserKey];
        if (!guide) return;

        // Render steps smoothly
        stepsGrid.style.opacity = '0';
        stepsGrid.style.transform = 'translateY(6px)';

        setTimeout(() => {
          stepsGrid.innerHTML = guide.steps
            .map(
              (step, idx) => `
            <div class="step-card">
              <div class="step-num">${idx + 1}</div>
              <h3 class="step-title">${step.title}</h3>
              <p class="step-desc">${step.desc}</p>
            </div>
          `
            )
            .join('');

          stepsGrid.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          stepsGrid.style.opacity = '1';
          stepsGrid.style.transform = 'translateY(0)';
        }, 150);
      });
    });
  }

  /**
   * 2. Live GitHub Stars Fetcher (Progressive Enhancement)
   */
  function initLiveGitHubStars() {
    const starBadges = document.querySelectorAll('.live-gh-stars');
    if (!starBadges.length) return;

    fetch('https://api.github.com/repos/AabhasKatiyar/wicanfi-platform')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.stargazers_count === 'number') {
          starBadges.forEach((badge) => {
            badge.textContent = `★ ${data.stargazers_count}`;
            badge.title = `${data.stargazers_count} stargazers on GitHub`;
          });
        }
      })
      .catch(() => {});
  }

  /**
   * 3. Download Trigger Feedback
   */
  function initDownloadTracking() {
    const dlBtns = document.querySelectorAll('a[download]');
    dlBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        showToast('Download started! Follow the 1-minute install guide below.');
      });
    });
  }

  function showToast(msg) {
    let toast = document.getElementById('wcToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'wcToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: rgba(15, 23, 42, 0.95);
        color: #f8fafc;
        border: 1px solid rgba(99, 102, 241, 0.4);
        border-radius: 12px;
        padding: 12px 20px;
        font-size: 13.5px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 9999;
        transition: opacity 0.3s, transform 0.3s;
        backdrop-filter: blur(12px);
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 4000);
  }

  /**
   * 4. Mobile Navigation Drawer & Hamburger Toggle
   */
  function initMobileMenu() {
    const toggleBtn = document.getElementById('navToggle');
    const drawer = document.getElementById('mobileNavDrawer');
    const backdrop = document.getElementById('mobileNavBackdrop');
    const closeBtn = document.getElementById('mobileDrawerClose');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, #mobileDrawerDownload');

    if (!toggleBtn || !drawer) return;

    function openMenu() {
      drawer.classList.add('open');
      backdrop?.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      drawer.classList.remove('open');
      backdrop?.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (drawer.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    closeBtn?.addEventListener('click', closeMenu);
    backdrop?.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeMenu();
      }
    });
  }
})();
