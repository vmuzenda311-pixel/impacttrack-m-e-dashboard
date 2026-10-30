"use strict";

const STORAGE_KEY = "impacttrack-data-v1";
const OUTCOMES = [
  "Outcome 1 · Skills development",
  "Outcome 2 · Economic participation",
  "Outcome 3 · Personal development"
];
const DISTRICTS = ["Bulawayo", "Gweru", "Mutare", "Masvingo"];
const MONTHS = ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06"];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const demoIndicators = [
  { id: "IND-001", outcome: OUTCOMES[0], name: "Young people enrolled in vocational training", definition: "Number of unique young people enrolled (people)", baseline: 0, target: 120, actual: 104, period: "2026-06" },
  { id: "IND-002", outcome: OUTCOMES[0], name: "Young people completing vocational training", definition: "Number completing a course (people)", baseline: 0, target: 90, actual: 68, period: "2026-06" },
  { id: "IND-003", outcome: OUTCOMES[1], name: "Young people receiving entrepreneurship support", definition: "Number receiving structured support (people)", baseline: 0, target: 80, actual: 71, period: "2026-06" },
  { id: "IND-004", outcome: OUTCOMES[1], name: "Young people in employment or income-generating activity", definition: "Number reporting employment or income activity (people)", baseline: 12, target: 60, actual: 31, period: "2026-06" },
  { id: "IND-005", outcome: OUTCOMES[2], name: "Young people participating in life-skills sessions", definition: "Number participating at least once (people)", baseline: 0, target: 150, actual: 132, period: "2026-06" },
  { id: "IND-006", outcome: OUTCOMES[1], name: "Supported youth groups with a business plan", definition: "Number of groups with an approved plan (groups)", baseline: 0, target: 24, actual: 19, period: "2026-05" },
  { id: "IND-007", outcome: OUTCOMES[0], name: "Training completion rate", definition: "Completers as a proportion of enrolled learners (%)", baseline: 0, target: 75, actual: 66, period: "2026-06" },
  { id: "IND-008", outcome: OUTCOMES[2], name: "Participants with improved life-skills assessment", definition: "Number with improved post-assessment score (people)", baseline: 0, target: 100, actual: 84, period: "2026-06" }
];
const demoActivities = [
  { id: "ACT-001", name: "Vocational training cohort — tailoring", outcome: OUTCOMES[0], district: "Bulawayo", plannedDate: "2026-01-15", completionDate: "2026-02-20", plannedParticipants: 24, actualParticipants: 22, status: "Completed", budgetAllocated: 4200, expenditure: 3980 },
  { id: "ACT-002", name: "Vocational training cohort — solar basics", outcome: OUTCOMES[0], district: "Gweru", plannedDate: "2026-02-03", completionDate: "2026-03-18", plannedParticipants: 22, actualParticipants: 19, status: "Completed", budgetAllocated: 5100, expenditure: 4800 },
  { id: "ACT-003", name: "Business skills and planning workshop", outcome: OUTCOMES[1], district: "Mutare", plannedDate: "2026-02-12", completionDate: "2026-02-13", plannedParticipants: 25, actualParticipants: 28, status: "Completed", budgetAllocated: 1800, expenditure: 1950 },
  { id: "ACT-004", name: "Life-skills and wellbeing sessions", outcome: OUTCOMES[2], district: "Masvingo", plannedDate: "2026-03-05", completionDate: "2026-03-27", plannedParticipants: 30, actualParticipants: 26, status: "Completed", budgetAllocated: 2400, expenditure: 2180 },
  { id: "ACT-005", name: "Youth group enterprise grants orientation", outcome: OUTCOMES[1], district: "Bulawayo", plannedDate: "2026-03-16", completionDate: "2026-03-17", plannedParticipants: 20, actualParticipants: 18, status: "Completed", budgetAllocated: 1600, expenditure: 1510 },
  { id: "ACT-006", name: "Vocational training cohort — horticulture", outcome: OUTCOMES[0], district: "Masvingo", plannedDate: "2026-04-06", completionDate: "2026-05-22", plannedParticipants: 26, actualParticipants: 20, status: "Completed", budgetAllocated: 4600, expenditure: 4330 },
  { id: "ACT-007", name: "Employer networking and job-readiness clinic", outcome: OUTCOMES[1], district: "Gweru", plannedDate: "2026-04-20", completionDate: "2026-04-21", plannedParticipants: 24, actualParticipants: 17, status: "Completed", budgetAllocated: 2200, expenditure: 2070 },
  { id: "ACT-008", name: "Life-skills sessions — cohort 2", outcome: OUTCOMES[2], district: "Mutare", plannedDate: "2026-05-04", completionDate: "2026-05-29", plannedParticipants: 28, actualParticipants: 24, status: "Completed", budgetAllocated: 2100, expenditure: 1890 },
  { id: "ACT-009", name: "Entrepreneurship mentoring circle", outcome: OUTCOMES[1], district: "Masvingo", plannedDate: "2026-05-18", completionDate: "", plannedParticipants: 22, actualParticipants: 0, status: "In Progress", budgetAllocated: 1700, expenditure: 730 },
  { id: "ACT-010", name: "Vocational training cohort — catering", outcome: OUTCOMES[0], district: "Bulawayo", plannedDate: "2026-06-02", completionDate: "", plannedParticipants: 25, actualParticipants: 0, status: "In Progress", budgetAllocated: 4800, expenditure: 1650 },
  { id: "ACT-011", name: "Youth employment and enterprise fair", outcome: OUTCOMES[1], district: "Mutare", plannedDate: "2026-06-16", completionDate: "", plannedParticipants: 35, actualParticipants: 0, status: "Planned", budgetAllocated: 2600, expenditure: 0 },
  { id: "ACT-012", name: "Life-skills sessions — cohort 3", outcome: OUTCOMES[2], district: "Gweru", plannedDate: "2026-06-22", completionDate: "", plannedParticipants: 26, actualParticipants: 0, status: "Planned", budgetAllocated: 1900, expenditure: 0 }
];
const demoPeople = Array.from({ length: 64 }, (_, index) => {
  const gender = index % 4 === 0 ? "Male" : index % 4 === 1 ? "Female" : index % 4 === 2 ? "Female" : "Non-binary";
  return {
    id: `BEN-${String(index + 1).padStart(3, "0")}`,
    gender,
    ageGroup: ["15–19", "20–24", "25–29", "30–35"][index % 4],
    district: DISTRICTS[(index * 3 + Math.floor(index / 4)) % DISTRICTS.length]
  };
});
const demoAttendance = [];
demoActivities.slice(0, 8).forEach((activity, activityIndex) => {
  const count = activity.actualParticipants;
  for (let personIndex = 0; personIndex < count; personIndex += 1) {
    const person = demoPeople[(personIndex * 3 + activityIndex * 7) % demoPeople.length];
    if (!demoAttendance.some((row) => row.activityId === activity.id && row.personId === person.id)) {
      demoAttendance.push({ activityId: activity.id, personId: person.id });
    }
  }
});

