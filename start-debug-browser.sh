#!/bin/bash
chromium-browser --headless --remote-debugging-port=9222 http://localhost:5175 >/dev/null 2>&1 &
echo "Chromium started in headless mode, listening on port 9222"
