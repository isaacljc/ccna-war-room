export const examQuestions = [
{
  difficulty: "hard",
  question: "A router has routes 10.1.0.0/16, 10.1.1.0/24, and 10.1.1.128/25. Where will traffic to 10.1.1.140 go?",
  options: ["10.1.0.0/16", "10.1.1.0/24", "10.1.1.128/25", "Dropped"],
  answer: "10.1.1.128/25",
  explanation: "Longest prefix match wins. /25 is most specific."
},
{
  difficulty: "hard",
  question: "A PC cannot reach a remote network but can ping its gateway. What is the MOST likely issue?",
  options: ["ARP failure", "Missing route on router", "Wrong MAC address", "DNS failure"],
  answer: "Missing route on router",
  explanation: "Local works, remote fails → routing issue."
},
{
  difficulty: "hard",
  question: "Which subnet includes IP 192.168.10.70?",
  options: ["192.168.10.0/26", "192.168.10.64/26", "192.168.10.128/26", "192.168.10.192/26"],
  answer: "192.168.10.64/26",
  explanation: "Block size 64 → ranges: 0–63, 64–127."
},
{
  difficulty: "hard",
  question: "An ACL blocks all traffic unexpectedly. What is the cause?",
  options: ["Wrong wildcard mask", "Implicit deny", "Missing trunk", "STP blocking"],
  answer: "Implicit deny",
  explanation: "All ACLs end with deny any."
},
{
  difficulty: "hard",
  question: "Two OSPF routers do not form adjacency. Both are in same subnet. What is likely wrong?",
  options: ["Different hostname", "Different area", "Different MAC", "Different VLAN"],
  answer: "Different area",
  explanation: "OSPF neighbors must match area."
},
{
  difficulty: "hard",
  question: "What is broadcast address of 192.168.50.128/27?",
  options: ["192.168.50.159", "192.168.50.191", "192.168.50.255", "192.168.50.143"],
  answer: "192.168.50.159",
  explanation: "/27 block size = 32 → 128–159."
},
{
  difficulty: "hard",
  question: "A switch floods traffic. Why?",
  options: ["MAC unknown", "IP conflict", "DNS error", "Port security"],
  answer: "MAC unknown",
  explanation: "Unknown unicast = flood."
},
{
  difficulty: "hard",
  question: "Which command shows full routing table?",
  options: ["show ip route", "show interfaces", "show arp", "show vlan"],
  answer: "show ip route",
  explanation: "Displays all learned routes."
},
{
  difficulty: "hard",
  question: "Which NAT type maps one inside to one outside permanently?",
  options: ["Static NAT", "Dynamic NAT", "PAT", "SNAT"],
  answer: "Static NAT",
  explanation: "One-to-one mapping."
},
{
  difficulty: "hard",
  question: "Which VLAN feature allows multiple VLANs on one link?",
  options: ["Access port", "Trunking", "STP", "Routing"],
  answer: "Trunking",
  explanation: "802.1Q tagging."
},

// 🔥 Subnetting killers
{
  difficulty: "hard",
  question: "How many hosts in /27?",
  options: ["30", "32", "62", "14"],
  answer: "30",
  explanation: "2^5 - 2 = 30."
},
{
  difficulty: "hard",
  question: "Network address of 192.168.5.130/25?",
  options: ["192.168.5.0", "192.168.5.128", "192.168.5.255", "192.168.5.64"],
  answer: "192.168.5.128",
  explanation: "/25 splits into 0–127 and 128–255."
},

// 🔥 Routing logic
{
  difficulty: "hard",
  question: "Which route is preferred?",
  options: ["/16", "/24", "/25", "/0"],
  answer: "/25",
  explanation: "Most specific wins."
},
{
  difficulty: "hard",
  question: "What happens if return route missing?",
  options: ["Works", "Fails", "ARP resolves", "DNS fixes it"],
  answer: "Fails",
  explanation: "Two-way routing required."
},

// 🔥 OSPF traps
{
  difficulty: "hard",
  question: "OSPF uses what metric?",
  options: ["Hop count", "Cost", "Bandwidth only", "Delay"],
  answer: "Cost",
  explanation: "Based on bandwidth."
},
{
  difficulty: "hard",
  question: "OSPF neighbor stuck in INIT means?",
  options: ["No hello received", "One-way communication", "Area mismatch", "Auth failure"],
  answer: "One-way communication",
  explanation: "Seen neighbor but not bidirectional."
},

// 🔥 VLAN / trunk traps
{
  difficulty: "hard",
  question: "Native VLAN mismatch causes?",
  options: ["Routing failure", "Frame tagging issues", "IP conflict", "DNS error"],
  answer: "Frame tagging issues",
  explanation: "Untagged frames mismatch."
},
{
  difficulty: "hard",
  question: "Which VLAN is untagged?",
  options: ["Native VLAN", "Access VLAN", "Default VLAN", "All VLANs"],
  answer: "Native VLAN",
  explanation: "802.1Q rule."
},

// 🔥 ACL logic
{
  difficulty: "hard",
  question: "Extended ACL should be placed where?",
  options: ["Near source", "Near destination", "Anywhere", "Core only"],
  answer: "Near source",
  explanation: "Reduce unnecessary traffic."
},
{
  difficulty: "hard",
  question: "Standard ACL should be placed where?",
  options: ["Near source", "Near destination", "Anywhere", "Edge only"],
  answer: "Near destination",
  explanation: "Because only filters source."
},

// 🔥 NAT traps
{
  difficulty: "hard",
  question: "Inside local address means?",
  options: ["Private IP", "Public IP", "Destination IP", "Broadcast"],
  answer: "Private IP",
  explanation: "Internal address."
},
{
  difficulty: "hard",
  question: "Inside global means?",
  options: ["Public IP", "Private IP", "Router IP", "MAC address"],
  answer: "Public IP",
  explanation: "Translated address."
},

// 🔥 Security
{
  difficulty: "hard",
  question: "Port security violation restrict does what?",
  options: ["Shutdown port", "Drop packets + log", "Allow traffic", "Reboot switch"],
  answer: "Drop packets + log",
  explanation: "Restrict = drop + log."
},
{
  difficulty: "hard",
  question: "Which prevents rogue DHCP?",
  options: ["ACL", "DHCP snooping", "STP", "NAT"],
  answer: "DHCP snooping",
  explanation: "Blocks unauthorized DHCP servers."
},

// 🔥 Mixed troubleshooting
{
  difficulty: "hard",
  question: "PC cannot ping gateway. First check?",
  options: ["Routing", "Physical link", "DNS", "NAT"],
  answer: "Physical link",
  explanation: "Always start Layer 1."
},
{
  difficulty: "hard",
  question: "PCs same VLAN cannot ping. Likely?",
  options: ["Routing", "Switch issue", "NAT", "ACL"],
  answer: "Switch issue",
  explanation: "Same VLAN = L2 issue."
},

{
  difficulty: "hard",
  question: "A PC in VLAN 10 can ping another PC in VLAN 10, but cannot ping a PC in VLAN 20. What is most likely missing?",
  options: ["Trunking", "Inter-VLAN routing", "ARP", "DNS"],
  answer: "Inter-VLAN routing",
  explanation: "Same VLAN works, different VLAN fails. Different VLANs need Layer 3 routing."
},
{
  difficulty: "hard",
  question: "A trunk link is configured, but VLAN 30 traffic is not crossing. VLAN 30 exists on both switches. What should you check first?",
  options: ["Allowed VLAN list", "Default gateway", "DNS server", "OSPF router ID"],
  answer: "Allowed VLAN list",
  explanation: "If the VLAN exists but does not cross the trunk, check whether it is allowed on the trunk."
},
{
  difficulty: "hard",
  question: "A host is 192.168.1.130/26. What is its network address?",
  options: ["192.168.1.0", "192.168.1.64", "192.168.1.128", "192.168.1.192"],
  answer: "192.168.1.128",
  explanation: "/26 block size is 64. The ranges are .0-.63, .64-.127, .128-.191, .192-.255."
},
{
  difficulty: "hard",
  question: "Which address is the broadcast for 192.168.1.192/27?",
  options: ["192.168.1.207", "192.168.1.223", "192.168.1.255", "192.168.1.191"],
  answer: "192.168.1.223",
  explanation: "/27 block size is 32. The .192 block ends at .223."
},
{
  difficulty: "hard",
  question: "A router has no route to a destination network. What will it do with the packet?",
  options: ["Flood it", "Drop it", "Send ARP", "Send it to DNS"],
  answer: "Drop it",
  explanation: "Routers need a matching route or default route. Otherwise, the packet is dropped."
},
{
  difficulty: "hard",
  question: "A static route and an OSPF route exist for the exact same prefix. Which one is preferred by default?",
  options: ["OSPF", "Static route", "Both equally", "Neither"],
  answer: "Static route",
  explanation: "For the same prefix length, administrative distance decides. Static AD is 1, OSPF AD is 110."
},
{
  difficulty: "hard",
  question: "A router has 10.0.0.0/8 and 10.1.2.0/24. Traffic to 10.1.2.55 uses which route?",
  options: ["10.0.0.0/8", "10.1.2.0/24", "Default route", "Dropped"],
  answer: "10.1.2.0/24",
  explanation: "Longest prefix match wins. /24 is more specific than /8."
},
{
  difficulty: "hard",
  question: "Two OSPF routers are directly connected but not becoming neighbors. IPs are in the same subnet. What should you check?",
  options: ["Area mismatch", "DNS failure", "Native VLAN only", "NAT overload"],
  answer: "Area mismatch",
  explanation: "OSPF neighbors on the same link must be in the same area."
},
{
  difficulty: "hard",
  question: "Which OSPF wildcard mask matches a /30 network?",
  options: ["0.0.0.3", "0.0.0.7", "0.0.0.15", "255.255.255.252"],
  answer: "0.0.0.3",
  explanation: "/30 mask is 255.255.255.252. The wildcard is 0.0.0.3."
},
{
  difficulty: "hard",
  question: "An ACL has only deny statements. What happens to all other traffic?",
  options: ["Allowed", "Denied", "NATed", "Sent to default route"],
  answer: "Denied",
  explanation: "Every ACL has an implicit deny at the end."
},
{
  difficulty: "hard",
  question: "An extended ACL should usually be placed close to the source. Why?",
  options: ["To stop unwanted traffic early", "Because it only matches source", "Because it needs DNS", "Because it disables STP"],
  answer: "To stop unwanted traffic early",
  explanation: "Extended ACLs can match source, destination, and port, so place them near the source."
},
{
  difficulty: "hard",
  question: "A standard ACL blocks one source from reaching one server, but accidentally blocks it from all servers. Why?",
  options: ["Standard ACL only filters source", "Wrong OSPF area", "Native VLAN mismatch", "Wrong port-security mode"],
  answer: "Standard ACL only filters source",
  explanation: "Standard ACLs cannot specify destination, so placement matters."
},
{
  difficulty: "hard",
  question: "A PAT configuration is correct, but no translations appear. What should you verify first?",
  options: ["NAT ACL matches inside subnet", "STP root bridge", "Wireless SSID", "CDP neighbor name"],
  answer: "NAT ACL matches inside subnet",
  explanation: "PAT only translates traffic matched by the NAT ACL."
},
{
  difficulty: "hard",
  question: "Which command verifies current NAT entries?",
  options: ["show ip nat translations", "show ip route", "show vlan brief", "show spanning-tree"],
  answer: "show ip nat translations",
  explanation: "This command shows active NAT mappings."
},
{
  difficulty: "hard",
  question: "A switch port goes err-disabled after receiving a BPDU. Which feature likely caused it?",
  options: ["BPDU Guard", "NAT", "OSPF", "DHCP relay"],
  answer: "BPDU Guard",
  explanation: "BPDU Guard disables PortFast access ports if they receive BPDUs."
},
{
  difficulty: "hard",
  question: "Which feature prevents a fake DHCP server from handing out bad gateways?",
  options: ["DHCP snooping", "DAI", "PortFast", "HSRP"],
  answer: "DHCP snooping",
  explanation: "DHCP snooping blocks DHCP replies from untrusted ports."
},
{
  difficulty: "hard",
  question: "Which feature helps stop ARP spoofing attacks?",
  options: ["Dynamic ARP Inspection", "NTP", "PAT", "Trunking"],
  answer: "Dynamic ARP Inspection",
  explanation: "DAI validates ARP messages, often using DHCP snooping bindings."
},
{
  difficulty: "hard",
  question: "A DHCP client is on a different subnet from the DHCP server. What command is needed on the gateway interface?",
  options: ["ip helper-address", "ip nat inside", "switchport trunk", "router ospf 1"],
  answer: "ip helper-address",
  explanation: "ip helper-address forwards DHCP broadcasts to a remote DHCP server."
},
{
  difficulty: "hard",
  question: "A host can ping 8.8.8.8 but not google.com. What is most likely wrong?",
  options: ["DNS", "Default gateway", "Switchport VLAN", "Subnet mask"],
  answer: "DNS",
  explanation: "IP connectivity works, but name resolution fails."
},
{
  difficulty: "hard",
  question: "Which command shows whether VLANs are assigned to access ports?",
  options: ["show vlan brief", "show ip route", "show arp", "show ip nat translations"],
  answer: "show vlan brief",
  explanation: "show vlan brief lists VLANs and assigned switch ports."
},
{
  difficulty: "hard",
  question: "Which STP device becomes the root bridge?",
  options: ["Lowest bridge ID", "Highest bridge ID", "Lowest IP address", "Highest port number"],
  answer: "Lowest bridge ID",
  explanation: "STP elects the switch with the lowest bridge ID as root."
},
{
  difficulty: "hard",
  question: "Which EtherChannel mode combination will NOT form with LACP?",
  options: ["active-active", "active-passive", "passive-passive", "active-passive with matching settings"],
  answer: "passive-passive",
  explanation: "LACP passive waits. If both sides wait, no channel forms."
},
{
  difficulty: "hard",
  question: "An interface shows administratively down. What command usually fixes it?",
  options: ["no shutdown", "ip route", "show run", "switchport trunk allowed vlan"],
  answer: "no shutdown",
  explanation: "Administratively down means the interface was manually shut down."
},
{
  difficulty: "hard",
  question: "Which JSON example is valid?",
  options: ['{"router":"R1","vlans":[10,20]}', "{router:R1,vlans:10,20}", "<router>R1</router>", "[router=R1]"],
  answer: '{"router":"R1","vlans":[10,20]}',
  explanation: "Valid JSON uses quoted keys/strings and arrays with square brackets."
},
{
  difficulty: "hard",
  question: "Which REST method is normally used to retrieve information from a controller?",
  options: ["GET", "POST", "PUT", "DELETE"],
  answer: "GET",
  explanation: "GET retrieves information from an API."
}
,
{
  difficulty: "hard",
  question: "Traffic to 172.16.5.130 matches routes 172.16.0.0/16, 172.16.5.0/24, 172.16.5.128/26, and 0.0.0.0/0. Which route is used?",
  options: ["172.16.0.0/16", "172.16.5.0/24", "172.16.5.128/26", "0.0.0.0/0"],
  answer: "172.16.5.128/26",
  explanation: "Longest prefix match wins. /26 is most specific."
},
{
  difficulty: "hard",
  question: "What is the broadcast address for 10.10.10.96/28?",
  options: ["10.10.10.111", "10.10.10.127", "10.10.10.95", "10.10.10.112"],
  answer: "10.10.10.111",
  explanation: "/28 block size is 16. The 96 block runs 96–111."
},
{
  difficulty: "hard",
  question: "A PC has IP 192.168.20.50/27. Which address is its network address?",
  options: ["192.168.20.0", "192.168.20.32", "192.168.20.48", "192.168.20.64"],
  answer: "192.168.20.32",
  explanation: "/27 block size is 32. 50 falls in 32–63."
},
{
  difficulty: "hard",
  question: "Two PCs in VLAN 10 on different switches cannot ping. VLAN 10 exists on both switches. What is the best next check?",
  options: ["Default gateway", "Trunk allowed VLAN list", "DNS server", "NAT overload"],
  answer: "Trunk allowed VLAN list",
  explanation: "Same VLAN across switches needs VLAN 10 carried on the trunk."
},
{
  difficulty: "hard",
  question: "A router-on-a-stick setup has VLAN 20 PCs using gateway 192.168.20.1. Which issue would break inter-VLAN routing?",
  options: ["Subinterface missing dot1Q 20", "Switch has MAC table entries", "PCs use straight-through cables", "Router has hostname configured"],
  answer: "Subinterface missing dot1Q 20",
  explanation: "Subinterface tagging must match the VLAN."
},
{
  difficulty: "hard",
  question: "Which command best verifies whether a switch port is trunking?",
  options: ["show vlan brief", "show interfaces trunk", "show ip route", "show arp"],
  answer: "show interfaces trunk",
  explanation: "It shows trunk status, native VLAN, and allowed VLANs."
},
{
  difficulty: "hard",
  question: "An OSPF route appears as O in the routing table. What does this mean?",
  options: ["Static route", "Connected route", "OSPF intra-area route", "Default route"],
  answer: "OSPF intra-area route",
  explanation: "O means OSPF intra-area."
},
{
  difficulty: "hard",
  question: "OSPF neighbors are stuck in 2-WAY on an Ethernet segment. What is likely true?",
  options: ["This can be normal for DROTHER routers", "Authentication failed", "Area mismatch always", "Router ID missing"],
  answer: "This can be normal for DROTHER routers",
  explanation: "On broadcast networks, DROTHER-to-DROTHER neighbors may stay 2-WAY."
},
{
  difficulty: "hard",
  question: "Which wildcard mask matches 10.20.30.64/27?",
  options: ["0.0.0.31", "0.0.0.63", "255.255.255.224", "0.0.0.255"],
  answer: "0.0.0.31",
  explanation: "/27 mask is 255.255.255.224, inverse is 0.0.0.31."
},
{
  difficulty: "hard",
  question: "A standard ACL should block 192.168.10.0/24 from reaching Server A but not affect other destinations. Where should it be placed?",
  options: ["Close to source", "Close to destination", "On every switchport", "On the NAT outside interface only"],
  answer: "Close to destination",
  explanation: "Standard ACLs only match source, so place near destination to avoid blocking too much."
},
{
  difficulty: "hard",
  question: "An extended ACL denies tcp any host 10.1.1.10 eq 443, then permits ip any any. What is blocked?",
  options: ["All traffic to 10.1.1.10", "Only HTTPS to 10.1.1.10", "Only HTTP to 10.1.1.10", "All TCP everywhere"],
  answer: "Only HTTPS to 10.1.1.10",
  explanation: "TCP destination port 443 is HTTPS."
},
{
  difficulty: "hard",
  question: "Which statement about ACL processing is correct?",
  options: ["Best match wins", "All lines are checked", "First match wins", "Only deny lines are checked"],
  answer: "First match wins",
  explanation: "ACLs are processed top-down and stop at first match."
},
{
  difficulty: "hard",
  question: "A NAT configuration has ip nat inside on the WAN interface and ip nat outside on the LAN interface. What happens?",
  options: ["NAT works normally", "Direction is reversed and NAT fails", "Only DNS fails", "Only OSPF fails"],
  answer: "Direction is reversed and NAT fails",
  explanation: "Inside/outside roles must be applied to correct interfaces."
},
{
  difficulty: "hard",
  question: "Which command is used with PAT overload?",
  options: ["ip nat inside source list 1 interface g0/0 overload", "ip route nat overload", "nat enable dynamic", "access-group nat inside"],
  answer: "ip nat inside source list 1 interface g0/0 overload",
  explanation: "This translates inside addresses to the interface address using overload."
},
{
  difficulty: "hard",
  question: "A DHCP client receives 169.254.x.x. What does this usually indicate?",
  options: ["DHCP failed", "DNS failed", "NAT succeeded", "OSPF failed"],
  answer: "DHCP failed",
  explanation: "169.254.x.x is APIPA/self-assigned when DHCP fails."
},
{
  difficulty: "hard",
  question: "Which DHCP message sequence is correct?",
  options: ["Discover, Offer, Request, Ack", "Request, Discover, Offer, Ack", "Offer, Discover, Ack, Request", "Ack, Discover, Request, Offer"],
  answer: "Discover, Offer, Request, Ack",
  explanation: "DORA is the normal DHCP process."
},
{
  difficulty: "hard",
  question: "A switchport with PortFast enabled receives BPDU Guard violation. What commonly happens?",
  options: ["Port becomes err-disabled", "Port becomes trunk", "Port starts OSPF", "Port ignores all frames forever"],
  answer: "Port becomes err-disabled",
  explanation: "BPDU Guard protects access ports by disabling ports receiving BPDUs."
},
{
  difficulty: "hard",
  question: "Which security feature validates ARP packets using DHCP snooping bindings?",
  options: ["DAI", "NAT", "STP", "HSRP"],
  answer: "DAI",
  explanation: "Dynamic ARP Inspection checks ARP against trusted bindings."
},
{
  difficulty: "hard",
  question: "Which feature protects against rogue DHCP servers?",
  options: ["DHCP snooping", "PortFast", "NTP", "PAT"],
  answer: "DHCP snooping",
  explanation: "Trusted/untrusted ports prevent fake DHCP offers."
},
{
  difficulty: "hard",
  question: "What is the main purpose of HSRP?",
  options: ["Encrypt traffic", "Provide default gateway redundancy", "Translate IPs", "Prevent VLAN loops"],
  answer: "Provide default gateway redundancy",
  explanation: "HSRP provides a virtual gateway with active/standby routers."
},
{
  difficulty: "hard",
  question: "A host uses 192.168.1.1 as default gateway. In HSRP, what should 192.168.1.1 usually be?",
  options: ["Virtual IP", "Standby router physical IP only", "Switch MAC only", "DNS server"],
  answer: "Virtual IP",
  explanation: "Hosts point to the virtual gateway address."
},
{
  difficulty: "hard",
  question: "What is the usable range for 172.16.8.128/26?",
  options: ["172.16.8.129–172.16.8.190", "172.16.8.128–172.16.8.191", "172.16.8.130–172.16.8.191", "172.16.8.129–172.16.8.191"],
  answer: "172.16.8.129–172.16.8.190",
  explanation: "Network is .128, broadcast is .191."
},
{
  difficulty: "hard",
  question: "Which prefix gives exactly 14 usable hosts?",
  options: ["/28", "/29", "/27", "/30"],
  answer: "/28",
  explanation: "/28 leaves 4 host bits. 2^4 - 2 = 14."
},
{
  difficulty: "hard",
  question: "Which prefix is commonly used for point-to-point IPv4 links with 2 usable addresses?",
  options: ["/24", "/28", "/30", "/25"],
  answer: "/30",
  explanation: "/30 gives 2 usable IPv4 addresses."
},
{
  difficulty: "hard",
  question: "Which IPv6 address type starts with FE80::/10?",
  options: ["Global unicast", "Link-local", "Multicast", "Loopback"],
  answer: "Link-local",
  explanation: "FE80::/10 is IPv6 link-local."
},
{
  difficulty: "hard",
  question: "Which IPv6 address is loopback?",
  options: ["::1", "FE80::1", "FF02::1", "2001:db8::1"],
  answer: "::1",
  explanation: "::1 is IPv6 loopback."
},
{
  difficulty: "hard",
  question: "Which IPv6 prefix is reserved for documentation/examples?",
  options: ["2001:db8::/32", "fe80::/10", "ff00::/8", "::1/128"],
  answer: "2001:db8::/32",
  explanation: "2001:db8::/32 is used in documentation."
},
{
  difficulty: "hard",
  question: "An interface shows administratively down/down. What is the likely fix?",
  options: ["no shutdown", "ip route", "show vlan", "copy run start"],
  answer: "no shutdown",
  explanation: "Administratively down means it was manually shut."
},
{
  difficulty: "hard",
  question: "An interface shows up/down. What is commonly suspected?",
  options: ["Layer 2 issue", "No IP route only", "DNS failure", "NTP failure"],
  answer: "Layer 2 issue",
  explanation: "Physical is up, protocol down often suggests data-link issue."
},
{
  difficulty: "hard",
  question: "Which command quickly shows interface IPs and status on Cisco IOS?",
  options: ["show ip interface brief", "show startup-config", "show version", "show clock"],
  answer: "show ip interface brief",
  explanation: "This is a core troubleshooting command."
},
{
  difficulty: "hard",
  question: "A route learned by OSPF and a static route to same prefix exist. Which wins by default?",
  options: ["OSPF", "Static", "Both load balance always", "Neither"],
  answer: "Static",
  explanation: "Static AD is 1; OSPF AD is 110."
},
{
  difficulty: "hard",
  question: "Which administrative distance is lower?",
  options: ["OSPF 110", "Static 1", "RIP 120", "External BGP 20"],
  answer: "Static 1",
  explanation: "Lower AD is preferred. Static route AD defaults to 1."
},
{
  difficulty: "hard",
  question: "What does a switch use to decide where to forward Ethernet frames?",
  options: ["MAC address table", "Routing table", "NAT table", "DNS cache"],
  answer: "MAC address table",
  explanation: "Switches forward based on destination MAC."
},
{
  difficulty: "hard",
  question: "What does a router use to decide where to forward packets?",
  options: ["Routing table", "MAC table", "ARP only", "VLAN database"],
  answer: "Routing table",
  explanation: "Routers forward based on destination IP."
},
{
  difficulty: "hard",
  question: "A PC can ping IP addresses but not domain names. What is most likely broken?",
  options: ["DNS", "Default gateway", "Switching", "NAT only"],
  answer: "DNS",
  explanation: "IP reachability works, name resolution fails."
},
{
  difficulty: "hard",
  question: "Which protocol synchronizes time for logs and certificates?",
  options: ["NTP", "DNS", "DHCP", "SNMP"],
  answer: "NTP",
  explanation: "NTP synchronizes device clocks."
},
{
  difficulty: "hard",
  question: "Which protocol is commonly used for network monitoring and polling?",
  options: ["SNMP", "STP", "ARP", "ICMP only"],
  answer: "SNMP",
  explanation: "SNMP is used to monitor network devices."
},
{
  difficulty: "hard",
  question: "Which QoS problem describes variation in delay?",
  options: ["Jitter", "Latency", "Packet loss", "Bandwidth"],
  answer: "Jitter",
  explanation: "Jitter is delay variation."
},
{
  difficulty: "hard",
  question: "Which wireless security standard is newer and stronger?",
  options: ["WPA3", "WEP", "Open", "WPA"],
  answer: "WPA3",
  explanation: "WPA3 is newer than WPA/WPA2 and much stronger than WEP."
},
{
  difficulty: "hard",
  question: "Which 802.11 band usually provides better range but more interference?",
  options: ["2.4 GHz", "5 GHz", "6 GHz only", "60 GHz"],
  answer: "2.4 GHz",
  explanation: "2.4 GHz travels farther but is more crowded."
},
{
  difficulty: "hard",
  question: "Which 802.11 band usually provides higher throughput but shorter range?",
  options: ["5 GHz", "2.4 GHz", "900 MHz", "AM radio"],
  answer: "5 GHz",
  explanation: "5 GHz has more channels and higher throughput but less range."
},
{
  difficulty: "hard",
  question: "In JSON, which format is valid?",
  options: ['{"hostname":"R1"}', "{hostname:R1}", "[hostname=R1]", "<hostname>R1</hostname>"],
  answer: '{"hostname":"R1"}',
  explanation: "JSON uses quoted keys and string values."
},
{
  difficulty: "hard",
  question: "REST API method used to retrieve information is usually?",
  options: ["GET", "POST", "PUT", "DELETE"],
  answer: "GET",
  explanation: "GET retrieves data."
},
{
  difficulty: "hard",
  question: "REST API method used to create a new resource is usually?",
  options: ["POST", "GET", "DELETE", "TRACE"],
  answer: "POST",
  explanation: "POST commonly creates resources."
},
{
  difficulty: "hard",
  question: "Which controller concept best describes centralized network management?",
  options: ["SDN controller", "ARP cache", "MAC table", "CSMA/CD"],
  answer: "SDN controller",
  explanation: "SDN uses a centralized controller to manage network behavior."
},
{
  difficulty: "hard",
  question: "Which command shows whether an ACL is matching packets?",
  options: ["show access-lists", "show vlan brief", "show cdp neighbors", "show clock"],
  answer: "show access-lists",
  explanation: "It displays ACL entries and hit counts."
},
{
  difficulty: "hard",
  question: "Which command helps verify CDP neighbors directly connected to a Cisco device?",
  options: ["show cdp neighbors", "show ip route", "show arp", "show nat"],
  answer: "show cdp neighbors",
  explanation: "CDP discovers directly connected Cisco devices."
},
{
  difficulty: "hard",
  question: "Which command displays LLDP neighbors?",
  options: ["show lldp neighbors", "show cdp database", "show ip ospf database", "show vlan"],
  answer: "show lldp neighbors",
  explanation: "LLDP is vendor-neutral neighbor discovery."
},
{
  difficulty: "hard",
  question: "Which EtherChannel mode actively negotiates LACP?",
  options: ["active", "passive", "on", "auto"],
  answer: "active",
  explanation: "LACP active actively sends negotiation packets."
},
{
  difficulty: "hard",
  question: "Which EtherChannel mode forms a channel without negotiation?",
  options: ["on", "active", "passive", "desirable"],
  answer: "on",
  explanation: "Mode on forces EtherChannel without negotiation."
}
,
{
  difficulty: "hard",
  question: "A host 10.1.4.70/26 needs to reach 10.1.4.130/26. What must be true?",
  options: ["They are in the same subnet", "A router/L3 gateway is needed", "ARP alone is enough", "DNS is required"],
  answer: "A router/L3 gateway is needed",
  explanation: "10.1.4.70 is in 10.1.4.64/26. 10.1.4.130 is in 10.1.4.128/26. Different subnets require routing."
},
{
  difficulty: "hard",
  question: "Which address is the first usable host in 192.168.77.160/27?",
  options: ["192.168.77.160", "192.168.77.161", "192.168.77.191", "192.168.77.159"],
  answer: "192.168.77.161",
  explanation: "/27 block size is 32. Network is .160, first usable is .161."
},
{
  difficulty: "hard",
  question: "Which address is the broadcast for 10.5.5.200/29?",
  options: ["10.5.5.199", "10.5.5.200", "10.5.5.207", "10.5.5.255"],
  answer: "10.5.5.207",
  explanation: "/29 block size is 8. 200 falls in 200–207."
},
{
  difficulty: "hard",
  question: "An OSPF neighbor is not forming. Hello/dead timers match, area matches, subnet matches. What else could prevent adjacency?",
  options: ["Duplicate router ID", "Different hostname", "Different enable secret", "Different NTP server"],
  answer: "Duplicate router ID",
  explanation: "OSPF router IDs must be unique."
},
{
  difficulty: "hard",
  question: "Which OSPF network statement matches only 192.168.12.64/27?",
  options: ["network 192.168.12.64 0.0.0.31 area 0", "network 192.168.12.64 255.255.255.224 area 0", "network 192.168.12.0 0.0.0.255 area 0", "network 192.168.12.64 0.0.0.63 area 0"],
  answer: "network 192.168.12.64 0.0.0.31 area 0",
  explanation: "/27 wildcard is 0.0.0.31."
},
{
  difficulty: "hard",
  question: "A route table has O 10.10.0.0/16 and S 10.10.10.0/24. Traffic to 10.10.10.50 uses which route?",
  options: ["OSPF /16", "Static /24", "Both equally", "Default route"],
  answer: "Static /24",
  explanation: "Longest prefix match is checked before administrative distance."
},
{
  difficulty: "hard",
  question: "A switch port is configured as access VLAN 20, but VLAN 20 does not exist. What is the likely issue?",
  options: ["The port cannot forward for VLAN 20 properly", "The port becomes a router port", "The VLAN is created automatically on all switches", "OSPF disables the port"],
  answer: "The port cannot forward for VLAN 20 properly",
  explanation: "The VLAN must exist locally on the switch."
},
{
  difficulty: "hard",
  question: "Which command best checks whether VLAN 30 is allowed across a trunk?",
  options: ["show interfaces trunk", "show vlan brief", "show ip route", "show arp"],
  answer: "show interfaces trunk",
  explanation: "It shows VLANs allowed and active on trunks."
},
{
  difficulty: "hard",
  question: "A native VLAN mismatch appears between two switches. Which risk is most relevant?",
  options: ["Traffic may leak or be misclassified between VLANs", "OSPF cost changes", "NAT translations stop", "DHCP scope is deleted"],
  answer: "Traffic may leak or be misclassified between VLANs",
  explanation: "Native VLAN mismatch affects untagged frames on trunks."
},
{
  difficulty: "hard",
  question: "Which STP value is used to elect the root bridge?",
  options: ["Lowest bridge ID", "Highest MAC address", "Highest IP address", "Lowest port number"],
  answer: "Lowest bridge ID",
  explanation: "Bridge ID includes priority and MAC address."
},
{
  difficulty: "hard",
  question: "Which port state forwards user traffic in STP?",
  options: ["Blocking", "Listening", "Learning", "Forwarding"],
  answer: "Forwarding",
  explanation: "Only forwarding ports send and receive normal data traffic."
},
{
  difficulty: "hard",
  question: "Which feature should usually be enabled only on access ports connected to end devices?",
  options: ["PortFast", "Trunking", "Router-on-a-stick", "OSPF"],
  answer: "PortFast",
  explanation: "PortFast skips normal STP delay for end-device ports."
},
{
  difficulty: "hard",
  question: "An EtherChannel does not form. Which mismatch commonly causes failure?",
  options: ["Speed/duplex or trunk settings mismatch", "Different hostnames", "Different NTP servers", "Different console passwords"],
  answer: "Speed/duplex or trunk settings mismatch",
  explanation: "EtherChannel member links need compatible settings."
},
{
  difficulty: "hard",
  question: "Which LACP combination forms an EtherChannel?",
  options: ["active-active", "passive-passive", "auto-auto", "desirable-auto only"],
  answer: "active-active",
  explanation: "LACP forms with active-active or active-passive, not passive-passive."
},
{
  difficulty: "hard",
  question: "A router has no specific route and no default route for a destination. What happens?",
  options: ["Packet is dropped", "Packet is flooded", "Packet is NATed automatically", "Packet is sent to DNS"],
  answer: "Packet is dropped",
  explanation: "Routers need a matching route or default route."
},
{
  difficulty: "hard",
  question: "Which command creates a default static route to next-hop 192.168.1.1?",
  options: ["ip route 0.0.0.0 0.0.0.0 192.168.1.1", "ip default-gateway 192.168.1.1", "default route 192.168.1.1", "route add ospf 192.168.1.1"],
  answer: "ip route 0.0.0.0 0.0.0.0 192.168.1.1",
  explanation: "0.0.0.0/0 is the IPv4 default route."
},
{
  difficulty: "hard",
  question: "Which issue best explains successful ping from PC to gateway but failure beyond the router?",
  options: ["Routing beyond the gateway", "Bad access port VLAN", "Bad PC cable", "ARP failure to gateway"],
  answer: "Routing beyond the gateway",
  explanation: "The local link works, so check routing after the gateway."
},
{
  difficulty: "hard",
  question: "Which command shows OSPF-enabled interfaces and area information?",
  options: ["show ip ospf interface brief", "show vlan brief", "show ip nat translations", "show access-lists"],
  answer: "show ip ospf interface brief",
  explanation: "It summarizes OSPF interfaces, areas, and neighbor-related info."
},
{
  difficulty: "hard",
  question: "A router learns the same prefix from OSPF and RIP. Which is preferred by default?",
  options: ["OSPF", "RIP", "Both always load balance", "Neither"],
  answer: "OSPF",
  explanation: "OSPF AD is 110; RIP AD is 120. Lower wins."
},
{
  difficulty: "hard",
  question: "Which route source has administrative distance 0?",
  options: ["Connected", "Static", "OSPF", "RIP"],
  answer: "Connected",
  explanation: "Connected routes have AD 0."
},
{
  difficulty: "hard",
  question: "A DHCP relay is needed when clients and DHCP server are on different subnets. Which command is typically used on the gateway interface?",
  options: ["ip helper-address <server-ip>", "ip dhcp relay enable", "dhcp forward on", "ip nat inside"],
  answer: "ip helper-address <server-ip>",
  explanation: "ip helper-address forwards DHCP broadcasts as unicast to the server."
},
{
  difficulty: "hard",
  question: "Which port numbers are used by DHCP client/server?",
  options: ["UDP 67/68", "TCP 20/21", "TCP 80/443", "UDP 161/162"],
  answer: "UDP 67/68",
  explanation: "DHCP uses UDP 67 and 68."
},
{
  difficulty: "hard",
  question: "Which protocol uses UDP 161/162?",
  options: ["SNMP", "NTP", "DNS", "DHCP"],
  answer: "SNMP",
  explanation: "SNMP uses UDP 161 for polling and 162 for traps."
},
{
  difficulty: "hard",
  question: "Which protocol uses UDP 123?",
  options: ["NTP", "DNS", "SNMP", "TFTP"],
  answer: "NTP",
  explanation: "NTP synchronizes time using UDP 123."
},
{
  difficulty: "hard",
  question: "A PAT config uses ACL 1 to match inside hosts. If ACL 1 does not match the LAN subnet, what happens?",
  options: ["LAN hosts are not translated", "All hosts are translated anyway", "Only DNS is translated", "OSPF restarts"],
  answer: "LAN hosts are not translated",
  explanation: "NAT overload translates only traffic matched by the NAT ACL."
},
{
  difficulty: "hard",
  question: "Which ACL line permits only SSH from 192.168.1.0/24 to host 10.10.10.5?",
  options: ["permit tcp 192.168.1.0 0.0.0.255 host 10.10.10.5 eq 22", "permit ip any any", "permit udp 192.168.1.0 0.0.0.255 host 10.10.10.5 eq 22", "permit tcp host 10.10.10.5 192.168.1.0 0.0.0.255 eq 22"],
  answer: "permit tcp 192.168.1.0 0.0.0.255 host 10.10.10.5 eq 22",
  explanation: "SSH uses TCP port 22, source subnet first, destination host second."
},
{
  difficulty: "hard",
  question: "An ACL has: deny tcp any host 10.1.1.10 eq 80, then permit ip any any. What happens to ICMP to 10.1.1.10?",
  options: ["Permitted", "Denied", "Translated", "Sent to port 80"],
  answer: "Permitted",
  explanation: "Only TCP destination port 80 is denied. ICMP matches permit ip any any."
},
{
  difficulty: "hard",
  question: "Which command applies ACL 101 inbound on an interface?",
  options: ["ip access-group 101 in", "access-list 101 in", "apply acl 101 inbound", "ip acl 101 enable"],
  answer: "ip access-group 101 in",
  explanation: "ip access-group applies an ACL to an interface."
},
{
  difficulty: "hard",
  question: "Which device-plane is protected by SSH, local users, and enable secret?",
  options: ["Management plane", "Data plane", "Forwarding plane only", "Wireless RF plane"],
  answer: "Management plane",
  explanation: "These controls secure administrative access."
},
{
  difficulty: "hard",
  question: "Which command disables clear-text Telnet access on VTY lines when SSH is configured?",
  options: ["transport input ssh", "no telnet all", "disable vty telnet", "line ssh only"],
  answer: "transport input ssh",
  explanation: "This permits SSH only for remote VTY access."
},
{
  difficulty: "hard",
  question: "Which port-security violation mode shuts down the interface?",
  options: ["shutdown", "restrict", "protect", "discard"],
  answer: "shutdown",
  explanation: "Shutdown mode err-disables the port."
},
{
  difficulty: "hard",
  question: "Which port-security mode silently drops violating frames without logging?",
  options: ["protect", "restrict", "shutdown", "trunk"],
  answer: "protect",
  explanation: "Protect drops violating traffic without logging or increasing violation counter."
},
{
  difficulty: "hard",
  question: "A switch with DHCP snooping marks an uplink to a real DHCP server as untrusted. What happens?",
  options: ["DHCP offers may be blocked", "DHCP becomes faster", "OSPF fails", "STP root changes"],
  answer: "DHCP offers may be blocked",
  explanation: "DHCP server-facing ports should be trusted."
},
{
  difficulty: "hard",
  question: "Which IPv6 multicast address reaches all nodes on the local link?",
  options: ["FF02::1", "FF02::2", "FE80::1", "2001:db8::1"],
  answer: "FF02::1",
  explanation: "FF02::1 is all-nodes multicast."
},
{
  difficulty: "hard",
  question: "Which IPv6 multicast address reaches all routers on the local link?",
  options: ["FF02::2", "FF02::1", "::1", "FE80::/10"],
  answer: "FF02::2",
  explanation: "FF02::2 is all-routers multicast."
},
{
  difficulty: "hard",
  question: "Which IPv6 address type is not routed beyond the local link?",
  options: ["Link-local", "Global unicast", "Anycast", "Unique local only"],
  answer: "Link-local",
  explanation: "Link-local addresses are valid only on the local segment."
},
{
  difficulty: "hard",
  question: "A PC has IPv6 address FE80::1234 only. What is true?",
  options: ["It has link-local connectivity only", "It has public internet IPv6", "It has no IPv6 address", "It must use NAT"],
  answer: "It has link-local connectivity only",
  explanation: "FE80:: is link-local, not globally routable."
},
{
  difficulty: "hard",
  question: "Which wireless deployment uses a controller to manage lightweight APs?",
  options: ["Controller-based", "Ad hoc only", "Standalone autonomous only", "Hub-based"],
  answer: "Controller-based",
  explanation: "WLC manages lightweight access points centrally."
},
{
  difficulty: "hard",
  question: "Which wireless setting identifies the WLAN name users connect to?",
  options: ["SSID", "BSSID", "VLAN ID only", "WLC hostname"],
  answer: "SSID",
  explanation: "SSID is the wireless network name."
},
{
  difficulty: "hard",
  question: "Which older wireless security method is considered broken and should not be used?",
  options: ["WEP", "WPA3", "WPA2", "802.1X"],
  answer: "WEP",
  explanation: "WEP is obsolete and insecure."
},
{
  difficulty: "hard",
  question: "Which QoS term means total one-way delay?",
  options: ["Latency", "Jitter", "Loss", "Queue depth"],
  answer: "Latency",
  explanation: "Latency is delay; jitter is delay variation."
},
{
  difficulty: "hard",
  question: "Which QoS behavior gives voice traffic priority treatment?",
  options: ["Prioritization/queuing", "NAT overload", "ARP flooding", "DHCP relay"],
  answer: "Prioritization/queuing",
  explanation: "QoS can prioritize delay-sensitive traffic like voice."
},
{
  difficulty: "hard",
  question: "Which JSON value type is represented by [10,20,30]?",
  options: ["Array", "String", "Object", "Boolean"],
  answer: "Array",
  explanation: "Square brackets represent an array in JSON."
},
{
  difficulty: "hard",
  question: "Which JSON value type is represented by true?",
  options: ["Boolean", "String", "Array", "Object"],
  answer: "Boolean",
  explanation: "true and false are Boolean values."
},
{
  difficulty: "hard",
  question: "Which REST method commonly replaces or updates a resource?",
  options: ["PUT", "GET", "DELETE", "ARP"],
  answer: "PUT",
  explanation: "PUT is commonly used to update/replace a resource."
},
{
  difficulty: "hard",
  question: "Which REST method commonly removes a resource?",
  options: ["DELETE", "GET", "POST", "PATCH only"],
  answer: "DELETE",
  explanation: "DELETE removes a resource."
},
{
  difficulty: "hard",
  question: "In controller-based networking, what is a key benefit?",
  options: ["Centralized policy and management", "No need for IP addressing", "No routing required ever", "MAC addresses disappear"],
  answer: "Centralized policy and management",
  explanation: "Controllers centralize configuration and policy."
},
{
  difficulty: "hard",
  question: "Which tool category includes Ansible, Puppet, and Chef?",
  options: ["Configuration management", "Routing protocols", "Wireless encryption", "NAT types"],
  answer: "Configuration management",
  explanation: "These tools automate configuration and deployment."
},
{
  difficulty: "hard",
  question: "Which command shows the current saved configuration loaded at boot?",
  options: ["show startup-config", "show running-config", "show version brief", "show memory route"],
  answer: "show startup-config",
  explanation: "startup-config is stored in NVRAM and used at boot."
},
{
  difficulty: "hard",
  question: "Which command shows the active configuration currently running in RAM?",
  options: ["show running-config", "show startup-config", "show flash", "show arp"],
  answer: "show running-config",
  explanation: "running-config is the active config in RAM."
}
,
{
  difficulty: "hard",
  question: "A router receives a packet for 192.168.100.66 with routes 192.168.100.0/25 and 192.168.100.64/26. Which is used?",
  options: ["192.168.100.0/25", "192.168.100.64/26", "Both equally", "Default route"],
  answer: "192.168.100.64/26",
  explanation: "Longest prefix match wins. /26 is more specific than /25."
},
{
  difficulty: "hard",
  question: "What is the valid host range for 192.168.200.32/27?",
  options: ["33–62", "32–63", "33–63", "34–62"],
  answer: "33–62",
  explanation: "Network = .32, broadcast = .63 → usable .33–.62."
},
{
  difficulty: "hard",
  question: "Which address is NOT valid for 10.0.0.0/30?",
  options: ["10.0.0.1", "10.0.0.2", "10.0.0.3", "10.0.0.0"],
  answer: "10.0.0.3",
  explanation: "10.0.0.3 is broadcast in /30."
},
{
  difficulty: "hard",
  question: "A PC cannot reach its gateway. What is the FIRST troubleshooting step?",
  options: ["Check physical link", "Check OSPF", "Check NAT", "Check DNS"],
  answer: "Check physical link",
  explanation: "Always start at Layer 1."
},
{
  difficulty: "hard",
  question: "Which field does a switch use to forward frames?",
  options: ["Destination MAC", "Source MAC", "Destination IP", "Port number"],
  answer: "Destination MAC",
  explanation: "Switch forwarding is based on destination MAC."
},
{
  difficulty: "hard",
  question: "Which command verifies interface errors and collisions?",
  options: ["show interfaces", "show ip route", "show arp", "show vlan"],
  answer: "show interfaces",
  explanation: "Displays errors, drops, collisions."
},
{
  difficulty: "hard",
  question: "Which condition must be met for two routers to form OSPF adjacency?",
  options: ["Same subnet and area", "Same hostname", "Same VLAN only", "Same MAC"],
  answer: "Same subnet and area",
  explanation: "OSPF neighbors must share subnet and area."
},
{
  difficulty: "hard",
  question: "What does 'O E2' mean in routing table?",
  options: ["External OSPF route", "Static route", "Connected route", "RIP route"],
  answer: "External OSPF route",
  explanation: "E2 = external type 2 route."
},
{
  difficulty: "hard",
  question: "Which command verifies HSRP status?",
  options: ["show standby", "show hsrp config", "show redundancy", "show gateway"],
  answer: "show standby",
  explanation: "Displays active/standby status."
},
{
  difficulty: "hard",
  question: "If HSRP active router fails, what happens?",
  options: ["Standby takes over", "Network stops", "Switch reboots", "NAT resets"],
  answer: "Standby takes over",
  explanation: "Failover is automatic."
},
{
  difficulty: "hard",
  question: "Which command verifies DHCP leases?",
  options: ["show ip dhcp binding", "show dhcp clients", "show ip route", "show arp"],
  answer: "show ip dhcp binding",
  explanation: "Displays assigned IPs."
},
{
  difficulty: "hard",
  question: "What is the purpose of DNS?",
  options: ["Resolve names to IP", "Route packets", "Assign IPs", "Encrypt traffic"],
  answer: "Resolve names to IP",
  explanation: "DNS translates names to IP addresses."
},
{
  difficulty: "hard",
  question: "Which protocol uses TCP port 22?",
  options: ["SSH", "Telnet", "HTTP", "FTP"],
  answer: "SSH",
  explanation: "Secure remote access."
},
{
  difficulty: "hard",
  question: "Which protocol uses TCP port 443?",
  options: ["HTTPS", "HTTP", "FTP", "SSH"],
  answer: "HTTPS",
  explanation: "Secure web traffic."
},
{
  difficulty: "hard",
  question: "Which command shows ARP table?",
  options: ["show arp", "show ip route", "show mac address-table", "show vlan"],
  answer: "show arp",
  explanation: "Maps IP to MAC."
},
{
  difficulty: "hard",
  question: "Which device breaks collision domains?",
  options: ["Switch", "Hub", "Repeater", "Cable"],
  answer: "Switch",
  explanation: "Each port is separate collision domain."
},
{
  difficulty: "hard",
  question: "Which device breaks broadcast domains?",
  options: ["Router", "Switch", "Hub", "Repeater"],
  answer: "Router",
  explanation: "Layer 3 separates broadcast domains."
},
{
  difficulty: "hard",
  question: "What is the default VLAN on Cisco switches?",
  options: ["VLAN 1", "VLAN 0", "VLAN 10", "VLAN 99"],
  answer: "VLAN 1",
  explanation: "Default VLAN is 1."
},
{
  difficulty: "hard",
  question: "Which command assigns VLAN 20 to an access port?",
  options: ["switchport access vlan 20", "vlan 20 assign", "set vlan 20", "interface vlan 20"],
  answer: "switchport access vlan 20",
  explanation: "Assigns VLAN to port."
},
{
  difficulty: "hard",
  question: "Which command enables trunking?",
  options: ["switchport mode trunk", "enable trunk", "set trunk on", "trunk enable"],
  answer: "switchport mode trunk",
  explanation: "Sets interface as trunk."
},
{
  difficulty: "hard",
  question: "Which protocol is used to prevent loops?",
  options: ["STP", "OSPF", "RIP", "ARP"],
  answer: "STP",
  explanation: "Spanning Tree prevents loops."
},
{
  difficulty: "hard",
  question: "Which STP port state builds MAC table but does not forward?",
  options: ["Learning", "Blocking", "Forwarding", "Disabled"],
  answer: "Learning",
  explanation: "MAC addresses are learned but frames not forwarded."
},
{
  difficulty: "hard",
  question: "Which NAT term refers to external public IP?",
  options: ["Inside global", "Inside local", "Outside local", "Outside global"],
  answer: "Inside global",
  explanation: "Public IP of internal host."
},
{
  difficulty: "hard",
  question: "Which command marks interface for NAT inside?",
  options: ["ip nat inside", "nat enable", "inside nat on", "ip inside nat"],
  answer: "ip nat inside",
  explanation: "Marks inside interface."
},
{
  difficulty: "hard",
  question: "Which command marks interface for NAT outside?",
  options: ["ip nat outside", "nat outside enable", "ip outside nat", "set nat outside"],
  answer: "ip nat outside",
  explanation: "Marks outside interface."
},
{
  difficulty: "hard",
  question: "Which routing protocol uses hop count?",
  options: ["RIP", "OSPF", "EIGRP", "BGP"],
  answer: "RIP",
  explanation: "RIP metric is hop count."
},
{
  difficulty: "hard",
  question: "Which command shows OSPF neighbors?",
  options: ["show ip ospf neighbor", "show ospf table", "show ip route", "show adjacency"],
  answer: "show ip ospf neighbor",
  explanation: "Displays OSPF neighbors."
},
{
  difficulty: "hard",
  question: "Which command saves configuration permanently?",
  options: ["copy run start", "save config", "write only", "store config"],
  answer: "copy run start",
  explanation: "Writes running to startup config."
},
{
  difficulty: "hard",
  question: "Which mode allows configuration changes?",
  options: ["Global config", "User EXEC", "Privileged EXEC only", "ROMMON"],
  answer: "Global config",
  explanation: "Configuration is done here."
},
{
  difficulty: "hard",
  question: "Which command enters global config?",
  options: ["configure terminal", "enable config", "config start", "global mode"],
  answer: "configure terminal",
  explanation: "Moves into config mode."
},
{
  difficulty: "hard",
  question: "Which command sets hostname?",
  options: ["hostname R1", "set name R1", "name R1", "router name R1"],
  answer: "hostname R1",
  explanation: "Sets device name."
},
{
  difficulty: "hard",
  question: "Which protocol maps IP to MAC?",
  options: ["ARP", "DNS", "NAT", "ICMP"],
  answer: "ARP",
  explanation: "ARP resolves IP to MAC."
},
{
  difficulty: "hard",
  question: "Which ICMP message confirms reachability?",
  options: ["Echo reply", "Echo request", "Destination unreachable", "Time exceeded"],
  answer: "Echo reply",
  explanation: "Reply confirms success."
},
{
  difficulty: "hard",
  question: "Which command tests reachability?",
  options: ["ping", "route", "arp", "connect"],
  answer: "ping",
  explanation: "Uses ICMP."
},
{
  difficulty: "hard",
  question: "Which command traces path?",
  options: ["tracert", "ping", "show route", "trace ip"],
  answer: "tracert",
  explanation: "Shows hop-by-hop path."
},
{
  difficulty: "hard",
  question: "Which protocol resolves domain names?",
  options: ["DNS", "ARP", "NAT", "DHCP"],
  answer: "DNS",
  explanation: "Name resolution."
},
{
  difficulty: "hard",
  question: "Which feature limits MAC addresses on a port?",
  options: ["Port security", "STP", "ACL", "NAT"],
  answer: "Port security",
  explanation: "Restricts MAC count."
},
{
  difficulty: "hard",
  question: "Which attack spoofs ARP replies?",
  options: ["ARP spoofing", "DNS poisoning", "DoS", "Phishing"],
  answer: "ARP spoofing",
  explanation: "Fake ARP messages."
},
{
  difficulty: "hard",
  question: "Which tool protects against ARP spoofing?",
  options: ["DAI", "ACL", "NAT", "OSPF"],
  answer: "DAI",
  explanation: "Validates ARP packets."
},
{
  difficulty: "hard",
  question: "Which type of traffic is one-to-many?",
  options: ["Multicast", "Unicast", "Broadcast", "Anycast"],
  answer: "Multicast",
  explanation: "One-to-many efficient delivery."
},
{
  difficulty: "hard",
  question: "Which type is one-to-one?",
  options: ["Unicast", "Broadcast", "Multicast", "Anycast"],
  answer: "Unicast",
  explanation: "Single sender to single receiver."
},
{
  difficulty: "hard",
  question: "Which type is one-to-all?",
  options: ["Broadcast", "Unicast", "Multicast", "Anycast"],
  answer: "Broadcast",
  explanation: "Sent to all devices."
},
{
  difficulty: "hard",
  question: "Which topology has central device?",
  options: ["Star", "Ring", "Bus", "Mesh"],
  answer: "Star",
  explanation: "Switch in center."
},
{
  difficulty: "hard",
  question: "Which topology provides highest redundancy?",
  options: ["Mesh", "Bus", "Star", "Ring"],
  answer: "Mesh",
  explanation: "Multiple paths."
}
];