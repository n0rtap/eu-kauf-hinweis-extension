/**
 * EU-Kauf-Hinweis Content Script
 * Injects a warning overlay when visiting blocked US domains
 */

(function() {
  'use strict';

  const SESSION_STORAGE_KEY = 'eu-kauf-hinweis-dismissed';
  const ALTERNATIVES_BASE_URL = 'https://european-alternatives.eu/alternative-to/';
  const ALTERNATIVES_SEARCH_URL = 'https://european-alternatives.eu/alternatives-to';

  /**
   * Find matching domain info from the mapping
   */
  function findMatchingDomain(mapping, customAlternatives) {
    const currentHost = window.location.hostname.toLowerCase();

    // Helper to check a domain
    const checkDomain = (domain) => {
      const info = mapping[domain];
      const custom = customAlternatives[domain];
      if (info || custom) {
        return { domain, info, custom };
      }
      return null;
    };

    // Try exact match first
    let result = checkDomain(currentHost);
    if (result) return result;

    // Try without www prefix
    const withoutWww = currentHost.replace(/^www\./, '');
    result = checkDomain(withoutWww);
    if (result) return result;

    // Try parent domains (e.g., subdomain.example.com -> example.com)
    const parts = currentHost.split('.');
    for (let i = 1; i < parts.length - 1; i++) {
      const parentDomain = parts.slice(i).join('.');
      result = checkDomain(parentDomain);
      if (result) return result;
    }

    return null;
  }

  /**
   * Check if current domain matches any blocked domain
   */
  function isDomainBlocked(blockedDomains) {
    const currentHost = window.location.hostname.toLowerCase();
    return blockedDomains.some(domain => {
      const normalizedDomain = domain.toLowerCase().trim();
      return currentHost === normalizedDomain ||
             currentHost === 'www.' + normalizedDomain ||
             currentHost.endsWith('.' + normalizedDomain);
    });
  }

  /**
   * Check if warning was already dismissed for this session
   */
  function wasAlreadyDismissed() {
    try {
      const dismissed = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return dismissed === 'true';
    } catch {
      return false;
    }
  }

  /**
   * Mark warning as dismissed for this session
   */
  function markAsDismissed() {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Get alternative info - prioritizes custom alternatives over default mapping
   */
  function getAlternativeInfo(matchedDomain) {
    // Custom alternative takes priority
    if (matchedDomain?.custom) {
      return {
        url: matchedDomain.custom.url,
        name: matchedDomain.custom.name,
        isCustom: true
      };
    }

    // Fall back to european-alternatives.eu slug
    if (matchedDomain?.info?.slug) {
      return {
        url: ALTERNATIVES_BASE_URL + matchedDomain.info.slug,
        name: null,
        isCustom: false
      };
    }

    // No specific alternative - link to search page
    return {
      url: ALTERNATIVES_SEARCH_URL,
      name: null,
      isCustom: false
    };
  }

  /**
   * Create and inject the warning overlay
   */
  function showWarningOverlay(matchedDomain) {
    // Prevent duplicate overlays
    if (document.getElementById('eu-kauf-hinweis-overlay')) {
      return;
    }

    const domainInfo = matchedDomain?.info;
    const serviceName = domainInfo?.name || window.location.hostname;
    const altInfo = getAlternativeInfo(matchedDomain);
    const hasDirectAlternative = altInfo.isCustom || domainInfo?.slug != null;

    // Button text
    const buttonText = hasDirectAlternative ? 'Take me to alternative' : 'Find EU alternatives';

    // Badge text
    let badgeHtml = '';
    if (altInfo.isCustom && altInfo.name) {
      badgeHtml = `
        <div class="eu-kauf-hinweis-alternative-badge">
          ✓ Your pick: <strong>${altInfo.name}</strong>
        </div>
      `;
    } else if (hasDirectAlternative) {
      badgeHtml = `
        <div class="eu-kauf-hinweis-alternative-badge">
          ✓ EU alternatives exist!
        </div>
      `;
    }

    const overlay = document.createElement('div');
    overlay.id = 'eu-kauf-hinweis-overlay';
    overlay.innerHTML = `
      <div class="eu-kauf-hinweis-modal">
        <div class="eu-kauf-hinweis-flag">
          <div class="eu-kauf-hinweis-stars">
            ★ ★ ★<br>
            ★ ★ ★ ★<br>
            ★ ★ ★
          </div>
        </div>
        <h2 class="eu-kauf-hinweis-title">Oi, caught you!</h2>
        <p class="eu-kauf-hinweis-service">
          Caught you on <strong>${serviceName}</strong> 👀
        </p>
        <p class="eu-kauf-hinweis-text">
          Wasn't someone here trying to support EU businesses?<br>
          Just saying... 💙
        </p>
        ${badgeHtml}
        <div class="eu-kauf-hinweis-buttons">
          <button id="eu-kauf-hinweis-dismiss" class="eu-kauf-hinweis-btn eu-kauf-hinweis-btn-secondary">
            I know, I know...
          </button>
          <a href="${altInfo.url}"
             ${altInfo.isCustom ? '' : 'target="_blank" rel="noopener noreferrer"'}
             class="eu-kauf-hinweis-btn eu-kauf-hinweis-btn-primary">
            ${buttonText}
          </a>
        </div>
        <p class="eu-kauf-hinweis-footer">
          <a href="#" id="eu-kauf-hinweis-settings">Settings</a>
        </p>
      </div>
    `;

    document.body.appendChild(overlay);

    // Event listeners
    document.getElementById('eu-kauf-hinweis-dismiss').addEventListener('click', () => {
      markAsDismissed();
      overlay.remove();
    });

    document.getElementById('eu-kauf-hinweis-settings').addEventListener('click', (e) => {
      e.preventDefault();
      chrome.runtime.sendMessage({ type: 'OPEN_OPTIONS' });
      chrome.runtime.openOptionsPage?.();
    });

    // Close on overlay background click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        markAsDismissed();
        overlay.remove();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        markAsDismissed();
        overlay.remove();
        document.removeEventListener('keydown', escHandler);
      }
    });
  }

  /**
   * Initialize the extension
   */
  function init() {
    // Skip if already dismissed this session
    if (wasAlreadyDismissed()) {
      return;
    }

    // Get blocked domains and check current site
    chrome.runtime.sendMessage({ type: 'GET_BLOCKED_DOMAINS' }, (response) => {
      if (chrome.runtime.lastError) {
        console.warn('EU-Kauf-Hinweis: Could not get blocked domains');
        return;
      }

      const domains = response?.domains || [];
      const mapping = response?.mapping || {};
      const customAlternatives = response?.customAlternatives || {};

      if (isDomainBlocked(domains)) {
        const matchedDomain = findMatchingDomain(mapping, customAlternatives);
        // Small delay to ensure page has loaded
        setTimeout(() => showWarningOverlay(matchedDomain), 100);
      }
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
