# Run dev

- Instal nvm
- `nvm use`
- `npm install`
- `npm start`

# Install for prod

- Instal nvm
- `nvm use`
- `npm install`
- `npm run build`
- `node build/index.js`

## Setup cronjob

- Modify node and other paths in cronjob (`which node`)
- `sudo chown root:root cronjob && sudo chmod 644 cronjob`
- `sudo ln -s /home/pi/depart/depart-stop-loader/cronjob /etc/cron.d/depart`
