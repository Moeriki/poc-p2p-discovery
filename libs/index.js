import Peer from 'simple-peer';

export function detectNetwork({ wrtc = undefined } = {}) {
  const peer = new Peer({ initiator: true, wrtc });
  return new Promise((resolve, reject) => {
    let external;
    let internal;
    peer.on('error', reject);
    peer.on('signal', (signal) => {
      if (signal.candidate) {
        const match = signal.candidate.candidate.match(
          /\b(\d+\.\d+\.\d+\.\d+) \d+ typ (host|srflx)/,
        );
        if (match && match.length >= 3) {
          const [, ip, type] = match;
          if (type === 'host') {
            internal = ip;
          }
          if (type === 'srflx') {
            external = ip;
          }
          if (external && internal) {
            resolve({ external, internal });
            peer.destroy();
          }
        }
      }
    });
  });
}
