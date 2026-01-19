/**
 * Mapping from domains to european-alternatives.eu slugs
 * Source: https://european-alternatives.eu/alternatives-to
 * Format: domain -> { slug, name }
 */
const DOMAIN_TO_ALTERNATIVE = {
  // Google Services
  'google.com': { slug: 'google-search', name: 'Google Search' },
  'google.de': { slug: 'google-search', name: 'Google Search' },
  'google.co.uk': { slug: 'google-search', name: 'Google Search' },
  'google.fr': { slug: 'google-search', name: 'Google Search' },
  'google.es': { slug: 'google-search', name: 'Google Search' },
  'google.it': { slug: 'google-search', name: 'Google Search' },
  'gmail.com': { slug: 'gmail', name: 'Gmail' },
  'mail.google.com': { slug: 'gmail', name: 'Gmail' },
  'analytics.google.com': { slug: 'google-analytics', name: 'Google Analytics' },
  'tagmanager.google.com': { slug: 'google-tag-manager', name: 'Google Tag Manager' },
  'maps.google.com': { slug: 'google-maps', name: 'Google Maps' },
  'translate.google.com': { slug: 'google-translate', name: 'Google Translate' },
  'docs.google.com': { slug: 'google-docs', name: 'Google Docs' },
  'calendar.google.com': { slug: 'google-calendar', name: 'Google Calendar' },
  'cloud.google.com': { slug: 'gcp-google-cloud-platform', name: 'Google Cloud Platform' },
  'fonts.google.com': { slug: 'google-fonts', name: 'Google Fonts' },
  'forms.google.com': { slug: 'google-forms', name: 'Google Forms' },
  'chrome.google.com': { slug: 'google-chrome', name: 'Google Chrome' },
  'dns.google': { slug: 'google-public-dns', name: 'Google Public DNS' },
  'recaptcha.google.com': { slug: 'recaptcha', name: 'reCAPTCHA' },

  // Amazon - Shopping (no slug, use custom alternatives)
  'amazon.com': { slug: null, name: 'Amazon' },
  'amazon.de': { slug: null, name: 'Amazon' },
  'amazon.co.uk': { slug: null, name: 'Amazon' },
  'amazon.fr': { slug: null, name: 'Amazon' },
  'amazon.es': { slug: null, name: 'Amazon' },
  'amazon.it': { slug: null, name: 'Amazon' },
  'amazon.nl': { slug: null, name: 'Amazon' },
  'amazon.pl': { slug: null, name: 'Amazon' },
  'amazon.se': { slug: null, name: 'Amazon' },
  // Amazon - AWS
  'aws.amazon.com': { slug: 'aws-amazon-web-services', name: 'AWS' },
  'console.aws.amazon.com': { slug: 'aws-amazon-web-services', name: 'AWS' },
  's3.amazonaws.com': { slug: 'amazon-s3', name: 'Amazon S3' },

  // Microsoft Services
  'microsoft.com': { slug: 'microsoft-office', name: 'Microsoft' },
  'office.com': { slug: 'microsoft-365-online', name: 'Microsoft 365' },
  'microsoft365.com': { slug: 'microsoft-365-online', name: 'Microsoft 365' },
  'teams.microsoft.com': { slug: 'microsoft-teams', name: 'Microsoft Teams' },
  'azure.microsoft.com': { slug: 'microsoft-azure', name: 'Microsoft Azure' },
  'portal.azure.com': { slug: 'microsoft-azure', name: 'Microsoft Azure' },
  'bing.com': { slug: 'microsoft-bing', name: 'Microsoft Bing' },
  'outlook.com': { slug: 'microsoft-365-online', name: 'Outlook' },
  'outlook.live.com': { slug: 'microsoft-365-online', name: 'Outlook' },
  'live.com': { slug: 'microsoft-365-online', name: 'Microsoft Live' },
  'onedrive.com': { slug: 'microsoft-365-online', name: 'OneDrive' },
  'onedrive.live.com': { slug: 'microsoft-365-online', name: 'OneDrive' },

  // Social Media
  'twitter.com': { slug: 'twitter', name: 'X (Twitter)' },
  'x.com': { slug: 'twitter', name: 'X (Twitter)' },
  'instagram.com': { slug: 'instagram', name: 'Instagram' },
  'linkedin.com': { slug: 'linkedin', name: 'LinkedIn' },
  'whatsapp.com': { slug: 'whatsapp', name: 'WhatsApp' },
  'web.whatsapp.com': { slug: 'whatsapp', name: 'WhatsApp' },
  'youtube.com': { slug: 'youtube', name: 'YouTube' },
  'music.youtube.com': { slug: 'youtube-music', name: 'YouTube Music' },
  'facebook.com': { slug: null, name: 'Facebook' },
  'messenger.com': { slug: null, name: 'Messenger' },

  // Cloud Storage & Hosting
  'dropbox.com': { slug: 'dropbox', name: 'Dropbox' },
  'sign.dropbox.com': { slug: 'dropbox-sign', name: 'Dropbox Sign' },
  'github.com': { slug: 'github', name: 'GitHub' },
  'bitbucket.org': { slug: 'bitbucket', name: 'Bitbucket' },
  'digitalocean.com': { slug: 'digitalocean', name: 'DigitalOcean' },
  'cloudflare.com': { slug: 'cloudflare', name: 'Cloudflare' },
  'vercel.com': { slug: 'vercel', name: 'Vercel' },
  'netlify.com': { slug: 'netlify', name: 'Netlify' },
  'netlify.app': { slug: 'netlify', name: 'Netlify' },
  'godaddy.com': { slug: 'godaddy', name: 'GoDaddy' },
  'kinsta.com': { slug: 'kinsta', name: 'Kinsta' },
  'bluehost.com': { slug: 'bluehost-wordpress', name: 'Bluehost' },
  'hostgator.com': { slug: 'hostgator-wordpress', name: 'HostGator' },
  'dreamhost.com': { slug: 'dreamhost-wordpress', name: 'DreamHost' },
  'wordpress.com': { slug: 'wordpress-com', name: 'WordPress.com' },

  // Communication & Collaboration
  'slack.com': { slug: 'slack', name: 'Slack' },
  'zoom.us': { slug: 'zoom', name: 'Zoom' },
  'zoom.com': { slug: 'zoom', name: 'Zoom' },
  'vimeo.com': { slug: 'vimeo', name: 'Vimeo' },
  'wistia.com': { slug: 'wistia', name: 'Wistia' },
  'intercom.com': { slug: 'intercom', name: 'Intercom' },
  'intercom.io': { slug: 'intercom', name: 'Intercom' },

  // Payment & Business
  'stripe.com': { slug: 'stripe', name: 'Stripe' },
  'docusign.com': { slug: 'docusign', name: 'DocuSign' },
  'docusign.net': { slug: 'docusign', name: 'DocuSign' },
  'pandadoc.com': { slug: 'pandadoc', name: 'PandaDoc' },
  'mailchimp.com': { slug: 'mailchimp', name: 'Mailchimp' },
  'hubspot.com': { slug: 'hubspot-marketing-hub', name: 'HubSpot' },
  'twilio.com': { slug: 'twilio', name: 'Twilio' },

  // Project Management
  'atlassian.com': { slug: 'jira', name: 'Atlassian (Jira)' },
  'atlassian.net': { slug: 'jira', name: 'Atlassian (Jira)' },
  'jira.com': { slug: 'jira', name: 'Jira' },
  'asana.com': { slug: 'asana', name: 'Asana' },
  'clockify.me': { slug: 'clockify', name: 'Clockify' },
  'getharvest.com': { slug: 'harvest', name: 'Harvest' },

  // Security & Auth
  '1password.com': { slug: '1password', name: '1Password' },
  'lastpass.com': { slug: 'lastpass', name: 'LastPass' },
  'okta.com': { slug: 'okta', name: 'Okta' },
  'auth0.com': { slug: 'auth0', name: 'Auth0' },
  'nordvpn.com': { slug: 'nordvpn', name: 'NordVPN' },

  // Developer Tools & Monitoring
  'sentry.io': { slug: 'sentry', name: 'Sentry' },
  'logrocket.com': { slug: 'logrocket', name: 'LogRocket' },
  'postmarkapp.com': { slug: 'postmark', name: 'Postmark' },
  'postmark.com': { slug: 'postmark', name: 'Postmark' },
  'grammarly.com': { slug: 'grammarly', name: 'Grammarly' },
  'gingersoftware.com': { slug: 'ginger', name: 'Ginger' },

  // Surveys & Forms
  'surveymonkey.com': { slug: 'survey-monkey', name: 'SurveyMonkey' },
  'typeform.com': { slug: 'survey-monkey', name: 'Typeform' },

  // AI
  'openai.com': { slug: 'chatgpt', name: 'OpenAI' },
  'chat.openai.com': { slug: 'chatgpt', name: 'ChatGPT' },
  'chatgpt.com': { slug: 'chatgpt', name: 'ChatGPT' },

  // Apple
  'apple.com': { slug: 'apple-music', name: 'Apple' },
  'music.apple.com': { slug: 'apple-music', name: 'Apple Music' },
  'icloud.com': { slug: null, name: 'iCloud' },

  // DNS Services
  'opendns.com': { slug: 'opendns', name: 'OpenDNS' },
  'one.one.one.one': { slug: '1.1.1.1', name: 'Cloudflare DNS' },

  // Maps & Location
  'mapbox.com': { slug: 'mapbox', name: 'Mapbox' },
  'waze.com': { slug: 'waze', name: 'Waze' },

  // Privacy & Compliance
  'onetrust.com': { slug: 'onetrust', name: 'OneTrust' },
  'trustarc.com': { slug: 'trustarc', name: 'TrustArc' },

  // Captcha Services
  'hcaptcha.com': { slug: 'hcaptcha', name: 'hCaptcha' },

  // SSL/Certificates
  'letsencrypt.org': { slug: 'lets-encrypt', name: "Let's Encrypt" },

  // US Retail (no slug, use custom alternatives)
  'walmart.com': { slug: null, name: 'Walmart' },
  'target.com': { slug: null, name: 'Target' },
  'bestbuy.com': { slug: null, name: 'Best Buy' },
  'ebay.com': { slug: null, name: 'eBay' },
  'ebay.de': { slug: null, name: 'eBay' },
  'ebay.co.uk': { slug: null, name: 'eBay' },
  'newegg.com': { slug: null, name: 'Newegg' },
  'homedepot.com': { slug: null, name: 'Home Depot' },
  'costco.com': { slug: null, name: 'Costco' },
  'macys.com': { slug: null, name: "Macy's" },
  'nordstrom.com': { slug: null, name: 'Nordstrom' },
  'wayfair.com': { slug: null, name: 'Wayfair' },

  // Yandex (Russian but non-EU)
  'yandex.com': { slug: 'yandex-search', name: 'Yandex' },
  'yandex.ru': { slug: 'yandex-search', name: 'Yandex' },
  'metrica.yandex.com': { slug: 'yandex-metrica', name: 'Yandex Metrica' },
};

