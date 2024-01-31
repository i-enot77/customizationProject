const os = require("os");

// Get network interfaces
const networkInterfaces = os.networkInterfaces();

// Find the IPv4 address of the first network interface that is not a loopback
const localIPv4 = Object.values(networkInterfaces)
  .flat()
  .filter(
    (interfaceInfo) =>
      interfaceInfo.family === "IPv4" && !interfaceInfo.internal
  )
  .map((interfaceInfo) => interfaceInfo.address)
  .shift();

console.log("Local IP Address:", localIPv4);
