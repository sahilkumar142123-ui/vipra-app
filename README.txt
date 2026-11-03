VIPRĀ PWA package
Upload the CONTENTS of this folder to a public GitHub repository, enable GitHub Pages,
then submit the published HTTPS URL to PWABuilder for Android packaging.

The original app HTML is retained with PWA metadata and service-worker registration.
The service worker caches only static shell files, never private Supabase data/API calls.
The Supabase publishable key remains in index.html as in your original file. Never place
a Supabase service-role key in frontend code.

Note: the AI chat backend provider-size fix still needs to be deployed and tested separately.
