#!/usr/bin/env python3
"""
Fetch the full Softr schema for every database the API key can see (or a
single database if DB_FILTER is set), and write two files:

  - docs/softr-schema.md          human-readable markdown
  - docs/softr-schema-full.json   raw JSON dump (databases, tables, fields,
                                  select choices, sample records)

Required env:
  SOFTR_API_KEY   Personal Access Token, scoped to the workspaces you want.

Optional env:
  DB_FILTER       Single database ID. If set, only that database is fetched.
  SAMPLE_LIMIT    How many sample records to fetch per table. Default 2.
"""

import json
import os
import sys
import urllib.error
import urllib.request

API_KEY = os.environ.get("SOFTR_API_KEY", "").strip()
if not API_KEY:
    print("ERROR: SOFTR_API_KEY is not set", file=sys.stderr)
    sys.exit(1)

DB_FILTER = os.environ.get("DB_FILTER", "").strip()
SAMPLE_LIMIT = int(os.environ.get("SAMPLE_LIMIT", "2"))
BASE = "https://tables-api.softr.io/api/v1"


def get(path):
    url = f"{BASE}{path}"
    req = urllib.request.Request(url, headers={"Softr-Api-Key": API_KEY})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = ""
        try:
            body = e.read().decode("utf-8", errors="replace")
        except Exception:
            pass
        print(f"ERROR fetching {path}: {e.code} {e.reason}\n{body}", file=sys.stderr)
        raise


def unwrap(resp):
    if isinstance(resp, dict) and "data" in resp:
        return resp["data"]
    return resp


# ---------------------------------------------------------------------------
# Fetch
# ---------------------------------------------------------------------------

print("Fetching list of databases...")
databases = unwrap(get("/databases")) or []
print(f"  Found {len(databases)} database(s)")

if DB_FILTER:
    databases = [d for d in databases if d.get("id") == DB_FILTER]
    if not databases:
        print(f"ERROR: database id {DB_FILTER} not visible to this API key", file=sys.stderr)
        sys.exit(1)

dump = {"databases": []}

for db in databases:
    db_id = db.get("id")
    db_name = db.get("name", "(unnamed)")
    print(f"\nDatabase: {db_name} ({db_id})")

    db_entry = {
        "id": db_id,
        "name": db_name,
        "description": db.get("description"),
        "tables": [],
    }

    tables = unwrap(get(f"/databases/{db_id}/tables")) or []
    print(f"  {len(tables)} table(s)")

    for t in tables:
        table_id = t.get("id")
        table_name = t.get("name", "(unnamed)")
        print(f"  - {table_name} ({table_id})")

        try:
            table_full = unwrap(get(f"/databases/{db_id}/tables/{table_id}"))
        except Exception:
            table_full = {}

        try:
            sample = unwrap(get(
                f"/databases/{db_id}/tables/{table_id}/records"
                f"?limit={SAMPLE_LIMIT}&fieldNames=true"
            )) or []
        except Exception:
            sample = []

        db_entry["tables"].append({
            "id": table_id,
            "name": table_name,
            "description": t.get("description"),
            "fields": table_full.get("fields") or [],
            "sampleRecords": sample,
        })

    dump["databases"].append(db_entry)


# ---------------------------------------------------------------------------
# Write JSON
# ---------------------------------------------------------------------------

os.makedirs("docs", exist_ok=True)
json_path = "docs/softr-schema-full.json"
with open(json_path, "w") as f:
    json.dump(dump, f, indent=2, sort_keys=False)
print(f"\nWrote {json_path}")


# ---------------------------------------------------------------------------
# Write Markdown
# ---------------------------------------------------------------------------

def fmt_choices(options):
    choices = (options or {}).get("choices") or []
    if not choices:
        return ""
    parts = []
    for c in choices:
        label = c.get("label") or c.get("name") or ""
        cid = c.get("id") or ""
        parts.append(f"`{label}` ({cid})")
    return "; ".join(parts)


def fmt_link_target(options):
    options = options or {}
    target = (
        options.get("linkedTableName")
        or options.get("linkedTableId")
        or options.get("targetTableName")
        or options.get("targetTableId")
    )
    return f"-> {target}" if target else ""


def md_escape(s):
    if s is None:
        return ""
    return str(s).replace("|", "\\|").replace("\n", " ")


def field_row(field):
    fid = field.get("id", "")
    name = md_escape(field.get("name", ""))
    ftype = field.get("type", "")
    options = field.get("options") or {}

    notes = []
    if ftype == "LINKED_RECORD":
        link = fmt_link_target(options)
        if link:
            notes.append(link)
    if ftype in ("SELECT", "MULTI_SELECT"):
        choices_str = fmt_choices(options)
        if choices_str:
            notes.append("choices: " + choices_str)
    if ftype == "LOOKUP":
        src = options.get("lookupFieldName") or options.get("lookupFieldId")
        if src:
            notes.append(f"lookup of `{src}`")
    if ftype == "FORMULA":
        formula = options.get("formula")
        if formula:
            notes.append(f"formula: `{formula}`")

    notes_str = md_escape("; ".join(notes))
    return f"| {name} | `{ftype}` | `{fid}` | {notes_str} |"


lines = [
    "# Creator Scans — Softr Database Schema",
    "",
    "_Auto-generated by `.github/workflows/fetch-full-schema.yml`. "
    "Do not edit by hand; re-run the workflow to refresh._",
    "",
]

for db in dump["databases"]:
    lines.append(f"## Database: {md_escape(db['name'])}")
    lines.append("")
    lines.append(f"**ID:** `{db['id']}`")
    if db.get("description"):
        lines.append("")
        lines.append(md_escape(db["description"]))
    lines.append("")

    for t in db["tables"]:
        lines.append(f"### {md_escape(t['name'])}")
        lines.append("")
        lines.append(f"**ID:** `{t['id']}`")
        if t.get("description"):
            lines.append("")
            lines.append(md_escape(t["description"]))
        lines.append("")
        fields = t.get("fields") or []
        if not fields:
            lines.append("_No fields returned for this table._")
            lines.append("")
            continue
        lines.append("| Field | Type | ID | Notes |")
        lines.append("|-------|------|----|-------|")
        for field in fields:
            lines.append(field_row(field))
        lines.append("")

md_path = "docs/softr-schema.md"
with open(md_path, "w") as f:
    f.write("\n".join(lines).rstrip() + "\n")
print(f"Wrote {md_path}")

print("\nDone.")
