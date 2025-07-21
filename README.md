<p align="center">
  <a href="" rel="noopener">
 <img src="https://i.postimg.cc/Mps1Sxmg/image.png" alt="Project logo"></a>
</p>
<h3 align="center">BlogSphere - Production-Grade Blogging Platform</h3>

<div align="center">

[![Hackathon](https://img.shields.io/badge/hackathon-name-orange.svg)](http://hackathon.url.com)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

</div>

---

<p align="center"> BlogSphere is a fully functional, scalable blogging platform built using the MERN stack. It features secure JWT authentication, a powerful Markdown-based blog editor, and threaded comment functionality. The platform is CI/CD-enabled, Dockerized, and deployed for industrial use cases.
    <br> 
</p>

## 📝 Table of Contents

- [Features](#features)
- [Setting up a local environment](#getting_started)
- [Technology Stack](#tech_stack)
- [Contributing](../CONTRIBUTING.md)

## 🚀 Features

- 🔐 **JWT-based secure login and signup**
- 📝 **Rich-text blog editor** with formatting controls
- ✍️ **Create, update, and delete blogs** with ownership enforcement
- 💬 **Comment system** with editable and deletable replies
- 🔍 View all published blogs in real-time
- 🧰 Fully RESTful API architecture
- 🐳 **Dockerized** with multi-environment support
- ⚙️ **CI/CD pipelines** for automatic test and deploy flows
- 🚀 **Deployed using Vercel + Render**

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development
and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
Please make sure you have the following:

```
Node.js (any LTS version), npm, Docker (optional but recommended)
```

### Installing

A step by step series of examples that tell you how to get a development env running.

1. Clone the repository.

```
git clone https://github.com/Zephyrus2822/XLyzer.git
```

2. Now follow either npm route or Docker route. <br>
2a. npm route:
```
cd XLyzer\frontend
npm i
npm run dev
```
```
cd XLyzer\backend
npm i
npm start
```
2b. Docker route (recommended): 
```
docker compose up --build
```

## ⛏️ Built With <a name = "tech_stack"></a>

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Frontend      | React.js, TailwindCSS, Vite         |
| Backend       | Node.js, Express.js                 |
| Authentication| JSON Web Tokens (JWT)               |
| Database      | MongoDB                             |
| Visualization | Chart.js / Plotly.js (2D/3D charts) |
| Deployment    | Vercel (FE), Render (BE), Docker    |
| CI/CD         | GitHub Actions                      |

## ✍️ Authors <a name = "authors"></a>

- [@RudranilChowdhury](https://github.com/Zephyrus2822)
