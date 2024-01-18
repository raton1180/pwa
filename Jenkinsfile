pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    environment{
        imageName = "pwa-app"
        registryCredentials = "pwaapp"
        dockerImage = ""
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Checkout the source code from the Git repository
                script {
                    git 'https://github.com/raton1180/pwa.git'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Image') {
            steps {
                script{
                    dockerImage = docker.build imageName
                }
            }
        }
        stage('Deploy Image') {
            steps {
                script{
                    docker.withRegistry("https://registry.hub.docker.com","dockerhub-creds"){
                        dockerImage.push("${e.v.BUILD_NUMBER}")
                    }
                }
            }
        }
    }
}
