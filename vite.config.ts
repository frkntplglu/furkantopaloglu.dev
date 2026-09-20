import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";

function traceTransforms(name: string, enforce: "pre" | "post") {
  return {
    name: `debug-${name}-transforms`,
    enforce,
    transform(_code: string, id: string) {
      if (id.includes("node_modules/.vite") || id.startsWith("\0")) return null;
      console.error(`[vinext-trace:${name}] ${id}`);
      return null;
    },
  };
}

export default defineConfig({
  plugins: [
    traceTransforms("pre", "pre"),
    vinext(),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
    traceTransforms("post", "post"),
  ],
});
