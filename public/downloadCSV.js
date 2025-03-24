async function downloadCSVFromBubble() {
  const endpoint =
    "https://app.expeerly.com/version-922nc/api/1.1/wf/get_csv_gtin";

  try {
    // Fetch the data
    const response = await fetch(endpoint);
    const output = await response.text();
    const jsonStartIndex = output.indexOf("[");
    const jsonString = output.slice(jsonStartIndex);
    const data = JSON.parse(jsonString);

    if (data.length === 0) {
      alert("No data returned from API.");
      return;
    }

    const filtered = data.filter((row) => row.id || row.gtin || row.upc);

    // Extract headers from the first object
    const headers = Object.keys(data[0]);

    // Convert JSON to CSV
    const csv = [
      headers.join(","), // header row
      ...filtered.map((row) =>
        headers
          .map((h) => `"${(row[h] ?? "").toString().replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Timestamped filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `processed-gtin-${timestamp}.csv`;

    // Create a link and click it to download
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error downloading CSV:", err);
    alert("Failed to download CSV.");
  }
}

downloadCSVFromBubble();
