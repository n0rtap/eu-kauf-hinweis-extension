/**
 * EU-Kauf-Hinweis Options Page Script
 */

const DEFAULT_DOMAINS = [
  // Google Services
  'google.com',
  'google.de',
  'google.co.uk',
  'google.fr',
  'google.es',
  'google.it',
  'gmail.com',
  'mail.google.com',
  'analytics.google.com',
  'tagmanager.google.com',
  'maps.google.com',
  'translate.google.com',
  'docs.google.com',
  'calendar.google.com',
  'cloud.google.com',
  'fonts.google.com',
  'forms.google.com',
  'chrome.google.com',
  'dns.google',
  'recaptcha.google.com',
  // Amazon - Shopping
  'amazon.com',
  'amazon.de',
  'amazon.co.uk',
  'amazon.fr',
  'amazon.es',
  'amazon.it',
  'amazon.nl',
  'amazon.pl',
  'amazon.se',
  // Amazon - AWS
  'aws.amazon.com',
  'console.aws.amazon.com',
  's3.amazonaws.com',
  // Microsoft Services
  'microsoft.com',
  'office.com',
  'microsoft365.com',
  'teams.microsoft.com',
  'azure.microsoft.com',
  'portal.azure.com',
  'bing.com',
  'outlook.com',
  'outlook.live.com',
  'live.com',
  'onedrive.com',
  'onedrive.live.com',
  // Social Media
  'twitter.com',
  'x.com',
  'instagram.com',
  'linkedin.com',
  'whatsapp.com',
  'web.whatsapp.com',
  'youtube.com',
  'music.youtube.com',
  'facebook.com',
  'messenger.com',
  // Cloud Storage & Hosting
  'dropbox.com',
  'sign.dropbox.com',
  'github.com',
  'bitbucket.org',
  'digitalocean.com',
  'cloudflare.com',
  'vercel.com',
  'netlify.com',
  'netlify.app',
  'godaddy.com',
  'kinsta.com',
  'bluehost.com',
  'hostgator.com',
  'dreamhost.com',
  'wordpress.com',
  // Communication & Collaboration
  'slack.com',
  'zoom.us',
  'zoom.com',
  'vimeo.com',
  'wistia.com',
  'intercom.com',
  'intercom.io',
  // Payment & Business
  'stripe.com',
  'docusign.com',
  'docusign.net',
  'pandadoc.com',
  'mailchimp.com',
  'hubspot.com',
  'twilio.com',
  // Project Management
  'atlassian.com',
  'atlassian.net',
  'jira.com',
  'asana.com',
  'clockify.me',
  'getharvest.com',
  // Security & Auth
  '1password.com',
  'lastpass.com',
  'okta.com',
  'auth0.com',
  'nordvpn.com',
  // Developer Tools & Monitoring
  'sentry.io',
  'logrocket.com',
  'postmarkapp.com',
  'postmark.com',
  'grammarly.com',
  'gingersoftware.com',
  // Surveys & Forms
  'surveymonkey.com',
  'typeform.com',
  // AI
  'openai.com',
  'chat.openai.com',
  'chatgpt.com',
  // Apple
  'apple.com',
  'music.apple.com',
  'icloud.com',
  // DNS Services
  'opendns.com',
  'one.one.one.one',
  // Maps & Location
  'mapbox.com',
  'waze.com',
  // Privacy & Compliance
  'onetrust.com',
  'trustarc.com',
  // Captcha Services
  'hcaptcha.com',
  // SSL/Certificates
  'letsencrypt.org',
  // US Retail
  'walmart.com',
  'target.com',
  'bestbuy.com',
  'ebay.com',
  'ebay.de',
  'ebay.co.uk',
  'newegg.com',
  'homedepot.com',
  'costco.com',
  'macys.com',
  'nordstrom.com',
  'wayfair.com',
  // Yandex
  'yandex.com',
  'yandex.ru',
  'metrica.yandex.com',
];

const DEFAULT_CUSTOM_ALTERNATIVES = {
  'amazon.de': { url: 'https://www.kaufland.de/', name: 'Kaufland' },
  'amazon.com': { url: 'https://www.kaufland.de/', name: 'Kaufland' },
  'amazon.co.uk': { url: 'https://www.kaufland.de/', name: 'Kaufland' },
  'amazon.fr': { url: 'https://www.kaufland.de/', name: 'Kaufland' },
  'amazon.es': { url: 'https://www.kaufland.de/', name: 'Kaufland' },
  'amazon.it': { url: 'https://www.kaufland.de/', name: 'Kaufland' },
  'amazon.nl': { url: 'https://www.kaufland.de/', name: 'Kaufland' },
  'amazon.pl': { url: 'https://www.kaufland.de/', name: 'Kaufland' },
  'amazon.se': { url: 'https://www.kaufland.de/', name: 'Kaufland' },
};

