async function downloadCSVFromBubble() {
  const endpoint = "https://app.expeerly.com/api/1.1/wf/get_csv_gtin";

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

    // Filter: must have non-empty, non-zero GTIN and not duplicated
    const filtered = data.filter((row) => {
      const gtin = row.gtin?.trim();
      const isValid = gtin && gtin !== "0" && !seenGTINs.has(gtin);
      if (isValid) seenGTINs.add(gtin);
      return isValid;
    });

    // Extract headers from the first valid row
    const headers = Object.keys(filtered[0] || {});

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