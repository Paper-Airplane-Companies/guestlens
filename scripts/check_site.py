#!/usr/bin/env python3
"""Static quality checks for GuestLens HTML pages."""

from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.glob("**/*.html"))


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[tuple[str, str | None]] = []
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = dict(attrs)
        if tag == "a" and "href" in attr_map:
            self.links.append((attr_map.get("href", ""), attr_map.get("rel")))
        if "id" in attr_map and attr_map["id"]:
            self.ids.add(attr_map["id"])


def is_external(href: str) -> bool:
    parsed = urlparse(href)
    return parsed.scheme in {"http", "https", "mailto", "tel"}


def lint_required_markup(path: Path, text: str) -> list[str]:
    errors: list[str] = []
    if "<!DOCTYPE html>" not in text:
        errors.append(f"{path}: missing <!DOCTYPE html>")
    if "<html lang=" not in text:
        errors.append(f"{path}: missing <html lang=...>")
    if "<title>" not in text:
        errors.append(f"{path}: missing <title>")
    if 'name="viewport"' not in text:
        errors.append(f"{path}: missing viewport meta tag")
    return errors


def check_links(path: Path, parser: LinkParser, id_map: dict[Path, set[str]]) -> list[str]:
    errors: list[str] = []
    for href, rel in parser.links:
        if not href:
            continue

        if href.startswith("#"):
            anchor = href[1:]
            if anchor and anchor not in parser.ids:
                errors.append(f"{path}: anchor '#{anchor}' not found in same file")
            continue

        if is_external(href):
            continue

        target, _, anchor = href.partition("#")
        target_path = (path.parent / target).resolve()
        if not target_path.exists():
            errors.append(f"{path}: broken local link '{href}'")
            continue
        if anchor and anchor not in id_map.get(target_path, set()):
            errors.append(f"{path}: anchor '#{anchor}' not found in '{target}'")
    return errors


def check_blank_rel(path: Path, text: str) -> list[str]:
    errors: list[str] = []
    # Lightweight pattern checks to enforce target blank hardening.
    needle = 'target="_blank"'
    start = 0
    while True:
        i = text.find(needle, start)
        if i == -1:
            break
        line = text.count("\n", 0, i) + 1
        segment = text[max(0, i - 200) : i + 200]
        if 'rel="noopener noreferrer"' not in segment and 'rel="noreferrer noopener"' not in segment:
            errors.append(f"{path}:{line}: target='_blank' missing rel='noopener noreferrer'")
        start = i + len(needle)
    return errors


def main() -> int:
    all_errors: list[str] = []
    parsers: dict[Path, LinkParser] = {}

    for path in HTML_FILES:
        text = path.read_text(encoding="utf-8")
        parser = LinkParser()
        parser.feed(text)
        parsers[path.resolve()] = parser

        all_errors.extend(lint_required_markup(path.relative_to(ROOT), text))
        all_errors.extend(check_blank_rel(path.relative_to(ROOT), text))

    id_map = {path: parser.ids for path, parser in parsers.items()}
    for path_resolved, parser in parsers.items():
        rel_path = path_resolved.relative_to(ROOT)
        all_errors.extend(check_links(rel_path, parser, id_map))

    if all_errors:
        print("Static checks failed:")
        for error in all_errors:
            print(f"- {error}")
        return 1

    print(f"All static checks passed for {len(HTML_FILES)} HTML files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
