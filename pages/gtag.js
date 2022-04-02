export const GA_TRACKING_ID = 'UA-224767283-1';

export default function pageview(url, title) {
  window.gtag('config', GA_TRACKING_ID, {
    page_location: url,
    page_title: title,
  });
};

export default function event({ action, category, label, value }) {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
