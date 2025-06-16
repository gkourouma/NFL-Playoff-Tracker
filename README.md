# 🏈 NFL Playoff Tracker

The **NFL Playoff Tracker** is a full-stack CRUD application that allows users to track whether their favorite NFL teams made it to the playoffs. Users can create, view, edit, and delete team entries, specifying their conference, division, and playoff status.

## 🌐 Live Demo

Check out the live app here: [NFL Playoff Tracker on Render](https://nfl-playoff-tracker.onrender.com/)


---

## Features

-  Create new NFL team entries
-  View all teams categorized by conference (AFC/NFC)
-  Update team information including division and playoff status
-  Delete teams from the list
-  Data stored in MongoDB and persists between sessions

---

## Tech Stack

| Layer         | Technology               |
|---------------|---------------------------|
| Backend       | Node.js, Express.js        |
| Database      | MongoDB (via Mongoose)     |
| Templating    | EJS                        |
| Middleware    | method-override, morgan, dotenv |
| Frontend      | HTML, CSS (EJS views)      |

---

## Screenshots

> ![NFL Tracker Homepage](public/images/homepage.png)


> ![NFL Add Team Page](public/images/form-page.png)

---

## Future Improvement

- Add user authentication
- Add filter for playoff teams only
- Improve frontend styling
- Integrate live NFL API for real-time team data



