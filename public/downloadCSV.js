// async function downloadCSVFromBubble() {
//   const endpoint = "https://api.expeerly.com/api/get-csv-gtin";

//   try {
//     const response = await fetch(endpoint);
//     const output = await response.text();
//     const jsonStartIndex = output.indexOf("[");
//     const jsonString = output.slice(jsonStartIndex);
//     const data = JSON.parse(jsonString);

//     if (data.length === 0) {
//       alert("No data returned from API.");
//       return;
//     }

//     // Use a Set to track seen GTINs
//     const seenGTINs = new Set();

//     // Filter: must have non-empty, non-zero GTIN and not duplicated
//     const filtered = data.filter((row) => {
//       const gtin = row.gtin?.trim();
//       const isValid = gtin && gtin !== "0" && !seenGTINs.has(gtin);
//       if (isValid) seenGTINs.add(gtin);
//       return isValid;
//     });

//     // Extract headers from the first valid row
//     const headers = Object.keys(filtered[0] || {});

//     // Convert to CSV
//     const csv = [
//       headers.join(","), // header row
//       ...filtered.map((row) =>
//         headers
//           .map((h) => `"${(row[h] ?? "").toString().replace(/"/g, '""')}"`)
//           .join(",")
//       ),
//     ].join("\n");

//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);

//     const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
//     const filename = `processed-gtin-${timestamp}.csv`;

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();

//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   } catch (err) {
//     console.error("Error downloading CSV:", err);
//     alert("Failed to download CSV.");
//   }
// }

// downloadCSVFromBubble();

(async function downloadCSVFromBubble() {
  const endpoint = "https://api.expeerly.com/api/get-csv-gtin";

  const normalizeScalar = (v) => {
    if (v == null) return "";
    return String(v).trim();
  };

  const normalizeVariants = (v) => {
    if (v == null) return "";

    // Array case
    if (Array.isArray(v)) {
      return v
        .map((x) => normalizeScalar(x))
        .filter((x) => x && x !== "0")
        .join(", ");
    }

    // String case: could already be "a,b,c" or "a, b, c"
    if (typeof v === "string") {
      const s = v.trim();
      if (!s) return "";

      // If it looks like CSV-ish, normalize spacing after commas
      if (s.includes(",")) {
        return s
          .split(",")
          .map((x) => normalizeScalar(x))
          .filter((x) => x && x !== "0")
          .join(", ");
      }

      // Single value string
      return s === "0" ? "" : s;
    }

    // Number or other scalar
    const one = normalizeScalar(v);
    return one && one !== "0" ? one : "";
  };

  const toCsvCell = (value) =>
    `"${String(value ?? "").replace(/"/g, '""')}"`;

  try {
    const response = await fetch(endpoint, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} when fetching ${endpoint}`);
    }

    const output = await response.text();

    // Your endpoint may include text before the JSON array
    const jsonStartIndex = output.indexOf("[");
    if (jsonStartIndex === -1) {
      throw new Error("Could not find JSON array start '[' in API response.");
    }

    const jsonString = output.slice(jsonStartIndex);
    const data = JSON.parse(jsonString);

    if (!Array.isArray(data) || data.length === 0) {
      alert("No data returned from API.");
      return;
    }

    // Optional: dedupe by GTIN (same behavior as your current file),
    // but make it robust and based on base gtin string.
    const seenGTINs = new Set();
    const filtered = data.filter((row) => {
      const gtin = normalizeScalar(row?.gtin);
      const isValid = gtin && gtin !== "0" && !seenGTINs.has(gtin);
      if (isValid) seenGTINs.add(gtin);
      return isValid;
    });

    if (filtered.length === 0) {
      alert("No valid rows to export.");
      return;
    }

    // Keep fixed headers, do not derive from first row
    const headers = ["id", "gtin", "upc", "gtinVariants", "upcVariants"];

    // Normalize rows so variants always show up as "a, b, c"
    const normalizedRows = filtered.map((row) => ({
      id: normalizeScalar(row?.id),
      gtin: normalizeScalar(row?.gtin),
      upc: normalizeScalar(row?.upc),
      gtinVariants: normalizeVariants(row?.gtinVariants),
      upcVariants: normalizeVariants(row?.upcVariants),
    }));

    const csv = [
      headers.join(","),
      ...normalizedRows.map((row) =>
        headers.map((h) => toCsvCell(row[h])).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
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
})();
