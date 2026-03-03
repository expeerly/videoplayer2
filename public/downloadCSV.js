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

    // Filter: must have non-empty, non-zero GTIN and not duplicated (keep all rows, including published)
    const filtered = data.filter((row) => {
      const gtin = row.gtin?.trim();
      const isValidGtin = gtin && gtin !== "0" && !seenGTINs.has(gtin);
      if (isValidGtin) seenGTINs.add(gtin);
      return isValidGtin;
    });

    // Remove published property from rows so it doesn’t appear in CSV
    const sanitized = filtered.map((row) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { published, ...rest } = row;
      return rest;
    });

    // Extract headers as the union of keys across all sanitized rows
    const headersSet = new Set();
    sanitized.forEach((row) => {
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
      ...sanitized.map((row) =>
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