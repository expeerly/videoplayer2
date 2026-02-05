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

  const normalizeToArray = (v) => {
    if (v == null) return [];

    if (Array.isArray(v)) {
      return v
        .map((x) => normalizeScalar(x))
        .filter((x) => x && x !== "0");
    }

    if (typeof v === "string") {
      const s = v.trim();
      if (!s) return [];
      if (s.includes(",")) {
        return s
          .split(",")
          .map((x) => normalizeScalar(x))
          .filter((x) => x && x !== "0");
      }
      return s === "0" ? [] : [s];
    }

    const one = normalizeScalar(v);
    return one && one !== "0" ? [one] : [];
  };

  const uniq = (arr) => {
    const seen = new Set();
    const out = [];
    for (const x of arr) {
      if (!seen.has(x)) {
        seen.add(x);
        out.push(x);
      }
    }
    return out;
  };

  const toCsvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

  try {
    const response = await fetch(endpoint, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} when fetching ${endpoint}`);
    }

    const output = await response.text();

    // If the response contains text before JSON, slice from the first '['
    const jsonStartIndex = output.indexOf("[");
    if (jsonStartIndex === -1) {
      throw new Error("Could not find JSON array start '[' in API response.");
    }

    const data = JSON.parse(output.slice(jsonStartIndex));
    if (!Array.isArray(data) || data.length === 0) {
      alert("No data returned from API.");
      return;
    }

    // Merge records by base gtin to avoid losing variants on duplicates
    // If gtin is empty/invalid, fallback to id key so the row is still kept.
    const merged = new Map();

    for (const row of data) {
      const id = normalizeScalar(row?.id);
      const gtin = normalizeScalar(row?.gtin);
      const upc = normalizeScalar(row?.upc);

      const gtinVariantsArr = normalizeToArray(row?.gtinVariants);
      const upcVariantsArr = normalizeToArray(row?.upcVariants);

      const key = gtin && gtin !== "0" ? `gtin:${gtin}` : `id:${id}`;

      if (!merged.has(key)) {
        merged.set(key, {
          id,
          gtin,
          upc,
          gtinVariants: [],
          upcVariants: [],
        });
      }

      const cur = merged.get(key);

      // Keep a stable id, but fill if missing
      if (!cur.id && id) cur.id = id;

      // Keep base fields, but fill if missing
      if (!cur.gtin && gtin) cur.gtin = gtin;
      if (!cur.upc && upc) cur.upc = upc;

      // Merge variants (union)
      cur.gtinVariants = uniq([...cur.gtinVariants, ...gtinVariantsArr]);
      cur.upcVariants = uniq([...cur.upcVariants, ...upcVariantsArr]);
    }

    const rows = Array.from(merged.values()).map((r) => ({
      id: r.id,
      gtin: r.gtin,
      upc: r.upc,
      gtinVariants: r.gtinVariants.join(", "),
      upcVariants: r.upcVariants.join(", "),
    }));

    if (rows.length === 0) {
      alert("No valid rows to export.");
      return;
    }

    const headers = ["id", "gtin", "upc", "gtinVariants", "upcVariants"];

    const csv = [
      headers.join(","),
      ...rows.map((row) => headers.map((h) => toCsvCell(row[h])).join(",")),
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
