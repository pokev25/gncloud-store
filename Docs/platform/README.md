지앤클라우드 설치매뉴얼
=========

목차
---

1. 지앤클라우드 구성
2. 지앤클라우드 플랫폼 설치
3. 지앤클라우드 호스트 설치 (Windows - Hyper-V)
4. 지앤클라우드 호스트 설치 (Linux - KVM)
5. 지앤클라우드 호스트 설치 (Linux - Docker)

------------------------
<span></span>
### 1. 지앤클라우드 구성
-----------------

지앤클라우드는 지앤클라우드 관리 및 운영을 하는 플랫폼과 실제 인스턴스 및 서비스가 동작하는 호스트 들로 구분한다.

<center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/gncloud-arch.png?raw=true)</center>

------------------------
### 2. 지앤클라우드 플랫폼 설치
----------------------

지앤클라우드 플랫폼은 운영자, 사용자의 인터페이스를 담당하는 Web과 실제 내부 처리를 하는 컨트롤러들로 구성 되어 있으며,
마이크로서비스 아키텍쳐(MSA)를 따르고 있다.
설치와 관리의 편의를 위해 지앤클라우드 플랫폼은 Docker Container 기반으로 운영 되며 docker 가 설치 되어 있으면
OS에 상관없이 실행 가능하다.

#### 방화벽 해제

  OS 레벨에서 제공하는 방화벽에 등록을 하거나 해제를 해야한다.
  ```
  # CentOS7 에서는
  $ systemctl disable firewalld
  $ systemctl stop firewalld
  # seliux 설정 해제 (모든 설치 종료 후 리부팅 필요함)
  $ sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/sysconfig/selinux
  $ sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
  ```

#### docker 설치

  https://docs.docker.com/engine/installation/


#### docker-compose 설치

  https://docs.docker.com/compose/install/


#### docker-compose 실행

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

#### 지앤클라우드 플랫폼 접속 및 설치 완료

  브라우저를 실행하고 주소창에 "http://<지앤클라우드 플랫폼 설치 ip>"를 입력 하면 아래와 같은 화면이 표시된다.

  <center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/login.png?raw=true)</center>

    기본 관리자 비밀번호는 11111111 이며 처음 로그인 후 비밀번호를 변경한다.
  * docker-compose up 화면
    - docker image pull
<center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/docker-compose-up.png?raw=true)</center>
    - docker service start log
<center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/docker-compose-up-2.png?raw=true)</center>

#### 지앤클라우드 플랫폼과 연결되는 호스트 설정
  ```
  # 지앤클라우드 플랫폼에서 사용자 데이터 생성
  $ mkdir -p /var/lib/gncloud/KVM/script/initcloud
  $ ssh-keygen -f ~/.ssh/id_rsa
  $ > /var/lib/gncloud/KVM/script/initcloud/user-data
  $ echo "#cloud-config" >> /var/lib/gncloud/KVM/script/initcloud/user-data
  $ echo "password: fastcat=1151" >> /var/lib/gncloud/KVM/script/initcloud/user-data
  $ echo "chpasswd: {expire: False}" >> /var/lib/gncloud/KVM/script/initcloud/user-data
  $ echo "ssh_pwauth: true" >> /var/lib/gncloud/KVM/script/initcloud/user-data
  $ echo "ssh_authorized_keys:" >> /var/lib/gncloud/KVM/script/initcloud/user-data
  $ cat ~/.ssh/id_rsa.pub >> /var/lib/gncloud/KVM/script/initcloud/user-data
  ```
  ```
  # 지앤클라우드 플랫폼에서 KVM 호스트에 ssh key copy
  $ ssh-copy-id -i ~/.ssh/id_rsa.pub root@[KVM HOST IP]  * 지앤클라우드 플랫폼에서 실행, KVM, Docker 호스트에 복사
  # connection 'yes', 비밀번호 입력
  $ mkdir -p /var/lib/gncloud/KVM/script/initcloud/user-data * KVM 호스트에서 실행
  $ scp -i ~/.ssh/id_rsa.pub /var/lib/gncloud/KVM/script/initcloud/user-data root@[KVM HOST IP]:/var/lib/gncloud/KVM/script/initcloud/user-data
  ```

------------------------
<span></span>
### 3. 지앤클라우드 호스트 설치 (Windows - Hyper-V)
------------------------

#### Windows Hyper-V 프로그램 설치 (windows 10 이상, windows server 2012 이상 지원)


