"use strict";

(() => {
  const rows = JSON.parse(document.getElementById("report-data").textContent);
  const columns = [
    ["url", "URL"],
    ["count", "Запросы, шт."],
    ["count_perc", "Запросы, %"],
    ["time_sum", "Сумма, с"],
    ["time_perc", "Время, %"],
    ["time_avg", "Среднее, с"],
    ["time_max", "Максимум, с"],
    ["time_med", "Медиана, с"],
  ];
  const body = document.getElementById("report-body");
  const head = document.getElementById("report-head");
  let sortKey = "time_sum";
  let ascending = false;

  function draw() {
    rows.sort((left, right) => {
      const comparison =
        sortKey === "url"
          ? String(left.url).localeCompare(String(right.url))
          : Number(left[sortKey]) - Number(right[sortKey]);
      return ascending ? comparison : -comparison;
    });
    body.replaceChildren();
    for (const row of rows) {
      const tr = document.createElement("tr");
      for (const [key] of columns) {
        const td = document.createElement("td");
        const value = row[key];
        td.textContent =
          typeof value === "number" && key !== "count" ? value.toFixed(3) : String(value);
        tr.append(td);
      }
      body.append(tr);
    }
    for (const th of head.children) {
      if (th.dataset.key === sortKey) {
        th.setAttribute("aria-sort", ascending ? "ascending" : "descending");
      } else {
        th.removeAttribute("aria-sort");
      }
    }
  }

  for (const [key, label] of columns) {
    const th = document.createElement("th");
    th.scope = "col";
    th.dataset.key = key;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", () => {
      ascending = sortKey === key ? !ascending : key === "url";
      sortKey = key;
      draw();
    });
    th.append(button);
    head.append(th);
  }
  draw();
})();
