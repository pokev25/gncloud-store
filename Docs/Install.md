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

#### 방화벽 해제

  OS 레벨에서 제공하는 방화벽에 등록을 하거나 해제를 해야한다.
  ```
  # CentOS7
  $ systemctl disable firewalld
  $ systemctl stop firewalld
  ```

#### docker 설치

도커의 설치는 공식 도커 홈페이지의 설치매뉴얼로 대신합니다.

  1. Docker 엔진설치 : https://docs.docker.com/engine/installation/
  2. Docker-compose 설치 : https://docs.docker.com/compose/install/

#### 플랫폼 실행

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



#### 플랫폼 접속

  브라우저로 `http://<설치IP주소>`에 접속하면 아래와 같은 로그인화면이 나타납니다. 기본 관리자 아이디는 `root` 이고 비밀번호는 `11111111` 이며, 차후에 프로필 메뉴에서 비밀번호를 변경할 수 있습니다.

  <center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/login.png?raw=true)</center>






Hyper-V 호스트 설치
----------------

#### Windows Hyper-V 설치

설치순서는 다음과 같습니다.

 - 제어판 -> 프로그램 -> windows 기능 켜기/끄기 -> Hyper-V 체크 후 확인 -> 리부팅

##### windows 10
 <center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/hyper-v-manager.png?raw=true)</center>

##### windows server 2102
 <center>![](https://github.com/gncloud/gncloud-store/blob/master/Docs/platform/server2012.png?raw=true) </center>




#### 파워쉘 실행 - 관리자 권한

먼저 지앤클라우드 플랫폼에서 접근하여 파워쉘 실행이 가능 하도록 설정합니다.

```
PS> Enable-PSRemoting
PS> Enable-WSManCredSSP -Role server
```

다음으로 가상스위치를 생성합니다.

```
PS> $net = Get-NetAdapter -physical | where status -eq 'up';
PS> New-VMSwitch -Name out -NetAdapterName $net.Name -AllowManagementOS $true -Notes 'Parent OS, VMs, LAN';
```

이미지 저장 디렉토리를 생성합니다. NAS(SAN) 설정 시 C drive 대신 세팅된 NAS(SAN) 네트워크 드라이브(예: Z)로 설정합니다.
```
PS> $image_path = "C:\data\images\hyperv";
PS> New-Item $image_path\instance -ItemType directory;
PS> New-Item $image_path\manager -ItemType directory;
# NAS
PS> $image_path = "Z:\data\images\hyperv";
PS> New-Item $image_path\base -ItemType directory;
PS> New-Item $image_path\snapshot -ItemType directory;
PS> New-Item $image_path\backup -ItemType directory;
```

지앤클라우드 에이전트의 인바운드 접속을 허용합니다.
```
PS> New-NetFirewallRule -DisplayName hypervagent -Direction Inbound -Action Allow -EdgeTraversalPolicy Allow -Protocol TCP -LocalPort 8180
```

다음 경로에서 에이전트를 다운로드 받아서 설치합니다.

Gncloud Hyper-V Agent.zip 다운로드 : https://github.com/gncloud/gncloud/raw/master/Install/gncloud-hyperv-host/Gncloud%20Hyper-V%20Agent.zip

```
PS> Expand-Archive '.\Gncloud Hyper-V Agent.zip'
PS> .\"Gncloud Hyper-V Agent\Gncloud Hyper-V Agent"\setup.exe
```

Hyper-V Agent를 관리자 계정으로 세팅하고 서비스를 시작합니다. 서비스 설정 방법은 아래와 같습니다.

  1. Win + R
  2. services.msc 입력후 Enter
  3. Gncloud Hyper-V Agent Service 항목을 더블클릭
  4. 로그온탭 선택
  5. 계정 지정 라디오 버튼 선택
    1. Admin권한의 계정입력
    2. 암호입력
    3. 적용 버튼 클릭
    4. 확인 버튼 클릭
  6. 계정이름을 모를경우
    1. 찾아보기 클릭 or Alt + B
    2. 고급버튼 클릭 or Alt + A
    3. 지금찾기 클릭 or Alt + N
    4. 검색결과의 계정명 선택 (Admin의 권한을 가지고 있는 계정선택)
    5. 확인버튼 클릭
    6. 선택한 계정의 비밀번호 입력
    7. 적용 버튼 클릭
    8. 확인 버튼 클릭
  7. 절차 완료후 Gncloud Hyper-V Agent Service 서비스 중지 후 다시 시작


원격접속을 허용하도록 합니다.

```
PS> (Get-WmiObject Win32_TerminalServiceSetting -Namespace root\cimv2\TerminalServices).SetAllowTsConnections(1,1) | Out-Null
PS> (Get-WmiObject -Class "Win32_TSGeneralSetting" -Namespace root\cimv2\TerminalServices -Filter "TerminalName='RDP-tcp'").SetUserAuthenticationRequired(0) | Out-Null
PS> Get-NetFirewallRule -DisplayName "Remote Desktop*" | Set-NetFirewallRule -enabled true
```

> 필요시 Dotnet Framework를 설치합니다. Windows server 2012 버전은 최신의 Dotnet Framework를 설치 해야합니다.
설치 : https://www.microsoft.com/ko-KR/download/details.aspx?id=53345



KVM 호스트 설치
-----------------

#### libvirt 설치
```
$ yum update
$ yum -y install qemu-kvm libvirt virt-install bridge-utils
$ systemctl enable libvirtd
$ systemctl start libvirtd
```

#### 버추얼 네트워크 생성
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

#### 가상화 풀 생성 및 시작
```
$ virsh pool-define-as default dir --target  '/var/lib/libvirt/images'
$ virsh pool-start default
$ virsh pool-autostart gnpool
$ systemctl restart libvirtd
```

#### 호스트 서버 가상화 메타 파일 설치

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


Docker Swarm 호스트 설치
---------------------

Docker Swarm 호스트는 지앤클라우드에서 `서비스`라는 메뉴를 통해 컨테이너를 분산관리할수 있게 해줍니다.

#### Docker 설치

도커의 설치는 공식 도커 홈페이지의 설치매뉴얼로 대신합니다.
Docker 엔진설치 : https://docs.docker.com/engine/installation/

> Docker Swarm 을 사용해야 하므로 v1.13 이상의 버전을 설치하도록 합니다.

Docker를 설치 한뒤 아래 명령을 수행합니다.

```
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

#### Docker Swarm 설정
```
# swarm manager 호스트
$ docker swarm init --advertise-addr [manager IP]
# 결과 값에 token 값 출력 (예:result token : SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c)

# swarm worker 호스트
$ docker swarm join --token SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c [manager IP]:2377
```

끝.






