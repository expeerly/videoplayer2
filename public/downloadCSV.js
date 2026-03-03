async function downloadCSVFromBubble() {
  const endpoint = "https://api.expeerly.com/api/get-csv-gtin";

  try {
    const response = await fetch(endpoint);
    const output = await response.text();
    const jsonStartIndex = output.indexOf("[");
    const jsonString = output.slice(jsonStartIndex);
    const data = JSON.parse(jsonString);

    if (data.length === 0) {
      alert("No data returned from API.");
      return;
    }

    // Use a Set to track seen GTINs
    const seenGTINs = new Set();

    // Filter: must have non-empty, non-zero GTIN, not duplicated, and not published
    const filtered = data.filter((row) => {
      const gtin = row.gtin?.trim();
      const isValidGtin = gtin && gtin !== "0" && !seenGTINs.has(gtin);
      // exclude published entries (common field names/status values)
      const pubVal = row.published?.toString?.().toLowerCase();
      const statusVal = row.status?.toString?.().toLowerCase();
      const isPublished =
        pubVal === "true" ||
        pubVal === "yes" ||
        statusVal === "published";
      const isValid = isValidGtin && !isPublished;
      if (isValidGtin) seenGTINs.add(gtin);
      return isValid;
    });

    // Extract headers as the union of keys across all filtered rows
    const headersSet = new Set();
    filtered.forEach((row) => {
      Object.keys(row || {}).forEach((k) => headersSet.add(k));
    });

    // Prefer a sensible order for common columns
    const priority = ["id", "gtin", "upc", "gtinVariants", "upcVariants"];
    const headers = [
      ...priority.filter((h) => headersSet.has(h)),
      ...[...headersSet].filter((h) => !priority.includes(h)),
    ];

    // Convert to CSV
    const csv = [
      headers.join(","), // header row
      ...filtered.map((row) =>
        headers
          .map((h) => `"${(row[h] ?? "").toString().replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `processed-gtin-${timestamp}.csv`;

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error downloading CSV:", err);
    alert("Failed to download CSV.");
  }
}

downloadCSVFromBubble();