// DOM Elements - Domain List
const domainListTextarea = document.getElementById('domainList');
const quickAddInput = document.getElementById('quickAddInput');
const quickAddBtn = document.getElementById('quickAddBtn');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const clearBtn = document.getElementById('clearBtn');
const fileInput = document.getElementById('fileInput');
const statusDiv = document.getElementById('status');
const domainCountDiv = document.getElementById('domainCount');

// DOM Elements - Custom Alternatives
const altDomainInput = document.getElementById('altDomainInput');
const altUrlInput = document.getElementById('altUrlInput');
const addAltBtn = document.getElementById('addAltBtn');
const altListDiv = document.getElementById('altList');
const altStatusDiv = document.getElementById('altStatus');

// Current custom alternatives state
let customAlternatives = {};

/**
 * Parse domains from text input
 */
function parseDomains(text) {
  return text
    .split(/[,\n]+/)
    .map(domain => domain.trim().toLowerCase())
    .filter(domain => domain.length > 0)
    .filter(domain => domain.includes('.'))
    .filter((domain, index, self) => self.indexOf(domain) === index);
}

/**
 * Show status message
 */
function showStatus(message, isError = false, element = statusDiv) {
  element.textContent = message;
  element.className = 'status ' + (isError ? 'error' : 'success');
  setTimeout(() => {
    element.className = 'status';
  }, 3000);
}

/**
 * Update domain count display
 */
function updateDomainCount(count) {
  domainCountDiv.textContent = `${count} domain${count !== 1 ? 's' : ''} saved`;
}

/**
 * Extract domain name from URL for display
 */
function extractNameFromUrl(url) {
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.replace('www.', '').split('.');
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  } catch {
    return url;
  }
}

/**
 * Render the custom alternatives list
 */
function renderAlternativesList() {
  const entries = Object.entries(customAlternatives);

  if (entries.length === 0) {
    altListDiv.innerHTML = '<div class="alt-empty">No custom alternatives defined</div>';
    return;
  }

  altListDiv.innerHTML = entries
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([domain, info]) => `
      <div class="alt-item" data-domain="${domain}">
        <span class="alt-domain">${domain}</span>
        <span class="alt-arrow">→</span>
        <span class="alt-target">
          <a href="${info.url}" target="_blank" rel="noopener">${info.name || info.url}</a>
        </span>
        <button class="alt-delete" title="Delete">×</button>
      </div>
    `).join('');

  // Add delete listeners
  altListDiv.querySelectorAll('.alt-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const domain = e.target.closest('.alt-item').dataset.domain;
      delete customAlternatives[domain];
      await chrome.storage.sync.set({ customAlternatives });
      renderAlternativesList();
      showStatus(`Alternative for "${domain}" deleted.`, false, altStatusDiv);
    });
  });
}

/**
 * Load custom alternatives from storage
 */
async function loadCustomAlternatives() {
  const result = await chrome.storage.sync.get(['customAlternatives']);
  customAlternatives = result.customAlternatives || DEFAULT_CUSTOM_ALTERNATIVES;
  renderAlternativesList();
}

/**
 * Add a custom alternative
 */
async function addCustomAlternative() {
  const domain = altDomainInput.value.trim().toLowerCase();
  let url = altUrlInput.value.trim();

  // Validate domain
  if (!domain || !domain.includes('.')) {
    showStatus('Please enter a valid domain (e.g. amazon.de)', true, altStatusDiv);
    return;
  }

  // Validate and normalize URL
  if (!url) {
    showStatus('Please enter an alternative URL', true, altStatusDiv);
    return;
  }

  // Add https:// if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  try {
    new URL(url); // Validate URL format
  } catch {
    showStatus('Please enter a valid URL', true, altStatusDiv);
    return;
  }

  // Extract a name from the URL
  const name = extractNameFromUrl(url);

  // Save
  customAlternatives[domain] = { url, name };
  await chrome.storage.sync.set({ customAlternatives });

  // Clear inputs
  altDomainInput.value = '';
  altUrlInput.value = '';

  // Update UI
  renderAlternativesList();
  showStatus(`Alternative for "${domain}" added!`, false, altStatusDiv);

  // Also add the domain to blocked list if not present
  const currentDomains = parseDomains(domainListTextarea.value);
  if (!currentDomains.includes(domain)) {
    currentDomains.push(domain);
    domainListTextarea.value = currentDomains.join('\n');
    await chrome.storage.sync.set({ blockedDomains: currentDomains });
    updateDomainCount(currentDomains.length);
  }
}

