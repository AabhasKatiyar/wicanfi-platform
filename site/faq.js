/**
 * WiCanFi — FAQ & Security Assurance Interactive Script
 * Zero-Knowledge Architecture, CSP-Compliant (MV3 Safe)
 * Author: Aabhas Katiyar
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initFaqPage);

  function initFaqPage() {
    initAccordion();
    initCategoryFilters();
    initToggleAll();
    initSettingsLink();
    fetchGitHubStats();
  }

  /**
   * 1. Accordion Toggle Logic (Questions expand / collapse)
   */
  function initAccordion() {
    const questionHeaders = document.querySelectorAll('.faq-question');
    const toggleAllBtn = document.getElementById('toggleAllBtn');

    questionHeaders.forEach((header) => {
      // Set accessibility attributes
      const card = header.closest('.faq-card');
      const isOpen = card ? card.classList.contains('open') : false;
      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');
      header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      const toggleAction = () => {
        if (!card) return;
        const nowOpen = card.classList.toggle('open');
        header.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
        updateToggleAllButtonState();
      };

      // Mouse click
      header.addEventListener('click', toggleAction);

      // Keyboard accessibility (Enter / Space)
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleAction();
        }
      });
    });
  }

  /**
   * 2. Category Tab Filtering Logic
   */
  function initCategoryFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('.faq-card');

    filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        // Activate current tab
        filterChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');

        const selectedCategory = chip.getAttribute('data-filter') || 'all';

        cards.forEach((card) => {
          const cardCategory = card.getAttribute('data-category');
          if (selectedCategory === 'all' || cardCategory === selectedCategory) {
            card.style.display = '';
            // Smooth reveal
            card.style.opacity = '0';
            card.style.transform = 'translateY(6px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.display = 'none';
          }
        });

        updateToggleAllButtonState();
      });
    });
  }

  /**
   * 3. Expand / Collapse All Visible FAQs
   */
  function initToggleAll() {
    const toggleAllBtn = document.getElementById('toggleAllBtn');
    if (!toggleAllBtn) return;

    toggleAllBtn.addEventListener('click', () => {
      const visibleCards = getVisibleCards();
      const anyClosed = visibleCards.some((c) => !c.classList.contains('open'));

      visibleCards.forEach((card) => {
        const header = card.querySelector('.faq-question');
        if (anyClosed) {
          card.classList.add('open');
          if (header) header.setAttribute('aria-expanded', 'true');
        } else {
          card.classList.remove('open');
          if (header) header.setAttribute('aria-expanded', 'false');
        }
      });

      updateToggleAllButtonState();
    });
  }

  function getVisibleCards() {
    return Array.from(document.querySelectorAll('.faq-card')).filter(
      (c) => c.style.display !== 'none'
    );
  }

  function updateToggleAllButtonState() {
    const toggleAllBtn = document.getElementById('toggleAllBtn');
    if (!toggleAllBtn) return;

    const visibleCards = getVisibleCards();
    if (visibleCards.length === 0) return;

    const anyClosed = visibleCards.some((c) => !c.classList.contains('open'));
    if (anyClosed) {
      toggleAllBtn.innerHTML = `
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
        <span>Expand All</span>
      `;
    } else {
      toggleAllBtn.innerHTML = `
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
        </svg>
        <span>Collapse All</span>
      `;
    }
  }

  /**
   * 4. Settings Button: Native Extension Options Page or Tab
   */
  function initSettingsLink() {
    const btnSettings = document.getElementById('btnSettings');
    if (!btnSettings) return;

    btnSettings.addEventListener('click', (e) => {
      if (
        typeof chrome !== 'undefined' &&
        chrome.runtime &&
        typeof chrome.runtime.openOptionsPage === 'function'
      ) {
        e.preventDefault();
        chrome.runtime.openOptionsPage();
      }
    });
  }

  /**
   * 5. Progressive GitHub Star Count Fetcher
   */
  function fetchGitHubStats() {
    const starCountBadge = document.getElementById('ghStarCount');
    if (!starCountBadge) return;

    // Fast timeout fetch to not hold any resources
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 3500) : null;

    fetch('https://api.github.com/repos/AabhasKatiyar/wicanfi-platform', {
      signal: controller ? controller.signal : undefined,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then((data) => {
        if (typeof data.stargazers_count === 'number') {
          starCountBadge.textContent = `★ ${data.stargazers_count}`;
          starCountBadge.title = `${data.stargazers_count} stars on GitHub`;
        }
      })
      .catch(() => {
        // Fallback gracefully: keep default badge
      })
      .finally(() => {
        if (timeoutId) clearTimeout(timeoutId);
      });
  }
})();