/**
 * Default custom alternatives (user can override these)
 * Format: domain -> { url, name }
 */
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

/**
 * Default list of US/non-EU domains to warn about
 */
const DEFAULT_BLOCKED_DOMAINS = Object.keys(DOMAIN_TO_ALTERNATIVE);

/**
 * Initialize storage with default domains on install
 */
chrome.runtime.onInstalled.addListener(async () => {
  const result = await chrome.storage.sync.get(['blockedDomains', 'customAlternatives']);
  if (!result.blockedDomains) {
    await chrome.storage.sync.set({ blockedDomains: DEFAULT_BLOCKED_DOMAINS });
  }
  if (!result.customAlternatives) {
    await chrome.storage.sync.set({ customAlternatives: DEFAULT_CUSTOM_ALTERNATIVES });
  }
});

/**
 * Open options page when extension icon is clicked
 */
chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

/**
 * Listen for messages from content script
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_BLOCKED_DOMAINS') {
    chrome.storage.sync.get(['blockedDomains', 'customAlternatives'], (result) => {
      sendResponse({
        domains: result.blockedDomains || DEFAULT_BLOCKED_DOMAINS,
        mapping: DOMAIN_TO_ALTERNATIVE,
        customAlternatives: result.customAlternatives || DEFAULT_CUSTOM_ALTERNATIVES
      });
    });
    return true;
  }
});
