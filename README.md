# RabbitMQ Producer-Consumer Setup

This repository contains code for setting up a producer-consumer architecture using RabbitMQ messaging broker. The setup consists of two components: a producer and a consumer, written in JavaScript with Node.js.

## Prerequisites

Before running the code, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- RabbitMQ server
- CloudAMQP account (for using CloudAMQP)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/AdityaBVerma/LavinMQ
    ```

2. Install dependencies for both producer and consumer:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file  with the following content:

    ```plaintext
    CLOUDAMQP_URL=<your_cloudamqp_url>
    ```

    Replace `<your_cloudamqp_url>` with your CloudAMQP URL.


4. Create Producer.js and Consumer.js

    ```bash
    touch Producer.js
    ```

    ```bash
    touch Consumer.js
    ```

## Usage

### Producer

To run the producer:

2. Run the producer script:

    ```bash
    node Producer.js
    ```

The producer will connect to the RabbitMQ server specified in the environment variables, send messages to the queue, and then exit after a specified timeout.

### Consumer

2. Run the consumer script:

    ```bash
    node Consumer.js
    ```

The consumer will connect to the RabbitMQ server, listen for messages in the queue, process them, and acknowledge them after processing.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.


