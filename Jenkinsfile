pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Checkout the source code from the Git repository
                script {
                    git 'https://github.com/raton1180/pwa.git'
                }
            }
        }

        stage('Build and Install Dependencies') {
            steps {
                // Use Node.js container for building and installing dependencies
                script {
                    docker.image('node:14').inside('-v $PWD:/app') {
                        sh 'cd /app && npm install'
                    }
                }
            }
        }

        stage('Build React Project') {
            steps {
                // Use Node.js container for building the React project
                script {
                    docker.image('node:14').inside('-v $PWD:/app') {
                        sh 'cd /app && npm run build'
                    }
                }
            }
        }

        stage('Docker Build and Run') {
            steps {
                // Build Docker image and run the React app
                script {
                    docker.build('react-app', '.')
                    docker.run('-p 3000:3000 --name react-container react-app')
                }
            }
        }

        stage('Cleanup') {
            steps {
                // Remove Docker container
                script {
                    docker.image('react-app').remove()
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker images and containers
            cleanWs()
        }
    }
}
