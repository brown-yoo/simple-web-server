import os from 'os';

export const getLocalIp = () => {
  const interfaces = os.networkInterfaces();
  
  for (const ifaceName in interfaces) {
      const iface = interfaces[ifaceName];
      if (!iface) continue; // undefined 방지

      for (const config of iface) {
          if (config.family === 'IPv4' && !config.internal) {
              return config.address; // 로컬 네트워크 IP 반환
          }
      }
  }
  return '127.0.0.1'; // 기본값 (내부 루프백 주소)
}
