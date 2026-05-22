export const ccnaData = [
{
  day: 1,
  title: "CCNA Overview + OSI / TCP-IP Foundations",
  lesson: `GOAL OF DAY 1:
Understand how data moves through a network from user application to cable and back.

CCNA is not just memorizing commands. You must understand:
1. What devices do
2. What layer they operate at
3. How traffic is encapsulated
4. How to troubleshoot where communication breaks

THE BIG PICTURE:
When PC1 pings PC2, the computer does not just magically send "ping".

It builds the traffic layer by layer:

Application data
↓
Transport segment
↓
IP packet
↓
Ethernet frame
↓
Bits on the wire

This is called encapsulation.

OSI MODEL:
Layer 7 Application:
User-facing network services.
Examples: HTTP, HTTPS, DNS, DHCP, SSH.

Layer 6 Presentation:
Formatting, encryption, compression.
Example: TLS encryption.

Layer 5 Session:
Manages communication sessions.

Layer 4 Transport:
End-to-end communication.
TCP = reliable.
UDP = fast, no guarantee.

Layer 3 Network:
IP addressing and routing.
Routers work here.
Main identifier: IP address.

Layer 2 Data Link:
Switching, MAC addresses, Ethernet frames.
Switches work here.
Main identifier: MAC address.

Layer 1 Physical:
Cables, signals, fiber, copper, radio waves.

TCP/IP MODEL:
Application = OSI Layers 5–7
Transport = OSI Layer 4
Internet = OSI Layer 3
Network Access = OSI Layers 1–2

EXAMPLE: PC1 PINGS PC2
1. PC1 creates ICMP echo request
2. PC1 checks destination IP
3. If destination is local, PC1 uses ARP to find MAC
4. PC1 builds Ethernet frame
5. Switch forwards based on MAC address
6. PC2 receives frame
7. PC2 replies with ICMP echo reply

KEY DIFFERENCE:
IP address = Layer 3 = logical location
MAC address = Layer 2 = local delivery

Switches care about MAC addresses.
Routers care about IP addresses.

EXAM TRAPS:
- Switches do not route by default
- Routers break broadcast domains
- MAC addresses change hop-by-hop
- IP addresses stay end-to-end unless NAT is used
- Ping uses ICMP, not TCP or UDP
- DNS failure does not mean IP connectivity is broken

TROUBLESHOOTING MINDSET:
If same LAN ping fails:
Check cable, IP address, subnet mask, VLAN, ARP.

If remote network ping fails:
Check default gateway, routing table, ACL, NAT.

If IP works but website name fails:
Check DNS.

MEMORIZE:
Layer 1 = cables
Layer 2 = MAC / switching
Layer 3 = IP / routing
Layer 4 = TCP / UDP
Layer 7 = applications`,
  commands: [
    "ping <ip>                       // test reachability using ICMP",
    "tracert <ip>                    // Windows: show path to destination",
    "traceroute <ip>                 // Cisco/Linux: show path to destination",
    "ipconfig                        // Windows: view IP, mask, gateway",
    "ipconfig /all                   // Windows: detailed IP/DNS/MAC info",
    "show ip interface brief         // Cisco: quick interface/IP/status check",
    "show interfaces                 // Cisco: detailed Layer 1/2 interface info"
  ],
  lab: [
    "Open Packet Tracer",
    "Add 2 PCs and 1 switch",
    "Connect both PCs to the switch using copper straight-through cables",
    "Set PC1 IP: 192.168.1.10 / 255.255.255.0",
    "Set PC2 IP: 192.168.1.20 / 255.255.255.0",
    "Ping PC2 from PC1",
    "Use Simulation Mode and watch ARP happen before ICMP",
    "Change PC2 to 192.168.2.20 /24 and test ping again",
    "Explain why the ping now fails",
    "Fix PC2 back to 192.168.1.20 and verify ping works"
  ],
  quiz: [
  { q: "What is the main purpose of the OSI model?", a: "To describe network communication in layers" },
  { q: "Which OSI layer is responsible for cables, signals, and physical transmission?", a: "Layer 1 Physical" },
  { q: "Which OSI layer handles MAC addresses and Ethernet frames?", a: "Layer 2 Data Link" },
  { q: "Which OSI layer handles IP addressing and routing?", a: "Layer 3 Network" },
  { q: "Which OSI layer uses TCP and UDP?", a: "Layer 4 Transport" },
  { q: "Which TCP/IP layer matches OSI Layer 3?", a: "Internet layer" },
  { q: "Which TCP/IP layer matches OSI Layers 1 and 2?", a: "Network Access layer" },
  { q: "What is encapsulation?", a: "Adding headers/trailers as data moves down the stack" },
  { q: "Correct encapsulation order?", a: "Data → Segment → Packet → Frame → Bits" },
  { q: "Ping uses which protocol?", a: "ICMP" }
],
flashcards: [
  { front: "OSI Layer 1", back: "Physical: cables, signals, fiber, wireless" },
  { front: "OSI Layer 2", back: "Data Link: MAC addresses, Ethernet frames" },
  { front: "OSI Layer 3", back: "Network: IP addressing and routing" },
  { front: "OSI Layer 4", back: "Transport: TCP and UDP" },
  { front: "TCP", back: "Reliable, connection-oriented transport protocol" },
  { front: "UDP", back: "Fast, connectionless transport protocol" },
  { front: "ICMP", back: "Protocol used by ping" },
  { front: "Encapsulation", back: "Data → Segment → Packet → Frame → Bits" },
  { front: "TCP/IP Internet Layer", back: "Equivalent to OSI Layer 3" },
  { front: "TCP/IP Network Access", back: "Equivalent to OSI Layers 1–2" }
]
},

{
  day: 2,
  title: "Ethernet, MAC Addresses, ARP + Switching",
  lesson: `GOAL OF DAY 2:
Understand how devices communicate inside a LAN.

CORE IDEA:
Inside a local network, devices do not deliver frames using IP addresses directly.

They use MAC addresses.

IP address = Layer 3 logical address
MAC address = Layer 2 physical/local address

ETHERNET:
Ethernet is the main LAN technology.

An Ethernet frame contains:
- Source MAC address
- Destination MAC address
- Type field
- Data
- FCS for error detection

SWITCHING:
A switch forwards Ethernet frames using its MAC address table.

How a switch learns:
1. Frame enters switch
2. Switch reads source MAC address
3. Switch records source MAC + incoming port
4. Future frames to that MAC are sent only out that port

Switch behavior:
Known unicast:
Switch knows destination MAC → forwards to correct port

Unknown unicast:
Switch does not know destination MAC → floods out all ports in same VLAN except incoming port

Broadcast:
Sent to FF:FF:FF:FF:FF:FF → flooded to all ports in same VLAN

ARP:
ARP maps IPv4 address to MAC address.

Example:
PC1 wants to ping 192.168.1.20.

PC1 knows the IP.
PC1 does NOT know the MAC.

So PC1 sends:
"Who has 192.168.1.20?"

That ARP request is broadcast.

PC2 replies:
"192.168.1.20 is at my MAC address."

Then PC1 can build the Ethernet frame.

IMPORTANT:
ARP happens before ICMP ping if the MAC is unknown.

EXAM TRAPS:
- Switches learn from SOURCE MAC, not destination MAC
- Unknown unicast is flooded
- Broadcast stays inside the VLAN
- ARP is used for IPv4, not IPv6
- ARP maps IP to MAC, not MAC to IP
- MAC address table and ARP table are different

MAC TABLE vs ARP TABLE:
Switch MAC table:
MAC address → switch port

ARP table:
IP address → MAC address

TROUBLESHOOTING FLOW:
If same-VLAN devices cannot ping:
1. Check IP address and subnet mask
2. Check switch port status
3. Check VLAN assignment
4. Check ARP table
5. Check MAC address table

REAL SCENARIO:
PC1 and PC2 are in the same subnet but cannot ping.

Possible causes:
- wrong IP/subnet mask
- wrong VLAN
- cable/interface down
- switch has not learned MAC yet
- host firewall blocking ping

MEMORIZE:
Switch = MAC table
ARP = IP to MAC
Broadcast MAC = FF:FF:FF:FF:FF:FF
Unknown unicast = flood`,
  commands: [
    "show mac address-table              // view learned MAC addresses on switch",
    "show arp                            // view IP-to-MAC mappings",
    "arp -a                              // Windows: view ARP table",
    "ping <ip>                           // trigger ARP then ICMP",
    "clear mac address-table dynamic     // clear learned MAC entries",
    "clear arp-cache                     // clear router ARP cache"
  ],
  lab: [
    "Open Packet Tracer",
    "Add 2 PCs and 1 switch",
    "Put both PCs in 192.168.1.0/24",
    "Ping PC2 from PC1",
    "Use Simulation Mode and observe ARP request",
    "Check PC ARP table",
    "Check switch MAC address table",
    "Clear MAC table and ping again",
    "Explain why ARP happens before ICMP",
    "Move PC2 to another switch port and observe MAC table update"
  ],
  quiz: [
    { q: "What does ARP resolve?", a: "IPv4 address to MAC address" },
    { q: "How does a switch learn MAC addresses?", a: "From the source MAC address of incoming frames" },
    { q: "What does a switch do with unknown unicast?", a: "Floods it within the VLAN except the incoming port" },
    { q: "What is the broadcast MAC address?", a: "FF:FF:FF:FF:FF:FF" },
    { q: "Does ARP use broadcast or unicast for request?", a: "Broadcast" },
    { q: "Does ARP reply use broadcast or unicast?", a: "Usually unicast" },
    { q: "What table does a switch use?", a: "MAC address table" },
    { q: "What table maps IP to MAC?", a: "ARP table" },
    { q: "If two same-VLAN PCs cannot ping, should you check routing first?", a: "No, check Layer 1/2/IP/VLAN first" },
    { q: "Is ARP used for IPv6?", a: "No, IPv6 uses Neighbor Discovery" }
  ],
  flashcards: [
    { front: "ARP", back: "Address Resolution Protocol: maps IPv4 address to MAC address" },
    { front: "MAC address table", back: "Switch table mapping MAC addresses to switch ports" },
    { front: "ARP table", back: "Host/router table mapping IP addresses to MAC addresses" },
    { front: "Known unicast", back: "Switch knows destination MAC and forwards to one port" },
    { front: "Unknown unicast", back: "Switch floods frame because destination MAC is unknown" },
    { front: "Broadcast MAC", back: "FF:FF:FF:FF:FF:FF" },
    { front: "Switch learns from", back: "Source MAC address" },
    { front: "Same VLAN failure", back: "Check cable, interface, IP, subnet mask, VLAN, ARP, MAC table" }
  ]
},

{
  day: 3,
  title: "IPv4 Addressing — Networks, Hosts, Gateways",
  lesson: `GOAL:
Understand how IPv4 addresses identify devices and networks.

CORE IDEA:
IPv4 is a Layer 3 address.
It tells a device where a packet should go logically.

An IPv4 address has 32 bits, written as 4 octets:
192.168.1.10

Each octet ranges from 0 to 255.

IP ADDRESS PARTS:
Every IPv4 address has:
1. Network portion
2. Host portion

The subnet mask decides where the split happens.

Example:
192.168.1.10/24

/24 means:
Network = 192.168.1.0
Usable hosts = 192.168.1.1 to 192.168.1.254
Broadcast = 192.168.1.255

DEFAULT GATEWAY:
If traffic is going outside the local subnet, the PC sends it to the default gateway.

Same subnet:
PC sends directly using ARP.

Different subnet:
PC sends to default gateway.

EXAM TRAPS:
- Same subnet does NOT need router
- Different subnet NEEDS router or Layer 3 switch
- Wrong default gateway breaks remote access
- Wrong subnet mask can make local devices look remote
- Network and broadcast addresses are not usable host IPs

REAL SCENARIO:
PC1: 192.168.1.10/24
PC2: 192.168.1.20/24
They are same subnet. No router needed.

PC1: 192.168.1.10/24
PC2: 192.168.2.20/24
Different subnet. Router needed.`,
  commands: [
    "ipconfig                         // Windows: view IP address, mask, gateway",
    "ipconfig /all                    // Windows: view full IP, MAC, DNS info",
    "ping <ip>                        // test reachability",
    "show ip interface brief          // Cisco: check interface IP and status"
  ],
  lab: [
    "Create 2 PCs and 1 switch",
    "Set PC1 to 192.168.1.10 /24",
    "Set PC2 to 192.168.1.20 /24",
    "Ping PC1 to PC2",
    "Change PC2 to 192.168.2.20 /24",
    "Ping again and observe failure",
    "Explain why a router is now required",
    "Fix PC2 back to 192.168.1.20"
  ],
  quiz: [
    { q: "How many bits are in IPv4?", a: "32 bits" },
    { q: "What does the subnet mask define?", a: "Network and host portion" },
    { q: "What is the default gateway used for?", a: "Reaching networks outside the local subnet" },
    { q: "Can network address be assigned to a host?", a: "No" },
    { q: "Can broadcast address be assigned to a host?", a: "No" },
    { q: "192.168.1.10/24 and 192.168.1.20/24 need a router?", a: "No" },
    { q: "192.168.1.10/24 and 192.168.2.20/24 need a router?", a: "Yes" }
  ],
  flashcards: [
    { front: "IPv4", back: "32-bit Layer 3 logical address" },
    { front: "/24", back: "255.255.255.0" },
    { front: "Default gateway", back: "Router used to leave local subnet" },
    { front: "Network address", back: "First address in subnet, not usable" },
    { front: "Broadcast address", back: "Last address in subnet, not usable" }
  ]
},
{
  day: 4,
  title: "Subnetting God Mode — Fast Mental Calculation",
  lesson: `GOAL:
Subnet quickly under exam pressure.

WHY SUBNETTING MATTERS:
Subnetting appears everywhere:
- IP addressing
- routing
- ACL wildcard masks
- OSPF network statements
- troubleshooting

CORE FORMULA:
Usable hosts = 2^host bits - 2

COMMON PREFIXES:
/25 = 126 hosts
/26 = 62 hosts
/27 = 30 hosts
/28 = 14 hosts
/29 = 6 hosts
/30 = 2 hosts

BLOCK SIZE:
Block size = 256 - subnet mask value

Example:
/26 = 255.255.255.192
256 - 192 = 64

Subnets:
192.168.1.0 - 63
192.168.1.64 - 127
192.168.1.128 - 191
192.168.1.192 - 255

If IP is 192.168.1.130/26:
It belongs to 192.168.1.128/26.

Network = .128
Broadcast = .191
Usable = .129 - .190

EXAM TRAPS:
- Do not count network and broadcast as usable
- Always find the block the IP belongs to
- /27 block size is 32
- /28 block size is 16
- /30 is common for point-to-point links

SPEED METHOD:
1. Find interesting octet
2. Find block size
3. Count ranges
4. Identify network/broadcast/usable range`,
  commands: [],
  lab: [
    "Write host counts for /25 to /30",
    "Subnet 192.168.1.0/24 into /26 networks",
    "Find network/broadcast for 192.168.1.70/26",
    "Find network/broadcast for 10.10.10.200/29",
    "Do 30 subnetting drills without calculator"
  ],
  quiz: [
    { q: "How many usable hosts in /26?", a: "62" },
    { q: "How many usable hosts in /27?", a: "30" },
    { q: "Block size of /28?", a: "16" },
    { q: "Network of 192.168.1.130/26?", a: "192.168.1.128" },
    { q: "Broadcast of 192.168.1.128/26?", a: "192.168.1.191" },
    { q: "Usable hosts in /30?", a: "2" },
    { q: "Formula for usable hosts?", a: "2^host bits - 2" }
  ],
  flashcards: [
    { front: "/25", back: "126 hosts, block size 128" },
    { front: "/26", back: "62 hosts, block size 64" },
    { front: "/27", back: "30 hosts, block size 32" },
    { front: "/28", back: "14 hosts, block size 16" },
    { front: "/30", back: "2 hosts, block size 4" }
  ]
},
{
  day: 5,
  title: "IPv6 Basics — Addresses, Types, Shortening",
  lesson: `GOAL:
Understand IPv6 enough to recognize address types and basic behavior.

CORE IDEA:
IPv6 is 128 bits.
It was created because IPv4 space is limited.

IPv6 example:
2001:db8:abcd:0012:0000:0000:0000:0001

SHORTENING RULES:
1. Remove leading zeros
0012 becomes 12

2. Replace one continuous group of zeros with ::
0000:0000:0000 becomes ::

Important:
You can use :: only once in an IPv6 address.

ADDRESS TYPES:
Global unicast:
Public IPv6 address.
Commonly starts with 2000::/3.

Link-local:
Starts with FE80::/10.
Used only on local link.
Not routed.

Loopback:
::1

Multicast:
Starts with FF00::/8

IMPORTANT DIFFERENCE:
IPv6 has no broadcast.
IPv6 uses multicast instead.

EXAM TRAPS:
- FE80 is link-local, not internet-routable
- :: can only appear once
- ::1 is loopback
- IPv6 does not use ARP
- IPv6 uses Neighbor Discovery instead`,
  commands: [
    "show ipv6 interface brief          // view IPv6 interfaces",
    "ping ::1                           // test IPv6 loopback",
    "ipconfig                           // Windows: view IPv6 addresses"
  ],
  lab: [
    "View IPv6 address on PC",
    "Identify link-local address",
    "Ping ::1",
    "Write 3 IPv6 shortened examples",
    "Identify global, link-local, loopback, multicast"
  ],
  quiz: [
    { q: "How many bits in IPv6?", a: "128 bits" },
    { q: "IPv6 loopback address?", a: "::1" },
    { q: "Link-local prefix?", a: "FE80::/10" },
    { q: "Can :: be used twice?", a: "No" },
    { q: "Does IPv6 use broadcast?", a: "No" },
    { q: "What replaces ARP in IPv6?", a: "Neighbor Discovery" }
  ],
  flashcards: [
    { front: "IPv6 size", back: "128 bits" },
    { front: "FE80::/10", back: "Link-local IPv6" },
    { front: "::1", back: "IPv6 loopback" },
    { front: "FF00::/8", back: "IPv6 multicast" },
    { front: "IPv6 broadcast", back: "Does not exist" }
  ]
},
{
  day: 6,
  title: "Devices, Cables, TCP/UDP, Ports",
  lesson: `GOAL:
Understand common network devices, transport behavior, and must-know ports.

DEVICE ROLES:
Switch:
Layer 2 device.
Forwards frames using MAC addresses.

Router:
Layer 3 device.
Forwards packets using IP addresses.

Firewall:
Filters traffic based on rules.

Access Point:
Provides wireless access to wired network.

TCP vs UDP:
TCP:
- connection-oriented
- reliable
- uses acknowledgments
- slower but safer

UDP:
- connectionless
- no guarantee
- faster
- used when speed matters

COMMON PORTS:
SSH = TCP 22
Telnet = TCP 23
DNS = TCP/UDP 53
DHCP = UDP 67/68
HTTP = TCP 80
HTTPS = TCP 443
NTP = UDP 123
SNMP = UDP 161/162

EXAM TRAPS:
- SSH is secure, Telnet is not
- DNS can use TCP and UDP
- DHCP uses UDP
- HTTPS is 443, HTTP is 80
- TCP reliability does not mean faster

REAL SCENARIO:
If SSH fails but ping works:
IP reachability is okay.
Check TCP port 22, ACL, SSH config, username/password.`,
  commands: [
    "ping <ip>                         // test Layer 3 reachability",
    "traceroute <ip>                   // show path to destination",
    "show interfaces                   // check physical/data-link interface info",
    "show ip interface brief           // quick interface status"
  ],
  lab: [
    "Create a port memorization table",
    "Compare TCP and UDP examples",
    "Identify device roles in a topology",
    "Trace a packet from PC to web server",
    "Explain where switch/router/firewall act"
  ],
  quiz: [
    { q: "SSH port?", a: "TCP 22" },
    { q: "HTTPS port?", a: "TCP 443" },
    { q: "DNS port?", a: "TCP/UDP 53" },
    { q: "DHCP ports?", a: "UDP 67/68" },
    { q: "TCP is reliable or unreliable?", a: "Reliable" },
    { q: "UDP is connection-oriented?", a: "No" },
    { q: "Which is secure remote CLI, SSH or Telnet?", a: "SSH" }
  ],
  flashcards: [
    { front: "SSH", back: "TCP 22" },
    { front: "HTTPS", back: "TCP 443" },
    { front: "DNS", back: "TCP/UDP 53" },
    { front: "DHCP", back: "UDP 67/68" },
    { front: "TCP", back: "Reliable, connection-oriented" },
    { front: "UDP", back: "Fast, connectionless" }
  ]
},
{
  day: 7,
  title: "🔥 Week 1 Checkpoint — Fundamentals Under Pressure",
  lesson: `GOAL:
Pressure-test everything from Week 1.

This is not passive revision.
This is where fake understanding gets exposed.

YOU MUST KNOW:
- OSI layers
- TCP/IP model
- Encapsulation
- IPv4 addressing
- Subnetting basics
- MAC vs IP
- ARP behavior
- TCP vs UDP
- Key port numbers

EXAM MINDSET:
Cisco usually does not ask:
"What is Layer 3?"

It asks:
"A PC cannot reach another network. What should you check?"

That means you need troubleshooting logic.

TROUBLESHOOTING ORDER:
1. Physical
2. Data Link
3. Network
4. Transport / Services

Same LAN failure:
Check cable, NIC, VLAN, IP, subnet mask, ARP, MAC table.

Remote network failure:
Check default gateway, routing, ACL, NAT.

Name failure:
If IP works but domain name fails, suspect DNS.

COMMON WEAKNESSES:
- Confusing MAC and IP
- Forgetting default gateway
- Subnetting too slowly
- Thinking DNS is needed for ping by IP
- Thinking switches route by default

PASS STANDARD:
If you cannot explain WHY each failure happens, do not move on yet.`,
  commands: [
    "ping <ip>                         // test reachability",
    "traceroute <ip>                   // identify path/failure point",
    "ipconfig /all                     // verify IP, mask, gateway, DNS",
    "show ip interface brief           // verify Cisco interface status",
    "show mac address-table            // verify switch MAC learning",
    "show arp                          // verify IP-to-MAC mapping"
  ],
  lab: [
    "Build 2 PCs and 1 switch",
    "Make same-subnet ping work",
    "Break subnet mask and diagnose failure",
    "Break IP address and diagnose failure",
    "Check ARP table before and after ping",
    "Explain each failure using OSI layers",
    "Write your weakest 3 topics"
  ],
  quiz: [
    { q: "PC can ping 8.8.8.8 but not google.com. Likely issue?", a: "DNS" },
    { q: "PC1 192.168.1.10/24 and PC2 192.168.2.20/24 need what?", a: "Router or Layer 3 gateway" },
    { q: "Switch learns MAC from source or destination?", a: "Source MAC" },
    { q: "Unknown unicast is?", a: "Flooded within VLAN" },
    { q: "Encapsulation order?", a: "Data → Segment → Packet → Frame → Bits" },
    { q: "Layer 3 device?", a: "Router" },
    { q: "Layer 2 device?", a: "Switch" },
    { q: "First troubleshooting layer?", a: "Physical" },
    { q: "What protocol maps IPv4 to MAC?", a: "ARP" },
    { q: "HTTPS port?", a: "TCP 443" }
  ],
  flashcards: [
    { front: "Troubleshooting order", back: "Physical → Data Link → Network → Services" },
    { front: "Same subnet", back: "No router needed" },
    { front: "Different subnet", back: "Router or Layer 3 gateway needed" },
    { front: "DNS failure clue", back: "IP works, name fails" },
    { front: "Unknown unicast", back: "Flooded by switch" }
  ]
},

{
  day: 8,
  title: "Cisco IOS Basics — CLI, Modes, Saving Config",
  lesson: `GOAL:
Become comfortable moving around Cisco IOS.

IOS MODES:
User EXEC:
Router>
Limited viewing.

Privileged EXEC:
Router#
Full show/debug access.

Global config:
Router(config)#
Device-wide configuration.

Interface config:
Router(config-if)#
Port/interface configuration.

CRITICAL IDEA:
running-config = active config in RAM
startup-config = saved config in NVRAM

If you do not save, config can disappear after reboot.

EXAM TRAPS:
- Router interfaces are often shutdown by default
- Wrong mode = command will not work
- Forgetting copy run start loses config
- show commands usually run from privileged EXEC
- configure terminal enters global config

REAL SCENARIO:
You configured an interface IP but cannot ping.
Check:
1. correct interface
2. no shutdown
3. correct IP/mask
4. interface status up/up`,
  commands: [
    "enable                           // enter privileged EXEC mode",
    "configure terminal               // enter global config mode",
    "hostname R1                      // set device hostname",
    "interface g0/0                   // enter interface config mode",
    "description LAN interface        // add interface description",
    "ip address 192.168.1.1 255.255.255.0 // assign IPv4 address",
    "no shutdown                      // enable interface",
    "show running-config              // view active config",
    "show startup-config              // view saved boot config",
    "copy running-config startup-config // save config permanently"
  ],
  lab: [
    "Open a router CLI",
    "Enter privileged EXEC mode",
    "Enter global config mode",
    "Set hostname to R1",
    "Configure interface g0/0 with IP address",
    "Use no shutdown",
    "Verify with show ip interface brief",
    "Save config",
    "Reload and confirm config remains"
  ],
  quiz: [
    { q: "What prompt means privileged EXEC mode?", a: "Router#" },
    { q: "What command enters global config mode?", a: "configure terminal" },
    { q: "What command enables a shutdown interface?", a: "no shutdown" },
    { q: "Where is running-config stored?", a: "RAM" },
    { q: "Where is startup-config stored?", a: "NVRAM" },
    { q: "What command saves the active config?", a: "copy running-config startup-config" },
    { q: "What command quickly checks interface IP and status?", a: "show ip interface brief" }
  ],
  flashcards: [
    { front: "Router>", back: "User EXEC mode" },
    { front: "Router#", back: "Privileged EXEC mode" },
    { front: "Router(config)#", back: "Global configuration mode" },
    { front: "running-config", back: "Active config in RAM" },
    { front: "startup-config", back: "Saved config in NVRAM" }
  ]
},
{
  day: 9,
  title: "VLANs — Broadcast Domains and Access Ports",
  lesson: `GOAL:
Understand how VLANs segment a switched network.

CORE IDEA:
A VLAN is a separate logical LAN on a switch.

Each VLAN is a separate broadcast domain.

WHY VLANs EXIST:
Without VLANs, all devices on a switch share the same broadcast domain.

With VLANs:
- Users can be separated from servers
- Voice can be separated from data
- Security improves
- Broadcast traffic is reduced

ACCESS PORT:
An access port belongs to one VLAN.

Example:
PC plugged into fa0/1.
fa0/1 assigned to VLAN 10.
That PC is now in VLAN 10.

IMPORTANT:
Different VLANs usually use different IP subnets.

Example:
VLAN 10 = 192.168.10.0/24
VLAN 20 = 192.168.20.0/24

VLANs do not communicate automatically.
They need inter-VLAN routing.

EXAM TRAPS:
- Creating VLAN is not enough; assign ports too
- VLAN must exist locally on the switch
- Same VLAN can communicate at Layer 2
- Different VLANs need Layer 3 routing
- Wrong access VLAN = host placed in wrong network

REAL SCENARIO:
PC cannot reach another PC in same department.
Check:
1. switchport access VLAN
2. VLAN exists
3. IP/subnet
4. cable/interface status`,
  commands: [
    "vlan 10                          // create VLAN 10",
    "name USERS                       // name VLAN",
    "interface fa0/1                  // enter switchport",
    "switchport mode access           // make port access mode",
    "switchport access vlan 10        // assign port to VLAN 10",
    "show vlan brief                  // verify VLANs and port assignments",
    "show interfaces status           // verify port status"
  ],
  lab: [
    "Create VLAN 10 and VLAN 20",
    "Assign PC1 port to VLAN 10",
    "Assign PC2 port to VLAN 10",
    "Verify PC1 can ping PC2",
    "Move PC2 to VLAN 20",
    "Verify ping fails",
    "Explain why inter-VLAN routing is needed"
  ],
  quiz: [
    { q: "What does a VLAN separate?", a: "Broadcast domains" },
    { q: "What kind of port belongs to one VLAN?", a: "Access port" },
    { q: "Can VLAN 10 talk to VLAN 20 without routing?", a: "No" },
    { q: "What command verifies VLAN assignments?", a: "show vlan brief" },
    { q: "If a PC is in the wrong VLAN, what should you check?", a: "switchport access vlan configuration" },
    { q: "Does creating a VLAN automatically assign ports?", a: "No" }
  ],
  flashcards: [
    { front: "VLAN", back: "Logical LAN / separate broadcast domain" },
    { front: "Access port", back: "Switchport assigned to one VLAN" },
    { front: "show vlan brief", back: "Verifies VLANs and assigned ports" },
    { front: "Different VLANs", back: "Require Layer 3 routing to communicate" }
  ]
},
{
  day: 10,
  title: "Trunking — Carrying Multiple VLANs",
  lesson: `GOAL:
Understand how VLANs travel between switches.

CORE IDEA:
A trunk link carries multiple VLANs across one physical link.

Without trunking:
VLAN 10 on Switch1 cannot properly extend to VLAN 10 on Switch2.

802.1Q:
802.1Q adds a VLAN tag to Ethernet frames.

Native VLAN:
The native VLAN is sent untagged on an 802.1Q trunk.

Allowed VLAN list:
Controls which VLANs may cross a trunk.

COMMON FAILURE:
PC1 in VLAN 10 on Switch1 cannot ping PC2 in VLAN 10 on Switch2.

Possible causes:
- trunk not formed
- VLAN 10 not allowed
- VLAN 10 missing on one switch
- access port assigned wrongly
- native VLAN mismatch

EXAM TRAPS:
- Access ports carry one VLAN
- Trunks carry multiple VLANs
- Native VLAN mismatch can cause issues
- VLAN allowed list can silently block traffic
- show vlan brief does not prove trunking is working

REAL SCENARIO:
Same VLAN across two switches fails.
Check show interfaces trunk first.`,
  commands: [
    "interface g0/1                    // enter trunk interface",
    "switchport mode trunk             // force trunk mode",
    "switchport trunk allowed vlan 10,20 // allow VLANs 10 and 20",
    "switchport trunk native vlan 99   // set native VLAN",
    "show interfaces trunk             // verify trunk status and allowed VLANs",
    "show vlan brief                   // verify VLAN exists locally"
  ],
  lab: [
    "Build two switches connected together",
    "Create VLAN 10 and 20 on both switches",
    "Configure link between switches as trunk",
    "Place PC1 in VLAN 10 on Switch1",
    "Place PC2 in VLAN 10 on Switch2",
    "Verify ping works",
    "Remove VLAN 10 from allowed list",
    "Verify ping fails",
    "Add VLAN 10 back and confirm fix"
  ],
  quiz: [
    { q: "What does a trunk carry?", a: "Multiple VLANs" },
    { q: "What standard tags VLAN frames?", a: "802.1Q" },
    { q: "Which VLAN is untagged on a trunk?", a: "Native VLAN" },
    { q: "What command verifies trunk status?", a: "show interfaces trunk" },
    { q: "If VLAN exists but does not cross trunk, what should you check?", a: "Allowed VLAN list" },
    { q: "Can an access port carry multiple VLANs?", a: "No" }
  ],
  flashcards: [
    { front: "Trunk", back: "Link carrying multiple VLANs" },
    { front: "802.1Q", back: "VLAN tagging standard" },
    { front: "Native VLAN", back: "Untagged VLAN on trunk" },
    { front: "Allowed VLAN list", back: "Controls which VLANs can cross trunk" }
  ]
},
{
  day: 11,
  title: "Inter-VLAN Routing — Router-on-a-Stick and SVIs",
  lesson: `GOAL:
Make different VLANs communicate.

CORE IDEA:
VLANs are separate Layer 2 broadcast domains.
To communicate between VLANs, you need Layer 3 routing.

METHOD 1:
Router-on-a-stick.

One router physical interface uses subinterfaces:
g0/0.10 for VLAN 10
g0/0.20 for VLAN 20

Each subinterface needs:
- encapsulation dot1Q VLAN ID
- IP address for that VLAN gateway

METHOD 2:
Layer 3 switch with SVIs.

SVI:
interface vlan 10
This acts as the default gateway for VLAN 10.

EXAM TRAPS:
- Switch-to-router link must be trunk
- dot1Q VLAN ID must match VLAN
- PC default gateway must point to VLAN gateway
- Parent router interface must be no shutdown
- VLAN must exist on switch

REAL SCENARIO:
VLAN 10 cannot ping VLAN 20.
Check:
1. PC gateway
2. trunk to router/L3 switch
3. subinterface dot1Q
4. gateway IP
5. routing enabled`,
  commands: [
    "interface g0/0.10                 // create subinterface for VLAN 10",
    "encapsulation dot1Q 10            // tag VLAN 10",
    "ip address 192.168.10.1 255.255.255.0 // VLAN 10 gateway",
    "interface g0/0.20                 // create subinterface for VLAN 20",
    "encapsulation dot1Q 20            // tag VLAN 20",
    "ip address 192.168.20.1 255.255.255.0 // VLAN 20 gateway",
    "no shutdown                       // enable parent interface",
    "show ip interface brief           // verify subinterfaces"
  ],
  lab: [
    "Create VLAN 10 and VLAN 20",
    "Configure switch ports for PCs",
    "Configure trunk from switch to router",
    "Create router subinterfaces",
    "Set PC gateways correctly",
    "Ping VLAN 10 to VLAN 20",
    "Break dot1Q VLAN number",
    "Troubleshoot and fix"
  ],
  quiz: [
    { q: "What is required for VLANs to communicate?", a: "Layer 3 routing" },
    { q: "Router-on-a-stick uses what?", a: "Router subinterfaces" },
    { q: "Switch link to router must be what mode?", a: "Trunk" },
    { q: "What command assigns VLAN tag on router subinterface?", a: "encapsulation dot1Q" },
    { q: "What should PC default gateway be?", a: "Gateway IP for its VLAN" },
    { q: "What is an SVI?", a: "Switch Virtual Interface" }
  ],
  flashcards: [
    { front: "Inter-VLAN routing", back: "Layer 3 routing between VLANs" },
    { front: "Router-on-a-stick", back: "Router subinterfaces route multiple VLANs" },
    { front: "SVI", back: "Layer 3 VLAN interface on switch" },
    { front: "dot1Q", back: "802.1Q VLAN tagging on subinterface" }
  ]
},
{
  day: 12,
  title: "STP — Stopping Layer 2 Meltdowns",
  lesson: `GOAL:
Understand how STP prevents switching loops.

WHY STP EXISTS:
Layer 2 Ethernet has no TTL.
If a loop exists, frames can circulate forever.

Without STP:
- broadcast storms
- MAC table instability
- duplicate frames
- network meltdown

STP SOLUTION:
STP blocks selected ports to create a loop-free topology.

ROOT BRIDGE:
The central reference switch.
Lowest Bridge ID wins.

Bridge ID:
priority + MAC address

Lower priority wins.
If priority ties, lower MAC wins.

PORT ROLES:
Root port:
Best path toward root bridge.

Designated port:
Best forwarding port on a segment.

Blocked port:
Prevents loop.

PORTFAST:
Used on access ports connected to end devices.
Skips listening/learning delay.

BPDU GUARD:
If a PortFast port receives BPDU, port becomes err-disabled.

EXAM TRAPS:
- Lowest Bridge ID wins
- Lower priority is better
- Do not use PortFast on switch-to-switch trunks
- BPDU Guard protects access ports
- Blocked port is normal in redundant Layer 2 topology`,
  commands: [
    "show spanning-tree                // view STP root, roles, states",
    "spanning-tree vlan 1 priority 4096 // influence root bridge election",
    "spanning-tree portfast            // enable PortFast on access port",
    "spanning-tree bpduguard enable    // enable BPDU Guard on port"
  ],
  lab: [
    "Build three switches in triangle",
    "View STP topology",
    "Identify root bridge",
    "Identify blocked port",
    "Change root bridge priority",
    "Enable PortFast on access ports",
    "Explain why one port blocks"
  ],
  quiz: [
    { q: "What does STP prevent?", a: "Layer 2 loops" },
    { q: "Which bridge becomes root?", a: "Lowest Bridge ID" },
    { q: "What makes up Bridge ID?", a: "Priority and MAC address" },
    { q: "Which port role blocks loops?", a: "Blocked port" },
    { q: "Where should PortFast be used?", a: "Access ports connected to end devices" },
    { q: "What does BPDU Guard do?", a: "Err-disables port if BPDU is received" }
  ],
  flashcards: [
    { front: "STP", back: "Spanning Tree Protocol prevents Layer 2 loops" },
    { front: "Root bridge", back: "Central STP reference switch" },
    { front: "Bridge ID", back: "Priority + MAC address" },
    { front: "PortFast", back: "Fast transition for end-device access ports" },
    { front: "BPDU Guard", back: "Protects PortFast ports from switch connections" }
  ]
},
{
  day: 13,
  title: "EtherChannel — Bundling Links Like a Pro",
  lesson: `GOAL:
Understand how multiple physical links become one logical link.

WHY ETHERCHANNEL:
If you connect two switches with multiple links, STP may block some links.

EtherChannel bundles links so STP sees them as one logical link.

BENEFITS:
- more bandwidth
- redundancy
- cleaner STP topology
- one logical port-channel

PROTOCOLS:
LACP:
Open standard.

PAgP:
Cisco proprietary.

STATIC:
Mode on. No negotiation.

LACP MODES:
active + active = works
active + passive = works
passive + passive = fails

IMPORTANT:
Member links must match:
- speed
- duplex
- access/trunk mode
- allowed VLANs
- native VLAN

EXAM TRAPS:
- Configure settings on port-channel, not only physical links
- Mismatched trunk settings break bundle
- passive/passive does not form
- STP sees EtherChannel as one link`,
  commands: [
    "interface range g0/1-2            // select multiple interfaces",
    "channel-group 1 mode active       // create LACP EtherChannel",
    "interface port-channel 1          // configure logical bundle",
    "switchport mode trunk             // make port-channel trunk",
    "show etherchannel summary         // verify EtherChannel status"
  ],
  lab: [
    "Connect two switches with two links",
    "Configure LACP active mode",
    "Verify EtherChannel forms",
    "Configure port-channel as trunk",
    "Allow VLAN 10 and 20",
    "Disconnect one link and verify traffic still works",
    "Break allowed VLAN mismatch and observe issue"
  ],
  quiz: [
    { q: "What does EtherChannel create?", a: "One logical link from multiple physical links" },
    { q: "Which EtherChannel protocol is open standard?", a: "LACP" },
    { q: "Which LACP combination fails?", a: "passive + passive" },
    { q: "What command verifies EtherChannel?", a: "show etherchannel summary" },
    { q: "What interface represents the bundle?", a: "port-channel" },
    { q: "Why use EtherChannel with STP?", a: "STP sees bundle as one link" }
  ],
  flashcards: [
    { front: "EtherChannel", back: "Bundles physical links into one logical link" },
    { front: "LACP", back: "Open standard EtherChannel protocol" },
    { front: "PAgP", back: "Cisco proprietary EtherChannel protocol" },
    { front: "active + passive", back: "LACP works" },
    { front: "passive + passive", back: "LACP fails" }
  ]
},
{
  day: 14,
  title: "Wireless + Network Access Review",
  lesson: `GOAL:
Understand CCNA wireless basics and review switching topics.

WIRELESS TERMS:
SSID:
Wireless network name users see.

BSSID:
MAC address of the AP radio.

Access Point:
Provides wireless access.

WLC:
Wireless LAN Controller.
Centrally manages lightweight APs.

FREQUENCY BANDS:
2.4 GHz:
- longer range
- more interference
- fewer non-overlapping channels

5 GHz:
- shorter range
- faster
- more channels
- less interference than 2.4 GHz

SECURITY:
WEP:
Old and insecure. Avoid.

WPA2/WPA3:
Modern wireless security.

WPA3:
Stronger than WPA2.

NETWORK ACCESS REVIEW:
By now you should understand:
- VLANs
- trunks
- inter-VLAN routing
- STP
- EtherChannel
- wireless basics

EXAM TRAPS:
- SSID is not BSSID
- 2.4 GHz range is better, but interference is worse
- WLC manages lightweight APs
- VLAN trunk issues often look like host issues
- STP blocking can be normal, not always a failure

REAL SCENARIO:
Wireless users connect but cannot reach server.
Check:
1. SSID/VLAN mapping
2. DHCP assignment
3. default gateway
4. ACL/firewall
5. routing`,
  commands: [
    "show vlan brief                   // verify VLAN access assignments",
    "show interfaces trunk             // verify trunks and allowed VLANs",
    "show spanning-tree                // verify STP root and blocked ports",
    "show etherchannel summary         // verify bundled links"
  ],
  lab: [
    "Draw a wireless network with AP and WLC",
    "Identify SSID and BSSID",
    "Compare 2.4 GHz and 5 GHz",
    "Review VLAN/trunk/STP/EtherChannel topology",
    "Troubleshoot a fake wireless VLAN issue",
    "Write your weakest Network Access topic"
  ],
  quiz: [
    { q: "What is SSID?", a: "Wireless network name" },
    { q: "What is BSSID?", a: "AP radio MAC address" },
    { q: "Which band usually has longer range?", a: "2.4 GHz" },
    { q: "Which band usually has higher throughput?", a: "5 GHz" },
    { q: "Which wireless security is obsolete?", a: "WEP" },
    { q: "What does a WLC manage?", a: "Lightweight access points" },
    { q: "What command verifies trunks?", a: "show interfaces trunk" }
  ],
  flashcards: [
    { front: "SSID", back: "Wireless network name" },
    { front: "BSSID", back: "AP radio MAC address" },
    { front: "WLC", back: "Wireless LAN Controller" },
    { front: "2.4 GHz", back: "Longer range, more interference" },
    { front: "5 GHz", back: "Higher throughput, shorter range" },
    { front: "WEP", back: "Old insecure wireless security" }
  ]
},

{
  day: 15,
  title: "Routing Basics — How Packets Find Networks",
  lesson: `GOAL:
Understand how routers choose paths.

CORE IDEA:
Routers forward packets using destination IP address.

ROUTE TYPES:
Connected = interface directly attached
Static = manually configured
Dynamic = learned by routing protocol

ROUTE DECISION ORDER:
1. Longest prefix match
2. Lowest administrative distance
3. Best metric

DEFAULT ROUTE:
0.0.0.0/0
Used when no more specific route exists.

EXAM TRAPS:
- Longest prefix match beats administrative distance
- Missing return route breaks ping
- Interface must be up/up for connected route
- No route = packet dropped

REAL SCENARIO:
PC can ping gateway but not remote network.
Local LAN works. Now check routing beyond gateway.`,
  commands: [
    "show ip route                     // view routing table",
    "show ip interface brief           // verify interface status",
    "ping <ip>                         // test reachability",
    "traceroute <ip>                   // find where path fails",
    "ip route 0.0.0.0 0.0.0.0 <next-hop> // create default route"
  ],
  lab: [
    "Build 2 routers and 2 LANs",
    "Configure IP addresses",
    "Verify connected routes",
    "Add static/default routes",
    "Ping end-to-end",
    "Remove return route and observe failure",
    "Explain why reply traffic cannot return"
  ],
  quiz: [
    { q: "What does a router use to forward packets?", a: "Destination IP address" },
    { q: "What route wins first?", a: "Longest prefix match" },
    { q: "What is default route?", a: "0.0.0.0/0" },
    { q: "What happens with no matching route?", a: "Packet is dropped" },
    { q: "Connected route appears when?", a: "Interface is up/up with IP address" }
  ],
  flashcards: [
    { front: "Routing table", back: "Used by router to forward packets" },
    { front: "Connected route", back: "Directly attached network" },
    { front: "Default route", back: "0.0.0.0/0" },
    { front: "Longest prefix match", back: "Most specific route wins" }
  ]
},
{
  day: 16,
  title: "Static Routing — Manual Path Control",
  lesson: `GOAL:
Configure and troubleshoot static routes.

CORE IDEA:
Static routes are manually created routes.

Syntax:
ip route <destination-network> <mask> <next-hop>

Example:
ip route 192.168.2.0 255.255.255.0 10.0.0.2

IMPORTANT:
Routing must work both ways.
Forward route + return route are both required.

EXAM TRAPS:
- Wrong next-hop
- Missing return route
- Interface down
- Default route missing
- Static route preferred over OSPF for same prefix because AD is lower

REAL SCENARIO:
R1 can send packet to R2 LAN, but reply cannot return.
Likely missing return route on R2.`,
  commands: [
    "ip route <network> <mask> <next-hop> // create static route",
    "ip route 0.0.0.0 0.0.0.0 <next-hop> // create default route",
    "show ip route                     // verify route installed",
    "ping <ip>                         // test connectivity",
    "traceroute <ip>                   // verify path"
  ],
  lab: [
    "Build 3 routers in a line",
    "Configure LANs on edge routers",
    "Add static routes manually",
    "Ping PC-to-PC across routers",
    "Remove one return route",
    "Troubleshoot using show ip route",
    "Fix the broken route"
  ],
  quiz: [
    { q: "Static route is configured manually or dynamically?", a: "Manually" },
    { q: "What must next-hop be?", a: "Reachable" },
    { q: "If reply route is missing, what happens?", a: "Ping fails" },
    { q: "Default route command uses what destination?", a: "0.0.0.0 0.0.0.0" },
    { q: "Static route AD by default?", a: "1" }
  ],
  flashcards: [
    { front: "Static route", back: "Manually configured route" },
    { front: "Next-hop", back: "Next router IP used to reach destination" },
    { front: "Return route", back: "Route needed for reply traffic" },
    { front: "Static AD", back: "1 by default" }
  ]
},
{
  day: 17,
  title: "OSPF Basics — Dynamic Routing",
  lesson: `GOAL:
Understand how OSPF routers learn routes automatically.

CORE IDEA:
OSPF is a dynamic link-state routing protocol.

Instead of manually adding every route, routers exchange route information.

KEY TERMS:
Neighbor:
Another OSPF router sharing routing information.

Area:
Logical grouping of OSPF routers.
Area 0 is backbone.

Router ID:
Unique identifier for each OSPF router.

Metric:
OSPF uses cost.

WILDCARD MASK:
Inverse of subnet mask.

/24 mask = 255.255.255.0
Wildcard = 0.0.0.255

EXAM TRAPS:
- Area mismatch prevents adjacency
- Duplicate router ID causes problems
- Wrong wildcard advertises wrong network
- Passive interface stops neighbor formation
- OSPF AD is 110

REAL SCENARIO:
Two routers connected but no OSPF neighbor.
Check same subnet, same area, timers, passive interface, router ID.`,
  commands: [
    "router ospf 1                     // start OSPF process",
    "router-id 1.1.1.1                 // set router ID",
    "network 192.168.1.0 0.0.0.255 area 0 // advertise /24 into area 0",
    "show ip ospf neighbor             // verify OSPF neighbors",
    "show ip route ospf                // view OSPF-learned routes",
    "show ip protocols                 // verify routing protocol settings"
  ],
  lab: [
    "Build 2 routers",
    "Configure interface IPs",
    "Enable OSPF process 1",
    "Set unique router IDs",
    "Advertise connected networks",
    "Verify neighbors form",
    "Verify OSPF routes appear",
    "Ping across learned networks"
  ],
  quiz: [
    { q: "What type of routing protocol is OSPF?", a: "Link-state" },
    { q: "Main OSPF backbone area?", a: "Area 0" },
    { q: "OSPF metric?", a: "Cost" },
    { q: "Wildcard for /24?", a: "0.0.0.255" },
    { q: "OSPF administrative distance?", a: "110" },
    { q: "Command to verify neighbors?", a: "show ip ospf neighbor" }
  ],
  flashcards: [
    { front: "OSPF", back: "Open Shortest Path First" },
    { front: "Area 0", back: "OSPF backbone area" },
    { front: "Router ID", back: "Unique OSPF router identifier" },
    { front: "OSPF metric", back: "Cost" },
    { front: "OSPF AD", back: "110" }
  ]
},
{
  day: 18,
  title: "OSPF Troubleshooting — Neighbor and Route Failures",
  lesson: `GOAL:
Diagnose why OSPF is not working.

COMMON OSPF FAILURES:
- Area mismatch
- Subnet mismatch
- Duplicate router ID
- Passive interface
- Wrong wildcard mask
- Interface down
- Authentication mismatch

NEIGHBOR STATES:
DOWN:
No hellos received.

INIT:
Hello received, but two-way communication not confirmed.

2-WAY:
Normal for DROTHER-to-DROTHER on broadcast networks.

FULL:
Adjacency complete.

TROUBLESHOOTING FLOW:
1. show ip interface brief
2. show ip ospf neighbor
3. show ip protocols
4. show running-config
5. verify network statements
6. verify area numbers

EXAM TRAPS:
- 2-WAY is not always broken
- Passive interface advertises network but forms no neighbor
- Wrong wildcard may miss interface
- Same subnet and area required

REAL SCENARIO:
Network statement looks close but wildcard is wrong.
OSPF never activates on interface.`,
  commands: [
    "show ip ospf neighbor             // check neighbor state",
    "show ip ospf interface brief      // check OSPF interfaces and areas",
    "show ip protocols                 // verify advertised networks",
    "show running-config | section ospf // inspect OSPF config",
    "debug ip ospf adj                 // advanced adjacency debugging"
  ],
  lab: [
    "Build 3-router OSPF topology",
    "Make all neighbors FULL",
    "Break area number on one link",
    "Observe neighbor failure",
    "Fix area mismatch",
    "Make one interface passive",
    "Observe neighbor loss",
    "Fix and document troubleshooting steps"
  ],
  quiz: [
    { q: "OSPF neighbors must share what?", a: "Same subnet and same area" },
    { q: "What state means adjacency complete?", a: "FULL" },
    { q: "Can 2-WAY be normal?", a: "Yes, on broadcast networks between DROTHER routers" },
    { q: "What does passive interface prevent?", a: "Neighbor formation" },
    { q: "What command shows OSPF interfaces?", a: "show ip ospf interface brief" },
    { q: "What can duplicate router ID cause?", a: "OSPF adjacency/routing problems" }
  ],
  flashcards: [
    { front: "FULL", back: "OSPF adjacency complete" },
    { front: "INIT", back: "One-way OSPF communication" },
    { front: "2-WAY", back: "Can be normal on broadcast networks" },
    { front: "Passive interface", back: "Advertises network but blocks neighbor formation" },
    { front: "Wildcard mistake", back: "May prevent interface from joining OSPF" }
  ]
},
{
  day: 19,
  title: "FHRP / HSRP — Default Gateway Redundancy",
  lesson: `GOAL:
Understand how networks survive gateway failure.

PROBLEM:
Hosts normally use one default gateway.
If that router fails, hosts lose access outside the subnet.

SOLUTION:
FHRP provides gateway redundancy.

HSRP:
Hot Standby Router Protocol.
Cisco FHRP.

HOW HSRP WORKS:
Two routers share a virtual IP.
Hosts use the virtual IP as default gateway.

ROLES:
Active:
Currently forwards traffic.

Standby:
Takes over if active fails.

PRIORITY:
Higher priority becomes active.

PREEMPT:
Allows higher-priority router to reclaim active role when it returns.

EXAM TRAPS:
- Hosts use virtual IP, not physical router IP
- Higher priority wins
- Preempt is needed for takeover after recovery
- HSRP provides gateway redundancy, not routing protocol replacement

REAL SCENARIO:
Users lose internet when R1 fails.
With HSRP, R2 should automatically take over virtual gateway.`,
  commands: [
    "standby 1 ip 192.168.1.1          // set HSRP virtual IP",
    "standby 1 priority 110            // set higher priority",
    "standby 1 preempt                 // allow router to reclaim active role",
    "show standby                      // verify HSRP status"
  ],
  lab: [
    "Create two routers on same LAN",
    "Assign physical IPs",
    "Configure shared HSRP virtual IP",
    "Set R1 higher priority",
    "Configure PC gateway as virtual IP",
    "Verify active/standby",
    "Shutdown active router",
    "Confirm standby takes over"
  ],
  quiz: [
    { q: "What problem does HSRP solve?", a: "Default gateway failure" },
    { q: "What IP should hosts use?", a: "Virtual IP" },
    { q: "Which HSRP router forwards traffic?", a: "Active" },
    { q: "Which HSRP router waits as backup?", a: "Standby" },
    { q: "Higher or lower priority wins?", a: "Higher priority" },
    { q: "What does preempt do?", a: "Allows higher-priority router to become active again" }
  ],
  flashcards: [
    { front: "HSRP", back: "Hot Standby Router Protocol" },
    { front: "Virtual IP", back: "Shared default gateway address" },
    { front: "Active router", back: "Currently forwards traffic" },
    { front: "Standby router", back: "Backup gateway" },
    { front: "Preempt", back: "Allows priority winner to reclaim active role" }
  ]
},
{
  day: 20,
  title: "DHCP, DNS, NTP — Core IP Services",
  lesson: `GOAL:
Understand the services that make networks usable.

DHCP:
Automatically assigns IP settings.

DHCP provides:
- IP address
- subnet mask
- default gateway
- DNS server

DORA PROCESS:
Discover
Offer
Request
Acknowledge

DHCP uses UDP 67/68.

DHCP RELAY:
DHCP broadcasts do not cross routers by default.
ip helper-address forwards DHCP requests to remote server.

DNS:
Resolves names to IP addresses.

If ping 8.8.8.8 works but google.com fails:
Suspect DNS.

NTP:
Synchronizes time.
Important for logs, certificates, troubleshooting, security.

NTP uses UDP 123.

EXAM TRAPS:
- APIPA 169.254.x.x means DHCP failed
- DNS failure is not always internet failure
- Wrong default-router in DHCP breaks remote access
- DHCP relay needed across subnets
- Time mismatch can break security/log analysis

REAL SCENARIO:
PC gets IP but cannot reach other networks.
Check DHCP default gateway option.`,
  commands: [
    "ip dhcp pool USERS                // create DHCP pool",
    "network 192.168.10.0 255.255.255.0 // define DHCP subnet",
    "default-router 192.168.10.1       // give clients gateway",
    "dns-server 8.8.8.8                // give clients DNS server",
    "show ip dhcp binding              // view DHCP leases",
    "ip helper-address <server-ip>     // forward DHCP to remote server",
    "ntp server <ip>                   // configure NTP server",
    "show clock                        // verify device time"
  ],
  lab: [
    "Configure DHCP pool for VLAN 10",
    "Set default-router and DNS server",
    "Set PC to DHCP",
    "Verify assigned IP",
    "Check DHCP binding table",
    "Misconfigure default-router",
    "Observe remote connectivity fail",
    "Fix DHCP gateway option",
    "Configure NTP server"
  ],
  quiz: [
    { q: "What does DHCP provide?", a: "IP, mask, gateway, DNS" },
    { q: "DHCP process?", a: "DORA" },
    { q: "DHCP ports?", a: "UDP 67/68" },
    { q: "What does 169.254.x.x usually mean?", a: "DHCP failed" },
    { q: "DNS function?", a: "Resolve names to IP addresses" },
    { q: "NTP port?", a: "UDP 123" },
    { q: "Command for DHCP relay?", a: "ip helper-address" }
  ],
  flashcards: [
    { front: "DHCP", back: "Automatically assigns IP settings" },
    { front: "DORA", back: "Discover, Offer, Request, Acknowledge" },
    { front: "DNS", back: "Name to IP resolution" },
    { front: "NTP", back: "Time synchronization" },
    { front: "ip helper-address", back: "Forwards DHCP requests across routers" }
  ]
},

{
  day: 21,
  title: "NAT / PAT — Internet Access for Private IPs",
  lesson: `GOAL:
Understand how private networks reach the internet.

CORE IDEA:
Private IPs are not routable on the public internet.
NAT translates private IPs to public IPs.

NAT TYPES:
Static NAT:
One private IP maps to one public IP.

Dynamic NAT:
Private IPs use a pool of public IPs.

PAT / NAT Overload:
Many private IPs share one public IP using port numbers.

MOST COMMON:
PAT overload.

INSIDE / OUTSIDE:
LAN interface = ip nat inside
WAN interface = ip nat outside

EXAM TRAPS:
- Inside/outside reversed breaks NAT
- NAT ACL must match inside subnet
- Routing must work before NAT matters
- Forgetting overload prevents PAT
- show ip nat translations proves NAT is working`,
  commands: [
    "ip nat inside                     // mark LAN interface",
    "ip nat outside                    // mark WAN interface",
    "access-list 1 permit 192.168.10.0 0.0.0.255 // match inside LAN",
    "ip nat inside source list 1 interface g0/0 overload // enable PAT",
    "show ip nat translations          // view NAT mappings",
    "show ip nat statistics            // view NAT stats"
  ],
  lab: [
    "Mark LAN interface as NAT inside",
    "Mark WAN interface as NAT outside",
    "Create ACL for LAN subnet",
    "Configure PAT overload",
    "Ping outside network",
    "Verify translations",
    "Break ACL and observe NAT failure",
    "Fix ACL"
  ],
  quiz: [
    { q: "What does PAT allow?", a: "Many private hosts sharing one public IP" },
    { q: "What command verifies active NAT mappings?", a: "show ip nat translations" },
    { q: "LAN interface should be marked as?", a: "ip nat inside" },
    { q: "WAN interface should be marked as?", a: "ip nat outside" },
    { q: "What keyword enables PAT?", a: "overload" },
    { q: "What must NAT ACL match?", a: "Inside local subnet" }
  ],
  flashcards: [
    { front: "NAT", back: "Translates private/public IP addresses" },
    { front: "PAT", back: "Many private IPs share one public IP using ports" },
    { front: "Inside local", back: "Private IP before translation" },
    { front: "Inside global", back: "Public IP after translation" }
  ]
},
{
  day: 22,
  title: "ACL Basics — Filtering Traffic Correctly",
  lesson: `GOAL:
Understand how ACLs permit and deny traffic.

CORE IDEA:
ACLs are rule lists processed top-down.

RULES:
1. Read from top to bottom
2. First match wins
3. Invisible implicit deny at the end

STANDARD ACL:
Matches source IP only.
Place close to destination.

EXTENDED ACL:
Matches source, destination, protocol, port.
Place close to source.

EXAM TRAPS:
- Missing permit means everything else dies
- Wrong direction breaks expected behavior
- Standard ACL near source can block too much
- Wildcard mask mistakes are common
- First match wins, not best match`,
  commands: [
    "access-list 10 permit 192.168.10.0 0.0.0.255 // standard ACL",
    "access-list 10 deny any           // explicit deny",
    "ip access-group 10 in             // apply ACL inbound",
    "show access-lists                 // view ACL and hit counts",
    "show running-config               // verify ACL placement"
  ],
  lab: [
    "Create standard ACL",
    "Permit one subnet",
    "Apply ACL inbound",
    "Test allowed traffic",
    "Test denied traffic",
    "Check hit counts",
    "Move ACL to wrong interface",
    "Observe bad behavior and fix"
  ],
  quiz: [
    { q: "ACL processing rule?", a: "Top-down, first match wins" },
    { q: "What exists at end of every ACL?", a: "Implicit deny" },
    { q: "Standard ACL matches what?", a: "Source IP only" },
    { q: "Extended ACL matches what?", a: "Source, destination, protocol, port" },
    { q: "Standard ACL should be placed close to?", a: "Destination" },
    { q: "Extended ACL should be placed close to?", a: "Source" }
  ],
  flashcards: [
    { front: "Implicit deny", back: "Hidden deny all at end of ACL" },
    { front: "Standard ACL", back: "Source IP only" },
    { front: "Extended ACL", back: "Source, destination, protocol, port" },
    { front: "First match wins", back: "ACL stops checking after first match" }
  ]
},
{
  day: 23,
  title: "Extended ACLs — Real Traffic Control",
  lesson: `GOAL:
Use extended ACLs for precise filtering.

CORE IDEA:
Extended ACLs can filter based on:
- protocol
- source IP
- destination IP
- TCP/UDP port

EXAMPLE:
Block HTTP from VLAN 10 to server 10.10.10.5.
Allow everything else.

Important:
If you deny specific traffic but want other traffic allowed, add:
permit ip any any

EXAM TRAPS:
- Source and destination reversed
- Wrong port number
- Missing final permit
- ACL applied wrong direction
- eq 80 = HTTP
- eq 443 = HTTPS
- eq 22 = SSH`,
  commands: [
    "access-list 101 deny tcp 192.168.10.0 0.0.0.255 host 10.10.10.5 eq 80",
    "access-list 101 permit ip any any",
    "ip access-group 101 in",
    "show access-lists",
    "show running-config"
  ],
  lab: [
    "Create user VLAN",
    "Create server network",
    "Block HTTP to one server",
    "Allow ping and HTTPS",
    "Apply ACL near source",
    "Test traffic",
    "Check hit counts",
    "Remove permit ip any any and observe damage"
  ],
  quiz: [
    { q: "HTTP port?", a: "TCP 80" },
    { q: "HTTPS port?", a: "TCP 443" },
    { q: "SSH port?", a: "TCP 22" },
    { q: "Why add permit ip any any?", a: "To allow remaining traffic" },
    { q: "Extended ACL should be placed near?", a: "Source" },
    { q: "What command applies ACL to interface?", a: "ip access-group" }
  ],
  flashcards: [
    { front: "eq 80", back: "HTTP" },
    { front: "eq 443", back: "HTTPS" },
    { front: "eq 22", back: "SSH" },
    { front: "permit ip any any", back: "Allows all remaining IP traffic" }
  ]
},
{
  day: 24,
  title: "Device Security — SSH, Passwords, Management Plane",
  lesson: `GOAL:
Secure Cisco device management.

CORE IDEA:
The management plane controls how admins access devices.

BEST PRACTICES:
- Use SSH, not Telnet
- Use enable secret
- Use local username/secret
- Encrypt weak passwords
- Limit VTY access
- Save config

SSH REQUIREMENTS:
1. hostname
2. domain name
3. local user
4. RSA keys
5. VTY login local
6. transport input ssh

EXAM TRAPS:
- Telnet is clear text
- enable secret is better than enable password
- crypto key generation needs hostname + domain name
- transport input ssh disables Telnet if configured alone
- login local uses local username database`,
  commands: [
    "hostname R1",
    "ip domain-name lab.local",
    "username admin secret StrongPass123",
    "enable secret EnablePass123",
    "service password-encryption",
    "crypto key generate rsa",
    "line vty 0 4",
    "login local",
    "transport input ssh"
  ],
  lab: [
    "Set hostname",
    "Set domain name",
    "Create local admin user",
    "Set enable secret",
    "Generate RSA keys",
    "Configure VTY lines for SSH only",
    "Test SSH login",
    "Verify Telnet is disabled"
  ],
  quiz: [
    { q: "Secure replacement for Telnet?", a: "SSH" },
    { q: "SSH port?", a: "TCP 22" },
    { q: "Telnet is secure?", a: "No" },
    { q: "What command allows SSH only on VTY?", a: "transport input ssh" },
    { q: "What does login local use?", a: "Local username database" },
    { q: "Better password command, enable password or enable secret?", a: "enable secret" }
  ],
  flashcards: [
    { front: "SSH", back: "Secure remote CLI access" },
    { front: "Telnet", back: "Insecure clear-text remote access" },
    { front: "enable secret", back: "Encrypted privileged EXEC password" },
    { front: "VTY", back: "Remote access lines" }
  ]
},
{
  day: 25,
  title: "Security Fundamentals — Layer 2 Defense",
  lesson: `GOAL:
Understand common threats and switch security features.

COMMON THREATS:
- rogue DHCP server
- ARP spoofing
- MAC flooding
- unauthorized device
- DoS attack
- phishing/malware

PORT SECURITY:
Limits allowed MAC addresses on access port.

Violation modes:
protect = silently drop
restrict = drop and log
shutdown = err-disable port

DHCP SNOOPING:
Blocks rogue DHCP servers.
Server-facing ports must be trusted.

DYNAMIC ARP INSPECTION:
Protects against ARP spoofing.
Uses DHCP snooping bindings.

BPDU GUARD:
Protects PortFast access ports from switch connections.

EXAM TRAPS:
- DHCP server/uplink ports should be trusted
- User access ports usually untrusted
- DAI depends on DHCP snooping
- shutdown mode err-disables port
- protect mode does not log`,
  commands: [
    "switchport port-security",
    "switchport port-security maximum 2",
    "switchport port-security violation restrict",
    "show port-security",
    "ip dhcp snooping",
    "ip dhcp snooping vlan 10",
    "ip arp inspection vlan 10",
    "spanning-tree bpduguard enable"
  ],
  lab: [
    "Enable port security on access port",
    "Limit MAC addresses",
    "Trigger violation",
    "Compare protect/restrict/shutdown",
    "Enable DHCP snooping",
    "Mark uplink as trusted",
    "Explain DAI protection"
  ],
  quiz: [
    { q: "Port security limits what?", a: "MAC addresses" },
    { q: "Which violation mode err-disables port?", a: "shutdown" },
    { q: "Which feature blocks rogue DHCP servers?", a: "DHCP snooping" },
    { q: "Which feature protects against ARP spoofing?", a: "Dynamic ARP Inspection" },
    { q: "DAI relies on what?", a: "DHCP snooping bindings" },
    { q: "BPDU Guard protects what?", a: "PortFast access ports" }
  ],
  flashcards: [
    { front: "Port security", back: "Limits MAC addresses on port" },
    { front: "DHCP snooping", back: "Blocks rogue DHCP servers" },
    { front: "DAI", back: "Dynamic ARP Inspection" },
    { front: "BPDU Guard", back: "Err-disables access port receiving BPDU" }
  ]
},
{
  day: 26,
  title: "Automation — JSON, REST APIs, Controllers",
  lesson: `GOAL:
Understand CCNA automation basics.

CORE IDEA:
Modern networks are not configured only by hand.
Controllers and APIs automate configuration and monitoring.

JSON:
Data format using key-value pairs.

Example:
{
  "hostname": "R1",
  "vlans": [10, 20]
}

REST API METHODS:
GET = retrieve
POST = create
PUT = replace/update
PATCH = partial update
DELETE = remove

CONTROLLER-BASED NETWORKING:
A controller centrally manages devices.

Benefits:
- consistent policy
- automation
- visibility
- faster changes

EXAM TRAPS:
- JSON keys and strings use quotes
- GET retrieves, does not create
- POST creates
- DELETE removes
- Controller centralizes management, not magic`,
  commands: [],
  lab: [
    "Write a JSON object for a router",
    "Identify keys and values",
    "Explain GET vs POST vs PUT vs DELETE",
    "Draw controller managing switches",
    "Explain why automation reduces manual errors"
  ],
  quiz: [
    { q: "What format uses key-value pairs?", a: "JSON" },
    { q: "REST method to retrieve data?", a: "GET" },
    { q: "REST method to create data?", a: "POST" },
    { q: "REST method to delete data?", a: "DELETE" },
    { q: "Main benefit of controller networking?", a: "Centralized management and policy" },
    { q: "Are JSON keys usually quoted?", a: "Yes" }
  ],
  flashcards: [
    { front: "JSON", back: "Key-value data format" },
    { front: "GET", back: "Retrieve data" },
    { front: "POST", back: "Create data" },
    { front: "DELETE", back: "Remove data" },
    { front: "Controller", back: "Centralized network management system" }
  ]
},
{
  day: 27,
  title: "Full Lab Day — Build, Break, Fix",
  lesson: `GOAL:
Combine CCNA topics into one realistic troubleshooting lab.

TODAY IS NOT THEORY.
Today is proving you can build and fix.

BUILD:
- VLANs
- trunks
- inter-VLAN routing
- OSPF
- DHCP
- NAT/PAT
- ACL
- SSH
- basic security

TROUBLESHOOTING ORDER:
1. Physical
2. VLAN / trunk
3. IP / gateway
4. Routing
5. Services
6. ACL / NAT / security

REAL EXAM MINDSET:
When something fails, do not guess.
Prove each layer.

EXAM TRAPS:
- Multiple things can be correct, but one is best next step
- show commands matter
- fixing symptoms without root cause is weak
- always verify after changes`,
  commands: [
    "show ip interface brief",
    "show vlan brief",
    "show interfaces trunk",
    "show ip route",
    "show ip ospf neighbor",
    "show access-lists",
    "show ip nat translations",
    "show running-config"
  ],
  lab: [
    "Build 2 switches and 2 routers",
    "Create VLAN 10, 20, 30",
    "Configure trunks",
    "Configure inter-VLAN routing",
    "Configure OSPF between routers",
    "Configure DHCP",
    "Configure PAT",
    "Configure ACL blocking one VLAN from server",
    "Enable SSH",
    "Break 3 things intentionally",
    "Troubleshoot and document fixes"
  ],
  quiz: [
    { q: "First troubleshooting layer?", a: "Physical" },
    { q: "Command to verify VLANs?", a: "show vlan brief" },
    { q: "Command to verify trunks?", a: "show interfaces trunk" },
    { q: "Command to verify OSPF neighbors?", a: "show ip ospf neighbor" },
    { q: "Command to verify NAT?", a: "show ip nat translations" },
    { q: "Best troubleshooting mindset?", a: "Prove each layer before guessing" }
  ],
  flashcards: [
    { front: "Full lab rule", back: "Build, break, fix, document" },
    { front: "Troubleshooting", back: "Physical → VLAN → IP → Routing → Services → Security" },
    { front: "Verify after fix", back: "Always confirm the problem is actually solved" }
  ]
},
{
  day: 28,
  title: "Practice Exam 1 — Diagnose Your Weaknesses",
  lesson: `GOAL:
Take a real checkpoint exam and analyze mistakes.

DO NOT ONLY LOOK AT SCORE.
The value is in reviewing wrong answers.

FOR EACH WRONG ANSWER:
1. What topic is it?
2. Why did I choose wrong?
3. What rule did I miss?
4. What command would verify it?
5. How do I avoid this next time?

COMMON WEAK AREAS:
- subnetting
- wildcard masks
- OSPF adjacency
- ACL direction
- NAT inside/outside
- trunk allowed VLANs
- STP root election

READINESS STANDARD:
85%+ = strong
75–84% = close
Below 75% = rebuild weak topics

REAL PRODUCT MINDSET:
Wrong answers are not failure.
They are your roadmap.`,
  commands: [
    "show ip route",
    "show vlan brief",
    "show interfaces trunk",
    "show spanning-tree",
    "show access-lists",
    "show ip nat translations",
    "show ip ospf neighbor"
  ],
  lab: [
    "Take one 30-question exam",
    "Write every wrong answer topic",
    "Redo related lesson",
    "Redo related lab",
    "Retake exam",
    "Compare score improvement"
  ],
  quiz: [
    { q: "Should you only check final score?", a: "No" },
    { q: "What should every wrong answer become?", a: "A study target" },
    { q: "Strong readiness score?", a: "85%+" },
    { q: "Below 75% means?", a: "Rebuild weak topics" },
    { q: "Best review method?", a: "Identify topic, rule missed, verification command" }
  ],
  flashcards: [
    { front: "Wrong answer", back: "Study roadmap" },
    { front: "85%+", back: "Strong readiness" },
    { front: "Review rule", back: "Explain why correct answer is correct" }
  ]
},
{
  day: 29,
  title: "Weakness Cleanup — Targeted Repair Day",
  lesson: `GOAL:
Fix your weakest topics before final exam.

NO NEW CONTENT TODAY.
Only repair.

PICK YOUR WEAKEST 3:
- subnetting
- VLAN/trunking
- inter-VLAN routing
- OSPF
- ACL
- NAT
- DHCP/DNS
- STP/EtherChannel
- security
- automation

METHOD:
1. Re-read topic
2. Redo commands
3. Redo lab
4. Answer 10 questions
5. Explain concept out loud

RULE:
If you cannot explain it simply, you do not own it.

FINAL CHECK:
Subnetting should be fast.
show commands should be automatic.
Troubleshooting order should be natural.`,
  commands: [
    "show ip interface brief",
    "show ip route",
    "show ip protocols",
    "show ip ospf neighbor",
    "show interfaces trunk",
    "show spanning-tree",
    "show access-lists",
    "show ip nat statistics"
  ],
  lab: [
    "Choose weakest 3 topics",
    "Redo one lab per topic",
    "Write mistake notes",
    "Do 30 subnetting questions",
    "Do 30 mixed troubleshooting questions",
    "Retake final random exam",
    "Repeat until 85%+"
  ],
  quiz: [
    { q: "Should you learn new topics today?", a: "No" },
    { q: "What should you focus on?", a: "Weak areas only" },
    { q: "How do you prove mastery?", a: "Explain simply and solve questions correctly" },
    { q: "Subnetting target speed?", a: "Under 30 seconds per question" },
    { q: "Final readiness needs?", a: "High score plus lab confidence" }
  ],
  flashcards: [
    { front: "Weakness cleanup", back: "Fix mistakes instead of chasing new content" },
    { front: "Mastery test", back: "Can explain simply under pressure" },
    { front: "Final prep", back: "Redo weak labs and retake exams" }
  ]
},
{
  day: 30,
  title: "Final Mock Exam — Decision Day",
  lesson: `GOAL:
Decide if you are ready for the real CCNA.

FINAL TASKS:
1. Take final 30-question hard exam
2. Do 30 subnetting questions
3. Complete one troubleshooting lab
4. Review every wrong answer
5. Decide honestly

READY IF:
- 85%+ repeatedly
- subnetting fast
- can troubleshoot VLAN/trunk/routing/NAT/ACL
- show commands are familiar
- wrong answers are understood

NOT READY IF:
- guessing often
- subnetting slow
- cannot explain OSPF/ACL/NAT
- labs feel random
- score below 75%

FINAL EXAM MINDSET:
Do not panic.
Read carefully.
Eliminate wrong answers.
Look for keywords:
- same VLAN
- different subnet
- can ping gateway
- cannot resolve names
- route missing
- ACL direction
- NAT inside/outside

No app can guarantee a pass.
But if you can score high repeatedly and troubleshoot labs, you are in a strong position.`,
  commands: [
    "show running-config",
    "show ip interface brief",
    "show vlan brief",
    "show interfaces trunk",
    "show ip route",
    "show ip ospf neighbor",
    "show access-lists",
    "show ip nat translations"
  ],
  lab: [
    "Start final exam mode",
    "Finish within 30 minutes",
    "Score honestly",
    "Review all misses",
    "Redo weak labs",
    "Take final decision: book or delay",
    "If below 75%, do not rush"
  ],
  quiz: [
    { q: "Strong readiness score?", a: "85%+ repeatedly" },
    { q: "If below 75%, should you rush?", a: "No" },
    { q: "What is final review priority?", a: "Wrong answers and weak labs" },
    { q: "What should subnetting feel like?", a: "Fast and automatic" },
    { q: "What is the final mindset?", a: "Read carefully, eliminate, verify logic" }
  ],
  flashcards: [
    { front: "Ready", back: "85%+ repeatedly plus lab confidence" },
    { front: "Do not rush", back: "Failing early is worse than passing later" },
    { front: "Final rule", back: "Review mistakes until you can explain the fix" }
  ]
}
];