let storageLoadError = false;
let data = loadData();
let activePage = "overview";
let charts = {};
let dialogType = "indicator";
let editingId = null;
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const numberValue = (value) => value === "" || value === null || value === undefined ? null : Number(value);
const formatNumber = (value) => Number.isFinite(value) ? new Intl.NumberFormat("en").format(value) : "—";
const formatMoney = (value) => Number.isFinite(value) ? `US$${new Intl.NumberFormat("en", { maximumFractionDigits: 0 }).format(value)}` : "—";
const percent = (actual, target) => actual === null || target === null || target === 0 ? null : (actual / target) * 100;
const monthFromDate = (date) => String(date || "").slice(0, 7);
function isValidISODate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function freshDemoData() {
  return {
    indicators: structuredClone(demoIndicators),
    activities: structuredClone(demoActivities),
    people: structuredClone(demoPeople),
    attendance: structuredClone(demoAttendance)
  };
}
function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return freshDemoData();
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed.indicators) || !Array.isArray(parsed.activities) || !Array.isArray(parsed.people) || !Array.isArray(parsed.attendance)) throw new Error("Stored data is incomplete.");
    return parsed;
  } catch (error) {
    console.error("Could not load saved ImpactTrack data:", error);
    storageLoadError = true;
    return freshDemoData();
  }
}
function persistData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Could not save ImpactTrack data:", error);
    showToast("Changes could not be saved to browser storage. Check available storage space.", true);
    return false;
  }
}
function showToast(message, isError = false) {
  const toast = document.createElement("div");
  toast.className = `toast${isError ? " error" : ""}`;
  toast.textContent = message;
  $("#toast-region").append(toast);
  window.setTimeout(() => toast.remove(), 4500);
}
function activeFilters() {
  return {
    period: $("#filter-period").value,
    district: $("#filter-district").value,
    outcome: $("#filter-outcome").value,
    status: $("#filter-status").value
  };
}
function filteredIndicators() {
  const filter = activeFilters();
  return data.indicators.filter((row) => {
    const achievement = percent(numberValue(row.actual), numberValue(row.target));
    const status = getIndicatorStatus(row);
    return (!filter.period || row.period === filter.period)
      && (!filter.outcome || row.outcome === filter.outcome)
      && (!filter.status || status === filter.status)
      && (!filter.district || data.activities.some((activity) => activity.outcome === row.outcome && activity.district === filter.district && (!filter.period || monthFromDate(activity.plannedDate) === filter.period)))
      && (achievement === null || Number.isFinite(achievement));
  });
}
function filteredActivities() {
  const filter = activeFilters();
  return data.activities.filter((row) => (!filter.period || monthFromDate(row.plannedDate) === filter.period)
    && (!filter.district || row.district === filter.district)
    && (!filter.outcome || row.outcome === filter.outcome)
    && (!filter.status || getIndicatorStatusForOutcome(row.outcome) === filter.status));
}
function getIndicatorStatus(row) {
  const achieved = percent(numberValue(row.actual), numberValue(row.target));
  if (achieved === null || !Number.isFinite(achieved)) return "Incomplete";
  if (achieved >= 80) return "On Track";
  if (achieved >= 50) return "Needs Attention";
  return "Off Track";
}
function getIndicatorStatusForOutcome(outcome) {
  const relevant = data.indicators.filter((row) => row.outcome === outcome && getIndicatorStatus(row) !== "Incomplete");
  if (!relevant.length) return "Incomplete";
  const average = relevant.reduce((sum, row) => sum + percent(Number(row.actual), Number(row.target)), 0) / relevant.length;
  if (average >= 80) return "On Track";
  if (average >= 50) return "Needs Attention";
  return "Off Track";
}
function filteredAttendance() {
  const filter = activeFilters();
  const activityById = new Map(data.activities.map((activity) => [activity.id, activity]));
  const personById = new Map(data.people.map((person) => [person.id, person]));
  return data.attendance.map((row) => ({ ...row, activity: activityById.get(row.activityId), person: personById.get(row.personId) }))
    .filter((row) => row.activity && row.person
      && (!filter.period || monthFromDate(row.activity.plannedDate) === filter.period)
      && (!filter.district || row.activity.district === filter.district)
      && (!filter.outcome || row.activity.outcome === filter.outcome)
      && (!filter.status || getIndicatorStatusForOutcome(row.activity.outcome) === filter.status));
}
function uniquePeople(attendance = filteredAttendance()) {
  const peopleById = new Map();
  attendance.forEach((row) => {
    const person = row.person;
    if (!peopleById.has(person.id)) peopleById.set(person.id, { ...person, activities: new Set(), records: 0 });
    const item = peopleById.get(person.id);
    item.activities.add(row.activity.name);
    item.records += 1;
  });
  return [...peopleById.values()];
}
function budgetMetrics(activities) {
  const knownAllocations = activities.map((row) => numberValue(row.budgetAllocated)).filter((value) => value !== null);
  const knownExpenditures = activities.map((row) => numberValue(row.expenditure)).filter((value) => value !== null);
  const complete = activities.filter((row) => numberValue(row.budgetAllocated) !== null && numberValue(row.expenditure) !== null && numberValue(row.budgetAllocated) > 0);
  const allocated = knownAllocations.reduce((sum, value) => sum + value, 0);
  const expenditure = knownExpenditures.reduce((sum, value) => sum + value, 0);
  const completeAllocated = complete.reduce((sum, row) => sum + Number(row.budgetAllocated), 0);
  const completeExpenditure = complete.reduce((sum, row) => sum + Number(row.expenditure), 0);
  return {
    allocated,
    expenditure,
    completeCount: complete.length,
    incompleteCount: activities.filter((row) => numberValue(row.budgetAllocated) === null || numberValue(row.expenditure) === null).length,
    zeroAllocationCount: activities.filter((row) => numberValue(row.budgetAllocated) === 0).length,
    utilisation: completeAllocated ? completeExpenditure / completeAllocated * 100 : null
  };
}
function filteredPeriods() {
  return [...new Set([...data.indicators.map((row) => row.period), ...data.activities.map((row) => monthFromDate(row.plannedDate))].filter(Boolean))].sort();
}
function initFilters() {
  const periods = filteredPeriods();
  $("#filter-period").innerHTML = `<option value="">All reporting periods</option>${periods.map((month) => `<option value="${escapeHTML(month)}">${new Date(`${month}-01T00:00:00`).toLocaleString("en", { month: "long", year: "numeric" })}</option>`).join("")}`;
  $("#filter-district").innerHTML = `<option value="">All districts</option>${DISTRICTS.map((district) => `<option>${escapeHTML(district)}</option>`).join("")}`;
  $("#filter-outcome").innerHTML = `<option value="">All outcomes</option>${OUTCOMES.map((outcome) => `<option>${escapeHTML(outcome)}</option>`).join("")}`;
}
function statusMarkup(status) {
  const className = status.toLowerCase().replaceAll(" ", "-");
  return `<span class="status status-${escapeHTML(className)}">${escapeHTML(status)}</span>`;
}
function render() {
  renderOverview();
  renderIndicators();
  renderBeneficiaries();
  renderActivities();
  renderManagement();
}
function renderOverview() {
  const indicators = filteredIndicators();
  const activities = filteredActivities();
  const beneficiaries = uniquePeople();
  const onTrack = indicators.filter((row) => getIndicatorStatus(row) === "On Track").length;
  const achievementRows = indicators.filter((row) => percent(numberValue(row.actual), numberValue(row.target)) !== null);
  const meanAchievement = achievementRows.length ? achievementRows.reduce((sum, row) => sum + percent(Number(row.actual), Number(row.target)), 0) / achievementRows.length : null;
  const completed = activities.filter((row) => row.status === "Completed").length;
  const budget = budgetMetrics(activities);
  const budgetRate = budget.utilisation;
  const attention = indicators.filter((row) => ["Needs Attention", "Off Track"].includes(getIndicatorStatus(row))).length
    + activities.filter((row) => row.status === "In Progress" && monthFromDate(row.plannedDate) < "2026-06").length;
  const kpis = [
    { label: "Unique beneficiaries reached", value: formatNumber(beneficiaries.length), foot: "Distinct participant IDs", icon: "♧" },
    { label: "Indicators on track", value: `${onTrack} / ${indicators.length}`, foot: "Of filtered indicators", icon: "◎" },
    { label: "Mean target achievement", value: meanAchievement === null ? "—" : `${meanAchievement.toFixed(1)}%`, foot: "Unweighted mean of indicators", icon: "↗" },
    { label: "Activities completed", value: `${completed} / ${activities.length}`, foot: "Of filtered planned activities", icon: "▦" },
    { label: "Budget utilisation", value: budgetRate === null ? "—" : `${budgetRate.toFixed(1)}%`, foot: `${formatMoney(budget.expenditure)} reported · ${budget.incompleteCount} incomplete · ${budget.zeroAllocationCount} zero`, icon: "$" },
    { label: "Items needing attention", value: formatNumber(attention), foot: "Indicators + overdue activities", icon: "!" }
  ];
  $("#kpi-grid").innerHTML = kpis.map((item) => `<article class="kpi-card"><div class="kpi-top"><span>${escapeHTML(item.label)}</span><span class="kpi-icon">${escapeHTML(item.icon)}</span></div><div class="kpi-value">${escapeHTML(item.value)}</div><div class="kpi-foot">${escapeHTML(item.foot)}</div></article>`).join("");
  renderChart("progress-chart", "bar", {
    labels: MONTH_LABELS,
    datasets: [
      { label: "Planned", data: monthlyActivityCounts(true), backgroundColor: "#dce6f1", borderRadius: 3, maxBarThickness: 18 },
      { label: "Completed", data: monthlyActivityCounts(false), backgroundColor: "#23a598", borderRadius: 3, maxBarThickness: 18 }
    ]
  }, { scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } });
  const outcomeGroups = OUTCOMES.map((outcome) => {
    const rows = indicators.filter((row) => row.outcome === outcome && percent(numberValue(row.actual), numberValue(row.target)) !== null);
    return rows.length ? rows.reduce((sum, row) => sum + percent(Number(row.actual), Number(row.target)), 0) / rows.length : 0;
  });
  renderChart("outcome-chart", "bar", { labels: OUTCOMES.map((item) => item.replace(/^Outcome \d+ · /, "")), datasets: [{ label: "Achievement (%)", data: outcomeGroups, backgroundColor: ["#26a99b", "#5a8dde", "#e4a744"], borderRadius: 4, maxBarThickness: 32 }] }, { indexAxis: "y", scales: { x: { beginAtZero: true, max: Math.max(100, Math.ceil(Math.max(...outcomeGroups, 0) / 20) * 20) } } });
  const genderCounts = countBy(beneficiaries, (person) => person.gender);
  renderChart("gender-chart", "doughnut", { labels: Object.keys(genderCounts), datasets: [{ data: Object.values(genderCounts), backgroundColor: ["#24a79a", "#5889df", "#e8ac4c"], borderWidth: 0, hoverOffset: 4 }] }, { cutout: "68%", plugins: { legend: { position: "right" } } });
  const statusCounts = countBy(activities, (activity) => activity.status);
  renderChart("activity-chart", "doughnut", { labels: ["Completed", "In Progress", "Planned"], datasets: [{ data: ["Completed", "In Progress", "Planned"].map((key) => statusCounts[key] || 0), backgroundColor: ["#23a598", "#e7a73e", "#86a2ca"], borderWidth: 0, hoverOffset: 4 }] }, { cutout: "68%", plugins: { legend: { position: "right" } } });
  const districts = [...new Set(activities.map((item) => item.district))];
  $("#summary-districts").textContent = districts.length ? `${districts.length} district${districts.length === 1 ? "" : "s"}` : "No records";
  renderObservations(indicators, activities, beneficiaries, meanAchievement, budgetRate);
}
function monthlyActivityCounts(planned) {
  const activities = filteredActivities();
  return MONTHS.map((month) => activities
    .filter((row) => monthFromDate(row.plannedDate) === month && (planned || row.status === "Completed"))
    .reduce((sum, row) => sum + (numberValue(planned ? row.plannedParticipants : row.actualParticipants) ?? 0), 0));
}
function renderObservations(indicators, activities, beneficiaries, mean, budgetRate) {
  const notes = [];
  const statusCounts = countBy(indicators, getIndicatorStatus);
  const strongest = [...indicators].filter((row) => percent(numberValue(row.actual), numberValue(row.target)) !== null).sort((a, b) => percent(Number(b.actual), Number(b.target)) - percent(Number(a.actual), Number(a.target)))[0];
  const weakest = [...indicators].filter((row) => percent(numberValue(row.actual), numberValue(row.target)) !== null).sort((a, b) => percent(Number(a.actual), Number(a.target)) - percent(Number(b.actual), Number(b.target)))[0];
  if (strongest) notes.push({ text: `Highest achievement: ${strongest.name} at ${percent(Number(strongest.actual), Number(strongest.target)).toFixed(1)}% of target.`, warning: false });
  if (weakest) notes.push({ text: `Lowest achievement: ${weakest.name} at ${percent(Number(weakest.actual), Number(weakest.target)).toFixed(1)}%; review implementation and data quality.`, warning: true });
  if (statusCounts["Incomplete"]) notes.push({ text: `${statusCounts["Incomplete"]} indicator${statusCounts["Incomplete"] === 1 ? " has" : "s have"} missing actual/target data or a zero target and cannot be assessed.`, warning: true });
  const missingReach = activities.filter((row) => numberValue(row.actualParticipants) === null).length;
  const budget = budgetMetrics(activities);
  if (missingReach) notes.push({ text: `${missingReach} activity record${missingReach === 1 ? " is" : "s are"} missing actual participant counts; these are excluded from reported reach totals.`, warning: true });
  if (budget.incompleteCount) notes.push({ text: `${budget.incompleteCount} activity record${budget.incompleteCount === 1 ? " has" : "s have"} incomplete budget data; utilisation uses complete records only.`, warning: true });
  if (budget.zeroAllocationCount) notes.push({ text: `${budget.zeroAllocationCount} activity record${budget.zeroAllocationCount === 1 ? " has" : "s have"} a zero budget allocation, so utilisation cannot be calculated for those records.`, warning: true });
  if (mean !== null) notes.push({ text: `The unweighted mean indicator achievement is ${mean.toFixed(1)}%; this combines indicators with different units and is descriptive only.`, warning: false });
  if (budgetRate !== null) notes.push({ text: `Filtered activity budget utilisation is ${budgetRate.toFixed(1)}% across ${activities.length} activity record${activities.length === 1 ? "" : "s"}.`, warning: false });
  if (!activities.length) notes.push({ text: "No activity records match the current filters.", warning: true });
  notes.push({ text: `${beneficiaries.length} unique participant IDs represented; participation records may include repeat attendance.`, warning: false });
  $("#observations-list").innerHTML = notes.slice(0, 5).map((note) => `<li class="${note.warning ? "warning" : ""}">${escapeHTML(note.text)}</li>`).join("");
}
function countBy(rows, getKey) {
  return rows.reduce((result, row) => {
    const key = getKey(row);
    result[key] = (result[key] || 0) + 1;
    return result;
  }, {});
}
function renderChart(canvasId, type, chartData, options = {}) {
  if (typeof Chart === "undefined") return;
  const canvas = $(`#${canvasId}`);
  if (!canvas) return;
  if (charts[canvasId]) charts[canvasId].destroy();
  charts[canvasId] = new Chart(canvas, {
    type,
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 250 },
      plugins: {
        legend: { display: type === "doughnut", labels: { color: "#7a8798", boxWidth: 9, boxHeight: 9, padding: 13, font: { family: "DM Sans", size: 9 } } },
        tooltip: { titleFont: { family: "DM Sans" }, bodyFont: { family: "DM Sans" } }
      },
      scales: type === "doughnut" ? {} : {
        x: { grid: { display: false }, ticks: { color: "#8995a5", font: { family: "DM Sans", size: 8 } }, border: { display: false } },
        y: { grid: { color: "#edf0f3" }, ticks: { color: "#8995a5", font: { family: "DM Sans", size: 8 } }, border: { display: false } }
      },
      ...options
    }
  });
}
function renderIndicators() {
  const search = ($("#indicator-search").value || "").trim().toLowerCase();
  const rows = filteredIndicators().filter((row) => `${row.id} ${row.name} ${row.outcome} ${row.definition}`.toLowerCase().includes(search));
  $("#indicator-count").textContent = `${rows.length} record${rows.length === 1 ? "" : "s"}`;
  $("#indicator-table").innerHTML = rows.length ? rows.map((row) => {
    const rate = percent(numberValue(row.actual), numberValue(row.target));
    return `<tr><td><strong>${escapeHTML(row.name)}</strong><small>${escapeHTML(row.id)} · ${escapeHTML(row.outcome)}</small></td><td>${escapeHTML(row.definition)}</td><td>${formatNumber(numberValue(row.baseline))}</td><td>${formatNumber(numberValue(row.target))}</td><td>${formatNumber(numberValue(row.actual))}</td><td class="progress-cell">${rate === null ? "Incomplete" : `${rate.toFixed(1)}%`}<div class="progress-line"><span style="width:${rate === null ? 0 : Math.min(rate, 100)}%"></span></div></td><td>${escapeHTML(row.period)}</td><td>${statusMarkup(getIndicatorStatus(row))}</td></tr>`;
  }).join("") : `<tr><td colspan="8"><div class="empty-state">No indicator records match these filters.</div></td></tr>`;
}
function renderBeneficiaries() {
  const attendance = filteredAttendance();
  const people = uniquePeople(attendance);
  const search = ($("#beneficiary-search").value || "").trim().toLowerCase();
  $("#unique-count").textContent = formatNumber(people.length);
  const ageCounts = countBy(people, (person) => person.ageGroup);
  renderChart("age-chart", "bar", { labels: Object.keys(ageCounts).sort(), datasets: [{ label: "Unique participants", data: Object.keys(ageCounts).sort().map((key) => ageCounts[key]), backgroundColor: "#4b8ad7", borderRadius: 4, maxBarThickness: 29 }] }, { scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } });
  const districtCounts = countBy(attendance, (row) => row.activity.district);
  renderChart("district-chart", "bar", { labels: Object.keys(districtCounts), datasets: [{ label: "Participation records", data: Object.values(districtCounts), backgroundColor: "#20a497", borderRadius: 4, maxBarThickness: 30 }] }, { scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } });
  const activityCounts = countBy(attendance, (row) => row.activity.name);
  renderChart("programme-chart", "bar", { labels: Object.keys(activityCounts).map((name) => name.length > 23 ? `${name.slice(0, 21)}…` : name), datasets: [{ label: "Participation records", data: Object.values(activityCounts), backgroundColor: "#e5aa49", borderRadius: 4, maxBarThickness: 25 }] }, { indexAxis: "y", scales: { x: { beginAtZero: true, ticks: { precision: 0 } } } });
  const matching = people.filter((person) => `${person.id} ${person.gender} ${person.ageGroup} ${person.district} ${[...person.activities].join(" ")}`.toLowerCase().includes(search));
  $("#beneficiary-count").textContent = `${matching.length} unique participant${matching.length === 1 ? "" : "s"} · ${attendance.length} participation records`;
  $("#beneficiary-table").innerHTML = matching.length ? matching.map((person) => `<tr><td><strong>${escapeHTML(person.id)}</strong><small>Fictional ID</small></td><td>${escapeHTML(person.gender)}</td><td>${escapeHTML(person.ageGroup)}</td><td>${escapeHTML(person.district)}</td><td>${escapeHTML([...person.activities].join(", "))}</td><td>${person.records}</td></tr>`).join("") : `<tr><td colspan="6"><div class="empty-state">No participant records match these filters.</div></td></tr>`;
}
function renderActivities() {
  const search = ($("#activity-search").value || "").trim().toLowerCase();
  const activities = filteredActivities();
  const rows = activities.filter((row) => `${row.id} ${row.name} ${row.district} ${row.outcome} ${row.status}`.toLowerCase().includes(search));
  const planned = activities.map((row) => numberValue(row.plannedParticipants)).filter((value) => value !== null).reduce((sum, value) => sum + value, 0);
  const reportedReach = activities.map((row) => numberValue(row.actualParticipants)).filter((value) => value !== null);
  const reached = reportedReach.reduce((sum, value) => sum + value, 0);
  const missingReach = activities.filter((row) => numberValue(row.actualParticipants) === null).length;
  const budget = budgetMetrics(activities);
  const rate = budget.utilisation;
  const complete = activities.filter((row) => row.status === "Completed").length;
  $("#activity-summary").innerHTML = [
    ["Activities completed", `${complete} / ${activities.length}`, `${activities.length - complete} planned or in progress`],
    ["Activity participant counts", formatNumber(reached), `${formatNumber(planned)} planned places · ${missingReach} missing actual counts`],
    ["Budget allocated", formatMoney(budget.allocated), `${formatMoney(budget.expenditure)} reported · ${budget.incompleteCount} incomplete · ${budget.zeroAllocationCount} zero`],
    ["Budget utilisation", rate === null ? "—" : `${rate.toFixed(1)}%`, `Weighted across ${budget.completeCount} complete records`]
  ].map(([label, value, foot]) => `<div class="activity-stat"><small>${escapeHTML(label)}</small><strong>${escapeHTML(value)}</strong><span>${escapeHTML(foot)}</span></div>`).join("");
  $("#activity-count").textContent = `${rows.length} record${rows.length === 1 ? "" : "s"}`;
  $("#activity-table").innerHTML = rows.length ? rows.map((row) => {
    const allocated = numberValue(row.budgetAllocated);
    const spent = numberValue(row.expenditure);
    const utilisation = percent(spent, allocated);
    return `<tr><td><strong>${escapeHTML(row.name)}</strong><small>${escapeHTML(row.id)} · ${escapeHTML(row.outcome)}</small></td><td>${escapeHTML(row.district)}</td><td>${escapeHTML(row.plannedDate)}</td><td>${row.completionDate ? escapeHTML(row.completionDate) : "—"}</td><td>${formatNumber(numberValue(row.plannedParticipants))} / ${formatNumber(numberValue(row.actualParticipants))}</td><td>${formatMoney(allocated)} / ${formatMoney(spent)}</td><td>${utilisation === null ? "Incomplete" : `${utilisation.toFixed(1)}%`}</td><td>${statusMarkup(row.status)}</td></tr>`;
  }).join("") : `<tr><td colspan="8"><div class="empty-state">No activity records match these filters.</div></td></tr>`;
}
function renderManagement() {
  const indicatorQuery = ($("#management-indicator-search").value || "").toLowerCase().trim();
  const activityQuery = ($("#management-activity-search").value || "").toLowerCase().trim();
  $("#management-indicator-list").innerHTML = managementRows(data.indicators.filter((row) => `${row.id} ${row.name} ${row.outcome}`.toLowerCase().includes(indicatorQuery)), "indicator");
  $("#management-activity-list").innerHTML = managementRows(data.activities.filter((row) => `${row.id} ${row.name} ${row.district}`.toLowerCase().includes(activityQuery)), "activity");
}
function managementRows(rows, type) {
  if (!rows.length) return `<div class="empty-state">No ${type} records found.</div>`;
  return rows.map((row) => `<div class="management-row"><div class="management-row-text"><strong>${escapeHTML(row.name)}</strong><small>${escapeHTML(row.id)} · ${escapeHTML(type === "indicator" ? `${row.period} · ${getIndicatorStatus(row)}` : `${row.district} · ${row.status}`)}</small></div><div class="management-actions"><button class="icon-button" data-edit="${escapeHTML(type)}" data-id="${escapeHTML(row.id)}">Edit</button><button class="icon-button delete" data-delete="${escapeHTML(type)}" data-id="${escapeHTML(row.id)}">Delete</button></div></div>`).join("");
}
function navigate(page) {
  activePage = page;
  $$(".nav-link").forEach((button) => button.classList.toggle("active", button.dataset.page === page));
  $$(".page-section").forEach((section) => section.classList.toggle("active", section.id === `page-${page}`));
  const titles = { overview: "Overview", indicators: "Indicator Performance", beneficiaries: "Beneficiary Analysis", activities: "Project Activities", data: "Data Management" };
  $("#page-title").textContent = titles[page];
  $("#sidebar").classList.remove("open");
  render();
}

