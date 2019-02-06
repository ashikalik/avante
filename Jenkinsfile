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
    registry = "mmalmoutairi/api"
    registryCredential = 'dockerhub'
    branch = branchesName()
    IMAGE_SUB_TAG = defineImageSubTag()

  }
  agent any
  triggers {
      GenericTrigger(
       genericVariables: [
        [key: 'ref', value: '$.ref']
       ],
       causeString: 'Triggered on $ref',

       token: 'KsuM8kAmXu-Develop',

       printContributedVariables: true,
       printPostContent: true,

       regexpFilterText: '$ref',
       regexpFilterExpression: 'refs/heads/' + BRANCH_NAME
      )
    }
  stages {

    stage('Building image') {
      when {
        anyOf {
            branch 'develop'
            branch 'prod'
        }
     }
      steps{
        script {
          sh "docker build -t ${env.BRANCH_NAME}-${env.BUILD_NUMBER}  ."
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
                docker build --no-cache --force-rm --pull -t manasstech/api:${env.IMAGE_SUB_TAG} .

                docker push manasstech/api:${env.IMAGE_SUB_TAG}

                docker rmi manasstech/api:${env.IMAGE_SUB_TAG}
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
                    ssh -i ~/.ssh/jenkins_development root@157.230.101.175 docker-compose -f /home/docker-compose.yml pull backend
                    ssh -i ~/.ssh/jenkins_development root@157.230.101.175 docker-compose -f /home/docker-compose.yml up --build -d
                """
         }
     }

    }
  }
}




