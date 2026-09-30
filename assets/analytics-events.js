(() => {
  const PDF_PATH = /\.pdf$/i;

  const normalizedExternalUrl = (url) => {
    const normalized = new URL(url.href);
    normalized.search = "";
    normalized.hash = "";
    return normalized.href;
  };

  const filenameFromUrl = (url) => {
    const encodedFilename = url.pathname.split("/").pop() || "download.pdf";

    try {
      return decodeURIComponent(encodedFilename);
    } catch {
      return encodedFilename;
    }
  };

  document.querySelectorAll("a[href]").forEach((link) => {
    let url;

    try {
      url = new URL(link.href, window.location.href);
    } catch {
      return;
    }

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return;
    }

    if (PDF_PATH.test(url.pathname)) {
      link.dataset.umamiEvent = "file-download";
      link.dataset.umamiEventFile = filenameFromUrl(url);
      return;
    }

    if (url.hostname !== window.location.hostname) {
      link.dataset.umamiEvent = "outbound-link-click";
      link.dataset.umamiEventUrl = normalizedExternalUrl(url);
    }
  });
})();
