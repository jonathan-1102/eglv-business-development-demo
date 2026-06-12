import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT || 3000);
const publicRoot = join(process.cwd(), "public");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8"
};

function resolvePath(url = "/") {
  const cleanUrl = decodeURIComponent(url.split("?")[0]);
  const pathname = cleanUrl === "/" ? "/index.html" : cleanUrl;
  const filePath = normalize(join(publicRoot, pathname));
  if (!filePath.startsWith(publicRoot)) return join(publicRoot, "index.html");
  return filePath;
}

createServer(async (req, res) => {
  const filePath = resolvePath(req.url);
  try {
    const body = await readFile(filePath);
    res.writeHead(200, { "content-type": contentTypes[extname(filePath)] || "text/plain; charset=utf-8" });
    res.end(body);
  } catch {
    const body = await readFile(join(publicRoot, "index.html"));
    res.writeHead(200, { "content-type": contentTypes[".html"] });
    res.end(body);
  }
}).listen(port, () => {
  console.log(`EGLV demo app running on port ${port}`);
});
