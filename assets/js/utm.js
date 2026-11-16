/* Packagist: UTM parameters on blog links to packagist.com (AMK-5)

   Links in the navigation, footer and post content are set in Ghost Admin, the
   footer partial or the post editor, so they are tagged here instead of in each
   template. Plausible on packagist.com then shows which placement and which post
   sent each visitor. Links that already carry utm_source, such as the call to
   action at the end of posts, are left alone. */
(function () {
    const slug = window.location.pathname.replace(/^\/+|\/+$/g, '') || 'home';
    const links = document.querySelectorAll('a[href]');

    for (const link of links) {
        let url;
        try {
            url = new URL(link.getAttribute('href'), window.location.href);
        } catch (e) {
            continue;
        }
        if (!/^(www\.)?packagist\.com$/.test(url.hostname) || url.searchParams.has('utm_source')) {
            continue;
        }

        let medium = 'other';
        if (link.closest('#gh-head')) {
            medium = 'nav';
        } else if (link.closest('.site-footer')) {
            medium = 'footer';
        } else if (link.closest('.gh-content')) {
            medium = 'post-link';
        }

        url.searchParams.set('utm_source', 'blog.packagist.com');
        url.searchParams.set('utm_medium', medium);
        url.searchParams.set('utm_campaign', medium);
        url.searchParams.set('utm_content', slug);
        link.setAttribute('href', url.toString());
    }
})();
