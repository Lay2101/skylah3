import { useEffect } from 'react';

declare global {
  interface Window {
    disqus_config?: (this: { page: { url: string; identifier: string } }) => void;
    DISQUS?: {
      reset: (options: {
        reload: boolean;
        config?: (this: { page: { url: string; identifier: string } }) => void;
      }) => void;
    };
  }
}

export function DisqusComments() {
  useEffect(() => {
    const disqusShortname = 'thisislay';
    const pageUrl = 'https://skylahsg.vercel.app/';
    const pageIdentifier = 'home';

    // Universal Code configuration
    window.disqus_config = function (this: { page: { url: string; identifier: string } }) {
      this.page.url = pageUrl;
      this.page.identifier = pageIdentifier;
    };

    const scriptId = 'disqus-embed-script';
    const existingScript = document.getElementById(scriptId);

    if (window.DISQUS) {
      // If Disqus is already initialized, reset thread with configuration
      window.DISQUS.reset({
        reload: true,
        config: function (this: { page: { url: string; identifier: string } }) {
          this.page.url = pageUrl;
          this.page.identifier = pageIdentifier;
        },
      });
    } else if (!existingScript) {
      // Load Disqus Universal Code script once
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://${disqusShortname}.disqus.com/embed.js`;
      script.setAttribute('data-timestamp', String(Date.now()));
      script.async = true;
      (document.head || document.body).appendChild(script);
    }
  }, []);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8 mt-12 border-t border-gray-200">
      <p className="text-gray-700 text-base font-medium mb-6">
        Let us know what worked for you and what didn't — we welcome your feedback!
      </p>
      <div id="disqus_thread" className="min-h-[250px]" />
    </section>
  );
}

export default DisqusComments;
