지앤클라우드 설치
=========

지앤클라우드 구성
-------------

지앤클라우드는 크게 두가지로 구성됩니다.

 1. 플랫폼 : 호스트들의 관리 및 운영을 전담
 2. 호스트 : 실제 인스턴스 및 서비스가 동작하는 머신(서버 또는 PC)

<center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/gncloud-arch.png?raw=true)</center>


#### 플랫폼의 구성요소

- Manager
- Web
- Scheduler
- Mysql
- Docker Registry
- KVM Controller
- Docker Controller
- Hyper-V Controller

지앤클라우드 플랫폼은 운영자, 사용자의 인터페이스를 담당하는 Web과 실제 내부 처리를 하는 컨트롤러들로 구성 되어 있으며,
마이크로서비스 아키텍쳐(MSA)를 따르고 있습니다. 설치와 관리의 편의를 위해 지앤클라우드 플랫폼은 Docker Container 기반으로 운영 되며 docker 가 설치 되어 있으면 OS에 상관없이 어디서든 실행이 가능합니다.


지앤클라우드 플랫폼 설치
------------------

##### 방화벽 해제

  OS 레벨에서 제공하는 방화벽에 등록을 하거나 해제를 해야한다.
  ```
  # CentOS7
  $ systemctl disable firewalld
  $ systemctl stop firewalld
  ```

##### docker 설치

도커의 설치는 공식 도커 홈페이지의 설치매뉴얼로 대신합니다.

  1. Docker 엔진설치 : https://docs.docker.com/engine/installation/
  2. Docker-compose 설치 : https://docs.docker.com/compose/install/

##### 플랫폼 실행

Docker 와 Docker-compose 가 정상적으로 설치완료되었다면, 이제 지앤클라우드 플랫폼을 실행할수 있습니다.

  1. docker-compose.yml 파일 다운로드
  https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/docker-compose.yml

  2. 로그, database, docker registry 디렉토리 생성

    ```
    # root 권한으로 디렉토리 생성
    $ sudo mkdir -p /var/log/gncloud
    $ sudo mkdir -p /data/mysql
    $ sudo mkdir -p /data/registry
	```

  3. 지앤클라우드 플랫폼 실행
    ```
    $ sudo docker-compose up -d
    ```

 아래 화면은 `docker-compose` 가 정상적으로 실행중일때의 로그입니다.

 **[Docker-compose up 화면]**

 <center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/docker-compose-up.png?raw=true)</center>

 **[Docker service start log]**
 <center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/docker-compose-up-2.png?raw=true)</center>



##### 플랫폼 접속

  브라우저로 `http://<설치IP주소>`에 접속하면 아래와 같은 로그인화면이 나타납니다. 기본 관리자 아이디는 `root` 이고 비밀번호는 `11111111` 이며, 차후에 프로필 메뉴에서 비밀번호를 변경할 수 있습니다.

  <center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/login.png?raw=true)</center>






Hyper-V 호스트 설치
----------------

##### Windows Hyper-V 설치

설치순서는 다음과 같습니다.

 - 제어판 -> 프로그램 -> windows 기능 켜기/끄기 -> Hyper-V 체크 후 확인 -> 리부팅

##### windows 10
 <center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/hyper-v-manager.png?raw=true)</center>

##### windows server 2102
 <center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/server2012.png?raw=true) </center>