- 제어판 -> 프로그램 -> windows 기능 켜기/끄기 -> Hyper-V 체크 후 확인 -> 리부팅

  * windows 10
  <center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/hyper-v-manager.png?raw=true)</center>

  * windows server 2102
  <center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/server2012.png?raw=true) </center>


#### 파워쉘 실행 - 관리자 권한
  ```
  # 지앤클라우드 플랫폼에서 접근하여 파워쉘 실행이 가능 하도록 설정
  PS> Enable-PSRemoting
  PS> Enable-WSManCredSSP -Role server
  ```

  ```
  # 가상스위치 생성
  PS> $net = Get-NetAdapter -physical | where status -eq 'up';
  PS> New-VMSwitch -Name out -NetAdapterName $net.Name -AllowManagementOS $true -Notes 'Parent OS, VMs, LAN';
  ```

  ```
  # 이미지 저장 디렉토리 생성  - NAS (SAN) 설정 시 C drive 대신 세팅된 NAS(SAN) 네트워크 드라이브(예: Z)로 설정
  PS> $image_path = "C:\data\images\hyperv";
  PS> New-Item $image_path\instance -ItemType directory;
  PS> New-Item $image_path\manager -ItemType directory;
  # NAS
  PS> $image_path = "Z:\data\images\hyperv";
  PS> New-Item $image_path\base -ItemType directory;
  PS> New-Item $image_path\snapshot -ItemType directory;
  PS> New-Item $image_path\backup -ItemType directory;
  ```

  ```
  # 지앤클라우드 에이전트 인바운드 허용
  PS> New-NetFirewallRule -DisplayName hypervagent -Direction Inbound -Action Allow -EdgeTraversalPolicy Allow -Protocol TCP -LocalPort 8180
  ```

  ```
  # 지앤클라우드 에이전트 설치
  # Gncloud Hyper-V Agent.zip 파일 다운로드 :
    https://github.com/gncloud/gncloud/blob/master/Install/gncloud-hyperv-host/Gncloud%20Hyper-V%20Agent.zip


  PS> Expand-Archive '.\Gncloud Hyper-V Agent.zip'
  PS> .\"Gncloud Hyper-V Agent\Gncloud Hyper-V Agent"\setup.exe
  ```
  ```
  # hyper-v agent를 관리자 계정 세팅 및 서비스 시작 하기
  1. Win + R
  2. services.msc 입력후 Enter
  3. Gncloud Hyper-V Agent Service 항목을 더블클릭
  4. 로그온탭 선택
  5. 계정 지정 라디오 버튼 선택
    Admin권한의 계정입력
    암호입력
    적용 버튼 클릭
    확인 버튼 클릭
    - 계정이름을 모를경우
      찾아보기 클릭 or Alt + B
      고급버튼 클릭 or Alt + A
      지금찾기 클릭 or Alt + N
      검색결과의 계정명 선택 (Admin의 권한을 가지고 있는 계정선택)
      확인버튼 클릭
      선택한 계정의 비밀번호 입력
      적용 버튼 클릭
      확인 버튼 클릭
  6. 절차 완료후
    Gncloud Hyper-V Agent Service 서비스 중지 후 다시 시작
  ```

  ```
  # 원격접속 허용
  PS> (Get-WmiObject Win32_TerminalServiceSetting -Namespace root\cimv2\TerminalServices).SetAllowTsConnections(1,1) | Out-Null
  PS> (Get-WmiObject -Class "Win32_TSGeneralSetting" -Namespace root\cimv2\TerminalServices -Filter "TerminalName='RDP-tcp'").SetUserAuthenticationRequired(0) | Out-Null
  PS> Get-NetFirewallRule -DisplayName "Remote Desktop*" | Set-NetFirewallRule -enabled true
  ```

  ```
  # Dotnet Framework 설치 : windows server 2012 버전은 최신의 Dotnet Framework를 설치 해야한다.
  https://www.microsoft.com/ko-KR/download/details.aspx?id=53345
  ```
------------------------
<span></span>
### 4. 지앤클라우드 호스트 설치 (Linux - KVM)
------------------------

#### libvirt 설치
```
$ yum update
$ yum -y install qemu-kvm libvirt virt-install bridge-utils
$ systemctl enable libvirtd
$ systemctl start libvirtd
```