/**
 * Load domains from storage
 */
async function loadDomains() {
  const result = await chrome.storage.sync.get(['blockedDomains']);
  const domains = result.blockedDomains || DEFAULT_DOMAINS;
  domainListTextarea.value = domains.join('\n');
  updateDomainCount(domains.length);
}

/**
 * Save domains to storage
 */
async function saveDomains() {
  const domains = parseDomains(domainListTextarea.value);

  if (domains.length === 0) {
    showStatus('No valid domains found. Please enter at least one domain.', true);
    return;
  }

  await chrome.storage.sync.set({ blockedDomains: domains });
  domainListTextarea.value = domains.join('\n');
  updateDomainCount(domains.length);
  showStatus(`${domains.length} domain${domains.length !== 1 ? 's' : ''} saved!`);
}

/**
 * Quick add a single domain
 */
async function quickAddDomain() {
  const newDomain = quickAddInput.value.trim().toLowerCase();

  if (!newDomain || !newDomain.includes('.')) {
    showStatus('Please enter a valid domain (e.g. amazon.com)', true);
    return;
  }

  const currentDomains = parseDomains(domainListTextarea.value);

  if (currentDomains.includes(newDomain)) {
    showStatus('This domain is already in the list.', true);
    return;
  }

  currentDomains.push(newDomain);
  domainListTextarea.value = currentDomains.join('\n');
  quickAddInput.value = '';

  await chrome.storage.sync.set({ blockedDomains: currentDomains });
  updateDomainCount(currentDomains.length);
  showStatus(`"${newDomain}" added!`);
}

/**
 * Reset to default domains
 */
async function resetToDefaults() {
  if (confirm('Reset the list to defaults? This will add all ' + DEFAULT_DOMAINS.length + ' predefined domains.')) {
    await chrome.storage.sync.set({ blockedDomains: DEFAULT_DOMAINS });
    domainListTextarea.value = DEFAULT_DOMAINS.join('\n');
    updateDomainCount(DEFAULT_DOMAINS.length);
    showStatus('List reset to defaults!');
  }
}

/**
 * Clear all domains
 */
async function clearAllDomains() {
  if (confirm('Are you sure you want to delete all domains?')) {
    await chrome.storage.sync.set({ blockedDomains: [] });
    domainListTextarea.value = '';
    updateDomainCount(0);
    showStatus('All domains deleted!');
  }
}

/**
 * Import domains from file
 */
function importFromFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const content = e.target.result;
    const importedDomains = parseDomains(content);
    const currentDomains = parseDomains(domainListTextarea.value);

    // Merge and deduplicate
    const mergedDomains = [...new Set([...currentDomains, ...importedDomains])];

    domainListTextarea.value = mergedDomains.join('\n');
    await chrome.storage.sync.set({ blockedDomains: mergedDomains });
    updateDomainCount(mergedDomains.length);

    const newCount = mergedDomains.length - currentDomains.length;
    showStatus(`${newCount} new domain${newCount !== 1 ? 's' : ''} imported!`);

    // Reset file input
    fileInput.value = '';
  };

  reader.onerror = () => {
    showStatus('Error reading file.', true);
  };

  reader.readAsText(file);
}

// Event listeners - Domain List
saveBtn.addEventListener('click', saveDomains);
resetBtn.addEventListener('click', resetToDefaults);
clearBtn.addEventListener('click', clearAllDomains);
quickAddBtn.addEventListener('click', quickAddDomain);
fileInput.addEventListener('change', importFromFile);

quickAddInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    quickAddDomain();
  }
});

// Event listeners - Custom Alternatives
addAltBtn.addEventListener('click', addCustomAlternative);

altDomainInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    altUrlInput.focus();
  }
});

altUrlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addCustomAlternative();
  }
});

// Ctrl+S / Cmd+S to save
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveDomains();
  }
});

// Load data on page load
loadDomains();
loadCustomAlternatives();
