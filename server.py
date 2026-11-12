#!/usr/bin/env python3
"""
Creative Gul — Local Static Preview Server
Serves the portfolio cleanly with proper MIME types for ES modules, fonts, and media.
"""
import argparse
import http.server
import os
import socketserver


class PortfolioHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        "": "application/octet-stream",
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".mjs": "text/javascript; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".svg": "image/svg+xml",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
        ".woff2": "font/woff2",
        ".woff": "font/woff",
        ".ico": "image/x-icon",
    }

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


def main():
    parser = argparse.ArgumentParser(description="Serve the Creative Gul portfolio locally.")
    parser.add_argument(
        "--port",
        type=int,
        default=int(os.environ.get("PORT", 4321)),
        help="Port to listen on (default: 4321)",
    )
    args = parser.parse_args()

    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    socketserver.TCPServer.allow_reuse_address = True

    with socketserver.TCPServer(("127.0.0.1", args.port), PortfolioHandler) as httpd:
        print("==================================================")
        print(" Creative Gul — Portfolio Local Preview")
        print(f" URL: http://127.0.0.1:{args.port}")
        print(" Press Ctrl+C to stop")
        print("==================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopping Creative Gul preview server.")


if __name__ == "__main__":
    main()
