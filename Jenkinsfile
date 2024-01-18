pipeline {
    agent any
    tools {
        nodejs 'node'
    }
    environment {
        PATH = "${tool 'node'}/bin:${env.PATH}"
        imageName = 'raton1180/pwa-app'
        registryCredential = 'dockerhub-creds'
        dockerImage = ''
    }

    stages {
        stage('Print Node.js Location') {
            steps {
                script {
                    sh 'which node'
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
                script {
                    dockerImage = docker.build("${imageName}") 
                }
            }
        }
        stage('Deploy Image') {
            steps {
                script {
                    /* groovylint-disable-next-line NestedBlockDepth */
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-creds') {
                        dockerImage.push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }
    }
}
