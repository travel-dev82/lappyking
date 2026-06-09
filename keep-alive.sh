#!/bin/bash
cd /home/z/my-project
while true; do
  # Check if server is running
  if ! curl -s -o /dev/null http://localhost:3000/ 2>/dev/null; then
    echo "$(date): Starting server..." >> /home/z/my-project/server-monitor.log
    npx next dev -p 3000 &
    SERVER_PID=$!
    sleep 8
  fi
  sleep 10
done
