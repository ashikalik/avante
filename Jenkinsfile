def STATUS_COLOR_MAP = [
        "SUCCESS": "good",
        "FAILURE": "danger",
        "UNSTABLE": "danger",
        "ABORTED": "danger"
]

def branchesName() {
    def branchName = "${env.BRANCH_NAME}"
    if (branchName == "develop") {
        return "dev"
    } else if (branchName == "master") {
        return "prod"
    }
}

def defineImageSubTag() {
    def branchName = "${env.BRANCH_NAME}"

    if (branchName == "develop") {
        return "dev"
    } else if (branchName == "master") {
        return "prod"
    }
}

pipeline {
  environment {
    registry = "mmalmoutairi/website"
    registryCredential = 'dockerhub'
    branch = branchesName()
    IMAGE_SUB_TAG = defineImageSubTag()

  }
  agent any
  stages {

    stage('Checkout') {
      when {
        anyOf {
            branch 'develop'
            branch 'prod'
        }
     }
      steps{
        script {
            sh ""
        }
        checkout scm
      }
    }

    stage('Build image') {
      when {
        anyOf {
            branch 'develop'
            branch 'prod'
        }
     }
      steps{
        script {
          sh """
                docker build -t manasstech/website .

            """
        }
      }
    }

    stage('Push image') {
      when {
        anyOf {
            branch 'develop'
            branch 'prod'
        }
     }
      steps{
        script {
          sh """

                docker push manasstech/website

            """
        }
      }
    }

    stage('Remove image') {
      when {
        anyOf {
            branch 'develop'
            branch 'prod'
        }
     }
      steps{
        script {
          sh """

                docker rmi manasstech/website

            """
        }
      }
    }

    stage('Deploy to Dev environment') {
      when {
        anyOf {
            branch 'develop'
        }
     }

     steps{
         sshagent(credentials : ['development-server']) {
             sh """
                    ssh -i ~/.ssh/jenkins_development root@157.230.101.175 docker-compose -f /home/docker-compose.yml down
                    ssh -i ~/.ssh/jenkins_development root@157.230.101.175 docker-compose -f /home/docker-compose.yml pull website
                    ssh -i ~/.ssh/jenkins_development root@157.230.101.175 docker-compose -f /home/docker-compose.yml up --build -d
                """
         }
     }

    }
  }
}




