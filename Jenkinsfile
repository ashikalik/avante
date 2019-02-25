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

    stage('Check out') {
      when {
        anyOf {
            branch 'develop'
            branch 'prod'
        }

        steps{
          script {
              sh "git config --global http.sslVerify false"
          }
          checkout scm
        }
     }
    }
  }
}




