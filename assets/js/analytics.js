// Google Analytics (GA4). Single source of truth for the Measurement ID.
// Replace the placeholder with your real ID (looks like G-XXXXXXXXXX) to turn it on.
(function () {
  var ID = "G-2DW44JPF93";
  if (!ID || ID.indexOf("XXXX") !== -1) return; // no-op until a real ID is set

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", ID);
})();
