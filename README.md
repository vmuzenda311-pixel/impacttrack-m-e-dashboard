# ImpactTrack — M&E Performance Dashboard

ImpactTrack is a responsive, single-page monitoring and evaluation dashboard for a fictional youth empowerment programme in Zimbabwe. It demonstrates how an NGO, local authority or project team could review delivery progress, indicator results, participant reach and expenditure.

> **Important:** Every programme, district-level result, participant record and figure in this application is fictional demonstration data. It does not describe a real organisation or real person. Observed outcomes are not evidence that the programme caused those outcomes.

## Project files

- `index.html` — dashboard layout and accessible controls
- `style.css` — responsive visual design
- `script.js` — demo data, calculations, navigation, charts, validation and browser persistence
- `README.md` — setup and interpretation notes

## Technology

- HTML5, CSS3 and vanilla JavaScript
- Chart.js 4 from jsDelivr CDN
- Browser LocalStorage for persistence

No backend, framework, database or build step is required. Chart.js and the web fonts require an internet connection; the rest of the interface runs in a modern browser.

## Run locally with VS Code Live Server

1. Open the project folder in Visual Studio Code.
2. If you do not already have it, install the **Live Server** extension by Ritwick Dey from the VS Code Extensions view.
3. In the VS Code Explorer, right-click `index.html` and select **Open with Live Server**. Alternatively, click **Go Live** in the VS Code status bar.
4. Your browser should open the local dashboard, usually at an address such as `http://127.0.0.1:5500`.
5. To stop Live Server, click the port/status item in VS Code or close the server session.

You can also open `index.html` directly in a modern browser, though Live Server provides a more consistent local development workflow.

## M&E concepts and calculations

- **Activities** are the work delivered (for example, a training cohort or a mentoring session).
- **Outputs** are direct products or reach from activities (for example, participants enrolled or completing training).
- **Outcomes** describe changes for participants (for example, employment or improved skills). They should not be attributed to the programme solely because a change was observed.
- Indicator achievement is `actual achievement ÷ target × 100`. An absent actual, absent target or zero target is marked **Incomplete** and is excluded from achievement averages.
- Indicator status: **On Track** is at least 80%; **Needs Attention** is at least 50% and below 80%; **Off Track** is below 50%. These are illustrative management thresholds, not universal standards.
- Overall target achievement is the **unweighted mean** of assessable indicator percentages. Indicators use different units, so this is a descriptive summary—not a combined measure of impact.
- Activity budget utilisation is `expenditure ÷ allocated budget × 100`. Portfolio utilisation uses summed expenditure divided by summed allocations (a weighted rate). Missing expenditure/allocation values are not presented as zero; a zero allocation has no calculable utilisation.
- Beneficiary reach counts distinct participant IDs. An individual may have multiple attendance/participation records. The dashboard labels these separately to avoid presenting repeated participation as additional unique people.
- The monthly delivery chart sums planned participant places for activities planned in each month and actual participant counts for completed activities in that month. It does not imply that a planned activity was completed merely because its month has passed.

## Data assumptions and limitations

- The fictional reporting window is January–June 2026, across Bulawayo, Gweru, Mutare and Masvingo.
- Demonstration participant IDs, demographic groups, targets, actuals, dates and finances are invented.
- Budget values are displayed in US dollars for this example only; no exchange-rate, inflation or local-currency conversion is applied.
- The sample participant roster is pseudonymous demonstration data; it contains no names or real personal identifiers.
- Activity status and dates are manually recorded. The dashboard does not independently verify them.
- An activity contributes participation records only when those records exist; activity totals and participant-level records are not automatically assumed to reconcile.
- Filters reflect the selected records. Indicator records are filtered by their reporting month and associated district/outcome; activities and attendance records use their planned month, district and outcome. Indicator status filtering uses the indicator's status; for activity/beneficiary records it uses the average status of the indicators associated with the activity outcome.
- LocalStorage is specific to the browser profile and device. This is a demonstration application, not a secure multi-user records system or a substitute for an organisation's data-protection process.
- The page links to Chart.js and Google Fonts over the internet; without connectivity, charts and remote typography may not load.

## How to use

### Navigate and filter

Use the sidebar to switch among Overview, Indicator Performance, Beneficiary Analysis, Project Activities and Data Management without reloading. The reporting period, district, programme outcome and indicator-status filters are shared across the dashboard. Select **Reset filters** to clear them. Tables also have page-specific text search.

### Manage records

From Indicator Performance or Project Activities, use **Add indicator** or **Add activity**. In Data Management, use the matching **Add**, **Edit** and **Delete** controls. Delete and restore actions ask for confirmation. Required values, non-negative numeric amounts, unique IDs, dates and completion status are validated before saving. A zero target or allocation can be recorded, but its percentage is shown as incomplete.

Changes are saved in LocalStorage after a successful save. Choose **Restore demo data** to replace saved changes with the original fictional example.

### CSV import and export

Data Management supports CSV import and export for indicators and activities; indicator and activity pages also have export buttons. Exported CSVs include a header row. For import, retain the exported column names and the record fields. Indicator headers are `id,name,outcome,definition,baseline,target,actual,period`; activity headers are `id,name,outcome,district,plannedDate,completionDate,plannedParticipants,actualParticipants,status,budgetAllocated,expenditure`. Dates use ISO format (`YYYY-MM-DD`); indicator reporting periods use `YYYY-MM`. Blank optional numeric fields remain missing. Import adds records and replaces records with matching IDs. Invalid rows are rejected with an on-screen explanation; other valid rows can still be imported.

## Testing checklist

- [ ] Open the app with Live Server; confirm responsive layout on desktop and a narrow/mobile viewport.
- [ ] Switch through all five navigation sections; confirm no page reload.
- [ ] Change each global filter, combine filters, then reset; confirm KPIs, tables and charts recalculate.
- [ ] Search indicators, participants, activities and management lists.
- [ ] Add and edit indicator and activity records; confirm validation catches missing fields, invalid numbers, duplicate IDs and invalid completion dates.
- [ ] Delete a record and cancel/confirm the prompt; restore demo data after testing.
- [ ] Export both CSV types and verify they contain header and data rows. Import a valid CSV and a malformed/invalid CSV and read the feedback.
- [ ] Refresh the page and confirm saved records persist in the same browser.
- [ ] Check that unique participant counts differ appropriately from participation-record totals where repeat attendance exists.
- [ ] Test with Chart.js unavailable or with empty matching results; the content should remain usable and empty states should be clear.

## Future improvements

- Add role-based access, a secure backend and governed multi-user storage.
- Support configurable indicator metadata, disaggregation dimensions and reporting calendars.
- Add data-quality checks, missingness summaries, change history and audit trails.
- Provide accessible chart data tables, automated tests and downloadable reporting packs.
- Add documented data-protection, retention and consent workflows before any real participant data is used.