### 버추얼 네트워크 생성
```
$ virsh net-destroy default
$ virsh net-undefine default

#ifcfg-br0 설정
$ > /etc/sysconfig/network-scripts/ifcfg-br0
$ echo "DEVICE=br0" >> /etc/sysconfig/network-scripts/ifcfg-br0
$ echo "TYPE=Bridge" >> /etc/sysconfig/network-scripts/ifcfg-br0
$ echo "BOOTPROTO=dhcp" >> /etc/sysconfig/network-scripts/ifcfg-br0
$ echo "ONBOOT=yes" >> /etc/sysconfig/network-scripts/ifcfg-br0
$ echo "DELAY=0" >> /etc/sysconfig/network-scripts/ifcfg-br0

#network interface 이름에 따라 ifcfg-[interface name] : eth0일 경우
$ sed -i "s/^/#/g" /etc/sysconfig/network-scripts/ifcfg-eth0
$ sed -i "s/#UUID/UUID/g" /etc/sysconfig/network-scripts/ifcfg-eth0
$ echo "DEVICE=eth0" >> /etc/sysconfig/network-scripts/ifcfg-eth0
$ echo "ONBOOT=yes" >> /etc/sysconfig/network-scripts/ifcfg-eth0
$ echo "BRIDGE=br0" >> /etc/sysconfig/network-scripts/ifcfg-eth0
$ echo "NM_CONTROLLED=no" >> /etc/sysconfig/network-scripts/ifcfg-eth0

# CentOS 7의 경우 NetworkManager를 사용하지 않고 network 서비스를 사용한다.
$ systemctl disable NetworkManager
$ systemctl stop NetworkManager
$ systemctl restart network

# 인스턴스의 IP를 얻어 오기 위해 설치
$ yum -y install arp-scan
```

### 가상화 풀 생성 및 시작
```
$ virsh pool-define-as default dir --target  '/var/lib/libvirt/images'
$ virsh pool-start default
$ virsh pool-autostart gnpool
$ systemctl restart libvirtd
```

### 호스트 서버 가상화 메타 파일 설치

```
# 지앤클라우드 플랫폼 설치 시 생성된 /var/lib/gncloud/KVM/script, /var/lib/gncloud/KVM/script/initcloud 디렉토리에 메타파일 복사
# user-data는 /var/lib/gncloud/KVM/script/initcloud 디렉토리에 있는지 확인 필요
# meta-data, config.iso 다운로드 후 /var/lib/gncloud/KVM/script/initcloud 디렉토리에 복사
  https://github.com/gncloud/gncloud/blob/master/KVM/script/initcloud/config.iso
  https://github.com/gncloud/gncloud/blob/master/KVM/script/initcloud/meta-data

# add_sshkeys.sh, get_ipaddress.sh, get_vm_use.sh, sshkey_copy.sh, make_sshkey.sh 다운로드 후
  /var/lib/gncloud/KVM/script 디렉토리에 복사)
  https://github.com/gncloud/gncloud/blob/master/KVM/script/add_sshkeys.sh
  https://github.com/gncloud/gncloud/blob/master/KVM/script/get_ipaddress.sh
  https://github.com/gncloud/gncloud/blob/master/KVM/script/get_vm_use.sh
  https://github.com/gncloud/gncloud/blob/master/KVM/script/make_sshkey.sh
  https://github.com/gncloud/gncloud/blob/master/KVM/script/sshkey_copy.sh

# 실행 가능하도록 모드 변경
$ cd /var/lib/gncloud/KVM/script
$ chmod 777 *sh
```

------------------------
<span></span>
### 5. 지앤클라우드 호스트 설치 (Linux - Docker)
------------------------
#### docker 설치
  https://docs.docker.com/engine/installation/

  ```
  # docker 설치 후 수행
  $ sed -i "s/ExecStart=\/usr\/bin\/dockerd/ExecStart=\/usr\/bin\/dockerd -H tcp:\/\/0.0.0.0:2375 \
           -H unix:\/\/\/var\/run\/docker.sock --insecure-registry docker-registry:5000/g" \
           /usr/lib/systemd/system/docker.service
  $ systemctl enable docker
  $ systemctl start docker

  # docker registry IP 를 /etc/hosts에 등록 (docker registry IP는 지앤클라우드 플랫폼 호스트 IP)
  $ echo "[docker registry IP]   docker-registry" >> /etc/hosts

  # hostname 설정
  1) 매니저
  $ echo "manager" > /etc/hostname

  참고) docker manager와 worker의 hostname은 지앤클라우드 web ui의 시스템관리자에서 설정하는 클러스터 구성에서 반드시 이름이 같아야 한다.
```

#### docker swarm manager & worker 설정
```
# swarm manager 호스트
$ docker swarm init --advertise-addr [manager IP]
# 결과 값에 token 값 출력 (예:result token : SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c)

# swarm worker 호스트
$ docker swarm join --token SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c [manager IP]:2377
```
