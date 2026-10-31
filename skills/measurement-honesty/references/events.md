# Fixed event and truthful state example

New illustrative schema based on U04, not a provider API or working integration:

```json
{
  "action": "download_project_brief",
  "surface": "foundation",
  "outcome": "local_file_created"
}
```

Use only an approved fixed vocabulary. Do not add a visitor's message, contact details, filename, account identifier or full URL as event values.

| Actual result | Appropriate UI state |
|---|---|
| Local file created | “Brief downloaded” |
| Clipboard write succeeded | “Brief copied” |
| Clipboard denied | Explain download/manual copy option |
| Endpoint missing/unverified | No claim of submission |
| Endpoint error | Explicit failure, preserve user input appropriately |
| Verified submission accepted | Report only the confirmed accepted state |

MONGRAIN's foundation enquiry is reported local-only in U02. Verify source before changing that contract; do not create lead collection as a side effect of a graphics/export request.

No tracking calls, form endpoints or delivery tests were performed by this documentation integration.
