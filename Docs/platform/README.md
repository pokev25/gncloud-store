지앤클라우드 설치매뉴얼
=========

목차
---

1. 지앤클라우드 구성
2. 지앤클라우드 플랫폼 설치
3. 지앤클라우드 호스트 설치 (Windows - Hyper-V)
4. 지앤클라우드 호스트 설치 (Linux - KVM)
5. 지앤클라우드 호스트 설치 (Linux - Docker)


<span></span>

### 1. 지앤클라우드 구성
-----------------

지앤클라우드는 지앤클라우드 관리 및 운영을 하는 플랫폼과 실제 인스턴스 및 서비스가 동작하는 호스트 들로 구분한다.

<center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/gncloud-arch.png?raw=true)</center>


### 2. 지앤클라우드 플랫폼 설치
----------------------

지앤클라우드 플랫폼은 운영자, 사용자의 인터페이스를 담당하는 Web과 실제 내부 처리를 하는 컨트롤러들로 구성 되어 있으며,
마이크로서비스 아키텍쳐(MSA)를 따르고 있다.
설치와 관리의 편의를 위해 지앤클라우드 플랫폼은 Docker Container 기반으로 운영 되며 docker 가 설치 되어 있으면
OS에 상관없이 실행 가능하다.

- 방화벽 해제

  OS 레벨에서 제공하는 방화벽에 등록을 하거나 해제를 해야한다.
  ```
  # CentOS7 에서는
  $ systemctl disable firewalld
  $ systemctl stop firewalld
  ```

- docker 설치

  https://docs.docker.com/engine/installation/


- docker-compose 설치

  https://docs.docker.com/compose/install/


- docker-compose 실행

  https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/docker-compose.yml
  * docker-compose.yml 파일 다운로드
  * 로그, database, docker registry 디렉토리 생성

    ```
    # root 권한으로 /var/log/gncloud 디렉토리 생성
    $ mkdir -p /var/log/gncloud
    $ mkdir -p /data/mysql
    $ mkdir -p /data/registry

    # 지앤클라우드 플랫폼 실행
    $ docker-compose up -d
    ```

- 지앤클라우드 플랫폼 접속 및 설치 완료

  브라우저를 실행하고 주소창에 "http://<지앤클라우드 플랫폼 설치 ip>"를 입력 하면 아래와 같은 화면이 표시된다.

  <center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/login.png?raw=true)</center>

    기본 관리자 비밀번호는 11111111 이며 처음 로그인 후 비밀번호를 변경한다.
  * docker-compose up 화면
    - docker image pull
<center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/docker-compose-up.png?raw=true)</center>
    - docker service start log
<center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/docker-compose-up-2.png?raw=true)</center>


<span></span>
### 3. 지앤클라우드 호스트 설치 (Windows - Hyper-V)
------------------------

#### Windows Hyper-V 프로그램 설치


- 제어판 -> 프로그램 -> windows 기능 켜기/끄기 -> Hyper-V 체크 후 확인 -> 리부팅

  * windows 10
  <center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/hyper-v-manager.png?raw=true)</center>

  * windows server 2102
  <center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/server2012.png?raw=true) </center>










