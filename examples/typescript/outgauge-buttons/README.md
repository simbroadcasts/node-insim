# Node InSim - OutGauge with InSim Buttons (TypeScript + ES Modules)

## Requirements

- Node.js v18
- LFS

## Installation

```shell
npm install
```

## Connecting to LFS

Open `cfg.txt` in your LFS installation folder and edit the following lines:

```
OutGauge Mode 1
OutGauge Delay 10
OutGauge IP 127.0.0.1
OutGauge Port 29998
OutGauge ID 0
```

Start LFS and type `/insim 29999` to open the InSim port.

Run the example app:

```shell
npm start
```

The app connects to `127.0.0.1:29999` by default.

## Production build

```shell
npm run build
npm run serve:production
```
