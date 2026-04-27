#!/usr/bin/env python3
"""Convert Squarespace customer export to Shopify customer import format.

Reads:  web/data/Customers.csv          (Squarespace export)
Writes: web/data/shopify-customer-import.csv
"""
import csv
import re
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
SRC = DATA_DIR / "Customers.csv"
DST = DATA_DIR / "shopify-customer-import.csv"

SHOPIFY_HEADERS = [
    "First Name",
    "Last Name",
    "Email",
    "Accepts Email Marketing",
    "Default Address Company",
    "Default Address Address1",
    "Default Address Address2",
    "Default Address City",
    "Default Address Province Code",
    "Default Address Country Code",
    "Default Address Zip",
    "Default Address Phone",
    "Phone",
    "Accepts SMS Marketing",
    "Tags",
    "Note",
    "Tax Exempt",
]

PROVINCE_CODE_RE = re.compile(r"^[A-Z]{2,3}$")


def parse_name(full_name: str) -> tuple[str, str]:
    parts = full_name.strip().split()
    if not parts:
        return "", ""
    if len(parts) == 1:
        return parts[0], ""
    return parts[0], " ".join(parts[1:])


def pick_address(row: dict) -> dict:
    """Prefer shipping, fall back to billing when shipping Address 1 is blank."""
    if row.get("Shipping Address 1", "").strip():
        return {
            "address1": row.get("Shipping Address 1", ""),
            "address2": row.get("Shipping Address 2", ""),
            "city": row.get("Shipping City", ""),
            "zip": row.get("Shipping Zip", ""),
            "province": row.get("Shipping Province/State", ""),
            "country": row.get("Shipping Country", ""),
            "phone": row.get("Shipping Phone Number", ""),
            "name": row.get("Shipping Name", ""),
        }
    return {
        "address1": row.get("Billing Address 1", ""),
        "address2": row.get("Billing Address 2", ""),
        "city": row.get("Billing City", ""),
        "zip": row.get("Billing Zip", ""),
        "province": row.get("Billing Province/State", ""),
        "country": row.get("Billing Country", ""),
        "phone": row.get("Billing Phone Number", ""),
        "name": row.get("Billing Name", ""),
    }


def normalize_province(code: str) -> str:
    code = code.strip()
    if PROVINCE_CODE_RE.match(code):
        return code
    return ""


def convert_row(row: dict) -> dict:
    first = (row.get("First Name") or "").strip()
    last = (row.get("Last Name") or "").strip()

    address = pick_address(row)

    if not first and not last:
        source_name = (
            address["name"].strip()
            or row.get("Billing Name", "").strip()
            or row.get("Shipping Name", "").strip()
        )
        if source_name:
            first, last = parse_name(source_name)

    tags = (row.get("Mailing Lists") or "").strip()

    return {
        "First Name": first,
        "Last Name": last,
        "Email": (row.get("Email") or "").strip(),
        "Accepts Email Marketing": "yes",
        "Default Address Company": "",
        "Default Address Address1": address["address1"].strip(),
        "Default Address Address2": address["address2"].strip(),
        "Default Address City": address["city"].strip(),
        "Default Address Province Code": normalize_province(address["province"]),
        "Default Address Country Code": address["country"].strip(),
        "Default Address Zip": address["zip"].strip(),
        "Default Address Phone": address["phone"].strip(),
        "Phone": "",
        "Accepts SMS Marketing": "no",
        "Tags": tags,
        "Note": "",
        "Tax Exempt": "no",
    }


def main() -> None:
    with SRC.open(newline="", encoding="utf-8") as fh_in, DST.open(
        "w", newline="", encoding="utf-8"
    ) as fh_out:
        # Squarespace exports sometimes begin with one or more blank lines before
        # the header row; skip them so DictReader picks up the real header.
        pos = fh_in.tell()
        while True:
            line = fh_in.readline()
            if not line:
                break
            if line.strip():
                fh_in.seek(pos)
                break
            pos = fh_in.tell()
        reader = csv.DictReader(fh_in)
        writer = csv.DictWriter(
            fh_out, fieldnames=SHOPIFY_HEADERS, quoting=csv.QUOTE_MINIMAL
        )
        writer.writeheader()
        count = 0
        skipped = 0
        for row in reader:
            email = (row.get("Email") or "").strip()
            if not email:
                skipped += 1
                continue
            writer.writerow(convert_row(row))
            count += 1
    print(f"Wrote {count} rows to {DST} (skipped {skipped} rows with no email)")


if __name__ == "__main__":
    main()
