pipeline {
    agent any
    tools {
        nodejs 'node'
    }
    environment {
        imageName = 'raton1180/pwa-app'
        registryCredential = 'dockerhub-creds'
        dockerImage = ''
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Image') {
            steps {
                script {
                    dockerImage = docker.build imageName
                }
            }
        }
        stage('Deploy Image') {
            steps {
                script {
                    /* groovylint-disable-next-line NestedBlockDepth */
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-creds') {
                        dockerImage.push("${e.v.BUILD_NUMBER}")
                    }
                }
            }
        }
    }
}
