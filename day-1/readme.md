# rabbitmq

![Node.js](https://img.shields.io/badge/-Node.js-blue?logo=nodejs&logoColor=white) ![License](https://img.shields.io/badge/license-ISC-green)

## 📝 Description

This project demonstrates the fundamental concepts of an asynchronous messaging system using RabbitMQ with a Node.js backend. The implementation showcases the core components: Producer, Exchange, Queue, and Consumer, using a simple mail sending service as an example.

## 🛠️ Core Concepts and Architecture

- The system is designed around the principles of decoupling services, allowing the Producer to send messages without needing to know which Consumer will handle them.


## 📦 Key Components

Producer (Service S1): The service responsible for generating and sending messages. In this example, it sends the mail metadata (e.g., to, from, subject, body).

Exchange (mail-exchange): The first stop for a message. It receives messages from the Producer and routes them to the appropriate Queues based on the Routing Key. The video uses a direct exchange type.

Queue (mail-queue): A buffer that stores messages until a Consumer is ready to process them.

Consumer (Service S2 / Mail Service): The service responsible for receiving and processing messages from the Queue. In this case, it takes the mail metadata and performs the actual email sending operation.

Routing Key (send-mail): A key used by the Exchange to determine which Queue to send the message to.

Binding: The mechanism that creates a link between an Exchange and a Queue, using the Routing Key [02:50].

## 🚀 Run Commands

- **test**: `npm run test`


## 📁 Project Structure

```
day-1
├── consumer.js
├── package.json
└── producer.js
```

## 🛠️ Development Setup

### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)


## 👥 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/zeeshanalianjam/rabbitmq/tree/main/day-1.git`
3. **Create** a new branch: `git checkout -b feature/your-feature`
4. **Commit** your changes: `git commit -am 'Add some feature'`
5. **Push** to your branch: `git push origin feature/your-feature`
6. **Open** a pull request

Please ensure your code follows the project's style guidelines and includes tests where applicable.

## 📜 License

This project is licensed under the ISC License.

---
*This README was generated with ❤️ by ReadmeBuddy*
