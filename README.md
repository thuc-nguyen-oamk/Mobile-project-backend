# DESCRIPTION:
  - The purpose of this project was to create a e-commerce mobile application (for SME shop / store)
  - The application has two main user types: customers and admin

# APPLICATION ARCHITECTURE:
  ## backend:
    - Framework: nodeJS, expressJS
    - Port view: 3000
  ## frontend:
    - Framework: React Native
  ### Customer App:
    - Some versions:
      - "node": "16.13.2",
      - "react": "17.0.2",
      - "react-native": "0.67.2"
  ### Admin App:
    - Some versions:
      - "node": "16.13.2",
      - "react": "17.0.2",
      - "react-native": "0.68.0",
      - "Java": "jdk-11.0.13"
      ( If you have the old Java version, you should go to:
          [Your directory]\android\gradle.properties
        then, paste the code:
          org.gradle.java.home = C:\\Program Files\\Java\\jdk-11.0.13
      )
  ## database:
    - MySQL on localhost (MariaDB on server)
  ## cloud:
    - Amazon Web Services
  ## UX, UI:
    - figma

# MORE INFORMATION:
  - Business document
  - Jira with scrum and product requirement
  - 365 drive:
    - daily meeting document
    - testing document

# DELPOY CODE:
  ## backend: run
    - npm install
    - node ./index.js
  ## frontend:
    - You could use the apk file to use / test app on the android phone
    - Or, run:
      - npm install
      - npm start
      - npm run android
  ## Link to the server where the project is running:
    - Main: https://api.uniproject.xyz/eshopmb/products
    - Back-up with CI/CD (still need to improve more): https://ecommercehkt.herokuapp.com/products
