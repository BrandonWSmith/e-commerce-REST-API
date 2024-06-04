<a name="readme-top"></a>


<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/BrandonWSmith/eShopping">
    <img src="public\images\shopping-cart-shadow.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">eShopping</h3>

  <p align="center">
    This project was created as a part of the <a href="https://www.codecademy.com">Codecademy</a> Full-Stack Engineer career path. It is a simple eCommerce site that uses a REST API created with Express and PostgreSQL for the backend and EJS for the frontend. Users can register a new account, login, browse the shop of fictional items, add a specified quantity of these items to their cart, remove the items from their cart, checkout, veiw their orders that are created upon checkout and cancel these orders. When checking out, this site does not prompt the user for payment/shipping information as you would typically see on a live eCommerce site since this project serves only as a demonstration of my knowledge of various frontend and backend technologies and these features do not serve the purpose of this project. Similarly, when a user cancels an order they have created, the order is immediately deleted from the database.
    <br />
    <a href="https://github.com/BrandonWSmith/eShopping"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/BrandonWSmith/eShopping">View Demo</a>
    ·
    <a href="https://github.com/BrandonWSmith/eShopping/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/BrandonWSmith/eShopping/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![eShopping Screen Shot][eShopping-screenshot]]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Node][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
* [![EJS][EJS]][EJS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

You will need the latest version of Node.js and Node Package Manager to run this project. You can install the latest version of Node at <a href="https://nodejs.org/">Nodejs.org</a>. You can install the latest version of NPM by running:
 ```sh
 npm install npm@latest -g
 ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/BrandonWSmith/eShopping.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Set your environment varibles in `.env.example`
   ```sh
   #Server
   #This can be any port, it is recommended to use higher, less commonly used ports to prevent attacks
   PORT=Your port #Must be an integer not a string

   #CSRF
   #This can be any string, it is used to hash the csrf token
   CSRF_SECRET='Your CSRF secret'

   #Database
   #These values must match your database configuration
   DB_USER='Your database username'
   DB_HOST='Your database host'
   DB='Your database name'
   DB_PASSWORD='Your database password'
   DB_PORT=Your database port #Must be an integer not a string

   #Session
   #This can be any string, it is used to hash the session
   SESSION_SECRET='Your session secret'
   ```
4. Rename `.env.example` to `.env`

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

To start the server, run:
 ```sh
 npm start
 ```
Then open your browser and navigate to http://localhost:{YOUR_PORT}, substituting {YOUR_PORT} for the port you defined in the .env file.

You can also run the server in development mode by running:
 ```sh
 npm run devStart
 ```
 This mode uses Nodemon which will automatically restart the server whenever changes are made to any of the javascript files. Note: when the server resarts it also clears the active session so you will need to login again.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Allow users to edit the quantity of items in their cart

See the [open issues](https://github.com/BrandonWSmith/eShopping/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/BrandonWSmith/eShopping](https://github.com/BrandonWSmith/eShopping)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/BrandonWSmith/eShopping.svg?style=for-the-badge
[contributors-url]: https://github.com/BrandonWSmith/eShopping/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/BrandonWSmith/eShopping.svg?style=for-the-badge
[forks-url]: https://github.com/BrandonWSmith/eShopping/network/members
[stars-shield]: https://img.shields.io/github/stars/BrandonWSmith/eShopping.svg?style=for-the-badge
[stars-url]: https://github.com/BrandonWSmith/eShopping/stargazers
[issues-shield]: https://img.shields.io/github/issues/BrandonWSmith/eShopping.svg?style=for-the-badge
[issues-url]: https://github.com/BrandonWSmith/eShopping/issues
[eShopping-screenshot]: public\images\screenshot.png
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[EJS]: https://img.shields.io/badge/EJS-F5F5F5?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyBpZD0iZWpzIiBkYXRhLW5hbWU9ImVqcyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA4LjUgOC41Ij48ZGVmcz48c3R5bGU%2BLmNscy0xe2ZpbGw6I2I0Y2E2NTt9LmNscy0ye2ZpbGw6I2E5MWU1MDt9PC9zdHlsZT48L2RlZnM%2BPHRpdGxlPmVqczwvdGl0bGU%2BPHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjYuNzUgNi4zMiA2LjE1IDYuODggMy45OSA2Ljg3IDMuNTMgNi4zIDMuOTYgNS45IDQuMjkgNi4zIDYuNzUgNi4zMiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIyLjc0IDYuNjYgMi42NyA3LjIgMS4yOCA3LjE5IDEuMzYgNi42NSAyLjc0IDYuNjYiLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMi45OCAyLjI0IDIuNTUgMS43IDMuMTIgMS4xNyAzLjU1IDEuNzEgMi45OCAyLjI0Ii8%2BPHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjMuNzggMi45NCAxLjkzIDIuOTMgMiAyLjQgMy44NSAyLjQxIDMuNzggMi45NCIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTguMzUsM1MtNS45MSwyLjEzLDMuMTcsNy42MmMwLDAtMS45NC0xLjYxLTEuNy0yLjIsMCwwLDEtLjE2LDEuMjEuMTMsMCwwLS42LTEtMS40My0xQzEuMjUsNC41MSwxLjE2LDMuNDQsOC4zNSwzWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIyLjc4IDYuNjMgMy4zNSAyLjQxIDMuODUgMi40MSAzLjI4IDYuNjQgMi43OCA2LjYzIi8%2BPHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjYuNTggMy42NSA2LjY0IDMuMjMgNi40NSAzIDQuNzMgMi45OCA0LjQ4IDMuMjIgNC4zNiA0LjEyIDQuNTUgNC4zNiA2LjQ4IDQuMzggNi45NCA0Ljk0IDYuNzUgNi4zMiA2IDYuMzIgNi4yNSA2LjA4IDYuMzggNS4xOCA2LjE5IDQuOTQgNC4yNSA0LjkyIDMuOCA0LjM2IDMuOTggMi45OCA0LjU5IDIuNDIgNi43NSAyLjQzIDcuMiAzIDcuMTEgMy42NSA2LjU4IDMuNjUiLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMi4zNiA2LjgxIDIuOTcgNi4yNSAzLjI4IDYuNjQgMi42NyA3LjIgMi4zNiA2LjgxIi8%2BPHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjEuMjggNy4xOSAwLjggNi41OCAxLjIyIDYuMiAxLjcgNi44MSAxLjI4IDcuMTkiLz48L3N2Zz4%3D
[EJS-url]: https://ejs.co/