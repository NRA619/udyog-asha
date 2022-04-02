import { gmail_v1, google } from 'googleapis';

export default async (req, res) => {
  const startDate = req.query.startDate || '2020-01-01';
  const slug = req.query.slug;

  try {
    const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: "udyogaasha157@gmail.com",
          client_id: "689218340556-eana7glsdmm5mog28gkrjjbqnkpjaiua.apps.googleusercontent.com",
          private_key: "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",
        },
        scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
      });

    const analytics = google.analytics({
      auth,
      version: 'v3',
    });

    const response = await analytics.data.ga.get({
      'end-date': 'today',
      ids: `ga:${264012126}`,
      metrics: 'ga:pageviews',
      dimensions: 'ga:pagePath',
      filters: `ga:pagePath==${slug}`,
      'start-date': startDate,
    });

    const pageViews = response?.data?.totalsForAllResults['ga:pageviews'];

    return res.status(200).json({
      pageViews,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}