import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT || 5173);
const root = join(process.cwd(), "public");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png"
};

function resolvePath(url) {
  const cleanUrl = decodeURIComponent(url.split("?")[0]);
  const pathname = cleanUrl === "/" ? "/index.html" : cleanUrl;
  const filePath = normalize(join(root, pathname));
  if (!filePath.startsWith(root)) return join(root, "index.html");
  return filePath;
}

createServer(async (req, res) => {
  let filePath = resolvePath(req.url || "/");
  try {
    const ext = extname(filePath);
    const body = await readFile(filePath);
    res.writeHead(200, { "content-type": contentTypes[ext] || "text/plain; charset=utf-8" });
    res.end(body);
  } catch {
    const body = await readFile(join(root, "index.html"));
    res.writeHead(200, { "content-type": contentTypes[".html"] });
    res.end(body);
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`eGLV demo app running at http://127.0.0.1:${port}`);
});
