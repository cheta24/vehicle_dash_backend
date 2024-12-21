# Vehicle Dashboard Backend

This repository contains the backend for the Vehicle Dashboard application, which simulates a vehicle's dashboard interface and communicates with a MongoDB database to manage data such as motor RPM, battery percentage, charging state, and other vehicle-related information. The data is exposed through REST APIs and can be consumed by the frontend of the application.

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (v14.x or later)
- **MongoDB** - A MongoDB database instance (can be local or cloud-hosted via services like MongoDB Atlas)
- **Git** - To clone the repository

## Database Setup

This backend uses **MongoDB** to store and manage vehicle-related data.

1. Create a **MongoDB** database either locally or by using a cloud-based service such as **MongoDB Atlas**.
2. Make sure to replace the connection string in the code with your own MongoDB connection URI.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/cheta24/vehicle_dash_backend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd vehicle_dash_backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables (e.g., database URI, port, etc.) by creating a `.env` file in the root directory with the following structure:

    ```plaintext
    DB_URI=<your_mongodb_connection_uri>
    PORT=3000
    ```

5. Start the backend server:

    ```bash
    npm start
    ```

## API Details

Here are the key APIs for interacting with the backend:

### 1. **Update Vehicle Data**  
   - **Endpoint**: `/api/update`  
   - **Method**: `POST`  
   - **CURL**: curl --location 'http://my-vehicle-dashboard-445301.as.r.appspot.com/api/update' \
--header 'Content-Type: application/json' \
--data '{
    "motorRPM": 600,
    "batteryPercentage": 15,
    "batteryTemperature": 25,
    "isCharging": true,
    "powerConsumption": 10,
    "motorStatusIndicator": false,
    "gearRatio": 4,
    "parkingBreakIndicator": true,
    "checkEngineIndicator": false
}'

### 2. **Get Dashboard data**  
   - **Endpoint**: `api/vehicle-data`  
   - **Method**: `GET`  
   - **CURL**: curl --location 'http://my-vehicle-dashboard-445301.as.r.appspot.com/api/vehicle-data'
