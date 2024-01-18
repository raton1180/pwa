pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    environment{
        imageName = "raton1180/pwa-app"
        registryCredential = "raton1180"
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
                    /* groovylint-disable-next-line NestedBlockDepth */
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-creds') {
                        dockerImage.push("${e.v.BUILD_NUMBER}")
                    }
                }
            }
        }
    }
}
