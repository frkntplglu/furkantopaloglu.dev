// Builds public/resume.pdf from content/resume.md. Runs before `next build`, so the
// downloadable PDF always matches the resume page.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import React from "react";
import matter from "gray-matter";
import { marked } from "marked";
import { Document, Font, Link, Page, renderToFile, StyleSheet, Text, View } from "@react-pdf/renderer";

const require = createRequire(import.meta.url);
const h = React.createElement;
const root = process.cwd();
const fontDir = path.dirname(require.resolve("@expo-google-fonts/inter/package.json"));
const ttf = (dir, file) => path.join(fontDir, dir, `${file}.ttf`);

// Inter ships full glyph coverage (ğ, ş, İ, ı ...), which the built-in PDF fonts lack.
Font.register({
  family: "Inter",
  fonts: [
    { src: ttf("400Regular", "Inter_400Regular") },
    { src: ttf("400Regular_Italic", "Inter_400Regular_Italic"), fontStyle: "italic" },
    { src: ttf("600SemiBold", "Inter_600SemiBold"), fontWeight: 600 },
  ],
});
Font.registerHyphenationCallback((word) => [word]);

const muted = "#555555";
const s = StyleSheet.create({
  page: { paddingVertical: 34, paddingHorizontal: 40, fontFamily: "Inter", fontSize: 9.3, lineHeight: 1.42, color: "#111111" },
  header: { marginBottom: 8, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: "#dddddd" },
  name: { fontSize: 20, lineHeight: 1.2, marginBottom: 2, fontWeight: 600 },
  title: { marginTop: 0, fontSize: 10, color: muted },
  email: { marginTop: 1, fontSize: 8.5, color: muted, textDecoration: "none" },
  h2: { marginTop: 12, marginBottom: 5, paddingBottom: 2, borderBottomWidth: 1, borderBottomColor: "#dddddd", fontSize: 8.5, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: muted },
  h3: { marginTop: 7, fontSize: 10.2, fontWeight: 600 },
  paragraph: { marginBottom: 2 },
  meta: { marginBottom: 2, fontSize: 8, fontStyle: "normal", color: muted },
  item: { flexDirection: "row", marginBottom: 1.5 },
  bullet: { width: 10 },
  itemBody: { flex: 1 },
  bold: { fontWeight: 600 },
  italic: { fontStyle: "italic" },
  link: { color: "#111111", textDecoration: "none" },
});

function inline(tokens = [], key = "") {
  return tokens.map((t, i) => {
    const k = `${key}${i}`;
    switch (t.type) {
      case "strong":
        return h(Text, { key: k, style: s.bold }, inline(t.tokens, k));
      case "em":
        return h(Text, { key: k, style: s.italic }, inline(t.tokens, k));
      case "link":
        return h(Link, { key: k, src: t.href, style: s.link }, inline(t.tokens, k));
      case "codespan":
        return h(Text, { key: k }, t.text);
      default:
        return t.tokens ? inline(t.tokens, k) : t.text ?? t.raw ?? "";
    }
  });
}

function blocks(markdown) {
  const out = [];
  let afterH3 = false;
  marked.lexer(markdown).forEach((t, i) => {
    if (t.type === "heading" && t.depth === 2) {
      afterH3 = false;
      out.push(h(Text, { key: i, style: s.h2, minPresenceAhead: 40 }, inline(t.tokens)));
    } else if (t.type === "heading") {
      afterH3 = true;
      out.push(h(Text, { key: i, style: s.h3, minPresenceAhead: 40 }, inline(t.tokens)));
    } else if (t.type === "paragraph") {
      out.push(h(Text, { key: i, style: [s.paragraph, ...(afterH3 ? [s.meta] : [])] }, inline(t.tokens)));
      afterH3 = false;
    } else if (t.type === "list") {
      out.push(
        h(
          View,
          { key: i, style: { marginBottom: 2 } },
          t.items.map((item, j) =>
            h(View, { key: j, style: s.item, wrap: false }, h(Text, { style: s.bullet }, "•"), h(Text, { style: s.itemBody }, inline(item.tokens[0]?.tokens ?? item.tokens))),
          ),
        ),
      );
    }
  });
  return out;
}

const { data, content } = matter(fs.readFileSync(path.join(root, "content/resume.md"), "utf8"));
const doc = h(
  Document,
  { title: `${data.name} — Resume`, author: data.name },
  h(
    Page,
    { size: "A4", style: s.page },
    h(View, { style: s.header }, h(Text, { style: s.name }, data.name), h(Text, { style: s.title }, data.title), h(Link, { src: `mailto:${data.email}`, style: s.email }, data.email)),
    ...blocks(content),
  ),
);

const out = path.join(root, "public/resume.pdf");
await renderToFile(doc, out);
console.log(`resume: wrote ${path.relative(root, out)}`);
