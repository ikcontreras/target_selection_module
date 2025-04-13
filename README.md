# 🤖 YVH Target Selection Module

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.x-blue)
![Express](https://img.shields.io/badge/Express-5.1.0-black)
![MongoDB](https://img.shields.io/badge/MongoDB-8.13.2-brightgreen)
![Build](https://img.shields.io/badge/build-passing-success)
![License](https://img.shields.io/badge/license-ISC-blue)

## Description

A backend service for the New Republic’s YVH battle droids. It processes incoming radar data and returns the coordinates of the most appropriate target based on specific tactical protocols.

## ⚙️ Tech Stack

- **Language:** TypeScript
- **Framework:** Express
- **Database:** MongoDB
- **Build Tool:** esbuild
- **Runtime Scripts:** tsx

## ⚠️ Prerequisites: MongoDB and Environment Configuration

Before running the server or executing the tests, ensure the following:

### 🛠 MongoDB
- MongoDB must be installed and running locally.
- Default local connection URI used:
    - `mongodb://localhost:27017/yvh-target-selection-module`

### 🔑 Environment Variables
- Create a `.env` file in the root directory of the project.
- Copy the `.env.example` file and rename it to `.env`.
- Update the `MONGO_CONNECTION` variable in the `.env` file with the correct MongoDB connection URI.
- Update the `PORT` variable in the `.env` file with the desired port number for the server.
- Update the `FORMAT_LOG` variable in the `.env` file with the desired log format for the server.

## Installation

To install the project, follow these steps:
1. Install the project dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

3. Start the application:

```bash
npm start
```

## 🧪 Running the Test Suite

This project includes an official test script to verify the correct behavior of the `/radar` endpoint and the logic behind each protocol.

### ✅ Prerequisites

- Ensure `curl` is installed on your system.
- The backend service must be running locally (default port: `8888`).

## ▶️ Execute the Tests

Follow these steps to run the official test suite and verify that your `/radar` endpoint behaves correctly.

### 1. Start your server

Make sure your backend service is running locally at:

`http://localhost:8888`

### 2. Execute the tests

Run the following command in your terminal:

```bash
npm run test
```

This will execute the test suite and verify that your `/radar` endpoint behaves correctly.


## 🎯 Supported Protocols

The application provides the following protocol strategies:

- `closest-enemies`: Prioritize the nearest point with enemies.
- `furthest-enemies`: Prioritize the farthest point with enemies.
- `assist-allies`: Prioritize points where allies are present.
- `avoid-crossfire`: Avoid points where allies are present.
- `prioritize-mech`: Prioritize mech-type enemies first.
- `avoid-mech`: Do not attack mech-type enemies.

Multiple compatible protocols can be combined in a single request.

Enemies located more than 100 meters away will be ignored.

## 🧩 Extending Protocols

The system is designed to be easily extendable with new targeting strategies.

To add a new protocol:

1. Navigate to the `src/protocols` directory.
2. Create a new file that implements the `TargetPrioritizationStrategy` type.
3. Add your new protocol name to the `Protocols` enum in the `src/types/protocols.ts` file.

This allows the system to dynamically evaluate new targeting rules as they are introduced.


## Usage

The application provides a RESTful API for the Advanced Defense Droid YVH to select the best target for a given set of protocols.

### Endpoints

#### POST /radar

This endpoint is used to send the radar data to the application. The radar data is an array of objects, each representing a scanned position.


Example:
```json
{
  "protocols": ["avoid-mech"],
  "scan": [
    {
      "coordinates": {
        "x": 0,
        "y": 40
      },
      "enemies": {
        "type": "soldier",
        "number": 10
      },
      "allies": 5
    },
    {
      "coordinates": {
        "x": 0,
        "y": 80
      },
      "enemies": {
        "type": "mech",
        "number": 1
      }
    }
  ]
}
```

Each scanned position has the following properties:
- `protocols`: an array of strings representing the protocols that the radar data is used for.
- `scan`: an array of objects representing the scanned positions.

Each scanned position object has the following properties:
- `coordinates`: an object representing the coordinates of the scanned position.
- `enemies`: an object representing the enemies in the scanned position.

The `enemies` object has the following properties:
- `type`: a string representing the type of enemies in the scanned position. Possible values are:
  - `soldier`: soldiers
  - `mech`: mechs
- `number`: an integer representing the number of enemies in the scanned position.
- `allies`: an optional property representing the number of allies in the scanned position.

The `allies` property is an optional property that represents the number of allies in the scanned position.

This endpoint returns a JSON object with the following properties:
- `x`: an integer representing the x-coordinate of the selected target.
- `y`: an integer representing the y-coordinate of the selected target.

Example:
```json
{
  "x": 0,
  "y": 40
}
```

#### GET /audit

This endpoint is used to retrieve the audit records from the application.

Example:
```json
[
  {
    "target": {
      "x": 0,
      "y": 40
    },
    "_id": "67fc1b20b6a2e35a8aaab684",
    "date": "2025-04-13T20:14:24.102Z",
    "protocols": [
      "avoid-mech"
    ],
    "scanner": [
      {
        "coordinates": {
          "x": 0,
          "y": 40
        },
        "enemies": {
          "type": "soldier",
          "number": 10
        }
      },
      {
        "coordinates": {
          "x": 0,
          "y": 80
        },
        "allies": 5,
        "enemies": {
          "type": "mech",
          "number": 1
        }
      }
    ],
    "outOfRangeEnemies": [],
    "strategies": [
      {
        "protocol": "avoid-mech",
        "result": [
          {
            "coordinates": {
              "x": 0,
              "y": 40
            },
            "enemies": {
              "type": "soldier",
              "number": 10
            }
          }
        ]
      }
    ],
    "__v": 0
  }
]
```

This endpoint returns a JSON array of objects, each representing an audit record.

Each audit record has the following properties:
- `target`: an object representing the target selected by the application.
- `_id`: a string representing the ID of the audit record.
- `date`: a string representing the date and time of the audit record.
- `protocols`: an array of strings representing the protocols used for the audit record.
- `scanner`: an array of objects representing the scanned positions used for the audit record.
- `outOfRangeEnemies`: an array of objects representing the scanned positions that were out of range for the audit record.
- `strategies`: an array of objects representing the strategies used for the audit record.
- `__v`: an integer representing the version of the audit record.

#### GET /audit/:id

This endpoint is used to retrieve a specific audit record from the application.

Example:
```json
{
  "target": {
    "x": 0,
    "y": 40
  },
  "_id": "67fc1b20b6a2e35a8aaab684",
  "date": "2025-04-13T20:14:24.102Z",
  "protocols": [
    "avoid-mech"
  ],
  "scanner": [
    {
      "coordinates": {
        "x": 0,
        "y": 40
      },
      "enemies": {
        "type": "soldier",
        "number": 10
      }
    },
    {
      "coordinates": {
        "x": 0,
        "y": 80
      },
      "allies": 5,
      "enemies": {
        "type": "mech",
        "number": 1
      }
    }
  ],
  "outOfRangeEnemies": [],
  "strategies": [
    {
      "protocol": "avoid-mech",
      "result": [
        {
          "coordinates": {
            "x": 0,
            "y": 40
          },
          "enemies": {
            "type": "soldier",
            "number": 10
          }
        }
      ]
    }
  ],
  "__v": 0
}
```

This endpoint returns a JSON object representing a specific audit record.

Each audit record has the following properties:
- `target`: an object representing the target selected by the application.
- `_id`: a string representing the ID of the audit record.
- `date`: a string representing the date and time of the audit record.
- `protocols`: an array of strings representing the protocols used for the audit record.
- `scanner`: an array of objects representing the scanned positions used for the audit record.
- `outOfRangeEnemies`: an array of objects representing the scanned positions that were out of range for the audit record.
- `strategies`: an array of objects representing the strategies used for the audit record.
- `__v`: an integer representing the version of the audit record.

#### DELETE /audit/:id

This endpoint is used to delete a specific audit record from the application.

Example:
```json
{
    "success": true,
    "message": "Audit deleted"
}
```

This endpoint returns a JSON object with the following properties:
- `success`: a boolean representing whether the audit record was deleted successfully.
- `message`: a string representing the message indicating whether the audit record was deleted successfully.

# Audit Scripts for Local API

These scripts interact with a local API running at `http://localhost:8888`. Make sure the server is up before executing them.


### 1. `audit_all.sh`
Fetches all registered audit entries.

```bash
./scripts/audit_all.sh
```

### 2. `audit_by_id.sh`
Fetches a specific audit entry by its ID.

```bash
./scripts/audit_by_id.sh <audit_id>
```

### 3. `delete_audit.sh`
Deletes a specific audit entry by its ID.

```bash
./scripts/delete_audit.sh <audit_id>
```

## 🌌 Final Transmission

The Target Selection Module has been successfully completed and is ready for integration with the YVH combat droid system.

Awaiting deployment to the battlefield.

May the Force be with you.