const indicatorFields = [
  { name: "id", label: "Indicator ID", type: "text", required: true },
  { name: "name", label: "Indicator name", type: "text", required: true, full: true },
  { name: "outcome", label: "Programme outcome", type: "select", options: OUTCOMES, required: true },
  { name: "definition", label: "Definition / unit", type: "text", required: true },
  { name: "baseline", label: "Baseline", type: "number", required: true, min: 0 },
  { name: "target", label: "Target", type: "number", required: true, min: 0 },
  { name: "actual", label: "Actual achievement", type: "number", required: false, min: 0 },
  { name: "period", label: "Reporting period", type: "month", required: true }
];
const activityFields = [
  { name: "id", label: "Activity ID", type: "text", required: true },
  { name: "name", label: "Activity name", type: "text", required: true, full: true },
  { name: "outcome", label: "Programme outcome", type: "select", options: OUTCOMES, required: true },
  { name: "district", label: "District", type: "select", options: DISTRICTS, required: true },
  { name: "plannedDate", label: "Planned date", type: "date", required: true },
  { name: "completionDate", label: "Completion date", type: "date", required: false },
  { name: "plannedParticipants", label: "Planned participants", type: "number", required: true, min: 0 },
  { name: "actualParticipants", label: "Actual participants", type: "number", required: false, min: 0 },
  { name: "status", label: "Activity status", type: "select", options: ["Planned", "In Progress", "Completed"], required: true },
  { name: "budgetAllocated", label: "Budget allocated (US$)", type: "number", required: true, min: 0 },
  { name: "expenditure", label: "Expenditure (US$)", type: "number", required: false, min: 0 }
];
function openForm(type, record = null) {
  dialogType = type;
  editingId = record ? record.id : null;
  const fields = type === "indicator" ? indicatorFields : activityFields;
  $("#dialog-title").textContent = `${record ? "Edit" : "Add"} ${type}`;
  $("#form-error").textContent = "";
  $("#form-fields").innerHTML = fields.map((field) => {
    const options = field.type === "select" ? `<select name="${field.name}" ${field.required ? "required" : ""}>${field.options.map((option) => `<option value="${escapeHTML(option)}">${escapeHTML(option)}</option>`).join("")}</select>` : `<input name="${field.name}" type="${field.type}" ${field.required ? "required" : ""} ${field.min !== undefined ? `min="${field.min}" step="any"` : ""} ${field.name === "id" && record ? "readonly" : ""}>`;
    return `<div class="form-field ${field.full ? "full-width" : ""}"><label for="field-${field.name}">${escapeHTML(field.label)}${field.required ? " *" : ""}</label>${options.replace(`name="${field.name}"`, `id="field-${field.name}" name="${field.name}"`)}</div>`;
  }).join("");
  const form = $("#record-form");
  fields.forEach((field) => { if (record) form.elements[field.name].value = record[field.name] ?? ""; });
  if (!record) {
    const idField = form.elements.id;
    const existing = (type === "indicator" ? data.indicators : data.activities).map((row) => row.id);
    const prefix = type === "indicator" ? "IND" : "ACT";
    let number = 1;
    while (existing.includes(`${prefix}-${String(number).padStart(3, "0")}`)) number += 1;
    idField.value = `${prefix}-${String(number).padStart(3, "0")}`;
    if (type === "indicator") form.elements.period.value = "2026-06";
  }
  $("#record-dialog").showModal();
  $("#form-fields input:not([readonly]), #form-fields select").item(0)?.focus();
}
function formRecord() {
  const fields = dialogType === "indicator" ? indicatorFields : activityFields;
  const record = {};
  fields.forEach((field) => {
    const raw = $("#record-form").elements[field.name].value.trim();
    record[field.name] = field.type === "number" ? (raw === "" ? null : Number(raw)) : raw;
  });
  return record;
}
function validateRecord(record, type, rowNumber = null) {
  const fields = type === "indicator" ? indicatorFields : activityFields;
  const prefix = rowNumber ? `Row ${rowNumber}: ` : "";
  for (const field of fields) {
    if (field.required && (record[field.name] === "" || record[field.name] === null || record[field.name] === undefined)) return `${prefix}${field.label} is required.`;
    if (field.type === "number" && record[field.name] !== null && (!Number.isFinite(record[field.name]) || record[field.name] < 0)) return `${prefix}${field.label} must be a non-negative number.`;
    if (field.type === "month" && record[field.name] && !/^\d{4}-(0[1-9]|1[0-2])$/.test(record[field.name])) return `${prefix}${field.label} must use YYYY-MM.`;
    if (field.type === "select" && record[field.name] && !field.options.includes(record[field.name])) return `${prefix}${field.label} is not a recognised value.`;
    if (field.type === "date" && record[field.name] && !isValidISODate(record[field.name])) return `${prefix}${field.label} must use a valid YYYY-MM-DD date.`;
  }
  if (type === "activity") {
    if (record.completionDate && record.completionDate < record.plannedDate) return `${prefix}Completion date cannot be before planned date.`;
    if (record.status === "Completed" && !record.completionDate) return `${prefix}Completed activities need a completion date.`;
    if (record.actualParticipants !== null && record.plannedParticipants !== null && record.actualParticipants > record.plannedParticipants * 4) return `${prefix}Actual participants cannot exceed four times the planned number. Check the value.`;
  }
  return "";
}
function saveForm(event) {
  event.preventDefault();
  const record = formRecord();
  const error = validateRecord(record, dialogType);
  if (error) { $("#form-error").textContent = error; return; }
  const list = dialogType === "indicator" ? data.indicators : data.activities;
  const duplicate = list.some((item) => item.id.toLowerCase() === record.id.toLowerCase() && item.id !== editingId);
  if (duplicate) { $("#form-error").textContent = "That record ID already exists. Use a unique ID."; return; }
  if (editingId) {
    const index = list.findIndex((item) => item.id === editingId);
    list[index] = record;
  } else list.push(record);
  if (!persistData()) return;
  $("#record-dialog").close();
  initFilters();
  render();
  showToast(`${dialogType === "indicator" ? "Indicator" : "Activity"} ${editingId ? "updated" : "added"} successfully.`);
}
function csvEscape(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
function exportCSV(type) {
  const fields = type === "indicators" ? indicatorFields : activityFields;
  const rows = type === "indicators" ? data.indicators : data.activities;
  const csv = [fields.map((field) => csvEscape(field.name)).join(","), ...rows.map((row) => fields.map((field) => csvEscape(row[field.name])).join(","))].join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }));
  link.download = `impacttrack-${type}-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  const recordType = type === "indicators" ? "indicator" : "activity";
  showToast(`${rows.length} ${recordType} record${rows.length === 1 ? "" : "s"} exported.`);
}
function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  const source = text.replace(/^\uFEFF/, "");
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (char === '"' && source[index + 1] === '"') { cell += '"'; index += 1; }
      else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"' && cell.length === 0) quoted = true;
    else if (char === ",") { row.push(cell); cell = ""; }
    else if (char === "\n" || char === "\r") {
      if (char === "\r" && source[index + 1] === "\n") index += 1;
      row.push(cell); cell = "";
      if (row.some((value) => value.trim() !== "")) rows.push(row);
      row = [];
    } else cell += char;
  }
  if (quoted) throw new Error("CSV contains an unclosed quoted field.");
  if (cell || row.length) { row.push(cell); if (row.some((value) => value.trim() !== "")) rows.push(row); }
  return rows;
}
async function importCSV(type, file) {
  if (!file) return;
  try {
    const collection = type === "indicator" ? "indicators" : "activities";
    const rows = parseCSV(await file.text());
    if (rows.length < 2) throw new Error("CSV must include a header and at least one data row.");
    const fields = collection === "indicators" ? indicatorFields : activityFields;
    const headers = rows[0].map((header) => header.trim());
    const missing = fields.map((field) => field.name).filter((name) => !headers.includes(name));
    if (missing.length) throw new Error(`Missing required column${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}.`);
    const list = collection === "indicators" ? data.indicators : data.activities;
    const candidates = [];
    const issues = [];
    const importedIds = new Set();
    rows.slice(1).forEach((values, index) => {
      const record = {};
      fields.forEach((field) => {
        const raw = values[headers.indexOf(field.name)]?.trim() ?? "";
        record[field.name] = field.type === "number" ? (raw === "" ? null : Number(raw)) : raw;
      });
      const validation = validateRecord(record, type, index + 2);
      if (validation) issues.push(validation);
      else if (importedIds.has(record.id.toLowerCase())) issues.push(`Row ${index + 2}: Duplicate ID inside this CSV.`);
      else { importedIds.add(record.id.toLowerCase()); candidates.push(record); }
    });
    if (!candidates.length) throw new Error(`No valid records found. ${issues.slice(0, 5).join(" ")}`);
    const merged = [...list];
    candidates.forEach((record) => {
      const existing = merged.findIndex((item) => item.id.toLowerCase() === record.id.toLowerCase());
      if (existing >= 0) merged[existing] = record;
      else merged.push(record);
    });
    if (collection === "indicators") data.indicators = merged;
    else data.activities = merged;
    if (!persistData()) return;
    initFilters();
    render();
    const recordType = collection === "indicators" ? "indicator" : "activity";
    const message = `${candidates.length} valid ${recordType} record${candidates.length === 1 ? "" : "s"} imported${issues.length ? `; ${issues.length} row${issues.length === 1 ? "" : "s"} rejected (${issues.slice(0, 3).join(" ")})` : ""}.`;
    showToast(message, issues.length > 0);
  } catch (error) {
    showToast(`Import failed: ${error.message}`, true);
  }
}
function deleteRecord(type, id) {
  const list = type === "indicator" ? data.indicators : data.activities;
  const row = list.find((item) => item.id === id);
  if (!row || !window.confirm(`Delete "${row.name}" (${id})? This cannot be undone. Related participant attendance will also be removed for an activity.`)) return;
  if (type === "indicator") data.indicators = list.filter((item) => item.id !== id);
  else {
    data.activities = list.filter((item) => item.id !== id);
    data.attendance = data.attendance.filter((item) => item.activityId !== id);
  }
  if (!persistData()) return;
  initFilters();
  render();
  showToast(`${type === "indicator" ? "Indicator" : "Activity"} deleted.`);
}
function addActivityAttendance(activity) {
  if (!activity || !activity.id || !activity.actualParticipants) return;
  const currentCount = data.attendance.filter((row) => row.activityId === activity.id).length;
  const requested = Math.max(0, Number(activity.actualParticipants) - currentCount);
  if (!requested) return;
  for (let index = 0; index < requested; index += 1) {
    const person = demoPeople[(data.attendance.length * 5 + index * 7) % demoPeople.length];
    if (!data.people.some((item) => item.id === person.id)) data.people.push({ ...person });
    if (!data.attendance.some((row) => row.activityId === activity.id && row.personId === person.id)) data.attendance.push({ activityId: activity.id, personId: person.id });
  }
}
function handleDelegatedClick(event) {
  const edit = event.target.closest("[data-edit]");
  const remove = event.target.closest("[data-delete]");
  if (edit) {
    const type = edit.dataset.edit;
    const row = (type === "indicator" ? data.indicators : data.activities).find((item) => item.id === edit.dataset.id);
    if (row) openForm(type, row);
  } else if (remove) deleteRecord(remove.dataset.delete, remove.dataset.id);
}
function bindEvents() {
  $$(".nav-link").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.page)));
  ["filter-period", "filter-district", "filter-outcome", "filter-status"].forEach((id) => $(`#${id}`).addEventListener("change", render));
  $("#reset-filters").addEventListener("click", () => {
    $("#filter-period").value = "";
    $("#filter-district").value = "";
    $("#filter-outcome").value = "";
    $("#filter-status").value = "";
    render();
  });
  $("#mobile-menu").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  $("#indicator-search").addEventListener("input", renderIndicators);
  $("#activity-search").addEventListener("input", renderActivities);
  $("#beneficiary-search").addEventListener("input", renderBeneficiaries);
  $("#management-indicator-search").addEventListener("input", renderManagement);
  $("#management-activity-search").addEventListener("input", renderManagement);
  $$("[data-open-indicator]").forEach((button) => button.addEventListener("click", () => openForm("indicator")));
  $$("[data-open-activity]").forEach((button) => button.addEventListener("click", () => openForm("activity")));
  $$("[data-export]").forEach((button) => button.addEventListener("click", () => exportCSV(button.dataset.export)));
  $("#record-form").addEventListener("submit", saveForm);
  $$(".close-dialog").forEach((button) => button.addEventListener("click", () => $("#record-dialog").close()));
  $("#form-fields").addEventListener("input", () => { $("#form-error").textContent = ""; });
  $("#management-indicator-list").addEventListener("click", handleDelegatedClick);
  $("#management-activity-list").addEventListener("click", handleDelegatedClick);
  $("#indicator-import").addEventListener("change", (event) => { importCSV("indicator", event.target.files[0]); event.target.value = ""; });
  $("#activity-import").addEventListener("change", (event) => { importCSV("activity", event.target.files[0]); event.target.value = ""; });
  $("#restore-demo").addEventListener("click", () => {
    if (!window.confirm("Restore the original fictional demo data? All browser-saved changes will be lost.")) return;
    data = freshDemoData();
    if (!persistData()) return;
    initFilters();
    render();
    showToast("Original fictional demonstration data restored.");
  });
}

initFilters();
bindEvents();
render();
if (storageLoadError) showToast("Saved browser data could not be read. The fictional demo data is shown; check browser storage permissions.", true);
