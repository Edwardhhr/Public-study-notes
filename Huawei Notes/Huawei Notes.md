# Huawei命令笔记

- [基础命令](#基础命令)
- [接口速率](#接口速率)
- [MAC地址自动学习于接口绑定](#MAC地址自动学习于接口绑定)
- [生成树协议(MSTP)](#生成树协议)
- [链路聚合](#链路聚合)
- [VLAN的创建与应用](#VLAN的创建与应用)
- [VLAN中绑定MAC地址](#VLAN中绑定MAC地址)
- [MUX-VLAN配置](#MUX-VLAN配置)
- [交换机端口隔离功能](#交换机端口隔离功能)
- [不同VLAN之间的通信](#不同VLAN之间的通信)
- [VRRP默认网关冗余技术](#VRRP默认网关冗余技术)
- [MSTP与VRRP](#MSTP与VRRP)
- [Loopback接口的作用](#Loopback接口的作用)
- [路由协议](#路由协议)
- [默认路由与静态路由](#默认路由与静态路由)
- [RIP路由](#RIP路由)
- [OSPF路由协议](#OSPF路由协议)
- [BFD技术](#BFD技术)
- [BGP路由](#BGP路由)
- [ISIS路由](#ISIS路由)
- [GRE隧道技术](#GRE隧道技术)

## [基础命令](#基础命令)
用户视图 `<Huawei>`

1.进入系统视图  
```
system-view
```
缩写
```
sys
```

2.删除或禁用某个功能或者删除某项配置  
```
undo
```

3.在系统视图中设置网络设备的名称  
```
sysname 设备的名称
```   
缩写  
```
sys 设备的名称
```

4.用户视图中查看当前生效的配置信息  
```
display current-configuration
```
缩写为
```
disp cur
```

5.查看系统当前视图运行的配置  
```
display this
```

6.验证网络连通性
```
ping -c <测试的次数(数字)> <your ip address>
```

7.查看系统vlan信息  
```
display vlan
```

8.查看vlan中接口信息  
```
display port vlan
```

9.显示端口组的详细信息
```
display port-group
```

10.显示以太网聚合接口（Eth-Trunk）的信息
```
display eth-trunk
```

11.查看隔离组中的接口配置信息(系统视图)  
```
display port-isolate group all
```

12.查看设备路由表  
```
display ip routing-table
```

13.查看交换机MAC地址表(为空就是没有ping)  
```
display mac-address
```

14.查看交换机链路状态
```
display stp brief
```

15.查看交换机接口模式接口速率  
```
display interface Ethernet brief
```

16.进入指定接口视图  
```
interface 接口名称
```  

17.退回较低级别的视图  
```
quit
```

18.在用户视图中保持当前的配置  
```
save
```

19.在用户视图中重启系统  
```
reboot
```

20.在用户视图中清空设备下次启动使用的配置文件内容  
```
reset saved-configuration
```

21.进入接口视图配置接口描述  
```
description 描述信息
```

22.关闭信息中心功能  
设备不再记录和输出任何系统信息，包括执行该命令本身产生的日志信息
```
undo info-center enable
```



## [接口速率](#接口速率)
1.接口视图中将当前接口配置为非自动协商模式和全双工模式  
```
undo negotiation auto
```
```
duplex full
```

2.接口视图中将接口速率设置为100Mb/s  
```
speed 100
```

3.接口视图中打开当前接口流量控制开关  
```
flow-control
```



## [MAC地址自动学习于接口绑定](#MAC地址自动学习于接口绑定)
1.系统视图中关闭设备的信息中心功能执行该命令后，设备上产生的Log、Trap和Debug信息都不再记录，包括执行undo info-center enable命令产生的日志信息也不记录  
```
undo info-center enable
```

2.在网络环境固定的情况下，为了节约MAC地址表项，可禁止`VLAN`或`接口`内的MAC地址学习功能  
```
interface Ethernet0/0/1
mac-address learning disable
```

3.将host1的MAC地址与Ethernet 0/0/1接口绑定  
```
mac-address static <host1的mac地址> Ethernet0/0/1 vlan 1
```



## [生成树协议](#生成树协议)
交换机间采用双链路通信时，如果关闭生成树协议，交换机间会出现广播包环路，严重消耗网络资源，最终导致整个网络资源被耗尽，网络瘫痪不可用  

![认识生成树协议](https://github.com/user-attachments/assets/3034571e-0d31-4afb-bab9-8e5f0b0142e5)

1:认识生成树  
生成树协议：不改变网络的实际拓扑，在逻辑上切断某些链路，使得一台主机到所有其他主机的路径是无环路的树状结构，从而消除了环路  
STP的作用是防止环路和提供冗余功能  
STP的版本：  
STP(多生成树) --> RSTP(快速生成树协议) --> MSTP(多生成树协议)  
MSTP实现了对VLAN的兼容(一般使用这个版本的STP)  

开启交换机生成树协议(系统视图)  
```
stp enable
```
我们一般使用高级版本的STP协议MSTP  
2.MSTP的应用  
多个vlan凑成一个实例(instance)多个实例凑成一个区域（一个实例对应一个树）  
**LSW1**:  
进入系统视图  
```
sys
```
创建VLAN  
```
vlan batch 10 20 30 40
```
进入接口组模式
```
port-group 1
```
加入组成员接口
```
group-member e0/0/1 to e0/0/3
```
将组成员接口配置为trunk模式
```
port link-type trunk
```
配置允许所有VLAN通过
```
port trunk allow-pass vlan all
```
退出接口组视图
```
quit
```
选择MSTP版本
```
stp mode mstp
```
进入区域视图
```
stp region-configuration
```
设置区域名称
```
region-name RG1
```
关联实例
```
instance 1 vlan 10 30
```
```
instance 2 vlan 20 40
```
激活区域
```
active region-configuration
```
配置实例优先级(数字越小优先级越高越不会被断开，数字越大优先级越低容易断开)
```
stp instance 1 priority 4096
```
```
stp instance 2 priority 8192
```

**LSW2**:  
进入系统视图  
```
sys
```
创建VLAN
```
vlan batch 10 20 30 40
```
进入接口组模式
```
port-group 1
```
加入组成员接口
```
group-member e0/0/1 to e0/0/3
```
将组成员接口配置为trunk模式
```
port link-type trunk
```
配置允许所有VLAN通过
```
port trunk allow-pass vlan all
```
退出接口组视图
```
quit
```
选择MSTP版本
```
stp mode mstp
```
进入区域视图
```
stp region-configuration
```
设置区域名称
```
region-name RG1
```
关联实例
```
instance 1 vlan 10 30
```
```
instance 2 vlan 20 40
```
激活区域
```
active region-configuration
```
配置实例优先级(`数字越小优先级越高`越不会被断开，数字越大优先级越低容易断开)
```
stp instance 1 priority 8192
```
```
stp instance 2 priority 4096
```



## [链路聚合](#链路聚合)
关闭生成树协议使用链路聚合实现正常通信，并提供链路可靠性增加网络带宽  
创建链路聚合组1(系统视图)  
```
interface Eth-Trunk 1
```  
退出当前视图  
```
quit
```  
进入接口视图  
```
interface g0/0/1
```  
将当前接口加入到之前创建的链路聚合组1中  
```
eth-trunk 1
```  
退出当前视图  
```
quit
```  
进入接口视图  
```
int g0/0/2
```  
将当前接口加入到之前创建的链路聚合组1中  
```
eth-trunk 1
```  
退出当前视图  
```
quit
```  
同理另外一台交换机也配置相同的配置  

链路聚合拓扑及配置Demo  

![链路聚合](https://github.com/user-attachments/assets/40eb1087-712e-4bce-96d3-6dac0930d7e2)

链路聚合用于增加带宽  
链路聚合的配置  
**LSW1&LSW2**:  
进入聚合接口  
```
int Eth-Trunk 1
```
加入成员  
```
trunkport g0/0/2
```
```
trunkport g0/0/3
```
```
trunkport g0/0/4
```
或者批量加入  
```
trunkport g 0/0/2 to 0/0/4
```
配置为Trunk  
```
port link-type trunk
```
允许所有vlan通过  
```
port trunk allow-pass vlan all
```



## [VLAN的创建与应用](#VLAN的创建与应用)
**Access、Trunk、Hybrid含义**：  
- **Access**类型：端口只能属于1个VLAN，`一般用于连接计算机`  
- **Trunk**类型：端口可以属于多个VLAN，可以接收和发送多个VLAN的报文，`一般用于交换机之间连接`  
- **Hybrid**类型：端口可以属于多个VLAN，可以接收和发送多个VLAN的报文，可以用于`交换机`之间连接，也可以用于连接用户的`计算机`  

**本征VLAN**（pvid与native vlan）:  
pvid与native vlan是思科与华为交换机中的概念，虽然说法有不同，但是其本质上还是缺省vlan  
缺省**vlan默认为1**，各个端口都有一个缺省的vlan，该值支持修改  
首先在交换机中`trunk的接口我们一般称之为干道接口`(思科里称为中继接口)，干道接口是允许所有带VLAN的标签（tag）的帧通过，即permit any all（默认即是允许所有），如果遇到没有打标签的流量，交换机也会将其打上vlan 1的tag  
`pvid主要作用是为了解决无法打vlan标签的设备与能打vlan标签的设备进行通信而存在`。其次：设备管理通信作用  
PC=无法打标签，交换机=可以打标签  

**二层通信条件：只要两个接口允许相同的VLAN流量通过，并且接口配置正确（包括标签处理方式），无论它们是Hybrid、Trunk还是Access类型，都可以正常通信。注意确保接口配置正确，并且VLAN已经创建**

创建单个vlan
```
vlan 10
```

创建多个vlan  
```
vlan batch 10 20 30 100
```

将接口划入vlan  
```
interface Ethernet0/0/1
```

将接口类型配置为access  
```
port link-type access
```

划分到vlan 100  
```
port default vlan 100
```

创建进入某个vlan的视图(100是vlan的编号)  
```
vlan 100
```

设置为主vlan(**主vlan**可以和所有vlan通信)  
```
mux-vlan
```

在某个vlan视图内绑定互通型vlan 10 vlan 20(**互通型vlan**可以和主vlan通信也可以和同一vlan内的设备通信，不能与隔离型vlan通信)  
```
subordinate group 10 20
```
缩写  
```
sub group 10 20
```

在某个vlan视图内定义一个隔离形vlan 30(**隔离型vlan**只能与主vlan通信不能与其他vlan通信)  
```
subordinate separate 30
```
缩写  
```
sub sep 30
```

显示当前视图下的配置  
```
display this
```

退出当前视图  
```
quit
```

**设置接口的链路类型为access**  
进入接口  
```
int g0/0/2
```  

配置接口的链路类型为access  
```
port link-type access
```  

配置当前接口的vlan为vlan 100  
```
port default vlan 100
```

启用当前接口的主vlan(只有开启了才能应用主vlan的对于关系)  
```
port mux-vlan enable
```

**设置接口的链路类型为trunk**  
进入接口  
```
int g0/0/1
```

配置接口的链路类型为trunk  
```
port link-type trunk
```

配置允许`特定的VLAN`通过  
```
port trunk allow-pass vlan 10 20 30 100
```

或允许`全部vlan`通过  
```
port trunk allow-pass vlan all
```

**Hybrid链路类型配置语法**  
Hybrid接口具有以下特点：  
- 既可以作为Access接口，也可以作为Trunk接口
- 可以允许多个VLAN的帧通过
- 可以配置允许或禁止特定VLAN的帧通过
- 可以配置VLAN的PVID（Port VLAN ID）

应用场景:  
- 在不同VLAN之间实现通信和隔离
- 将多个VLAN连接到同一个交换机端口
- 连接两台交换机之间的干道链路(Trunk)

**PVID**（Port VLAN ID）:  
即端口VLAN ID，用于指定一个端口所属的默认VLAN。当一个端口收到没有VLAN标记的数据帧时，会将其标记为PVID所属的VLAN  
**Tagged**:  
即标记，是指数据帧带有VLAN标记。这种数据帧通常是由支持VLAN的设备（比如交换机）在Trunk端口上发送的。Trunk端口可以属于多个VLAN，所以它会在发送数据帧时加上VLAN标记，这样接收端就能知道这个帧属于哪个VLAN  
**Untagged**（未标记）:  
未标记帧是指不包含 VLAN 标识符的以太网帧。这类帧通常来自非 VLAN 感知设备。也就是去除vlan 传输数据,不支持VLAN的设备，比如普通的电脑、打印机等。这些设备发送的数据帧是没有VLAN标签的  

进入接口视图
```
interface g0/0/1
```
设置接口类型为Hybrid
```
port link-type hybrid
```
配置PVID（Port VLAN ID）  
PVID用于处理未标记的流量。当接口收到未标记的帧（即没有VLAN标签的帧）时，会将其分配到PVID指定的VLAN
```
port hybrid pvid vlan <VLAN-ID>
```
配置允许通过的VLAN  
可以配置接口允许哪些VLAN的流量通过，并且可以指定这些流量是否携带标签  
- 允许未标记流量通过
```
port hybrid untagged vlan <VLAN-ID>
```
- 允许标记流量通过
```
port hybrid tagged vlan <VLAN-ID>
```


## [VLAN中绑定MAC地址](#VLAN中绑定MAC地址)
在指定vlan中绑定MAC地址限制只有特定的MAC地址能够访问该VLAN  
进入vlan 10视图  
```
vlan 10
```  
绑定MAC地址到VLAN：  
```
mac-vlan mac-address <MAC地址>
```

### 在接口中基于MAC地址实现划分VLAN  
进入接口视图  
```
int g0/0/1
```  
启用基于MAC地址的VLAN功能：  
```
mac-vlan enable
```

将接口设置为`hybrid类型`  
```
port link-type hybrid
```

允许vlan 10和vlan 20的帧通过，并且将帧发送出接口时去掉VLAN标记  
```
port hybrid untagged vlan 10 20
```

## [MUX-VLAN配置](#MUX-VLAN配置)
绑定vlan关系：  
- **主 VLAN**(Principal VLAN)可以访问所有从 VLAN  
- **互通型 VLAN**(Group VLAN)内部的接口可以互相访问，也可以访问主 VLAN，但不能访问隔离 VLAN  
- **隔离型 VLAN**(Isolate VLAN)内部的接口不能互相访问，只能访问主 VLAN  

**主 VLAN**: `mux-vlan`  
**互通型(组) VLAN**: `sub group`  
**隔离型 VLAN**: `sub sep`  
MUX VLAN 是一种用于对连接批量设备的访问控制功能，它允许在一个物理接口上虚拟出多个逻辑接口，每个逻辑接口可以属于不同的 VLAN，从而实现不同 VLAN 间的隔离和互通  

### 接口绑定vlan    
trunk模式:    
```
int <接口名称>
```
设置接口为trunk模式
```
port link-type trunk
```
配置允许通过的VLAN
```
port trunk allow-pass vlan <允许通过的vlan列表>
```

access模式:  
```
int 接口名称
```
设置接口为access模式
```
port link-type access
```
绑定VLAN
```
port default vlan <vlan编号>
```
启用策略
```
port mux-vlan enable
```  
退出当前视图
```
quit
```

### vlan关系配置示例:  
进入系统视图  
```
sys
```  
配置设备名称  
```
sysname LSW2
```  
批量创建vlan  
```
vlan batch 10 20 30 100
```  
进入vlan 100的视图  
```
vlan 100
```  
将vlan 100配置为MUX VLAN的主VLAN  
```
mux-vlan
```  
配置为互通型vlan:  
```
subordinate group 10 20
```  
配置为隔离型vlan:  
```
subordinate separate 30
```  
显示当前的配置信息  
```
display this
```  
退出当前视图  
```
quit
```

### 在接口中应用：  
进入接口视图  
```
interface g0/0/1
```  
接口设置为trunk模式  
```
port link-type trunk
```  
指定允许通过的vlan  
```
port trunk allow-pass vlan 10 20 30 100
```  
退出当前视图  
```
quit
```  
进入接口视图  
```
int g0/0/2
```  
接口设置为access模式  
```
port link-type access
```  
将主vlan 100划分到当前接口  
```
port default vlan 100
```  
启用 MUX VLAN  
```
port mux-vlan enable
```  
退出当前视图  
```
quit
```

**创建了一个名为vlan10的端口组**  
端口组是`将多个物理端口逻辑上组合在一起`，以便可以对它们进行统一的配置和管理  
```
port-group vlan10
```  
将多个端口加入到名为vlan10的端口组中  
```
group-member g0/0/3 to g0/0/14
```  
设置为access模式,access模式下端口只允许一个VLAN的流量通过  
```
port link-type access
```  
将端口的默认VLAN设置为vlan 10  
```
port default vlan 10
```  
启用了MUX VLAN功能(不启用无法生效主vlan策略)  
```
port mux-vlan enable
```  
退出当前视图  
```
quit
```

**创建了一个名为vlan30的端口组**  
```
port-group vlan30
```  
将多个端口加入到名为vlan10的端口组中  
```
group-member g0/0/15 to g0/0/24
```  
设置为access模式  
```
port link-type access
```  
将端口的默认VLAN设置为vlan 30  
```
port default vlan 30
```  
启用了MUX VLAN功能(不启用无法生效主vlan策略)  
```
port mux-vlan enable
```  
退出端口组视图  
```
quit
```  
退出系统视图  
```
quit
```  
在用户视图中保存当前配置  
```
save
```  
选择是  
```
y
```



## [交换机端口隔离功能](#交换机端口隔离功能)
交换机实现端口隔离功能  
接口视图下开启此接口的端口隔离功能  
交换机默认是将隔离的端口加入到了一个隔离组中，默认是group 1，处于同一个组中的端口之间是不能互相访问的。不同组之间的端口是可以互相访问的。  
将1口加入到组1中  
```
interface GigabitEthernet0/0/1
```  
```
port-isolate enable group 1
```  
 或  
```
port-isolate enable
```  

将2口加入到组1中  
```
interface GigabitEthernet0/0/2
```  
```
port-isolate enable group 1
```  
 或  
```
port-isolate enable
```  

将3口加入到组2中  
```
interface GigabitEthernet0/0/3
```  
```
port-isolate enable group 2
```  
1、2口之间的主机即使处于同一个网段中也是不能互相访问的，但是他们和3口之间是可以互相访问的。这属于端口隔离中的双向隔离。需要注意的是，`同组中的端口是不能互相访问的`，即使`没有配置端口隔离的端口`，是`可以和配置了的端口进行访问`的  
还有一种是`单向隔离`，如果`在一个端口下开启和另一个端口之间的单向隔离`，那么另一个端口的发包是可以到达此接口的，只是`此接口回不了包`而已  
```
interface g0/0/3
```  
```
am isolate g0/0/1
```  
那么，1口的包是可以到达3口的，只是3口不能给1口进行回包而已  
如果开启了代理arp，那么双方还是会相互访问，那是因为隔离模式默认是2层隔离，开启了代理arp,数据包会发送给具有代理arp功能的设备，如果这个设备有能力到达目标IP，那么所请求的mac地址，就由代理arp帮你请求  
进入到需要开启代理arp的接口  
```
interface g0/0/0
```  
```
arp-proxy enable
```  
这样的话，即使开启的单向隔离，那么两个端口之间也会进行访问，但是需要注意它们之间访问的逻辑是什么

项目示例：  
实验要求：  
内部员工外部员工和外来人员所有pc能访问服务器  
外部员工能和内部员工通信，但外部员工之间不能通信来访人员不能和员工通信  

拓扑思路：  
内部外部员工使用vlan 10  
访客使用vlan 20  
服务器使用vlan 100  
使用vlanif在端口中应用使其都能通信  
然后使用端口隔离功能  
把内部员工pc1加入group1  
把内部员工pc2加入group2  
把外部员工pc3加入group3  
把外部员工pc4加入group3  
把访客pc5中加入group1，group2，group3  
把访客pc6中加入group1，group2，group3  
也就是说一个端口中可以加入多个组(相同组无法通信，不同组才能进行通信)  

命令解释：  
属于同一个VLAN不能进行二层通信但是可以进行三层通信  
```
port-isolate mode l2
```  
属于同一个VLAN既不能进行二层通信，也不能进行三层通信  
```
port-isolate mode all
```  
对于不同VLAN的端口：  
当配置了port-isolate时，不同VLAN的端口之间的通信不会受到影响，因为它们本来就处于`不同的广播域`中，port-isolate功能主要影响`同一VLAN`内部的端口通信  



## [不同VLAN之间的通信](#不同VLAN之间的通信)
### 三层交换机创建VLAN SVI实现不同vlan之间的通信  
创建vlan 10的SVI,并给其配置ip地址  
```
vlan batch 10
```  
```
quit
```  
```
interface vlanif 10
```  
```
ip address 192.168.64.254 255.255.255.0
```  
VLAN 10的SVI的IP地址，就是VLAN 10中各主机配置的默认网关地址  
**在接口中应用**：  
**接口为Access类型**：  
```
int g0/0/1
```  
```
port link-type access
```  
```
port default vlan 10
```  
```
quit
```  
**接口为Trunk类型**：  
```
int g0/0/1
```  
```
port link-type trunk
```  
```
port trunk allow-pass vlan 10
```  
```
quit
```  
**在路由器接口中配置地址**  
```
int g0/0/1
```  
```
ip address <ip地址> <子网掩码>
```  



## [VRRP默认网关冗余技术](#VRRP默认网关冗余技术)
VRRP默认网关冗余技术(避免默认网关失效)  
即使用了双网关  
如果AR1路由器坏掉了，那么久可以使用AR2路由器作为网关  
![VRRP](https://github.com/user-attachments/assets/73aca3af-da7a-4a8b-a123-60f8fb12abc3)

AR1:  
进入内部接口网关的视图  
```
int g0/0/1
```
配置内部网关接口的IP地址
```
ip address 192.168.11.1 24
```
在接口中配置虚拟IP,即网关(这里的虚拟IP地址要和实际的IP地址在同一个网段内)
```
vrrp vrid 1 virtual-ip 192.168.11.254
```
配置AR1的优先级(这里的数字越大优先级越高)
```
vrrp vrid 1 priority 120
```
配置回环接口用于测试优先级
```
int LoopBack 1
```
配置接口ip地址用于测试(PC只要能到这个路由器那么就能访问这个ip)
```
ip address 10.10.10.1 32
```


AR2:  
进入内部接口网关的视图  
```
int g0/0/0
```
配置内部网关接口的IP地址
```
ip address 192.168.11.2 24
```
在接口中配置虚拟IP,即网关
```
vrrp vrid 1 virtual-ip 192.168.11.254
```
配置回环接口用于测试优先级
```
int LoopBack 1
```
配置接口ip地址用于测试(PC只要能到这个路由器那么就能访问这个ip)
```
ip address 20.20.20.1 32
```
查看交换机链路状态
```
display stp brief
```



## [MSTP与VRRP](#MSTP与VRRP)
拓扑图如下  
![屏幕截图 2024-11-03 095150](https://github.com/user-attachments/assets/660f7757-e9c5-4253-9f42-28808d3575ae)

可以见到LSW1与LSW2，LSW3，LSW4之间的链路都使用Trunk模式  
LSW3和LSW4与各自四台PC之间的链路都使用Access模式  
我们把PC1和PC5的默认VLAN设置为VLAN 10  
我们把PC2和PC6的默认VLAN设置为VLAN 20  
我们把PC3和PC7的默认VLAN设置为VLAN 30  
我们把PC4和PC8的默认VLAN设置为VLAN 40  

接下来是配置命令部分  
SW1:  
进入系统视图  
```
system-view
```
创建VLAN
```
vlan batch 10 20 30 40
```

进入接口组模式编号1
```
port-group 1
```
添加接口组成员
```
group-member g0/0/1 to g0/0/2
```
或不用事先指定接口组编号使用默认编号直接添加接口组成员
```
port-group group-member g0/0/1 to g0/0/2
```
将接口组1链路设置为Trunk模式
```
port link-type trunk
```
编辑允许所有VLAN通过
```
port trunk allow-pass vlan all
```
退出当前接口组1视图
```
quit
```
配置LSW1与LSW2的链路聚合
进入聚合接口组1
```
int Eth-Trunk 1
```
添加聚合端口
```
trunkport g 0/0/3 to 0/0/4
```
设置端口的链路类型为混合模式
```
port link-type hybrid
```
退出当前视图
```
quit
```
进入逻辑接口视图
```
int vlanif 10
```
配置逻辑接口的ip地址
```
ip address 192.168.10.1 24
```
配置虚拟网关的ip地址
```
vrrp vrid 10 virtual-ip 192.168.10.254
```
提高vrid 10的优先级
`在VRRP中，优先级较高的路由器将成为主路由器(master)，负责转发虚拟IP地址的流量。通过提高优先级，您可以控制哪个路由器将成为主路由器(即主网关地址)。`
```
vrrp vrid 10 priority 120
```
配置虚拟网关的ip地址
```
vrrp vrid 11 virtual-ip 192.168.10.253
```
退出当前视图
```
quit
```
进入逻辑接口视图
```
int vlanif 20
```
配置逻辑接口的ip地址
```
ip address 192.168.20.1 24
```
配置虚拟网关的ip地址
```
vrrp vrid 20 virtual-ip 192.168.20.254
```
提高vrid 20的优先级
```
vrrp vrid 20 priority 120
```
配置虚拟网关的ip地址
```
vrrp vrid 21 virtual-ip 192.168.20.253
```
退出当前视图
```
quit
```
进入逻辑接口视图
```
int vlanif 30
```
配置逻辑接口的ip地址
```
ip address 192.168.30.1 24
```
配置虚拟网关的ip地址
```
vrrp vrid 30 virtual-ip 192.168.30.254
```
提高vrid 30的优先级
```
vrrp vrid 30 priority 120
```
配置虚拟网关的ip地址
```
vrrp vrid 31 virtual-ip 192.168.30.253
```
退出当前视图
```
quit
```
进入逻辑接口视图
```
int vlanif 40
```
配置逻辑接口的ip地址
```
ip address 192.168.40.1 24
```
配置虚拟网关的ip地址
```
vrrp vrid 40 virtual-ip 192.168.40.254
```
提高vrid 40的优先级
```
vrrp vrid 40 priority 120
```
配置虚拟网关的ip地址
```
vrrp vrid 41 virtual-ip 192.168.40.253
```
退出当前视图
```
quit
```
选择MSTP版本
```
stp mode mstp
```
进入MSTP协议视图
```
stp region-configuration
```
设置区域名称
```
region-name RG1
```
关联实例
将VLAN 10和VLAN 30关联到编号为1的实例
```
instance 1 vlan 10 30
```
将VLAN 20和VLAN 40关联到编号为2的实例
```
instance 2 vlan 20 40
```
激活区域
```
active region-configuration
```
退出当前视图
```
quit
```
配置实例优先级(**数字越小优先级越高，数字越大优先级越低**)  
这里优先使用实例1  
```
stp instance 1 priority 4096
```
```
stp instance 2 priority 8192
```
退出当前视图
```
quit
```
退出当前视图
```
quit
```
保存当前配置
```
save
```
输入 y 确认

SW2:  
进入系统视图
```
system-view
```
创建VLAN
```
vlan batch 10 20 30 40
```
进入接口组模式编号1
```
port-group 1
```
添加接口组成员
```
group-member g0/0/1 to g0/0/2
```
或不用事先指定接口组编号使用默认编号直接添加接口组成员
```
port-group group-member g0/0/1 to g0/0/2
```
将接口组1链路设置为Trunk模式
```
port link-type trunk
```
编辑允许所有VLAN通过
```
port trunk allow-pass vlan all
```
退出当前接口组1视图
```
quit
```
配置LSW1与LSW2的链路聚合
进入聚合接口组1
```
int Eth-Trunk 1
```
添加聚合端口
```
trunkport g 0/0/3 to 0/0/4
```
设置端口的链路类型为混合模式
```
port link-type hybrid
```
退出当前视图
```
quit
```
进入逻辑接口视图
```
int vlanif 10
```
配置逻辑接口的ip地址
```
ip address 192.168.10.2 24
```
配置虚拟网关的ip地址
```
vrrp vrid 10 virtual-ip 192.168.10.254
```
配置虚拟网关的ip地址
```
vrrp vrid 11 virtual-ip 192.168.10.253
```
提高vrid 11的优先级
```
vrrp vrid 11 priority 120
```
退出当前视图
```
quit
```
进入逻辑接口视图
```
int vlanif 20
```
配置逻辑接口的ip地址
```
ip address 192.168.20.1 24
```
配置虚拟网关的ip地址
```
vrrp vrid 20 virtual-ip 192.168.20.254
```
配置虚拟网关的ip地址
```
vrrp vrid 21 virtual-ip 192.168.20.253
```
提高vrid 21的优先级
```
vrrp vrid 21 priority 120
```
退出当前视图
```
quit
```
进入逻辑接口视图
```
int vlanif 30
```
配置逻辑接口的ip地址
```
ip address 192.168.30.1 24
```
配置虚拟网关的ip地址
```
vrrp vrid 30 virtual-ip 192.168.30.254
```
配置虚拟网关的ip地址
```
vrrp vrid 31 virtual-ip 192.168.30.253
```
提高vrid 31的优先级
```
vrrp vrid 31 priority 120
```
退出当前视图
```
quit
```
进入逻辑接口视图
```
int vlanif 40
```
配置逻辑接口的ip地址
```
ip address 192.168.40.1 24
```
配置虚拟网关的ip地址
```
vrrp vrid 40 virtual-ip 192.168.40.254
```
配置虚拟网关的ip地址
```
vrrp vrid 41 virtual-ip 192.168.40.253
```
提高vrid 41的优先级
```
vrrp vrid 41 priority 120
```
退出当前视图
```
quit
```
选择MSTP版本
```
stp mode mstp
```
进入MSTP协议视图
```
stp region-configuration
```
设置区域名称
```
region-name RG1
```
关联实例
将VLAN 10和VLAN 30关联到编号为1的实例
```
instance 1 vlan 10 30
```
将VLAN 20和VLAN 40关联到编号为2的实例
```
instance 2 vlan 20 40
```
激活区域
```
active region-configuration
```
退出当前视图
```
quit
```
配置实例优先级(数字越小优先级越高，数字越大优先级越低)
这里优先使用实例2
```
stp instance 1 priority 8192
```
```
stp instance 2 priority 4096
```
退出当前视图
```
quit
```
退出当前视图
```
quit
```
保存当前配置
```
save
```
输入 y 确认


SW3:
进入系统视图
```
system-view
```
创建VLAN
```
vlan batch 10 20 30 40
```
进入接口组模式编号1
```
port-group 1
```
添加接口组成员
```
group-member e0/0/1 to e0/0/2
```
将接口组1链路设置为Trunk模式
```
port link-type trunk
```
编辑允许所有VLAN通过
```
port trunk allow-pass vlan all
```
退出当前接口组1视图
```
quit
```
进入接口组模式编号2
```
port-group 2
```
添加接口组成员
```
group-member e0/0/3 to e0/0/6
```
将接口组2链路设置为Access模式
```
port link-type access
```
退出当前视图
```
quit
```
进入接口e0/0/3视图
```
int e0/0/3
```
配置默认VLAN为vlan 10
```
port default vlan 10
```
退出当前视图
```
quit
```
进入接口e0/0/4视图
```
int e0/0/4
```
配置默认VLAN为vlan 20
```
port default vlan 20
```
退出当前视图
```
quit
```
进入接口e0/0/5视图
```
int e0/0/5
```
配置默认VLAN为vlan 30
```
port default vlan 30
```
退出当前视图
```
quit
```
进入接口e0/0/6视图
```
int e0/0/6
```
配置默认VLAN为vlan 40
```
port default vlan 40
```
退出当前视图
```
quit
```
选择MSTP版本
```
stp mode mstp
```
进入MSTP协议视图
```
stp region-configuration
```
设置区域名称
```
region-name RG1
```
关联实例  
将VLAN 10和VLAN 30关联到编号为1的实例  
```
instance 1 vlan 10 30
```
将VLAN 20和VLAN 40关联到编号为2的实例  
```
instance 2 vlan 20 40
```
激活区域
```
active region-configuration
```
退出当前视图
```
quit
```
退出当前视图
```
quit
```
保存当前配置
```
save
```
输入 y 确认


LSW4:  
进入系统视图
```
system-view
```
创建VLAN
```
vlan batch 10 20 30 40
```
进入接口组模式编号1
```
port-group 1
```
添加接口组成员
```
group-member e0/0/1 to e0/0/2
```
将接口组1链路设置为Trunk模式
```
port link-type trunk
```
编辑允许所有VLAN通过
```
port trunk allow-pass vlan all
```
退出当前接口组1视图
```
quit
```
进入接口组模式编号2
```
port-group 2
```
添加接口组成员
```
group-member e0/0/3 to e0/0/6
```
将接口组2链路设置为Access模式
```
port link-type access
```
退出当前视图
```
quit
```
进入接口e0/0/3视图
```
int e0/0/3
```
配置默认VLAN为vlan 10
```
port default vlan 10
```
退出当前视图
```
quit
```
进入接口e0/0/4视图
```
int e0/0/4
```
配置默认VLAN为vlan 20
```
port default vlan 20
```
退出当前视图
```
quit
```
进入接口e0/0/5视图
```
int e0/0/5
```
配置默认VLAN为vlan 30
```
port default vlan 30
```
退出当前视图
```
quit
```
进入接口e0/0/6视图
```
int e0/0/6
```
配置默认VLAN为vlan 40
```
port default vlan 40
```
退出当前视图
```
quit
```
选择MSTP版本
```
stp mode mstp
```
进入MSTP协议视图
```
stp region-configuration
```
设置区域名称
```
region-name RG1
```
关联实例  
将VLAN 10和VLAN 30关联到编号为1的实例  
```
instance 1 vlan 10 30
```
将VLAN 20和VLAN 40关联到编号为2的实例
```
instance 2 vlan 20 40
```
激活区域
```
active region-configuration
```
退出当前视图
```
quit
```
退出当前视图
```
quit
```
保存当前配置
```
save
```
输入 y 确认  
测试阶段  
在LSW1和LSW2中分别配置回环接口的ip地址  
LSW1:  
进入回环接口  
```
int LoopBack 1
```
配置回环接口ip地址
```
ip address 10.10.10.1 24
```
这里最好保存一下配置  
LSW2:  
进入回环接口  
```
int LoopBack 1
```
配置回环接口ip地址
```
ip address 20.20.20.1 24
```
这里最好保存一下配置  
4台PC的网关配置为254，另外四台网关配置为253  
测试当一台交换机坏了(关闭LSW1或LSW2)测试是否还能实现通信  
测试结果能够实现通信  
![result](https://github.com/user-attachments/assets/ba1c3d93-e9bc-4681-aba0-b8188fff78de)



## [Loopback接口的作用](#Loopback接口的作用)
### 本地环回接口简介
- **定义**：本地环回接口（loopback address），亦称回送地址，是一种虚拟接口，广泛应用于几乎每台路由器上。
- **配置方法**：
```
interface loopback 0
ip address 1.1.1.1 32
```

### 本地环回接口的常见用途
1. **作为路由器的管理地址**
- **原因**：系统管理员为了方便管理，会为每台路由器创建一个loopback接口，并指定一个IP地址作为管理地址。管理员使用该地址远程登录（telnet）路由器。由于telnet使用TCP报文，若路由器某个接口故障down掉，其他接口仍可telnet，TCP连接依旧存在。因此，选择的telnet地址必须是永远也不会down掉的，而虚接口满足此类要求。loopback接口没有与对端互联互通的需求，为节约地址资源，其地址通常指定为32位掩码。
2. **作为协议的ID**
- **OSPF和BGP的router id**：动态路由协议OSPF和BGP在运行过程中需要指定一个Router id，作为路由器的唯一标识，并要求在整个自治系统内唯一。Router id是一个32位的无符号整数，与IP地址类似，且IP地址不会重复。loopback接口的IP地址通常被视为路由器的标识，因此成为router id的最佳选择。
3. **作为建立TCP连接的源地址**
- **BGP协议**：在BGP协议中，两个运行BGP的路由器之间建立邻居关系是通过TCP建立连接完成的。配置邻居时通常指定loopback接口为建立TCP连接的源地址（通常只用于IBGP），以增强TCP连接的健壮性。例如：
```
router id 61.235.66.1
interface loopback 0
ip address 61.235.66.1 255.255.255.255
router bgp 100
neighbor 61.235.66.7 remote-as 200
neighbor 61.235.66.7 update-source LoopBack0
```
4. **在Windows系统中**
- **本地环回地址**：采用127.0.0.1作为本地环回地址。
5. **BGP Update-Source**
- **作用**：Loopback口只要Router还健在，就会一直保持Active，只要BGP的Peer的Loopback口之间满足路由可达，就可以建立BGP会话。使用loopback口可以提高网络的健壮性。例如：
```
neighbor 215.17.1.35 update-source loopback 0
```
6. **Router ID**
- **OSPF和BGP的Router-ID**：使用loopback接口地址作为OSPF、BGP的Router-ID，作为路由器的唯一标识，并要求在整个自治系统内唯一。在IPv6中的BGP/OSPF的Router-ID仍然是32位的IP地址。OSPF中的路由器优先级是在接口下手动设置的，接着才是比较OSPF的Router-ID。OSPF和BGP中的Router-ID都可以手动在路由配置模式下设置。例如：
```
OSPF: Router-ID *.*.*.*
BGP: BGP Router-ID *.*.*.*
```
7. **IP Unnumbered Interfaces**
- **无编号地址**：可以借用强壮的loopback口地址，来节约网络IP地址的分配。例如：
```
interface loopback 0
ip address 215.17.3.1 255.255.255.255
!
interface Serial 5/0
bandwidth 128
ip unnumbered loopback 0
```
8. **Exception Dumps by FTP**
- **内核导出功能**：当Router宕机时，系统内存中的文件还保留着一份软件内核的备份，CISCO路由器可以被配置为向一台FTP服务器进行内核导出，作为路由器诊断和调试处理过程的一部分。这种内核导出功能必须导向一台没有运行公共FTP服务器软件的系统，而是一台通过ACLS过滤（TCP地址欺骗）被重点保护的只允许路由器访问的FTP服务器。如果Loopback口地址作为Router的源地址，并且是相应地址块的一部分，ACLS的过滤功能很容易配置。例如：
```
Sample IOS configuration:
ip ftp source-interface Loopback0
ip ftp username cisco
ip ftp password 7 045802150C2E
exception protocol ftp
exception dump 169.223.32.1
```
9. **TFTP-SERVER Access**
- **TFTP服务器配置**：对于TFTP的安全意味着应该经常对IP源地址进行安全方面的配置，CISCO IOS软件允许TFTP服务器被配置为使用特殊的IP接口地址，基于Router的固定IP地址，将运行TFTP服务器配置固定的ACLS。例如：
```
ip tftp source-interface Loopback0
```
10. **SNMP-SERVER Access**
- **SNMP网管数据**：路由器的Loopback口一样可以被用来对访问安全进行控制，如果从一个路由器送出的SNMP网管数据起源于Loopback口，则很容易在网络管理中心对SNMP服务器进行保护。例如：
```
Sample IOS configuration:
access-list 98 permit 215.17.34.1
access-list 98 permit 215.17.1.1
access-list 98 deny any
!
snmp-server community 5nmc02m RO 98
snmp-server trap-source Loopback0
snmp-server trap-authentication
snmp-server host 215.17.34.1 5nmc02m
snmp-server host 215.17.1.1 5nmc02m.Wednesday, June 06, 2001
```
11. **TACACS/RADIUS-Server Source Interface**
- **TACACS协议**：
```
aaa new-model
aaa authentication login default tacacs+ enable
aaa authentication enable default tacacs+ enable
aaa accounting exec start-stop tacacs+
!
ip tacacs source-interface Loopback0
tacacs-server host 215.17.1.2
tacacs-server host 215.17.34.10
tacacs-server key CKr3t#
!
```
- **RADIUS协议**：
```
radius-server host 215.17.1.2 auth-port 1645 acct-port 1646
radius-server host 215.17.34.10 auth-port 1645 acct-port 1646
ip radius source-interface Loopback0
!
```
12. **NetFlow Flow-Export**
- **流量数据传送**：从一个路由器向NetFlow采集器传送流量数据，以实现流量分析和计费目的，将路由器的Router的Loopback地址作为路由器所有输出流量统计数据包的源地址，可以在服务器或者是服务器外围提供更精确，成本更低的过滤配置。例如：
```
ip flow-export destination 215.17.13.1 9996
ip flow-export source Loopback0
ip flow-export version 5 origin-as
!
interface Fddi0/0/0
des cription FDDI link to IXP
ip address 215.18.1.10 255.255.255.0
ip route-cache flow
ip route-cache distributed
no keepalive
!
```
13. **NTP Source Interface**
- **NTP时钟同步**：NTP用来保证一个网络内所有Router的时钟同步，确保误差在几毫秒之内。如果在NTP的Speaker之间采用Loopback地址作为路由器的源地址，会使得地址过滤和认证在某种程度上容易维护和实现。例如：
```
clock timezone SST 8
!
access-list 5 permit 192.36.143.150
access-list 5 permit 169.223.50.14
!.Cisco ISP Essentials
39
ntp authentication-key 1234 md5 104D000A0618 7
ntp authenticate
ntp trusted-key 1234
ntp source Loopback0
ntp access-group peer 5
ntp update-calendar
ntp peer 192.36.143.150
ntp peer 169.223.50.14
!
```

14.  **SYSLOG Source Interface**
- **系统日志服务器保护**：系统日志服务器同样也需要在ISP骨干网络中被妥善保护。许多ISP只希望采集他们自己的而不是外面网络发送来的系统日志信息。对系统日志服务器的DDOS攻击并不是不知道，如果系统信息数据包的源地址来自于被很好规划了的地址空间，例如，采用路由器的Loopback口地址，对系统日志服务器的安全配置同样会更容易。例如：
```
A configuration example:
logging buffered 16384
logging trap debugging
logging source-interface Loopback0
logging facility local7
logging 169.223.32.1
!
```

15.  **Telnet to the Router**
- **远程路由器接入**：远程路由器才用Loopback口做远程接入的目标接口，这个一方面提高网络的健壮性，另一方面，如果在DNS服务器做了Router的DNS映射条目，则可以在世界上任何路由可达的地方Telnet到这台Router，ISP会不断扩展，增加新的设备。由于telnet命令使用TCP报文，会存在如下情况：路由器的某一个接口由于故障down掉了，但是其他的接口却仍旧可以telnet，也就是说，到达这台路由器的TCP连接依旧存在。所以选择的telnet地址必须是永远也不会down掉的，而虚接口恰好满足此类要求。由于此类接口没有与对端互联互通的需求，所以为了节约地址资源，loopback接口的地址通常指定为32位掩码。例如：
```
; net.galaxy zone file
net.galaxy. IN SOA ns.net.galaxy. hostmaster.net.galaxy. (
1998072901 ; version == date(YYYYMMDD)+serial
10800 ; Refresh (3 hours)
900 ; Retry (15 minutes)
172800 ; Expire (48 hours)
43200 ) ; Mimimum (12 hours)
IN NS ns0.net.galaxy.
IN NS ns1.net.galaxy.
IN MX 10 mail0.net.galaxy.
IN MX 20 mail1.net.galaxy.
;
localhost IN A 127.0.0.1
gateway1 IN A 215.17.1.1
gateway2 IN A 215.17.1.2
gateway3 IN A 215.17.1.3
;
;etc etc
; 1.17.215.in-addr.arpa zone file
;
1.17.215.in-addr.arpa. IN SOA ns.net.galaxy. hostmaster.net.galaxy. (
1998072901 ; version == date(YYYYMMDD)+serial
10800 ; Refresh (3 hours)
900 ; Retry (15 minutes)
172800 ; Expire (48 hours)
43200 ) ; Mimimum (12 hours)
IN NS ns0.net.galaxy.
IN NS ns1.net.galaxy.
1 IN PTR gateway1.net.galaxy.
2 IN PTR gateway2.net.galaxy..Wednesday, June 06, 2001
3 IN PTR gateway3.net.galaxy.
;
;etc etc
On the router, set the telnet source to the loopback interface:
ip telnet source-interface Loopback0
```

16.  **RCMD to the router**
- **RCMD连接**：RCMD要求网络管理员拥有UNIX的rlogin/rsh客户端来访问路由器。某些ISP采用RCMD来捕获接口统计信息，上载或下载路由器配置文件，或者获取Router路由选择表的简易信息，Router可以被配置采用Loopback地址作为源地址，使得路由器发送的所有数据包的源地址都采用Loopback地址来建立RCMD连接。例如：
```
ip rcmd source-interface Loopback0
```



## [路由协议](#路由协议)
**简介**：  
路由（Routing）是数据通信网络中一个基本的概念。路由就是通过互联的网络把信息从源地址传输到目的地址的活动。路由发生在OSI网络参考模型中的第三层（即网络层）。我们将具有路由转发功能的设备称为广义上的路由器  
当路由器收到一个IP数据包，路由器会根据目的IP地址在设备上的路由表（Routing Table）中进行查找，找到“最匹配”的路由条目后，将数据包根据路由条目所指示的出接口或下一跳IP转发出去。路由表中装载着路由器通过各种途径获知的路由条目（Routes）。路由器可通过静态、动态等方式获取路由条目并维护自己的路由表  

**什么是路由协议**：  
较小的网络通常可以手动设置路由表（即静态方式），但较大且拥有复杂拓扑的网络可能常常变化，若要手动创建、维护路由表是不切实际的。因此，人们希望路由器可以动态的（即动态方式）按照某种协议来自动创建维护路由表以解决这个问题，从而使得网络能够近自主的适应变化，避免故障。这些协议被称为路由协议  

**路由协议的分类**：
路由协议可以有多种分类方式，常见的分类方式如下：  
按照路由协议使用的算法分：  
- 距离矢量路由协议，例如：RIP（Routing Information Protocol）
- 链路状态路由协议，例如：OSPF（Open Shortest Path First）
按照路由协议作用的区域划分：  
- 内部网关协议（Interior Gateway Protocol），在单一的自治系统中交换路由信息，例如：OSPF（Open Shortest Path First）
- 外部网关协议（Exterior Gateway Protocol），在不同的自治系统中交换路由信息，例如：BGP（Border Gateway Protocol）

**常见的路由协议有哪些**  
目前常用的路由协议有：  
- OSPF（Open Shortest Path First）
- RIP（Routing Information Protocol）
- IS-IS（Intermediate System to Intermediate System）
- BGP（Border Gateway Protocol）
其中，最多被使用到的路由协议为 OSPF 和 BGP  

**路由迭代**：  
路由必须有直连的下一跳才能够指导转发，但是路由生成时下一跳可能不是直连的，因此需要计算出一个直连的下一跳和对应的出接口，这个过程就叫做路由迭代。BGP路由、静态路由和UNR路由的下一跳都有可能不是直连的，都需要进行路由迭代  
例如，BGP路由的下一跳一般是非直连的对端loopback地址，不能指导转发，需要进行迭代。即根据以BGP学习到的下一跳为目的地址在IP路由表中查找，当找到一条具有直连的下一跳、出接口信息的路由后（一般为一条IGP路由），将其下一跳、出接口信息填入这条BGP路由的IP路由表中并生成对应的FIB表项  
对于BGP私网路由，需要隧道进行转发，路由的下一跳一般是远端PE的Loopback地址，不能指导转发，也需要进行路由迭代，即在隧道列表中查找到达该Loopback地址的隧道，将该隧道信息填入路由表中并生成对应的FIB表项  

**路由器及路由基本原理**：  
在因特网中，网络连接设备用来控制网络流量和保证网络数据传输质量。常见的网络连接设备有集线器（Hub）、网桥（Bridge）、交换机（Switch）和路由器（Router）。这些设备的基本原理类似，下面就以路由器为例来介绍一下设备的基本原理  
路由器是一种典型的网络连接设备，用来进行路由选择和报文转发。路由器根据收到报文的目的地址选择一条合适的路径（包含一个或多个路由器的网络），然后将报文传送到下一个路由器，路径终端的路由器负责将报文送交目的主机  
路由就是报文从源端到目的端的路径。当报文从路由器到目的网段有多条路由可达时，路由器可以根据路由表中最佳路由进行转发。最佳路由的选取与发现此路由的路由协议的优先级、路由的度量有关。当多条路由的协议优先级与路由度量都相同时，可以实现负载分担，缓解网络压力；当多条路由的协议优先级与路由度量不同时，可以构成路由备份，提高网络的可靠性  

**静态路由与动态路由**：  
静态路由与动态路由的区别  
路由协议是路由器之间维护路由表的规则，用于发现路由，生成路由表，并指导报文转发。依据来源的不同，路由可以分为三类：  
- 通过链路层协议发现的路由称为直连路由
- 通过网络管理员手动配置的路由称为静态路由
- 通过动态路由协议发现的路由称为动态路由  
静态路由配置方便，对系统要求低，适用于拓扑结构简单并且稳定的小型网络。缺点是不能自动适应网络拓扑的变化，需要人工干预  
动态路由协议有自己的路由算法，能够自动适应网络拓扑的变化，适用于具有一定数量三层设备的网络。缺点是配置对用户要求比较高，对系统的要求高于静态路由，并将占用一定的网络资源和系统资源  

**动态路由的分类**：  
对动态路由协议的分类可以采用以下不同标准：  
根据作用范围不同，路由协议可分为：  
- 内部网关协议IGP（Interior Gateway Protocol）：在一个自治系统内部运行。常见的IGP协议包括RIP、OSPF和IS-IS
- 外部网关协议EGP（Exterior Gateway Protocol）：运行于不同自治系统之间。BGP是目前最常用的EGP协议
根据使用算法不同，路由协议可分为：  
- 距离矢量协议（Distance-Vector Protocol）：包括RIP和BGP。其中，BGP也被称为路径矢量协议（Path-Vector Protocol）
- 链路状态协议（Link-State Protocol）：包括OSPF和IS-IS
以上两种算法的主要区别在于发现路由和计算路由的方法不同  

**路由表和FIB表**：  
路由器转发数据包的关键是路由表和FIB表，每个路由器都至少保存着一张路由表和一张FIB（Forwarding Information Base）表。路由器通过路由表选择路由，通过FIB表指导报文进行转发  

**路由协议的优先级**：  
对于相同的目的地，不同的路由协议（包括静态路由）可能会发现不同的路由，但这些路由并不都是最优的。事实上，在某一时刻，到某一目的地的当前路由仅能由唯一的路由协议来决定。为了判断最优路由，各路由协议（包括静态路由）都被赋予了一个优先级，当存在多个路由信息源时，具有较高优先级（取值较小）的路由协议发现的路由将成为最优路由，并将最优路由放入本地路由表中  
路由器分别定义了外部优先级和内部优先级。其中，0表示直接连接的路由，255表示任何来自不可信源端的路由；数值越小表明优先级越高。外部优先级是指用户可以手工为各路由协议配置的优先级，缺省情况下如表所示：  
**路由协议缺省时的外部优先级**  
| 路由协议类型 | 外部优先级 |
|--------------|------------|
| Direct       | 0          |
| OSPF         | 10         |
| IS-IS        | 15         |
| Static       | 60         |
| RIP          | 100        |
| OSPF ASE     | 150        |
| OSPF NSSA    | 150        |
| IBGP         | 255        |
| EBGP         | 255        |

**路由协议内部优先级**  
路由协议的内部优先级则不能被用户手工修改  
| 路由协议类型    | 内部优先级 |
|-----------------|------------|
| Direct          | 0          |
| OSPF            | 10         |
| IS-IS Level-1   | 15         |
| IS-IS Level-2   | 18         |
| Static          | 60         |
| RIP             | 100        |
| OSPF ASE        | 150        |
| OSPF NSSA       | 150        |
| IBGP            | 200        |
| EBGP            | 20         |

**路由的度量**  
路由的度量标示出了这条路由到达指定的目的地址的代价，通常以下因素会影响到路由的度量  
- 路径长度  
路径长度是最常见的影响路由度量的因素。链路状态路由协议可以为每一条链路设置一个链路开销来标示此链路的路径长度。在这种情况下，路径长度是指经过的所有链路的链路开销的总和。距离矢量路由协议使用跳数来标示路径长度。跳数是指数据从源端到目的端所经过的设备数量。例如，路由器到与它直接相连网络的跳数为0，通过一台路由器可达的网络的跳数为1，其余以此类推  
- 网络带宽  
网络带宽是一个链路实际的传输能力。例如，一个10千兆的链路要比1千兆的链路更优越。虽然带宽是指一个链路能达到的最大传输速率，但这不能说明在高带宽链路上路由要比低带宽链路上更优越。比如说，一个高带宽的链路正处于拥塞的状态下，那报文在这条链路上转发时将会花费更多的时间  
- 负载  
负载是一个网络资源的使用程度。计算负载方法包括CPU的利用率和它每秒处理数据包的数量。持续监测这些参数可以及时了解网络的使用情况  
- 通信开销  
通信开销衡量了一条链路的运营成本。尤其是只注重运营成本而不在乎网络性能的时候，通信开销则就成了一个重要的指标  

**路由的收敛**  
路由收敛是指网络拓扑变化引起的通过重新计算路由而发现替代路由的行为。随着网络的融合，区分服务的需求越来越强烈。某些路由可能指导关键业务的转发，如VoIP，视频会议、组播等，这些关键的业务路由需要尽快收敛，而非关键路由可以相对慢一点收敛。因此，系统需要对不同路由按不同的收敛优先级处理，来提高网络可靠性  
按优先级收敛是指系统为路由设置不同的收敛优先级，分为critical、high、medium、low四种。系统根据这些路由的收敛优先级采用相对的优先收敛原则，即按照一定的调度比例进行路由收敛安装，指导业务的优先转发  
**缺省时的公网路由收敛优先级**  
| 路由协议或路由种类              | 收敛优先级 |
|---------------------------------|------------|
| Direct                          | high       |
| Static                          | medium     |
| OSPF和IS-IS的32位主机路由       | medium     |
| OSPF（除32位主机路由外）        | low        |
| IS-IS（除32位主机路由外）       | low        |
| RIP                             | low        |
| BGP                             | low        |

**自治系统**  
AS号的分类及其取值范围  
| AS号的类别 | 2字节AS号范围         | 4字节AS号范围                     |
|------------|-----------------------|-----------------------------------|
| 公有AS号   | 1～64511              | 1～64511, 65536～4294967295       |
| 私有AS号   | 64512～65535          | 64512～65535                      |

## [默认路由与静态路由](#默认路由与静态路由)
### 配置默认路由:  
```
ip route-static 0.0.0.0 0.0.0.0 <下一跳地址>
```  

### 配置静态路由:  
```
ip route-static <目的网络地址.0结尾的> <子网掩码/网络号24> <下一跳地址>
```  

## [RIP路由](#RIP路由)
RIP是一种基于距离矢量的算法协议，它使用跳数作为度量值来衡量到达目的地址的距离，于它直连的网络跳数为0，通过一个设备可达的网络的跳数为1  
RIP不能在大型网络中得到应用  
特点：仅和相邻路由器交换信息  
### RIP基本命令
1. 进入RIP进程配置模式
```
rip
```
2. 网络声明
```
network [ip address]
```
在RIP中声明直连的网络段，使能这些网段上的接口参与RIP路由协议    
3. 配置RIP版本
- 配置RIP2
启用 RIP 默认 v1
```
rip
version 2
network [ip address]
```
或者写成
```
rip 1
version 2
network [ip address]
```
这些命令用于配置路由器使用RIP版本2，RIPv2支持CIDR和VLSM，允许更灵活的路由汇总  
4. 查看 rip
```
disp rip
```
5. 查看 rip 数据库
```
disp rip <进程号> database
```
6. 查看路由表
```
disp ip routing-table
```
7. 配置RIPv2自动汇总路由
- 方法1：
```
rip 1
version 2
summary always
```
- 方法2：
```
int [接口]
undo rip split-horizon
```
关闭水平分割功能，允许自动汇总路由  
8. 配置RIPv2手动汇总
```
int [接口]
rip summary-address 3.3.0.0 255.255.252.0
```  
9. RIP与不连续子网（解决不连续子网问题）  
- 方法1：给接口配置第二个IP地址  
```
int [接口]
ip address 10.0.23.2 sub
```
- 方法2：使用RIPv2，关闭自动汇总
```
rip
version 2
undo summary
```
关闭自动汇总，关闭水平分割功能，开启毒性逆转功能，增加度量值  

10. 查看RIP定期更新情况
```
debugging rip 1
```
开启RIP调试，查看RIP协议的定期更新情况  
11. 调试信息显示设置
```
terminal debugging
terminal monitor
```
这些命令用于在屏幕上显示调试信息  
12. 关闭debug调试功能
```
undo debugging rip 1
undo debug all
```
13. 查看RIP配置信息
```
disp default-parameter rip
```

### Rip路由引入  
- 引入不同进程号的RIP路由  
不同进程号的路由表是不一样的以下使用rip 10, rip 20进行演示(一般是边界路由的配置)
```
rip 10
import-route rip 20
rip 20
import-route rip 10
```
- 引入直连路由
```
rip
import-route direct
```
- 引入静态路由
```
rip
import-route static
```
- 引入OSPF路由
```
import-route ospf
```
- 引入BGP路由
```
import-route bgp
```
- 引入ISIS路由到RIP实例
```
import-route isis
```
- 引入User Network Route（Unr）到RIP实例
```
import-route unr
```

#### 配置RIP定时器和优先级  
- 停止发送RIP路由更新
```
int [接口]
undo rip output
```
- 检查RIP发布数据库中的所有路由激活
```
display rip 1 database
```
- 设置RIP定时器
```
rip
timers rip 20 120 60
```
- 修改RIP协议优先级
```
rip
preference 90
```
#### 配置抑制接口
```
rip 1
silent-interface GigabitEthernet 0/0/0
```
设置要抑制的接口，不通过该接口发送或接收RIP更新  
#### 配置RIP单播更新
```
rip 1
peer 172.16.1.100
```
配置RIP单播更新，指定邻居路由器的IP地址  

#### 配置RIP版本兼容  
首先将rip的版本设置为version 2
```
rip
version 2
```
进入接口模式
```
int <接口>
```
配置RIP版本2以广播或多播方式发送更新
```
rip version 2 broadcast
```
或者
```
rip version 2 multicast
```

#### 配置RIP认证
进入接口模式
```
int <接口>
```
配置rip简单认证
```
rip authentication-mode simple <password>
```
配置RIPv2 MD5密文验证
```
rip authentication-mode md5 usual <password>
```
配置hmac-sha256密文验证
```
rip authentication-mode hmac-sha256 <password>
```
认证的目的是为了实现抓包时明文不可见



## [OSPF路由协议](#OSPF路由协议)
### DR和BDR
- DR（Designated Router） **指定路由器**  
- BDR（Backup Designated Router） **备份指定路由器**  

DR和BDR可以减少邻接关系的数量，从而减少链路状态信息以及路由信息的交换次数，这样可以节省带宽，降低对路由器处理能力的压力。一个既不是DR也不是BDR的路由器只与DR和BDR形成邻接关系并交换链路状态信息以及路由信息，这样就大大减少了大型广播型网络和NBMA网络中的邻接关系数量  
BDR在DR发生故障时接管业务，一个广播网络上所有路由器都必须同BDR建立邻接关系  

**不使用 DR & BDR 建立邻接关系**  
![DR BDR1](https://github.com/user-attachments/assets/d07db144-d5f6-4b34-9645-35aabe9b51d3)  
不使用 DR&BDR我们需要建立10个邻接关系(有几条线就有几个邻接关系)  

**使用 DR & BDR 建立邻接关系**  
![DR BDR2](https://github.com/user-attachments/assets/ff907b15-8653-4117-91a4-19cb80096291)  
使用DR&BDR我们只需要建立7个邻接关系，这种差距会随着路由器数量的增加变得更加明显  

### 选举规则
路由器会根据参与选举的每个接口的优先级进行DR选举，优先级取值范围为0-255，值越高越优先。缺省情况下，接口优先级为1。如果一个接口优先级为0，那么该接口将不会参与DR或者BDR的选举。如果优先级相同时，则比较Router ID，值越大越优先被选举为DR  

#### 根据router-id选举
![router-id选举](https://github.com/user-attachments/assets/42104f3f-cf8c-41a4-ae26-f5d2cea7960b)  

**在每个路由器上配置OSPF**  
ospf默认的进程号为 `1`，即：
<pre>ospf 与 ospf 1 是一个意思</pre>  

**R1**  
```
sys
int g0/0/0
ip address 192.168.0.1 24
quit
ospf router-id 1.1.1.1
area 0
network 192.168.0.0 0.0.0.255
quit
quit
```
**R2**  
```
sys
int g0/0/0
ip address 192.168.0.2 24
q
ospf router-id 2.2.2.2
area 0
network 192.168.0.0 0.0.0.255
quit
quit
```
保存一下：
```
save
```
**y**  
重启后查看DR和BDR（先等待R1和R2建立完邻接关系）
```
display ospf peer
```
![DR BDR3](https://github.com/user-attachments/assets/72ed8f2e-09e9-414d-b7b8-958667bd140b)  
因为R1和R2接口的优先级相同，所以根据router-id来选举，因为R2的router-id大于R1的router-id，所以R2被选举为DR  

**根据优先级选举**  
还是借助上面的配置，因为R2的router-id大于R1的router-id，所以R2的接口被选举为DR，现在我们改变一下两个路由器接口的优先级，再重新选举DR&BDR

#### 配置接口优先级
将路由器`R1`的 `g0/0/0` 接口的优先级改为`20`
```
sys
interface GigabitEthernet 0/0/0
ospf dr-priority 20
quit
```
将路由器`R2`的 `g0/0/0` 接口的优先级改为`10`
```
sys
interface GigabitEthernet 0/0/0
ospf dr-priority 10
quit
```
保存两个路由器的配置，然后重启  
保存一下：
```
save
```
**y**  
重启后查看DR&BDR（先等待R1和R2建立完邻接关系）
```
display ospf peer
```
![DR BDR4](https://github.com/user-attachments/assets/55ad9758-01c1-4a5c-9c4c-230c6bd2ad46)  
***这里需要重启一下两边的设备才能生效当前的配置***  
虽然R2的router-id大于R1的router-id，但是路由器会先根据接口的优先级进行选举，因为`R1`接口g0/0/0的优先级比`R2`接口g0/0/0的优先级高（**值越大优先级越高**），所以`R1的g0/0/0`接口被选举为DR  


### OSPF区域
重点内容：  
**ospf中不同区域之间是自动同步路由表的但是不同进程之间的路由表是相互独立的所以需要进行进程之间的路由重发布才能实现相互通信**  

#### 骨干区域
当网络中包含多个区域时，OSPF 协议有特殊的规定，即其中必须有一个 Area 0，通常也叫做骨干区域（Backbone Area），当设计 OSPF 网络时，一个很好的方法就是从骨干区域开始，然后再扩展到其他区域。骨干区域在所有其他区域的中心，即所有区域都必须与骨干区域物理或逻辑上相连，这种设计思想的原因是 OSPF 协议要把所有区域的路由信息引入骨干区，然后再依次将路由信息从骨干区域分发到其它区域中。OSPF 中划分区域的目的就是在于控制链路状态信息LSA 泛洪的范围、减小链路状态数据库LSDB的大小、改善网络的可扩展性、达到快速地收敛  
也就是说，非骨干区域之间不能直接进行通信，必须先将信息发送到区域0，然后再通过区域0发送到目标区域，如下图：如果区域1想要和区域2进行通信，必须先将信息发送到区域0，然后再通过区域0转发到区域2，从而实现两者之间的通信  
![ggaea1](https://github.com/user-attachments/assets/8063d7f7-f77e-430b-89a4-a0d8a23b7748)  

但是如果我们把区域0的位置调换一下，区域1访问区域2，区域1将信息发送给区域0，区域0却无法将信息转发给区域2，所以此时区域1和区域2是无法进行通信的，**所以在设置区域时，一定要把区域0放到中心的位置，保证每个区域都能和区域0相连**  
![ggarea2](https://github.com/user-attachments/assets/5f3093ed-b866-4f3b-9883-f62d61038705)  

#### 单区域配置
- 单区域含义：  
整个链路中，所有开启了OSPF协议的路由器都处在同一区域中  
- 结构图  
![area1](https://github.com/user-attachments/assets/890323b9-a5a4-4c2f-b5fc-7b58e6930c66)   

***实现目标：在路由器R1,R2,R3中使用OSPF协议实现位于不同网段中的主机PC1,PC2,PC3之间能够互相访问***  
**配置**：  
**R1**  
```
sys
interface GigabitEthernet 0/0/0
ip address 192.168.0.1 24
quit
interface GigabitEthernet 0/0/1
ip address 192.168.1.1 24
quit
ospf router-id 1.1.1.1
area 1
network 192.168.0.0 0.0.0.255
network 192.168.1.0 0.0.0.255
quit
```
router-id 唯一标识开启了OSPF协议的路由器  
在使用 network 命令通告路由信息时，格式为：
```
network <通告的IP地址网段> <IP地址反子网掩码>
```

**R2**  
```
sys
interface GigabitEthernet 0/0/0
ip address 192.168.2.1 24
quit
interface GigabitEthernet 0/0/1
ip address 192.168.1.2 24
quit
interface GigabitEthernet 0/0/2
ip address 192.168.3.1 24
quit
ospf router-id 2.2.2.2
area 1
network 192.168.1.0 0.0.0.255
network 192.168.2.0 0.0.0.255
network 192.168.3.0 0.0.0.255
quit
```
**R3** 
```
sys
interface GigabitEthernet 0/0/0
ip address 192.168.4.1 24
quit
interface GigabitEthernet 0/0/2
ip address 192.168.3.2 24
quit
ospf router-id 3.3.3.3
area 1
network 192.168.3.0 0.0.0.255
network 192.168.4.0 0.0.0.255
quit
```
查看路由表信息（以R1为例）  
执行命令：
```
display ip routing-table
```

#### 多区域配置
- 多区域含义：  
整个链路中，所有开启了OSPF协议的路由器分别处在多个不同的区域中  
- 结构图  
![ospfduo](https://github.com/user-attachments/assets/99ba9358-1090-4443-af81-0f07ffd25e48)  

***实现目标：在路由器R1,R2,R3中使用OSPF协议实现位于不同网段中的主机PC4,PC5,PC6之间能够互相访问***  
**配置**：  
**R1**  
```
sys
interface GigabitEthernet 0/0/0
ip address 192.168.0.1 24
quit
interface GigabitEthernet 0/0/1
ip address 192.168.1.1 24
quit
ospf router-id 1.1.1.1
area 0
network 192.168.0.0 0.0.0.255
network 192.168.1.0 0.0.0.255
quit
```
**R2**  
```
sys
interface GigabitEthernet 0/0/0
ip address 192.168.2.1 24
quit
interface GigabitEthernet 0/0/1
ip address 192.168.1.2 24
quit
interface GigabitEthernet 0/0/2
ip address 192.168.3.1 24
quit
ospf router-id 2.2.2.2
area 0
network 192.168.1.0 0.0.0.255
network 192.168.2.0 0.0.0.255
quit
area 1
network 192.168.3.0 0.0.0.255
quit
```
因为R2同时处于区域0和区域1，所以称R2为"边界路由"，**边界路由的配置规则是：接口处于哪个区域就在哪个区域进行通告，处于区域之间的接口，放在哪个区域都可以，但最好放在区域0当中，也就是能放到骨干区域的就放到骨干区域**  
**R3** 
```
sys
interface GigabitEthernet 0/0/0
ip address 192.168.4.1 24
quit
interface GigabitEthernet 0/0/2
ip address 192.168.3.2 24
quit
ospf router-id 3.3.3.3
area 1
network 192.168.3.0 0.0.0.255
network 192.168.4.0 0.0.0.255
quit
```
查看路由表信息（以R3为例）  
执行命令：
```
display ip routing-table
```

#### OSPF多进程路由重发布
不同进程之间需要互相在各自进程中发布对方进程号才能实现通信  
拓扑图：  
![ospfbtjc](https://github.com/user-attachments/assets/f3057065-31e9-4ffc-b8ad-22ae3b6a6208)  
**R1**:
```
sys
int g0/0/0
ip address 192.168.0.1 24
quit
ospf 1 router-id 1.1.1.1
area 0
network 192.168.0.0 0.0.0.255
quit
```
**R2(边界路由)**:
```
sys
int g0/0/0
ip address 192.168.0.2 24
int g0/0/1
ip address 192.168.1.1 24
quit
ospf 1 router-id 2.2.2.2
area 0
network 192.168.0.0 0.0.0.255
import-route ospf 2
quit
ospf 2 router-id 2.2.2.2
area 1
network 192.168.1.0 0.0.0.255
import-route ospf 1
quit
```
**R3**:
```
sys
int g0/0/1
ip address 192.168.1.2 24
quit
ospf 2 router-id 3.3.3.3
area 1
network 192.168.1.0 0.0.0.255
quit
```
### 路由引入
引入不同进程号的 OSPF 路由
```
# 在 OSPF 进程 1 中引入 OSPF 进程 2 的路由
ospf 1
import-route ospf 2
quit

# 在 OSPF 进程 2 中引入 OSPF 进程 1 的路由
ospf 2
import-route ospf 1
quit
```
引入直连路由
```
ospf [进程号]
import-route direct
quit
```
引入静态路由
```
ospf [进程号]
import-route static
quit
```
引入 RIP 路由
```
ospf [进程号]
import-route rip
quit
```
引入 BGP 路由
```
ospf [进程号]
import-route bgp
quit
```
引入 ISIS 路由
```
ospf [进程号]
import-route isis
quit
```
引入 User Network Route（UNR）到 OSPF 进程
```
ospf [进程号]
import-route unr
quit
```
注意事项  
- 进程号：替换为实际的 OSPF 进程号。
- 路由类型：根据需要引入的路由类型选择相应的命令。
- 标签（Tag）：如果需要，可以在引入路由时添加 tag 参数，例如 `import-route ospf 2 tag 10` 以便在路由表中标识这些路由



## [BFD技术](#BFD技术)
BFD概述  
BFD（Bidirectional Forwarding Detection）即双向转发检测，是一种用于检测两个转发点之间故障的网络协议。它提供了一种轻量级的、快速检测链路或者路径故障的机制  
工作方式：BFD 在两个系统（通常是网络设备，如路由器、交换机等）之间建立会话，通过发送和接收检测报文来监控链路的状态。这两个系统会周期性地互相发送 BFD 报文，就像互相发送 “心跳信号” 一样。如果在规定的时间内没有收到对方的 BFD 报文，就会认为链路出现故障  
概述：毫秒级链路故障检查，通常结合三层协议（如静态路由、vrrp、 rip、 ospf、 BGP等）实现链路故障快速切换  
作用：>  
- 检测二层非直连故障
- 加快三层协议收敛

### 静态路由联动BFD
（1）R1和R2两个设备直连，当一端链路出现故障，例如断开G0/0/0接口的链路，那么数据的转发会切换到G0/0/1接口进行转发： 
![sbfd1](https://github.com/user-attachments/assets/19548387-5a3a-44c0-92d5-24bdef01b10b)  
**R1**：
```
sys
sysname R1
undo info-center enable
interface GigabitEthernet0/0/0
ip address 12.1.1.1 255.255.255.0
interface GigabitEthernet0/0/1
ip address 21.1.1.1 255.255.255.0
interface LoopBack0
ip address 1.1.1.1 255.255.255.0
quit
```
**将路由优先级改为50 设置为优选路径**
```
ip route-static 2.2.2.0 255.255.255.0 12.1.1.2 preference 50
ip route-static 2.2.2.0 255.255.255.0 21.1.1.2
```

**R2**：
```
sys
sysname R2
undo info-center enable
interface GigabitEthernet0/0/0
ip address 12.1.1.2 255.255.255.0
interface GigabitEthernet0/0/1
ip address 21.1.1.2 255.255.255.0
interface LoopBack0
ip address 2.2.2.2 255.255.255.0
quit
ip route-static 1.1.1.0 255.255.255.0 12.1.1.1 preference 50
ip route-static 1.1.1.0 255.255.255.0 21.1.1.1
```

检查1.1.1.1是否经过G0/0/0接口转发，访问2.2.2.2  
**R1**：
```
tracert  2.2.2.2
```
![sbfd2](https://github.com/user-attachments/assets/68aa3764-48d0-4bf1-ac01-b6a56d190bf7)  

接下来在R1上对2.2.2.2进行长ping模拟断开g0/0/0接口的链路，观察变化  
**R1**：
```
ping -c 1000 -a 1.1.1.1 2.2.2.2
```
以1.1.1.1 为源地址ping 2.2.2.2次数1000次  
![sbfd3](https://github.com/user-attachments/assets/6956564f-5a5c-40b1-ad12-eb10792cdc40)  
![sbfd4](https://github.com/user-attachments/assets/a61cdbe4-a3ed-4514-bf80-77adebf5e630)  
![sbfd5](https://github.com/user-attachments/assets/de8058ab-2815-4038-8631-7e28a967bbb3)  
上图结果可以看到，在直连的情况下，互为备份的两条链路，有一条出现断开之后，另一条可以快速接管进行数据的转发

（2）R1和R2两个设备非直连，当一端链路出现故障，例如SW与R2互连链路断开，数据的转发无法切换过来，因为R1的G0/0/0接口还是UP状态。不同于直连时的情况G0/0/0接口是Down的状态，因此会切换过去：  
![sbfd6](https://github.com/user-attachments/assets/4455cf86-7cc4-477f-9a97-6e2ae65996a0)  

接下来在R1上对2.2.2.2进行长ping模拟断开SW与R2互连的链路，观察变化  
**R1**：
```
ping -c 1000 -a 1.1.1.1 2.2.2.2
```
以1.1.1.1 为源地址ping 2.2.2.2次数1000次  
![sbfd7](https://github.com/user-attachments/assets/12ac47f1-017f-4deb-b7ba-63120ba789e4)  
![sbfd8](https://github.com/user-attachments/assets/f71aade8-0075-4d84-9600-f2c349f27c4f)  
![sbfd9](https://github.com/user-attachments/assets/5383a1f0-a651-4b6c-b603-58568f2be9ee)  

通过`dis ip routing-table protocol static`查看路由表协议信息，静态路由中去往2.2.2.0的下一跳还是12.1.1.2，而SW与R2互连的链路已经断开，R1无法感知到链路断开，因此始终无法进行切换备份链路  
由此引出BFD技术，运用在非直连的情况，使得链路故障快速恢复，切换到备份转发


### 静态路由联动静态BFD
**配置静态BFD**  
**R1**：  
全局使能bfd
```
sys
bfd
bfd aa bind peer-ip 12.1.1.2 source-ip 12.1.1.1
```
本地标识 两台路由器的标识需要互为对称
```
discriminator local 1
```
对端标识
```
discriminator remote 2
```
比如说R1的本地标识设置为1了，那么在R2设置的对端标识要为1，互为对称  
在R1设置了对端标识为2，那么R2上配置时就需要设置本地标识为2  
确认提交配置
```
commit
quit
```
在静态路由上调用跟踪名为aa的BFD会话状态
```
ip route-static 2.2.2.0 255.255.255.0 12.1.1.2 preference 50 track bfd-session aa
```
配置完静态路由显示`Info: Succeeded in modifying route.`就表示成功了  

**R2**：
```
sys
bfd
quit
bfd aa bind peer-ip 12.1.1.1 source-ip 12.1.1.2
discriminator local 2
discriminator remote 1
commit
quit
ip route-static 1.1.1.0 255.255.255.0 12.1.1.1 preference 50 track bfd-session aa
```
配置完成可以通过命令查看静态 BFD会话信息：
```
display bfd session static
```
![sbfd10](https://github.com/user-attachments/assets/7964c945-f5cb-4327-b849-4b74360f443c)  

查看静态 BFD会话详细信息：
```
display bfd session static verbose
```
![sbfd11](https://github.com/user-attachments/assets/7079dfb4-9a13-46ae-bbd2-dd7872f9f458)  

接下来模拟当SW与R2互连链路断开时，观察BFD与静态路由联动的效果：
```
ping -c 1000 -a 1.1.1.1 2.2.2.2
```
以1.1.1.1 为源地址ping 2.2.2.2次数1000次  
![sbfd12](https://github.com/user-attachments/assets/8179e965-8fee-4f1b-ba93-4dda526e3969)  
![sbfd13](https://github.com/user-attachments/assets/3df17cdc-660a-4fd8-8761-1afa6e5b6d32)  
由上图结果可以看到，当非直连无法感知到的链路出现断开时，R1设备通过BFD会话状态响应快速切换到备份链路，恢复数据的转发


### 静态路由联动动态BFD
首先把上面配置的静态BFD进行取消掉  
**R1**：
```
undo bfd
```
**y**  
**R2**：
```
undo bfd
```
**y**  
**配置动态BFD**  
**R1**：
```
sys
bfd
quit
bfd bb bind peer-ip 12.1.1.2 source-ip 12.1.1.1 auto
commit
quit
ip route-static 2.2.2.0 255.255.255.0 12.1.1.2 preference 50 track bfd-session bb
```
**R2**：
```
sys
bfd
quit
bfd bb bind peer-ip 12.1.1.1 source-ip 12.1.1.2 auto
commit
quit
ip route-static 1.1.1.0 255.255.255.0 12.1.1.1 preference 50 track bfd-session bb
```
配置完成通过命令`display bfd session all verbose`查看BFD会话所有的详细信息  
```
display bfd session all
```
![abfd1](https://github.com/user-attachments/assets/c6e2ce3c-b35f-446f-bc31-ef8ce8df6121)  
![abfd2](https://github.com/user-attachments/assets/f22326ea-58bf-4603-84ca-81f843831f74)  

接下来模拟当SW与R2互连链路断开时，观察BFD与静态路由联动的效果：
```
ping -c 1000 -a 1.1.1.1 2.2.2.2
```
以1.1.1.1 为源地址ping 2.2.2.2次数1000次  
![abfd3](https://github.com/user-attachments/assets/30677561-9f3b-47c4-a14f-07b2253ef217)  
```
tracert 2.2.2.2
```
![abfd4](https://github.com/user-attachments/assets/e213e37e-7323-4291-9ed5-85ecdd9e3de2)  


### OSPF联动BFD

ospf 调用BFD 加快收敛  
![osb1](https://github.com/user-attachments/assets/7d9d1e3b-3b43-4de9-b494-58e3e3c8b92b)  
先把上一小节BFD和静态路由的配置命令取消  
**R1**：
```
undo bfd
```
**y**
```
undo ip route-static 2.2.2.0 255.255.255.0 12.1.1.2 preference 50
undo ip route-static 2.2.2.0 255.255.255.0 21.1.1.2
```
**R2**：
```
undo bfd
```
**y**
```
undo ip route-static 1.1.1.0 255.255.255.0 12.1.1.1 preference 50
undo ip route-static 1.1.1.0 255.255.255.0 21.1.1.1
```
接着配置OSPF，并增加一台SW2  
**R1**：
```
ospf 1 router-id 1.1.1.1
area 0
network 1.1.1.0 0.0.0.255
network 12.1.1.0 0.0.0.255
network 21.1.1.0 0.0.0.255
quit
quit
```
**R2**：
```
ospf 1 router-id 2.2.2.2
area 0
network 2.2.2.0 0.0.0.255
network 12.1.1.0 0.0.0.255
network 21.1.1.0 0.0.0.255
quit
quit
```
配置完成后，通过命令`display ip routing-table`查看路由表信息  
接着到R1的G0/0/1接口修改OSPF的cost值，使得R1与R2直连链路作为备选链路  
**R1**：
```
interface g0/0/1
ospf cost 3
quit
```
默认情况下，OSPF是10s发送一次Hello报文，当链路出现故障时，需要等待40s才知道对方链路断开进行切换。OSPF的Hello报文发送时间也是可以进行修改，最小可以达到1秒发送一次，死亡间隔4 倍，也需要4秒才进行链路状态更新操作  
在不使用BFD的情况下，模拟OSPF链路出现故障，观察其现象  
**R1**：
```
ping -c 1000 -a 1.1.1.1 2.2.2.2
```
以1.1.1.1 为源地址ping 2.2.2.2次数1000次  
![osb2](https://github.com/user-attachments/assets/1d3a0482-a84d-46da-90ed-882b334ec38d)  
![osb3](https://github.com/user-attachments/assets/6a487241-50e0-46c9-9c71-8ceddf9f859d)  
由上图现象可以看到，当OSPF链路出现故障时，默认情况下需要等待40秒才进行链路状态更新，切换到备份链路上  
而使用BFD能够加快OSPF的收敛，默认情况下，BFD为1000毫秒发送一次“心跳信号”，死亡间隔时间3倍，3000毫秒完成切换。其最小可以设置100ms，那么300ms就可以完成感知切换  
**配置BFD**:  
**R1**：  
```
bfd
quit
ospf 1
bfd all-interfaces enable
quit
```
所有位于ospf 的接口全部启用  

**R2**：
```
bfd
quit
ospf 1
bfd all-interfaces enable
quit
```
配置完成，通过命令`display bfd session dynamic`查看动态的BFD会话信息  
过命令`display bfd session dynamic verbose`查看动态的BFD会话详细信息  
通过命令`display bfd session all`查看BFD所有的会话  
在使用BFD后，再模拟OSPF链路出现故障，观察其现象  
**R1**：
```
ping -c 1000 -a 1.1.1.1 2.2.2.2
```
以1.1.1.1 为源地址ping 2.2.2.2次数1000次  
![osb4](https://github.com/user-attachments/assets/13b8014f-52e1-46c9-8834-08b1fab9c2c2)  
由上图可以看到，联动BFD后，OSPF的链路状态的收敛加快。要修改BFD的Hello报文时间，最小可以修改到100ms


### BFD单臂回声
BFD 单臂回声（BFD Echo）是 BFD（Bidirectional Forwarding Detection）协议中的一种故障检测机制。在单臂回声模式下，一个网络设备（通常是路由器）通过自己发送的 BFD Echo 报文来检测链路的连通性，而不是依赖对端设备发送的 BFD 报文进行检测  
工作原理：启用 BFD 单臂回声的设备会将 BFD Echo 报文发送到链路的对端。这些报文会沿着数据链路传输到对端设备，然后对端设备将收到的 BFD Echo 报文再环回（Loopback）给发送端。发送端根据收到的自己发送的 Echo 报文来判断链路是否正常。如果在规定的时间内没有收到自己发送的 Echo 报文的回环，就认为链路出现故障  
![osb5](https://github.com/user-attachments/assets/796df475-def6-4371-b609-0cd24be71fc1)  

**配置BFD单臂回声**  
取消掉第3小节配置的ospf和接口开销  
**R1**：
```
interface g0/0/1
undo ospf cost
undo ospf 1
```
**y**  

**R2**：
```
undo ospf 1
```
**y**  
配置静态路由
**R1**：
```
ip route-static 2.2.2.0 255.255.255.0 12.1.1.2 preference 50
ip route-static 2.2.2.0 255.255.255.0 21.1.1.2
```
**R2**：
```
ip route-static 1.1.1.0 255.255.255.0 12.1.1.1 preference 50
ip route-static 1.1.1.0 255.255.255.0 21.1.1.1
```
配置BFD  
**R1**：
```
bfd
quit
bfd aa bind peer-ip 12.1.1.2 interface g0/0/0 source-ip 21.1.1.1 one-arm-echo
discriminator local 100
commit
quit
```
注意：  
`source-ip 21.1.1.1` 是BFD报文的源地址  
`interface g0/0/0` BFD单臂回声报文的目的地址即12.1.1.1（如下图抓包）通常为出接口  
`peer-ip 12.1.1.2` 对端地址 BFD需要依靠该地址探测对方的mac地址 同时作为建立bfd 会话使用见下图（并不用作bfd报文目标地址）  
**R1**：
```
ip route-static 2.2.2.0 255.255.255.0 12.1.1.2 preference 50 track bfd-session aa
```
```
display bfd session all verbose
```
![osb6](https://github.com/user-attachments/assets/3204f079-3bae-4274-996c-bba52bc468ca)  

通过断开SW1与R2互连链路，观察其现象  
**R1**：
```
ping -c 1000 -a 1.1.1.1 2.2.2.2
```
以1.1.1.1 为源地址ping 2.2.2.2次数1000次  
![osb7](https://github.com/user-attachments/assets/cef9c5ba-4ae7-40fb-a20e-425e26f67603)  
![osb8](https://github.com/user-attachments/assets/0ed05288-e995-4877-b01d-309b9ef39f77)  
由上图结果可以看到，当链路出现故障后，单臂回声检测不到，立马切换到备选链路  
![osb9](https://github.com/user-attachments/assets/eba91723-c436-44e2-9dc7-ed8a925d778b)  



## [BGP路由](#BGP路由)
**一、BGP理论概述**  
**什么是AS？**  
- **定义**：AS是在同一个组织管理下，使用统一选路策略的设备集合。
- **AS号范围**：四字节，即`0~4294967295`。其中`0`和`65535`是保留的特殊AS号。

**BGP概念**  
BGP是边界网关协议，用于自治系统间的动态协议路径矢量。基于TCP中应用层协议，端口号为179,只发送增量路由更新  

**BGP特点**  
- **传输层协议**：BGP使用TCP作为其传输层协议（端口号为179），使用触发式路由更新，而不是周期性路由更新。
- **承载能力**：BGP能够承载大批量的路由信息，能够支撑大规模网络。
- **路由策略**：BGP提供了丰富的路由策略，能够灵活的进行路由选路，并能指导对等体按策略发布路由。
- **MPLS/VPN支持**：BGP能够支撑MPLS/VPN的应用，传递客户VPN路由。
- **稳定性增强**：BGP提供了路由聚合和路由衰减功能用于防止路由振荡，通过这两项功能有效地提高了网络稳定性。

**二、BGP邻居关系配置**  
**在BGP路由协议中，一台路由器只能有一个自治区域AS（Autonomous System）号**  

### IBGP邻居配置
- **定义**：位于`相同AS(自治系统)`的BGP路由器之间的邻居关系。
- **配置步骤**：
  1. 进入BGP进程：`bgp <本地AS号>`
  2. 绑定对端BGP邻居：`peer <对端IP地址> as-number <本地AS号>`
  3. 宣告自己的网络：`network <本地IP地址> <子网掩码>`

- **示例**：
```
bgp 100
peer 10.1.1.2 as-number 100
network 10.1.1.1 32
```

### EBGP邻居配置
- **定义**：位于`不同AS(自治系统)`的BGP路由器之间的邻居关系。
- **配置步骤**：
  1. 进入BGP进程：`bgp <本地AS号>`
  2. 绑定对端BGP邻居：`peer <对端IP地址> as-number <对端AS号>`
  3. 宣告自己的网络：`network <本地IP地址> <子网掩码>`

- **示例**：
```
bgp 100
peer 192.168.10.2 as-number 200
network 10.1.1.0 24
```


IBGP实操示例拓扑：  
![bgp1](https://github.com/user-attachments/assets/41874a2b-00f0-4974-8510-23946786da26)  
**R1**:
```
sys
un in en
sys R1
int g0/0/0
ip address 192.168.0.1 24
int LoopBack 0
ip address 1.1.1.1 32
quit
bgp 100
peer 192.168.0.2 as-number 100
peer 192.168.1.2 as-number 100
network 1.1.1.1 32
network 192.168.0.0 24
quit
```
**R2**:
```
sys
un in en
sys R2
int g0/0/0
ip address 192.168.0.2 24
int g0/0/1
ip address 192.168.1.1 24
int LoopBack 0
ip address 2.2.2.2 32
quit
bgp 100
peer 192.168.0.1 as-number 100
peer 192.168.1.2 as-number 100
network 2.2.2.2 32
network 192.168.0.0 24
network 192.168.1.0 24
quit
```
**R3**:
```
sys
un in en
sys R3
interface g0/0/1
ip address 192.168.1.2 24
quit
interface LoopBack 0
ip address 3.3.3.3 32
quit
bgp 100
peer 192.168.1.1 as-number 100
peer 192.168.0.1 as-number 100
network 3.3.3.3 32
network 192.168.1.0 24
quit
```
查看邻居关系是否建立  
```
disp bgp peer
```
显示`Established`就表示建立成功了

EBGP实操示例拓扑：  
![EBGP](https://github.com/user-attachments/assets/822c6c46-cb49-4e00-8914-9a015445fc62)  
**R1**:
```
sys
un in en
sys R1
int g0/0/0
ip address 192.168.0.1 24
int LoopBack 0
ip address 1.1.1.1 32
quit
bgp 100
peer 192.168.0.2 as-number 100
network 1.1.1.1 32
network 192.168.0.0 24
quit
```
**R2**:
```
sys
un in en 
sys R2
int g0/0/0
ip address 192.168.0.2 24
int g0/0/1
ip address 192.168.1.1 24
int LoopBack 0
ip address 2.2.2.2 32
quit
bgp 100
peer 192.168.0.1 as-number 100
peer 192.168.1.2 as-number 200
network 2.2.2.2 32
network 192.168.0.0 24
network 192.168.1.0 24
quit
```
**R3**:
```
sys
un in en
sys R3
interface g0/0/1
ip address 192.168.1.2 24
quit
interface LoopBack 0
ip address 3.3.3.3 32
quit
bgp 200
peer 192.168.1.1 as-number 100
network 3.3.3.3 32
network 192.168.1.0 24
quit
```
查看邻居关系是否建立
```
disp bgp peer
```
显示`Established`就表示建立成功了

### BGP路由引入

**引入直连路由**  
直连路由是指与路由器直接相连的网络路由。在BGP中，这些路由可以自动引入，但也可以显式地引入
```
bgp <本地AS号>
import-route direct
```
**引入静态路由**  
静态路由是由网络管理员手动配置的路由。在BGP中引入静态路由，可以使得这些路由被BGP传播
```
bgp <本地AS号>
import-route static
```
**引入RIP路由**  
RIP（Routing Information Protocol）是一种基于距离向量的路由协议。在BGP中引入RIP路由，可以使得RIP的路由信息被BGP传播
```
bgp <本地AS号>
import-route rip
```
**引入OSPF路由**  
OSPF（Open Shortest Path First）是一种基于链路状态的路由协议。在BGP中引入OSPF路由，可以使得OSPF的路由信息被BGP传播  
```
bgp <本地AS号>
import-route ospf
```
**引入ISIS路由**  
ISIS（Intermediate System to Intermediate System）是一种基于ISO标准的路由协议。在BGP中引入ISIS路由，可以使得ISIS的路由信息被BGP传播
```
bgp <本地AS号>
import-route isis
```
**引入User Network Route（UNR）到OSPF进程**  
UNR是一种用户定义的路由，可以引入到OSPF进程中
```
ospf <进程号>
import-route unr
```
**注意事项**  
- 在引入路由时，需要确保目标BGP进程已经正确配置，并且具有相应的AS号
- 引入的路由可能会受到BGP路由策略的影响，包括路由过滤、路由映射等
- 在引入路由时，可能需要考虑路由的起源属性（Origin attribute），这会影响路由的选择和传播


**三、BGP查询命令**  
**3.1 查看BGP对等体信息**  
- **命令**：
```
display bgp peer
```
- **作用**：显示BGP对等体的详细信息，包括对等体的IP地址、AS号、状态等。

**3.2 查看BGP错误信息**  
- **命令**：
```
display bgp error
```
- **作用**：显示BGP协议运行过程中遇到的错误信息，帮助排查问题。

**3.3 查看BGP路由表信息**  
- **命令**：
```
display bgp routing-table
```
- **作用**：显示BGP路由表中的路由信息，包括路由的前缀、下一跳、AS路径等。

**3.4 查看一条BGP详细信息**  
- **命令**：
```
display bgp routing-table <IP地址>
```
- **作用**：显示指定IP地址的BGP路由详细信息，包括路由的来源、路径属性等。

**四、BGP路由聚合**  
**4.1 手动聚合**  
- **配置步骤**：
1. 进入BGP进程：
```
bgp <本地AS号>
```
2. 进行聚合：
```
aggregate <聚合网段> <子网掩码> detail-suppressed as-set
```

- **示例**：
```
bgp 100
aggregate 172.168.10.0 255.255.255.0 detail-suppressed as-set
```

**4.2 自动聚合**  
- **配置步骤**：
  1. 进入BGP进程：`bgp <本地AS号>`
  2. 开启自动聚合：`summary automatic`

- **示例**：
```
bgp 100
summary automatic
```

**五、BGP属性配置**  
**5.1 AS-path属性更改配置**  
- **配置允许环路**：
```
bgp <本地AS号>
peer <对等体IP> as-number <对等体AS号>
peer <对等体IP> allow-as-loop
```

- **选路配置**：
```
acl <编号>
rule <序号> permit source <源IP> <反掩码>
route-policy <策略名> permit node <节点号>
if-match acl <编号>
apply as-path <AS路径列表> additive
bgp <本地AS号>
peer <对等体IP> route-policy <策略名> import
```

**5.2 Next_hop属性配置**  
- **配置下一跳为本地出接口**：
```
bgp <本地AS号>
peer <对等体IP> next-hop-local
```

**5.3 Local_preference属性配置**  
- **选路配置**：
```
ip ip-prefix <前缀列表名> index <索引号> permit <IP地址> <反掩码>
route-policy <策略名> permit node <节点号>
if-match ip-prefix <前缀列表名>
apply local-preference <值>
bgp <本地AS号>
peer <对等体IP> route-policy <策略名> import
```

- **更改默认本地优先级值**：
```
bgp <本地AS号>
default local-preference <值>
```

**5.4 Community属性配置**  
- **路由配置**：
```
ip ip-prefix <前缀列表名> index <索引号> permit <IP地址> <反掩码>
route-policy <策略名> permit node <节点号>
if-match ip-prefix <前缀列表名>
apply community <社区值>
bgp <本地AS号>
peer <对等体IP> route-policy <策略名> export
peer <对等体IP> advertise-community
```

**5.5 preferred-value属性配置（华为特有）**  
- **路由配置**：
```
ip ip-prefix <前缀列表名> index <索引号> permit <IP地址> <反掩码>
route-policy <策略名> permit node <节点号>
if-match ip-prefix <前缀列表名>
apply preferred-value <值>
bgp <本地AS号>
peer <对等体IP> as-number <对等体AS号>
peer <对等体IP> connect-interface LoopBack0
peer <对等体IP> route-policy <策略名> import
```

**5.6 MED属性配置**  
- **配置示例**：
```
bgp <本地AS号>
peer <对等体IP> as-number <对等体AS号>
peer <对等体IP> connect-interface LoopBack0
peer <对等体IP> route-policy <策略名> import
```
- **注意事项**：
  1. 缺省情况下，路由器只比较来自同一相邻AS的BGP路由的MED值。
  2. 如果一条路由是本地开始通过import或network引入的，则默认携带MED属性通告给MED对等体。
  3. 一条BGP路由为从BGP对等体学习到，那么该路由传递给EBGP对等体时缺省不会携带MED属性。
  4. 在IBGP对等体之间传递路由时，MED值会被保留并传递。
  5. 修改默认MED值时只能通过import-route和aggregate（聚合）的路由生效。

**5.7 联盟配置**  
- **定义**：将一个AS内部划分为多个子AS。
- **配置步骤**：
  1. 进入子AS BGP进程：`bgp <子AS号>`
  2. 标识属于的联盟：`confederation id <联盟AS号>`
  3. 标识要建立对等体的子AS号：`confederation peer-as <子AS号1> <子AS号2>`
  4. 建立对等体：`peer <对端IP地址> as-number <子AS号>`
  5. 更改下一跳为本地：`peer <对端IP地址> next-hop-local`

- **示例**：
```
bgp 2000
confederation id 200
confederation peer-as 2001 2002
peer 192.168.1.1 as-number 2001
peer 192.168.2.1 as-number 2002
peer 192.168.1.1 next-hop-local
peer 192.168.2.1 next-hop-local
```

**六、BGP路由反射器配置**  
**6.1 反射规则**  
1. RR从非客户端学习到的IBGP路由会反射给所有客户端。
2. RR从客户端学习到的IBGP路由会反射给所有的除该客户端之外的客户端和非客户端。
3. RR从EBGP对等体学习到的路由会发送给所有的非客户端和客户端对等体。

**6.2 特殊属性**  
- **Originator_ID**：当BGP路由器收到一条携带Originator_ID属性的IBGP路由，并且Originator_ID属性值与自身的Router ID相同，则它会忽略关于该条路由的更新。
- **Cluster_List**：当一条路由被反射器反射后，该RR（该簇）的Cluster_ID就会被添加至路由的Cluster_list属性中。当RR收到一条携带Cluster_list属性的BGP路由，且该属性值中包含该簇的Cluster_ID时，RR认为该条路由存在环路，因此将忽略关于该条路由的更新。

**6.3 命令配置**  
- **配置示例**：
```
bgp <本地AS号>
peer <客户端IP> reflect-client
reflector cluster-id <Cluster_ID>
```

**七、BGP选路原则**  
1. 首先丢弃下一跳next_hop不可达的路由。
2. 优选协议首选值（Preferred-value）值最大的路由。
3. 优选本地优先级（local_preference）最高的路由。
4. 优选手动聚合>自动聚合>network>import>对等体学到的路由。
5. 优选AS路径AS_path最短的路由。
6. 优选Origin属性最优的路由：i>e>?
7. 优选MED值最小的路由。
8. 优选EBGP对等体学习的路由。
9. 优选Next_hop的IGP度量值最小的路由。
10. 优选Cluster_list最短的路由。
11. 优选Router_ID最小的设备通告的路由。
12. 优选具有最小IP地址的对等体通告的路由。

**八、BGP路由负载分担**  
**8.1 负载分担前提条件**  
1. Preferred-Value属性值相同。
2. Local_Preference属性值相同。
3. 都是聚合路由或者非聚合路由。
4. AS_Path属性长度相同。
5. Origin类型（IGP、EGP、Incomplete）相同。
6. MED属性值相同。
7. 都是EBGP路由或都是IBGP路由。
8. AS内部IGP的Metric相同。
9. AS_Path属性完全相同。

**8.2 负载分担配置**  
- **配置示例**：
```
bgp <本地AS号>
maximum load-balancing ibgp <最大负载分担数>
load-balancing as-path-ignore
```



## [ISIS路由](#ISIS路由)
**ISIS概述**  
简述IS-IS动态路由协议  
- IS-IS(Intermediate System-to-Intermediate System，中间系统到中间系统)路由协议最初是ISO(the International Organization for Standardization，国际标准化组织)为CLNP(Connection Less Network Protocol，无连接网络协议)设计的一种动态路由协议  
- IS-IS属于内部网关路由协议，用于自治系统内部。IS-IS是一种链路状态协议，与TCP/IP网络中的OSPF协议非常相似，使用最短路径优先算法进行路由计算  
- 运行IS-IS协议的网络包含了终端系统(End System)、中间系统(Intermediate System)、区域(Area)和路由域(Routing Domain)。一个路由器是Intermediate System(IS)，一个主机就是End System(ES)。主机和路由器之间运行的协议称为ES-IS，路由器与路由器之间运行的协议称为IS-IS。区域是路由域的细分单元，IS-IS允许将整个路由域分为多个区域，IS-IS就是用来提供路由域内或一个区域内的路由  

**IS-IS的路由种类和功能**  
1. 两种路由器级别，L1和L2  
- L1负责在`同一个区域内`传播链路状态信息（类似OSPF中的1类和2类）  
- L2负责在`不同的区域内`相互传播链路状态信息（类似OSPF的3类）  

2. 三种路由器的功能：L1，L2和L1-2  
- L1能获取区域内的路径信息，
- L2能获取区域间的路径信息
- L1-2:能同时获取区域内和区域间路径

3. **连接L2路由器和L1/L2路由器的路径会形成骨干区域**

4. IS-IS度量值  
接口的度量值默认是10，可修改  
度量值的作用是用于路由选择和路径计算，决定了数据包在网络中传输的路径  

**邻居关系的建立**  
1. 相同区域内  
- L1可以和L1，L1-2建立邻居关系，但无法和L2建立邻居关系
- L2可以和L2，L1-2建立邻居关系
- L1-2可以和L1和L2建立邻居关系

2. 不同区域内
- L1无法和其他路由建立邻居关系
- L2可以和其他路由建立邻居关系，除了L1
- L1-2可以和其他路由建立邻居关系，除了L1

**NSAP地址**  
- IS-IS中NSAP类似于OSPF中的router-id
- LSP 使用NSAP地址来标识路由器并建立拓扑表，因此为IP提供路由选择需要NSAP地址
- NSAP地址8-20字节，用16进制标识，包含如下主要信息：
    - 1.区域编号
    - 2.系统编号（固定6个字节）
    - 3.NSEL位（固定1字节，并重置为0）
例如：`49.0001.0020.0200.2002.00`  
分析：  
开头的`49.0001`中的`49是固定格式`，`0001`代表在 area1(`区域1`)，若区域为30，则为`49.0030`  
中间部分的`0020.0200.2002`表示的是由IP地址`2.2.2.2`转换过来的  
结尾`00：固定格式`

#### **NSAP地址的换算**  
原则：通过环回口32位地址补齐成48位获得，即补足3位，然后分割成4位3段  
举例：  
源IP：`12.12.12.12`  
补足3位：变成`012.012.012.012`  
分割成4位3段：变成`0120.1201.2012`  
所以`12.12.12.12`转换后变为：`49.0001.0120.1201.2012.00`  

**IS-IS状态协议**  
1. 链路状态协议，使用SPF算法
2. 使用hello包建立邻居关系，使用LSP交换链路状态信息，采用分层设计


#### IS-IS配置命令
**ISIS查看命令**  
查看isis邻居关系
```
disp isis peer  	
```
查看isis接口的明细
```
disp isis 1 brief    		
```
查看接口isis详情
```
disp isis interface g0/0/0
```

**配置举例**  
进入IS-IS进程配置默认不加就是进程 1
***不同的进程都是需要重新发布路由才能实现不同进程之间的相互通信***
```
isis 1
```
配置网络实体地址补足3位，然后4位分割
```
network-entity 49.0001.0010.0100.1001.00
```
根据网络结构配置IS-IS路由类型，这边有路由器类型
```
is-level level-1
```
或
```
is-level level-2
```
或
```
is-level level-1-2
```
进入接口
```
int g0/0/1
```
启动ISIS
```
isis enable
```


#### 路由重分发
引入RIP路由到ISIS实例
```
isis <process-id>
import-route rip <rip-process-id> level-1
```
将RIP路由引入到指定的ISIS进程中，并且指定为Level-1路由  

引入直连路由到ISIS实例
```
isis <process-id>
import-route direct
```
引入静态路由到ISIS实例
```
isis <process-id>
import-route static
```
引入OSPF路由到ISIS实例
```
isis <process-id>
import-route ospf
```
引入BGP路由到ISIS实例
```
isis <process-id>
import-route bgp
```
引入其他ISIS实例的路由到当前ISIS实例
```
isis <process-id>
import-route isis <other-process-id>
```
路由泄露可以将Level-2的路由泄露到Level-1，或者反之
```
isis <process-id>
import-route isis level-2 into level-1
```

**路由汇总**  
在ABR上做汇总(`域间路由汇总`)  
```
isis <process-id>
summary <summary-address> <netmask> level-1-2
```
在ASBR上做汇总(`不同协议间的路由汇总`)
```
isis <process-id>
summary <summary-address> <netmask> [level-1 | level-2]
```



## [GRE隧道技术](#GRE隧道技术)
拓扑图：  
![GRE1](https://github.com/user-attachments/assets/8c7fe58d-acc9-473e-bd21-9c5460acb165)  
先来配置公网路由部分  
**R1**：
```
sys
sys AR1
int g0/0/0
ip add 172.16.1.2 24
int g0/0/1
ip add 172.16.2.2 24
quit
ospf 1
area 0
network 172.16.1.0 0.0.0.255
network 172.16.2.0 0.0.0.255
quit
quit
```

**R2**：
```
sys
sys AR2
int g0/0/0
ip add 172.16.1.1 24
int g0/0/2
ip add 192.168.1.254 24
quit
ospf 1
area 0
network 172.16.1.0 0.0.0.255
quit
quit
```
用于显示与OSPF（开放最短路径优先）协议相关的IP路由表信息
```
display ip  routing-table protocol ospf
```

**R3**：
```
sys
sys AR3
int g0/0/1
ip add 172.16.2.1 24
int g0/0/2
ip add 192.168.2.254 24
quit
ospf 1
area 0
network 172.16.2.0 0.0.0.255
quit
quit
```

接下来配置内网路由和GRE隧道  
**R2**：
```
int Tunnel 0/0/1
tunnel-protocol gre
ip add 10.1.1.1 24
source 172.16.1.1
destination 172.16.2.1
keepalive
quit
ospf 2
area 0
network 10.1.1.0 0.0.0.255
network 192.168.1.0 0.0.0.255
quit
quit
```

**R3**：
```
int Tunnel 0/0/1
tunnel-protocol gre
ip add 10.1.1.2 24
source 172.16.2.1
destination 172.16.1.1
keepalive
quit
ospf 2
area 0
network 10.1.1.0 0.0.0.255
network 192.168.2.0 0.0.0.255
quit
quit
```
本次实验通过GRE隧道技术实现了在不通过公网路由的情况下实现两个内网之间的相互通信  
