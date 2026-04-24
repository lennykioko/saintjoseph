#!/usr/bin/env python3
"""Extract the PDF to a plain-text working file for splitting into MDX.

Usage:
    bun run extract-pdf    # via package.json script
    python3 scripts/extract-pdf.py

Output: scripts/extracted.txt (gitignored)
"""
from __future__ import annotations

import sys
from pathlib import Path

try:
    import pypdf
except ImportError:
    sys.stderr.write(
        "pypdf not installed. Run: pip3 install pypdf\n"
    )
    sys.exit(1)

REPO = Path(__file__).resolve().parents[1]
PDF = REPO / "33-Days-of-Prayers-and-Daily-Challenge ENGLISH.pdf"
OUT = REPO / "scripts" / "extracted.txt"


def main() -> None:
    if not PDF.exists():
        sys.stderr.write(f"PDF not found at {PDF}\n")
        sys.exit(1)
    reader = pypdf.PdfReader(str(PDF))
    parts: list[str] = []
    for i, page in enumerate(reader.pages, start=1):
        parts.append(f"===== PAGE {i} =====\n")
        parts.append(page.extract_text() or "")
        parts.append("\n\n")
    OUT.write_text("".join(parts), encoding="utf-8")
    print(f"Extracted {len(reader.pages)} pages -> {OUT}")


if __name__ == "__main__":
    main()
